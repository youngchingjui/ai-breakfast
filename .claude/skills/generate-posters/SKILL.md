---
name: generate-posters
description: Generate event posters and banners for AI Breakfast events using the event-poster-website app. Creates banner (1080x640), poster with QR, and poster without QR.
argument-hint: "[event number and theme, e.g. '#39 theme: LLM tools']"
user-invocable: true
allowed-tools:
  - Bash
  - Read
  - Glob
  - Write
---

# AI Breakfast Poster & Banner Generator

Generate event graphics for AI Breakfast events using the `event-poster-website` Next.js app. Produces three images per event:

1. **Banner** (1080x640) — for huodongxing event header
2. **Poster without QR** (1080x1920) — for huodongxing event details + general social sharing
3. **Poster with QR** (1080x1920) — for WeChat/social sharing with registration QR code

## Prerequisites

- `event-poster-website` repo at `~/Projects/youngchingjui/event-poster-website`
- `bun` installed (preferred over npm)
- QR code already downloaded (use `huodongxing-qr` skill) if generating poster with QR

## Step 1: Start the Dev Server

```bash
cd ~/Projects/youngchingjui/event-poster-website && bun dev
# Runs on http://localhost:3000
# Wait for "Ready" message before making API calls
```

## Step 2: Generate Banner (1080x640)

For the huodongxing event header. Check a recent event's banner URL (in the `generate-posters` curl history or the poster API code) for current parameter values.

```bash
curl -s -o banner.png \
  "http://localhost:3000/api/og-banner?width=1080&height=640&eventName=AI+Breakfast+%23NUM&city=Shanghai&date=Thursday,+DATE+%7C+TIME&location=BAKER%26SPICE,+Wheelock+Square"
```

**Banner API parameters:**

| Param                | Description                                   | Notes                                    |
| -------------------- | --------------------------------------------- | ---------------------------------------- |
| `eventName`          | Event title                                   | e.g. "AI Breakfast #35"                  |
| `date`               | Date + time string                            | e.g. "Thursday, Apr 9 \| 8:00 AM"       |
| `location`           | Venue shortname                               | Check `.claude/skills/PREFERENCES.md` for current venue    |
| `city`               | City name                                     | "Shanghai"                               |
| `width` / `height`   | Image dimensions in px                        | 1080 x 640                               |
| `backgroundImageSrc` | Background photo URL                          | Defaults to stock photo from Vercel Blob |

**Important:** The default stock background image is loaded from Vercel Blob automatically via `NEXT_PUBLIC_BLOB_BASE_URL`. If the background isn't showing, check that `NEXT_PUBLIC_BLOB_BASE_URL` is set in the `.env` file. You can also pass a custom image URL (e.g. an Unsplash URL).

## Step 3: Generate Poster WITHOUT QR (1080x1920)

For huodongxing event details section and general social sharing. Check recent events for current parameter values (time, venue, location).

```bash
curl -s -o poster-no-qr.png \
  "http://localhost:3000/api/og-poster?\
eventName=AI+Breakfast+%23NUM\
&city=Shanghai\
&date=Thursday,+DATE\
&time=TIME_RANGE\
&tagline=TAGLINE+HERE\
&venue=VENUE\
&location=LOCATION_WITH_%0A_LINEBREAKS\
&showQr=false"
```

**Key:** `showQr=false` omits the QR code from the poster.

## Step 4: Generate Poster WITH QR (1080x1920)

For WeChat and social media sharing with a scannable registration QR.

The QR code image needs to be at a public URL for the poster API to fetch it. Options:
- Copy the QR to the poster website's `public/` dir and reference `http://localhost:3000/filename.png`
- Upload via the app's `/api/upload` endpoint (requires `@vercel/blob` to be installed)

Then generate with `showQr=true&qrCodeSrc=ENCODED_URL`.

## Poster API Parameters (Full Reference)

