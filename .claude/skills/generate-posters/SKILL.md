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

For the huodongxing event header. Includes the stock background photo on the right side automatically.

```bash
curl -s -o banner.png \
  "http://localhost:3000/api/og-banner?width=1080&height=640&eventName=AI+Breakfast+%23NUM&city=Shanghai&date=Thursday,+DATE&location=BAKER%26SPICE,+Wheelock+Square"
```

**Banner API parameters:**

| Param                | Description                                             | Default                                         |
| -------------------- | ------------------------------------------------------- | ----------------------------------------------- |
| `eventName`          | Event title (e.g. "AI Breakfast #31")                   | "AI Breakfast"                                  |
| `date`               | Date + time string (e.g. "Thursday, Mar 12 \| 9:00 AM") | "Thursday, Jan 1 \| 9:00 AM"                    |
| `location`           | Venue shortname (e.g. "BAKER&SPICE, Wheelock Square")   | "BAKER&SPICE"                                   |
| `city`               | City name                                               | "Shanghai"                                      |
| `width`              | Image width in px                                       | 1080                                            |
| `height`             | Image height in px                                      | 640                                             |
| `backgroundImageSrc` | Background photo URL                                    | Stock coffee shop photo from Vercel Blob (auto) |

**Important:** The default stock background image (`luisa-fournier-hMjyyBqCRIs-unsplash.jpg`) is loaded from Vercel Blob automatically via `NEXT_PUBLIC_BLOB_BASE_URL`. Always include it — banners look much nicer with it. If the background isn't showing, check that `NEXT_PUBLIC_BLOB_BASE_URL` is set in the `.env` file.

## Step 3: Generate Poster WITHOUT QR (1080x1920)

For huodongxing event details section and general social sharing.

```bash
curl -s -o poster-no-qr.png \
  "http://localhost:3000/api/og-poster?\
eventName=AI+Breakfast+%23NUM\
&city=Shanghai\
&date=Thursday,+DATE\
&time=9:00+%E2%80%93+10:30+AM\
&tagline=TAGLINE+HERE\
&venue=BAKER%26SPICE\
&location=1717+West+Nanjing+Road,+Wheelock+Square%0A南京西路1717号+会德丰国际广场南院首层101号商铺%0A(Look+for+long+table+in+the+back)\
&showQr=false"
```

**Key:** `showQr=false` omits the QR code from the poster.

## Step 4: Generate Poster WITH QR (1080x1920)

For WeChat and social media sharing with a scannable registration QR.

### 4a. Upload QR Code to Vercel Blob

The QR code image needs to be at a public URL for the poster API to fetch it. Upload via the app's upload endpoint:

```bash
curl -s -X POST "http://localhost:3000/api/upload" \
  -F "file=@~/Projects/youngchingjui/ai-breakfast/events/2026/ai-breakfast-NUM/images/qr-codes/wechat-mini-program.png"
```

Returns JSON with the public URL:

```json
{
  "url": "https://xjticilwz5ezcm9j.public.blob.vercel-storage.com/filename.png",
  "pathname": "filename.png"
}
```

Save this URL for the next step.

### 4b. Generate the Poster

```bash
curl -s -o poster-with-qr.png \
  "http://localhost:3000/api/og-poster?\
eventName=AI+Breakfast+%23NUM\
&city=Shanghai\
&date=Thursday,+DATE\
&time=9:00+%E2%80%93+10:30+AM\
&tagline=TAGLINE+HERE\
&venue=BAKER%26SPICE\
&location=1717+West+Nanjing+Road,+Wheelock+Square%0A南京西路1717号+会德丰国际广场南院首层101号商铺%0A(Look+for+long+table+in+the+back)\
&showQr=true\
&qrCodeSrc=BLOB_URL_FROM_STEP_4a"
```

**Important:** The `qrCodeSrc` value must be URL-encoded if it contains special characters.

## Poster API Parameters (Full Reference)

| Param                | Description                              | Default                                              |
| -------------------- | ---------------------------------------- | ---------------------------------------------------- |
| `eventName`          | Event title                              | "AI Breakfast #21"                                   |
| `city`               | City label (top of poster)               | "Shanghai"                                           |
| `date`               | Display date                             | "Thursday, Jan 1"                                    |
| `time`               | Display time                             | "9:00 – 10:30 AM"                                    |
| `tagline`            | Theme/topic line (use `•` as separator)  | "AI workflows • 2025 reflections • 2026 predictions" |
| `venue`              | Venue name (bold)                        | "BAKER&SPICE"                                        |
| `location`           | Full address (use `%0A` for line breaks) | Wheelock Square full address                         |
| `showQr`             | Show QR code overlay                     | "true" (set "false" to hide)                         |
| `qrCodeSrc`          | QR code image URL (must be public)       | Default from Vercel Blob                             |
| `backgroundImageSrc` | Background photo URL                     | Stock coffee shop photo (auto)                       |

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
