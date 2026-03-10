---
name: huodongxing-create-event
description: Create and manage events on huodongxing.com via browser automation. Use when Ching needs to create a new AI Breakfast event or update an existing one.
argument-hint: "[event number and details, e.g. '#39 theme: LLM tools']"
user-invocable: true
allowed-tools:
  - Bash
  - Read
  - Glob
  - Write
---

# Huodongxing Event Creator

Create and manage AI Breakfast events on huodongxing.com using `agent-browser` (Playwright-based browser automation).

## Prerequisites

- `agent-browser` must be installed
- User must log in manually (WeChat QR or SMS verification) — use `--headed` mode
- Poster images should already be generated (see event-poster-website skill or manual process)
- Images stored in `~/Projects/youngchingjui/ai-breakfast/events/2026/ai-breakfast-{NUM}/images/graphics/`

## Important: Huodongxing UI Quirks

These are critical lessons learned from browser automation on this site:

### 1. Element UI Components (NOT standard HTML)

Huodongxing uses **Vue + Element UI**. Dropdowns, date pickers, and time pickers are NOT standard `<select>` or `<input>` elements. You cannot use `agent-browser fill` or `agent-browser select` on them.

**Pattern for all Element UI dropdowns:**

```bash
# 1. Click the combobox to open the dropdown
agent-browser find text "placeholder text" click

# 2. Find the visible dropdown and click the option via JS eval
agent-browser eval 'var items = Array.from(document.querySelectorAll(".el-select-dropdown")).filter(function(d) { return d.offsetHeight > 0; })[0].querySelectorAll(".el-select-dropdown__item span"); var target = Array.from(items).find(function(s) { return s.textContent === "TARGET_VALUE"; }); if (target) { target.click(); "clicked"; } else { "not found"; }'
```

### 2. Date Pickers

Date pickers are Element UI `el-date-editor` components. To change dates:

```bash
# Click the date input (use the combobox ref from snapshot)
agent-browser click @e37  # start date combobox

# The date picker popup appears. Click on specific day cells.
# Or use JS to set the value directly:
agent-browser eval 'var inputs = document.querySelectorAll(".el-date-editor .el-input__inner"); inputs[0].value = "2026-03-12"; inputs[0].dispatchEvent(new Event("input", {bubbles: true})); inputs[0].dispatchEvent(new Event("change", {bubbles: true}));'
```

**Gotcha:** The click-based approach on day cells works more reliably than setting values directly. Navigate months with the arrow buttons in the picker popup.

### 3. Time Pickers

Time fields are Element UI select dropdowns showing times in 30-min increments (00:00, 00:30, 01:00, ..., 23:30).

```bash
# Click the time combobox (identify by position — after the date picker on same row)
agent-browser click @e38  # start time

# Select time from the visible dropdown
agent-browser eval 'var items = Array.from(document.querySelectorAll(".el-select-dropdown")).filter(function(d) { return d.offsetHeight > 0; })[0].querySelectorAll(".el-select-dropdown__item span"); var target = Array.from(items).find(function(s) { return s.textContent === "09:00"; }); if (target) { target.click(); "clicked"; } else { "not found"; }'
```

**Gotcha:** There are ~9 comboboxes on the page. Use `agent-browser eval` to map them by position (y-coordinate) and content to identify which is which. The layout is:

- Row 1 (y~385): start date, start time, [event type dropdown], [country], [province]
- Row 2 (y~437): end date, end time, [city/district]

### 4. Smart Quote Corruption in `agent-browser eval`

When passing JavaScript to `agent-browser eval`, **straight quotes can get converted to curly/smart quotes** by the shell or tool, causing `SyntaxError: Invalid or unexpected token`.

**Workarounds:**

- Use single quotes for the outer shell string, double quotes inside JS
- Use Unicode escapes for Chinese characters: `"\u4e0a\u6d77"` instead of `"上海"`
- For complex JS, test simple expressions first

### 5. Chinese Websites Open New Tabs

Links on huodongxing frequently use `target="_blank"`. **Always run `agent-browser tab` after clicking any link** to check for new tabs and switch to them.

### 6. TinyMCE Rich Text Editor (活动详情)

The event details section uses **TinyMCE** (not UEditor as some Chinese sites do). The global `tinymce` object is available.

```bash
# Check if TinyMCE is loaded
agent-browser eval "typeof tinymce"  # should return "object"

# Set content
agent-browser eval "var editor = document.querySelector('.tinymce-wrap.mce-content-body'); editor.innerHTML = '<h2>Title</h2><p>Content</p>'; 'done'"

# IMPORTANT: After setting content via innerHTML, sync with TinyMCE:
agent-browser eval "tinymce.activeEditor.save(); 'saved'"

# Get current content
agent-browser eval "tinymce.activeEditor.getContent().substring(0, 200)"
```

