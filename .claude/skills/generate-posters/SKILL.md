---
name: generate-posters
description: Generate event posters and banners for AI Breakfast events by hand-authoring HTML against the brand system, then rendering to PNG with agent-browser. Produces banner (1080x640), poster (1080x1920), and poster with QR (1080x1920).
argument-hint: "[event number and theme, e.g. '#41 theme: local-first RAG, speaker: xxx']"
user-invocable: true
allowed-tools:
  - Bash
  - Read
  - Glob
  - Write
  - Edit
---

# AI Breakfast Poster & Banner Generator

Hand-author three HTML files per event, then render each to PNG.

Each event ships three assets:

1. **Banner** (1080x640) — for the huodongxing event header + OG image
2. **Poster** (1080x1920) — clean version for general social sharing + huodongxing 活动详情
3. **Poster with QR** (1080x1920) — for WeChat/WeChat Moments distribution

## When to use

- Setting up a new weekly event (called by `create-weekly-event`)
- Re-rendering after the speaker photo or QR code arrives
- Iterating on a design (`-v2`, `-v3` filenames are fine)

## Authoring approach

```bash
ROOT="${AI_BREAKFAST_ROOT:-$PWD}"
EVENT_NUM=42  # the new event
PREV_NUM=41   # the most recent one
SRC="$ROOT/events/2026/ai-breakfast-${PREV_NUM}"
DST="$ROOT/events/2026/ai-breakfast-${EVENT_NUM}"
mkdir -p "$DST"/images/{graphics,qr-codes,speakers}
cp "$SRC"/poster.html "$SRC"/poster-qr.html "$SRC"/banner.html "$DST/"
```

Then edit the three HTML files for the new event's content.

## Rendering to PNG

Use `agent-browser` to screenshot each HTML at the right viewport size.

```bash
cd "$DST"

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

## Import poster-with-qr into Apple Photos (macOS only)

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
