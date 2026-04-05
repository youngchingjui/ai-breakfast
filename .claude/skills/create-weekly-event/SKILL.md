---
name: create-weekly-event
description: End-to-end creation of a weekly AI Breakfast event — creates the listing on huodongxing, generates all assets (QR, posters, banner), and finalizes the event. Use when setting up the next AI Breakfast event.
argument-hint: "[event number, date, and theme, e.g. '#39 Mar 20 theme: LLM tools']"
user-invocable: true
allowed-tools:
  - Bash
  - Read
  - Write
  - Glob
  - Grep
---

# Create Weekly AI Breakfast Event

Orchestrates the full end-to-end flow for setting up a new AI Breakfast event. The order matters due to a **critical huodongxing server bug** (see warning below).

## Phase Order

1. **Create skeleton event on huodongxing** (`huodongxing-create-event`) — just title, date, ticket type
2. **Start poster dev server + continue editing event** — use the wait time productively
3. **Download QR code** (`huodongxing-qr`) — only after ~10 min have passed since event creation
4. **Generate posters & banner** (`generate-posters`) — now that QR is available
5. **Finalize event on huodongxing** — upload banner, poster, description

Read each sub-skill's SKILL.md for detailed instructions. This skill provides the overall flow and timing.

---

## CRITICAL: Huodongxing QR Code Bug

**After creating a new event, you MUST wait ~10 minutes before downloading the QR code.**

Huodongxing's server needs time to generate the WeChat mini-program QR code after event creation. If you request the QR code too soon:

- It triggers a server-side bug
- The QR code becomes **permanently unavailable** for that event
- There is no fix — the event's QR is broken forever

**Strategy:** Create the event skeleton first, then do other work (start dev server, prepare poster params, edit event details) while the server catches up. Download QR only after sufficient time has passed.

---

## Inputs Needed

Before starting, confirm with Ching:

- **Event number** — check the most recent event folder in `events/` to determine the next number
- **Date** — AI Breakfast is typically on Thursdays
- **Theme/tagline** — what topics or format this week

For defaults (time, venue, location, capacity), check `.claude/skills/PREFERENCES.md` in the project root. These occasionally change.

---

## Phase 1: Create Skeleton Event on Huodongxing

**Skill:** `huodongxing-create-event`

**Goal:** Get the event created ASAP so the QR code generation clock starts ticking.

```bash
# Open browser in headed mode for login
agent-browser --headed open https://www.huodongxing.com/login
# Wait for Ching to log in (WeChat QR or SMS)

# Navigate to create page
agent-browser open https://www.huodongxing.com/createv3#/
```

Fill the **minimum required fields** to submit:

1. Title: "AI Breakfast #NUM"
2. Date and time (start: 09:00, end: 10:30)
3. Ticket type: 免费票, 25 attendees (**required or submission fails**)
4. Accept agreement checkbox
5. Submit

**Don't bother with** banner, location, description, or highlights yet — we'll add those in Phase 5. The goal is just to get the event created so the server starts generating the QR code.

After submission, note the **event ID** from the listings page (`https://www.huodongxing.com/console/eventadmin`). You'll need it for the QR download.

**Record the time** when the event was created. You need to wait ~10 minutes from this point.

---

## Phase 2: Start Poster Dev Server + Continue Editing

While waiting for the QR code to become available, use the time productively:

### 2a. Start the event-poster-website dev server

```bash
cd ~/Projects/youngchingjui/event-poster-website && bun dev &
# Wait for "Ready" message
```

### 2b. Create output directories

```bash
EVENT_NUM=XX
mkdir -p ~/Projects/youngchingjui/ai-breakfast/events/2026/ai-breakfast-${EVENT_NUM}/images/qr-codes
mkdir -p ~/Projects/youngchingjui/ai-breakfast/events/2026/ai-breakfast-${EVENT_NUM}/images/graphics
```

### 2c. Generate banner and poster without QR