**Image upload in TinyMCE:**

1. Click the 图片 (image) button in the toolbar
2. An upload dialog appears with a "+" button and hidden `<input type="file">`
3. There are 2 hidden file inputs on the page — index [0] is for banner, index [1] is for TinyMCE
4. Set an ID on the right one, then use `agent-browser upload`:

```bash
agent-browser eval 'var input = document.querySelectorAll("input[type=file]")[1]; input.id = "poster-upload-input"; "set id"'
agent-browser upload "#poster-upload-input" "/path/to/poster-no-qr.png"
# Then click 上传 button in the dialog to confirm
```

**Gotcha:** Use the poster WITHOUT QR code for huodongxing (huodongxing generates its own QR codes). The poster WITH QR is for sharing on social media.

**Gotcha:** The uploaded poster image renders very large in the TinyMCE editor (full 1080px width). After inserting it, you'll need **much larger scroll distances** (3000-5000px) to scroll past it and reach the ticket/submission sections below.

### 7. Banner Image Upload

The banner slot accepts 1080x640px images (jpg or png, max 4MB).

```bash
# The first hidden file input is for the banner
agent-browser eval 'var input = document.querySelectorAll("input[type=file]")[0]; input.id = "banner-upload-input"; "set id"'
agent-browser upload "#banner-upload-input" "/path/to/banner-1080x640.png"
```

### 8. Ticket Type (活动票种) — REQUIRED

You **must** configure at least one ticket type or submission will fail with an error. The default form shows a "总名额" (total capacity) field set to 500, but you must explicitly click "免费票" (Free Ticket) to add a ticket type.

```bash
# Click the 免费票 button to add a free ticket
agent-browser find role button click --name "免费票"  # or use ref from snapshot

# Set capacity to 25 (our standard limit)
# The ticket form will appear — find the capacity input and set it
agent-browser snapshot -i  # find the capacity/名额 input
# Fill the capacity field (look for input near 总名额)
```

**Standard settings:** Free ticket, 25 attendees max.

### 9. Form Submission Behavior

After clicking "创建活动" (Create Event), **the page stays on the create form**. It may show an error toast if validation fails (e.g., missing ticket type). If successful, the page stays but the event IS created — verify by checking the listings page at `https://www.huodongxing.com/console/eventadmin`.

### 10. Miniprogram-Created Events

Events created via the WeChat miniprogram **cannot be fully edited in the browser**. The browser redirects or shows limited editing. If you need full browser control, create events via the browser from the start.

### 11. `agent-browser click @ref` Sometimes Fails

Element UI components can cause `Failed to read: Resource temporarily unavailable (os error 35)` errors with ref-based clicks. **Workaround:** Use `agent-browser find text "..." click` or `agent-browser eval` with direct DOM manipulation instead.

## Step-by-Step: Create a New Event

### 1. Login

```bash
agent-browser --headed open https://www.huodongxing.com/login
# Wait for user to log in via WeChat QR or SMS
# After login, verify:
agent-browser get url  # should show logged-in state
```

### 2. Navigate to Create Page

```bash
agent-browser open https://www.huodongxing.com/createv3#/
```

The page loads with the "标准模板" (Standard Template) selected by default. This is the correct template.

### 3. Fill Title

```bash
agent-browser snapshot -i  # get refs
agent-browser fill @e34 "AI Breakfast #XX"  # title textbox
```

### 4. Upload Banner

```bash
agent-browser eval 'var input = document.querySelectorAll("input[type=file]")[0]; input.id = "banner-upload-input"; "set id"'
agent-browser upload "#banner-upload-input" "~/Projects/youngchingjui/ai-breakfast/events/2026/ai-breakfast-XX/images/graphics/banner-1080x640.png"
# Wait for upload to process
agent-browser wait 2000
```

### 5. Set Date and Time

```bash
# Snapshot to identify combobox refs
agent-browser snapshot -i | grep combobox

# Start date — click the first date combobox and navigate the date picker
agent-browser click @e37

# Start time — click time combobox, select from dropdown
agent-browser click @e38
agent-browser eval 'var items = Array.from(document.querySelectorAll(".el-select-dropdown")).filter(function(d) { return d.offsetHeight > 0; })[0].querySelectorAll(".el-select-dropdown__item span"); var target = Array.from(items).find(function(s) { return s.textContent === "09:00"; }); if (target) { target.click(); "clicked"; } else { "not found"; }'

# End date — click the second date combobox
agent-browser click @e39

# End time
agent-browser click @e40
agent-browser eval 'var items = Array.from(document.querySelectorAll(".el-select-dropdown")).filter(function(d) { return d.offsetHeight > 0; })[0].querySelectorAll(".el-select-dropdown__item span"); var target = Array.from(items).find(function(s) { return s.textContent === "10:30"; }); if (target) { target.click(); "clicked"; } else { "not found"; }'
```

