---
name: huodongxing-qr
description: Download WeChat mini-program QR codes from huodongxing.com for AI Breakfast events. Use when Ching needs QR codes for event posters or sharing.
argument-hint: "[event numbers, e.g. '32-38' or '40 41 42']"
user-invocable: true
allowed-tools:
  - Bash
  - Read
  - Glob
---

# Huodongxing QR Code Downloader

Download the circular WeChat mini-program QR codes (小程序二维码) for AI Breakfast events from huodongxing.com.

## How It Works

Each event on huodongxing has a unique event ID. The WeChat mini-program QR code is hosted on their CDN at:

```
https://cdn.huodongxing.com/logo/YYYYMM/EVENT_ID/promoteMini.png
```

- The `YYYYMM` prefix is based on when the event was **created** (not the event date). For events created in batch, they typically share the same prefix.
- A `Referer: https://www.huodongxing.com/` header is **required** or the CDN returns an error.
- The images are 400x400 PNG files with transparent background.

## Step-by-Step Process

### 1. Find Event IDs

If event IDs are not already known, use `agent-browser` (headed mode) to look them up:

```bash
# Open the browser for user to login (WeChat QR or SMS verification required)
agent-browser --headed open https://www.huodongxing.com/login

# After user confirms login, navigate to organizer console
agent-browser open https://www.huodongxing.com/console/eventadmin

# IMPORTANT: Chinese websites often open links in new tabs.
# Always check for new tabs after clicking:
agent-browser tab

# Extract event IDs from the event list page
agent-browser eval "Array.from(document.querySelectorAll('a')).filter(a => a.textContent.includes('AI Breakfast')).map(a => ({text: a.textContent.trim(), href: a.href})).filter((v,i,arr) => arr.findIndex(x => x.text === v.text) === i)"
```

The event ID is the numeric portion at the end of each event URL (e.g., `8851274990600` from `.../event/8851274990600`).

### 2. Determine the CDN Date Prefix

The QR code URL uses a `YYYYMM` prefix based on creation month. To find the correct prefix:

1. Navigate to any event's promote page: `https://www.huodongxing.com/myevent/promote?id=EVENT_ID&tab=0`
   (Note: clicking "推广活动" from the event list may open this in a new tab)
2. Find the image source:
   ```bash
   agent-browser eval "Array.from(document.querySelectorAll('img')).filter(i => i.alt === '小程序二维码').map(i => i.src)"
   ```
3. Extract the `YYYYMM` from the URL.

For events created in the same batch, they usually share the same prefix (e.g., all created in March 2026 use `202603`).

### 3. Download QR Codes

```bash
mkdir -p ~/Downloads/ai-breakfast-qrcodes

# Download with required Referer header
curl -sf -H "Referer: https://www.huodongxing.com/" \
  -o ~/Downloads/ai-breakfast-qrcodes/ai-breakfast-NUM.png \
  "https://cdn.huodongxing.com/logo/YYYYMM/EVENT_ID/promoteMini.png"
```

Download in batch for multiple events:

```bash
for pair in "32:8851274990600" "33:7851275092400" "34:2851275193500"; do
  NUM="${pair%%:*}"
  ID="${pair##*:}"
  curl -sf -H "Referer: https://www.huodongxing.com/" \
    -o ~/Downloads/ai-breakfast-qrcodes/ai-breakfast-${NUM}.png \
    "https://cdn.huodongxing.com/logo/YYYYMM/${ID}/promoteMini.png"
  echo "#${NUM} done"
done
```

## Troubleshooting

- **1KB file / doesn't open**: Missing `Referer` header. Always include `-H "Referer: https://www.huodongxing.com/"` with curl.
- **CDN 404**: Wrong `YYYYMM` prefix. Check the promote page to find the correct one.
- **Login required**: huodongxing uses SMS verification codes or WeChat QR scan. Open browser in `--headed` mode so the user can log in manually.
- **New tabs opening silently**: Always run `agent-browser tab` after clicking links — Chinese websites frequently use `target="_blank"`.