Use the `generate-posters` skill. Check the most recent event's posters for current parameter values (time, tagline, venue, etc.).

### 2d. Go back to huodongxing and fill in remaining event details

While still waiting for QR, navigate to the event edit page and fill in:

- Location: 上海 > 静安, full address
- 活动亮点 (150 char max, bilingual)
- 活动详情 (TinyMCE — insert poster-no-qr image + text description)
- Upload banner to the banner slot

Follow the `huodongxing-create-event` skill for all Element UI quirks and TinyMCE instructions.

---

## Phase 3: Download QR Code

**Skill:** `huodongxing-qr`

**Only proceed once ~10 minutes have passed since event creation in Phase 1.**

First, determine the CDN date prefix. For newly created events, check the promote page:

```bash
# Navigate to event's promote page
agent-browser open "https://www.huodongxing.com/myevent/promote?id=EVENT_ID&tab=0"
# Check for new tabs!
agent-browser tab

# Find the QR code image URL to extract the YYYYMM prefix
agent-browser eval "Array.from(document.querySelectorAll('img')).filter(i => i.alt === '小程序二维码').map(i => i.src)"
```

Then download:

```bash
curl -sf -H "Referer: https://www.huodongxing.com/" \
  -o ~/Projects/youngchingjui/ai-breakfast/events/2026/ai-breakfast-${EVENT_NUM}/images/qr-codes/wechat-mini-program.png \
  "https://cdn.huodongxing.com/logo/YYYYMM/EVENT_ID/promoteMini.png"

# VERIFY before proceeding — this is critical
file ~/Projects/youngchingjui/ai-breakfast/events/2026/ai-breakfast-${EVENT_NUM}/images/qr-codes/wechat-mini-program.png
# MUST show: PNG image data, 400 x 400, 8-bit/color RGBA
# If it shows 1KB or HTML, the QR isn't ready yet — wait longer and retry
```

**If the file is ~1KB or doesn't open as an image, STOP. Wait a few more minutes and try again. Do NOT keep retrying rapidly — that may trigger the permanent bug.**

---

## Phase 4: Generate Poster WITH QR

**Skill:** `generate-posters`

Now that the QR is downloaded, generate the poster with QR using the `generate-posters` skill. The QR code needs to be served at a public URL — either upload to Vercel Blob via the app's `/api/upload` endpoint, or copy to the poster website's `public/` directory and reference via `http://localhost:3000/filename.png`.

---

## Phase 5: Finalize & Verify

### 5a. Verify all images

```bash
file "${DEST}"/*.png
# banner: PNG image data, 1080 x 640
# posters: PNG image data, 1080 x 1920

open "${DEST}"/*.png  # Visual check
```

### 5b. Confirm event on huodongxing

```bash
agent-browser open https://www.huodongxing.com/console/eventadmin
agent-browser screenshot /tmp/hdx-verify.png
```

Event should appear in the listings with all details filled in.

---

## Output Checklist

- [ ] Event created on huodongxing (with banner, description, location, ticket type)
- [ ] QR code: `events/2026/ai-breakfast-NUM/images/qr-codes/wechat-mini-program.png`
- [ ] Banner: `events/2026/ai-breakfast-NUM/images/graphics/banner-1080x640.png`
- [ ] Poster (no QR): `events/2026/ai-breakfast-NUM/images/graphics/poster-no-qr.png`
- [ ] Poster (with QR): `events/2026/ai-breakfast-NUM/images/graphics/poster-with-qr.png`
- [ ] Share poster-with-qr.png with Ching for WeChat/social distribution

## Notes

- The poster-with-qr is the primary asset Ching shares on WeChat Moments and group chats.
- The poster-no-qr goes into huodongxing's 活动详情 section (huodongxing adds its own QR).
- The banner goes into huodongxing's banner/header slot (1080x640).
- If events were pre-created via the WeChat miniprogram, skip Phase 1 but still respect the QR timing — check when the event was created before downloading.