| Param                | Description                              | Notes                                       |
| -------------------- | ---------------------------------------- | ------------------------------------------- |
| `eventName`          | Event title                              | e.g. "AI Breakfast #35"                      |
| `city`               | City label (top of poster)               | "Shanghai"                                   |
| `date`               | Display date                             | e.g. "Thursday, Apr 9"                       |
| `time`               | Display time                             | Check `.claude/skills/PREFERENCES.md` for current time         |
| `tagline`            | Theme/topic line (use `•` as separator)  | Describe this week's format/topics           |
| `venue`              | Venue name (bold)                        | Check recent events                          |
| `location`           | Full address (use `%0A` for line breaks) | Check `.claude/skills/PREFERENCES.md` for current address      |
| `showQr`             | Show QR code overlay                     | "true" (set "false" to hide)                 |
| `qrCodeSrc`          | QR code image URL (must be public)       | See Step 4 for how to serve                  |
| `backgroundImageSrc` | Background photo URL                     | Defaults to stock photo; can pass custom URL |

## Step 5: Save to Event Folder

```bash
EVENT_NUM=31
DEST=~/Projects/youngchingjui/ai-breakfast/events/2026/ai-breakfast-${EVENT_NUM}/images/graphics
mkdir -p "$DEST"
mv banner.png "$DEST/banner-1080x640.png"
mv poster-no-qr.png "$DEST/poster-no-qr.png"
mv poster-with-qr.png "$DEST/poster-with-qr.png"
```

## Step 6: Verify

```bash
file ~/Projects/youngchingjui/ai-breakfast/events/2026/ai-breakfast-NUM/images/graphics/*.png
# banner: PNG image data, 1080 x 640
# posters: PNG image data, 1080 x 1920
```

Open them to visually confirm:

```bash
open ~/Projects/youngchingjui/ai-breakfast/events/2026/ai-breakfast-NUM/images/graphics/*.png
```

## Step 7: Import Poster with QR into Apple Photos

Import the poster-with-qr into Apple Photos so it's readily available for sharing via WeChat/social media:

```bash
osascript -e 'tell application "Photos" to import POSIX file "/Users/youngchingjui/Projects/youngchingjui/ai-breakfast/events/2026/ai-breakfast-NUM/images/graphics/poster-with-qr.png"'
```

Returns a media item ID on success. The image will appear in the Photos library's Recents album.

## File Organization

```
~/Projects/youngchingjui/ai-breakfast/events/2026/ai-breakfast-{NUM}/images/
├── graphics/
│   ├── banner-1080x640.png      # Huodongxing banner slot
│   ├── poster-no-qr.png         # Huodongxing 活动详情 + social sharing
│   └── poster-with-qr.png       # WeChat/social sharing (has QR code)
└── qr-codes/
    └── wechat-mini-program.png   # Downloaded via huodongxing-qr skill
```

## Design Details

- **Color scheme:** Background `#F6EBDC` (beige), event name `#C65B3C` (rust), body text `#6F6257` (brown)
- **Font:** Source Serif Pro (loaded from CDN at render time)
- **Poster layout:** Top half = text content over beige, bottom half = stock photo with gradient fade
- **Banner layout:** Left 60% = text content, right 40% = stock photo with gradient fade
- **QR code:** Bottom-right corner, 360x360px white card with green border, "Scan to register" label

## URL Encoding Cheat Sheet

| Character      | Encoded     |
| -------------- | ----------- |
| `#`            | `%23`       |
| `&`            | `%26`       |
| `–` (en dash)  | `%E2%80%93` |
| `•` (bullet)   | `%E2%80%A2` |
| `\n` (newline) | `%0A`       |
| space          | `+`         |

## Troubleshooting

- **Blank/broken image:** Check that the dev server is running (`bun dev`). The API renders images server-side.
- **No background photo:** Ensure `NEXT_PUBLIC_BLOB_BASE_URL` is set in `.env`. The stock image is hosted on Vercel Blob.
- **QR not showing:** Verify the `qrCodeSrc` URL is publicly accessible. The API fetches it at render time.
- **Font looks wrong:** Source Serif Pro is fetched from jsDelivr CDN. If the CDN is down, it falls back to Georgia/serif.
- **Large file size:** Posters are ~1-3MB PNGs. This is normal for 1080x1920 images.