**Note:** Combobox refs may shift between sessions. Always `snapshot -i` first and identify by position/context.

### 6. Set Location

```bash
# Province: click placeholder text, then select from dropdown
agent-browser find text "\u7701\u4efd/\u76f4\u8f96\u5e02" click  # 省份/直辖市
agent-browser eval 'var items = Array.from(document.querySelectorAll(".el-select-dropdown")).filter(function(d) { return d.offsetHeight > 0 && d.textContent.indexOf("\u5317\u4eac") > -1; })[0].querySelectorAll(".el-select-dropdown__item span"); var target = Array.from(items).find(function(s) { return s.textContent === "\u4e0a\u6d77"; }); if (target) { target.click(); "clicked"; } else { "not found"; }'

# City/District
agent-browser find text "\u57ce\u5e02/\u5730\u533a" click  # 城市/地区
agent-browser eval 'var items = Array.from(document.querySelectorAll(".el-select-dropdown")).filter(function(d) { return d.offsetHeight > 0 && d.textContent.indexOf("\u9759\u5b89") > -1; })[0].querySelectorAll(".el-select-dropdown__item span"); var target = Array.from(items).find(function(s) { return s.textContent === "\u9759\u5b89"; }); if (target) { target.click(); "clicked"; } else { "not found"; }'

# Address (standard textbox — agent-browser fill works here)
agent-browser fill @e46 "BAKER&SPICE \u5357\u4eac\u897f\u8def1717\u53f7 \u4f1a\u5fb7\u4e30\u56fd\u9645\u5e7f\u573a\u5357\u9662\u9996\u5c42101\u53f7\u5546\u94fa"
```

