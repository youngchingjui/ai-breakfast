---
name: generate-posters
description: Generate event posters and banners for AI Breakfast events by hand-authoring HTML against the brand system, then rendering to PNG with agent-browser. Produces banner (1080x640), poster (1080x1920), and poster with QR (1080x1920).
argument-hint: "[event number and theme, e.g. '#41 theme: local-first RAG, speaker: Paul Ropel']"
user-invocable: true
allowed-tools:
  - Bash
  - Read
  - Glob
  - Write
  - Edit
---

# AI Breakfast Poster & Banner Generator

Hand-author three HTML files per event, then render each to PNG. This replaces the older `event-poster-website` workflow — that app is no longer used.

Each event ships three assets:

1. **Banner** (1080x640) — for the huodongxing event header
2. **Poster** (1080x1920) — clean version for general social sharing + huodongxing 活动详情
3. **Poster with QR** (1080x1920) — for WeChat/WeChat Moments distribution

## When to use

- Setting up a new weekly event (called by `create-weekly-event`)
- Re-rendering after the speaker photo or QR code arrives
- Iterating on a design (`-v2`, `-v3` filenames are fine)

## Authoring approach

**Start from the most recent event's HTML, not from a blank file.** The layout, type scale, and spacing in the latest event represent the current best version of the design. Copy the three files, then tweak content (event number, date, demo title, blurb, speaker).

```bash
EVENT_NUM=42  # the new event
PREV_NUM=41   # the most recent one
SRC=~/Projects/youngchingjui/ai-breakfast/events/2026/ai-breakfast-${PREV_NUM}
DST=~/Projects/youngchingjui/ai-breakfast/events/2026/ai-breakfast-${EVENT_NUM}
mkdir -p "$DST"/images/{graphics,qr-codes,speakers}
cp "$SRC"/poster.html "$SRC"/poster-qr.html "$SRC"/banner.html "$DST/"
```

Then edit the three HTML files for the new event's content.

## Design system (sourced from BRAND.md)

All three templates already use the canonical palette. Do not invent new colors.

| Token | Hex | Usage |
| --- | --- | --- |
| `--warm-white` | `#fffaf5` | Page background |
| `--peach-50` | `#fff1e6` | Card / right-column background |
| `--peach-100` | `#fde2c7` | Internal card divider |
| `--border` | `#e7ddd4` | Hairlines, card outlines |
| `--terracotta` | `#c2410c` | Card label, QR label |
| `--flame` | `#ea580c` | Issue number, byline avatar gradient start |
| `--burnt` | `#9a3412` | Avatar gradient end |
| `--peach` | `#fb923c` | Agenda separator dots |
| `--stone-900` | `#292524` | Primary text |
| `--stone-700` | `#44403c` | Secondary text |
| `--stone-500` | `#78716c` | Muted text |

**Fonts:** Playfair Display (display + headings), Inter (body + UI), Ubuntu Mono (eyebrows + kickers). Loaded via Google Fonts CDN inside each HTML file.

## Layout anatomy (what to edit, top to bottom)

**Poster (`poster.html`, `poster-qr.html`):**

1. Eyebrow — `Shanghai`
2. Title row — `AI Breakfast` + `#NN` in flame
3. Date stack — day + time
4. Demo card (peach background) — label, title, blurb, byline (avatar + name + role)
5. Agenda line — `Intros · Demo · Open discussion`
6. Venue footer — Baker & Spice block; on the QR variant, a QR block sits to the right
7. Slogan — italic, centered: `Keeping up with AI every Thursday morning.`

**Banner (`banner.html`):**

- Two-column 1080x640. Left column = masthead + date + venue. Right column (peach) = demo title, blurb, byline.

## Speaker photo + QR placeholders

When the photo or QR isn't available yet, the templates already include intentional placeholders so renders don't look broken:

- **Avatar placeholder:** a circular gradient with the speaker's initials (e.g., `PR`). To swap in a real photo: drop the file into `images/speakers/{firstname}.jpeg` and replace `<div class="avatar">PR</div>` with `<img class="avatar" src="images/speakers/paul.jpeg" alt="Paul Ropel" />`.
- **QR placeholder:** a hatched square labelled "QR code goes here". Replace with `<img src="images/qr-codes/wechat-mini-program.png" alt="Register QR" />` once the QR is downloaded (see `huodongxing-qr` skill).

After swapping, re-render the affected file(s).

## Rendering to PNG

Use `agent-browser` to screenshot each HTML at the right viewport size.

```bash
cd ~/Projects/youngchingjui/ai-breakfast/events/2026/ai-breakfast-${EVENT_NUM}

# Poster (1080x1920)
agent-browser set viewport 1080 1920
agent-browser open "file://$(pwd)/poster.html"
agent-browser wait 2500   # let webfonts load
agent-browser screenshot images/graphics/poster.png

# Poster with QR (1080x1920)
agent-browser open "file://$(pwd)/poster-qr.html"
agent-browser wait 2500
agent-browser screenshot images/graphics/poster-with-qr.png

# Banner (1080x640)
agent-browser set viewport 1080 640
agent-browser open "file://$(pwd)/banner.html"
agent-browser wait 2500
agent-browser screenshot images/graphics/banner-1080x640.png
```

**Verify:**

```bash
file images/graphics/*.png
# banner-1080x640.png: PNG image data, 1080 x 640
# poster.png:          PNG image data, 1080 x 1920
# poster-with-qr.png:  PNG image data, 1080 x 1920
```

## Import poster-with-qr into Apple Photos

So it's one tap away when sharing on WeChat:

```bash
osascript -e "tell application \"Photos\" to import POSIX file \"$(pwd)/images/graphics/poster-with-qr.png\""
```

## File organization

```
events/2026/ai-breakfast-{NUM}/
├── event.md
├── poster.html
├── poster-qr.html
├── banner.html
└── images/
    ├── graphics/
    │   ├── poster.png
    │   ├── poster-with-qr.png
    │   └── banner-1080x640.png
    ├── qr-codes/
    │   └── wechat-mini-program.png
    └── speakers/
        └── {firstname}.jpeg
```

## What changed from the old workflow

The previous version of this skill drove the `event-poster-website` Next.js app via curl against `/api/og-poster` and `/api/og-banner`. That app used an out-of-date palette (`#F6EBDC` beige, `#C65B3C` rust) and was tightly coupled to a single layout. We've moved to hand-authored HTML because:

- **Brand alignment** — templates now use the BRAND.md terracotta palette directly.
- **Design flexibility** — each event can iterate visually without redeploying an app.
- **No service dependency** — no dev server, no Vercel Blob, no API keys.

If you find references elsewhere to the `event-poster-website` app for poster generation, treat them as stale.