**AI Breakfast default location:** BAKER&SPICE, 静安区 (Jing'an), 南京西路 1717 号 会德丰国际广场南院首层 101 号商铺

### 7. Fill Event Highlights (活动亮点)

Max **150 characters**. Keep it bilingual and concise.

```bash
agent-browser fill @e49 "上海每周AI早餐会。本周：[THEME_CN]。自由交流AI工具与应用。免费，欢迎参加！Weekly AI Breakfast: [THEME_EN]. Free, all welcome."
```

### 8. Fill Event Details (活动详情)

```bash
# Click into the editor area first to activate TinyMCE toolbar
agent-browser eval "var editor = document.querySelector('.tinymce-wrap.mce-content-body'); editor.focus(); editor.click(); 'focused'"

# Set HTML content
agent-browser eval "var editor = document.querySelector('.tinymce-wrap.mce-content-body'); editor.innerHTML = '<h2>AI Breakfast #XX</h2><p>Weekly AI Breakfast meetup in Shanghai</p><p><strong>Theme:</strong> [THEME]</p><p><strong>Date:</strong> Thursday, [DATE]</p><p><strong>Time:</strong> 9:00 - 10:30 AM</p><p><strong>Venue:</strong> BAKER&SPICE, Wheelock Square</p><p><strong>Address:</strong> \u5357\u4eac\u897f\u8def1717\u53f7 \u4f1a\u5fb7\u4e30\u56fd\u9645\u5e7f\u573a\u5357\u9662\u9996\u5c42101\u53f7\u5546\u94fa</p><br/><p>[DESCRIPTION_EN]</p><p>Free event. All welcome!</p><hr/><p>\u6bcf\u5468AI\u65e9\u9910\u4f1a #XX</p><p>\u672c\u5468\u4e3b\u9898\uff1a[THEME_CN]</p><p>\u514d\u8d39\u6d3b\u52a8\uff0c\u6b22\u8fce\u53c2\u52a0\uff01</p>'; 'done'"

# Upload poster image into the details
agent-browser find role button click --name "\u56fe\u7247"  # 图片 button in toolbar
agent-browser wait 1000
agent-browser eval 'var input = document.querySelectorAll("input[type=file]")[1]; input.id = "poster-upload-input"; "set id"'
agent-browser upload "#poster-upload-input" "~/Projects/youngchingjui/ai-breakfast/events/2026/ai-breakfast-XX/images/graphics/poster-no-qr.png"
agent-browser wait 2000
# Click 上传 button in the upload dialog
agent-browser find role button click --name "\u4e0a\u4f20"  # 上传

# Restructure: put image first, then text
agent-browser eval "var editor = document.querySelector('.tinymce-wrap.mce-content-body'); var img = editor.querySelector('img'); var imgHtml = img ? img.outerHTML : ''; editor.innerHTML = imgHtml + '<br/>' + '[REST_OF_HTML]'; 'restructured'"

# Sync TinyMCE
agent-browser eval "tinymce.activeEditor.save(); 'saved'"
```

### 9. Set Ticket Type (REQUIRED)

**This step is mandatory — submission will fail without it.**

```bash
# Scroll down to the 活动票种 section
agent-browser scroll down 500

# Click 免费票 (Free Ticket) button
agent-browser snapshot -i  # find the 免费票 button ref
agent-browser find role button click --name "免费票"

# A ticket form appears. Set the capacity to 25.
# Find the 总名额 (total capacity) input — default is 500, change to 25
agent-browser snapshot -i  # find capacity input
# The capacity input is usually near the ticket form that just appeared
# Fill it with 25 (our standard attendee limit)
```

**Standard:** Free ticket, 25 max attendees.

### 10. Accept Agreement and Submit

```bash
# Scroll to bottom
agent-browser scroll down 3000

# Check the agreement checkbox
agent-browser find text "\u5df2\u9605\u8bfb\u5e76\u540c\u610f" click  # 已阅读并同意

# Submit
agent-browser snapshot -i | grep "\u521b\u5efa\u6d3b\u52a8"  # find 创建活动 button ref
agent-browser click @e69  # or whatever ref the button has

# Wait and verify — page stays on create form, but event is created
agent-browser wait 3000
```

### 11. Verify Creation

```bash
agent-browser open https://www.huodongxing.com/console/eventadmin
agent-browser screenshot /tmp/hdx-verify.png
# Event should appear at top of list in 草稿 (draft) status
```

## File Organization

Generated images are stored at:

```
~/Projects/youngchingjui/ai-breakfast/events/2026/ai-breakfast-{NUM}/images/
├── graphics/
│   ├── banner-1080x640.png      # For huodongxing banner slot
│   ├── poster-no-qr.png         # For huodongxing 活动详情 + social sharing
│   └── poster-with-qr.png       # For WeChat/social sharing (has QR code)
└── qr-codes/
    └── wechat-mini-program.png   # Downloaded via huodongxing-qr skill
```

## Poster Generation

Use the event-poster-website (local or deployed):

```bash
# Start locally
cd ~/Projects/youngchingjui/event-poster-website && bun dev

# Generate poster (1080x1920)
curl -s -o poster.png "http://localhost:3000/api/og-poster?eventName=AI+Breakfast+%23XX&city=Shanghai&date=Thursday,+Mar+12&time=9:00+%E2%80%93+10:30+AM&tagline=THEME&venue=BAKER%26SPICE&location=Wheelock+Square&showQr=false"

# Generate banner (1080x640) — NOTE: include the default stock background image for a nicer look
# The backgroundImageSrc param defaults to the stock image from Vercel Blob, so just omit it
# or explicitly pass it if the default isn't working:
curl -s -o banner.png "http://localhost:3000/api/og-banner?width=1080&height=640&eventName=AI+Breakfast+%23XX&city=Shanghai&date=Thursday,+Mar+12&time=9:00+%E2%80%93+10:30+AM&tagline=THEME&venue=BAKER%26SPICE&location=Wheelock+Square"
# The API automatically includes the stock background photo (luisa-fournier-hMjyyBqCRIs-unsplash.jpg)
# If it's not showing, explicitly add: &backgroundImageSrc=URL_TO_STOCK_IMAGE

# For poster with QR, upload QR to Vercel Blob first, then add &showQr=true&qrCodeSrc=ENCODED_BLOB_URL
```

## Troubleshooting

- **Element UI dropdown won't open:** Use `agent-browser find text "..." click` instead of ref-based click. Or use `eval` with direct DOM `.click()`.
- **`Resource temporarily unavailable (os error 35)`:** Retry after a short wait, or use `find text` / `eval` approach instead of ref.
- **Smart quotes in eval:** Use `agent-browser eval` with single-quote shell wrapping and double quotes inside JS. Use `\uXXXX` for Chinese characters.
- **Content not saving:** Always call `tinymce.activeEditor.save()` after modifying editor innerHTML.
- **Event created but page didn't change:** This is normal. Check listings page to confirm.
- **Can't edit miniprogram event:** Events created in WeChat miniprogram have limited browser editability. Create new events via browser instead.
- **Wrong district:** BAKER&SPICE Wheelock Square is in 静安 (Jing'an), NOT 徐汇 (Xuhui).
