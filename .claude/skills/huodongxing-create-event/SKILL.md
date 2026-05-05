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
- Banner and posters generated via `generate-posters` skill — stored in `~/Projects/youngchingjui/ai-breakfast/events/2026/ai-breakfast-{NUM}/images/graphics/`
- Banner slot accepts **1080×640** jpg/png, max 4MB
- Defaults (venue, time, capacity, highlights format) live in `.claude/skills/PREFERENCES.md` — check before filling per-event fields
- Always use `--session hdx` so state persists across commands

## ⚠️ Meta: Keep this skill alive

Huodongxing's UI changes silently. **Every time you run this skill, watch for behavior that doesn't match these instructions** — new validation rules, refs that shift, toasts that flash and disappear, fields that don't carry over between pages. When you finish the workflow, **report any new quirks you encountered to Ching at the end** so this SKILL.md can be updated. The skill is only as good as the last person who maintained it.

In particular, set up the toast watcher (next section) at the start of every session — it's the single highest-value debugging tool for this site.

---

## 🔍 Catching Silent Toasts (THE debugging tool)

Huodongxing fires `el-message` error toasts for ~1 second then removes them from the DOM. Screenshots almost always miss them. When a button click "does nothing," the page is usually telling you why — but the message is gone before you can capture it.

**Set up a MutationObserver right after every `agent-browser open`** (the observer is lost on navigation):

```bash
agent-browser --session hdx eval 'window._toastLog = []; var observer = new MutationObserver(function(muts){muts.forEach(function(m){m.addedNodes.forEach(function(n){if(n.nodeType===1 && (n.classList?.contains("el-message") || n.classList?.contains("el-notification") || n.querySelector?.(".el-message__content"))){window._toastLog.push({time:Date.now(),text:(n.textContent||"").trim().substring(0,200),class:n.className})}})})}); observer.observe(document.body, {childList:true, subtree:true}); window._toastObserver = observer; "watching"'
```

After any action that "didn't work," check the log:

```bash
agent-browser --session hdx eval 'JSON.stringify(window._toastLog)'
```

---

## ⚡ Validation Order (Create Page) — THE rule

The create form enforces field order at validation time. Clicking 免费票 or 创建活动 silently triggers validation on EARLIER fields and aborts the action. **Fill in this exact order:**

1. Title
2. Banner upload (mandatory — toast: `请上传活动海报`)
3. Date & time
4. Address: province → city → detailed address (toast: `请设置活动举办地址`)
5. 活动详情 / TinyMCE content (toast: `请填写活动详情`)
6. Click 免费票 → drawer opens, set quantity, click 保存
7. Tick agreement checkbox
8. Click 创建活动

If a click silently fails, check `window._toastLog` for the actual reason.

---

## Happy Path: Create a New Event

### 1. Login

```bash
agent-browser --session hdx --headed open https://www.huodongxing.com/login
# Wait for user to log in via WeChat QR or SMS
agent-browser --session hdx get url  # verify logged-in state
```

### 2. Open the create page + start toast watcher

```bash
agent-browser --session hdx open "https://www.huodongxing.com/createv3#/"
# Then re-register the toast watcher (see "Catching Silent Toasts" above)
```

The "标准模板" (Standard Template) is selected by default — leave it.

### 3. Fill title

```bash
agent-browser --session hdx snapshot -i  # find the title textbox ref
agent-browser --session hdx fill @e35 "AI Breakfast #XX"
```

### 4. Upload banner (mandatory)

```bash
agent-browser --session hdx eval 'document.querySelectorAll("input[type=file]")[0].id = "banner-upload-input"; "set"'
agent-browser --session hdx upload "#banner-upload-input" "/path/to/banner-1080x640.png"
agent-browser --session hdx wait 3000
# A crop dialog appears — confirm:
agent-browser --session hdx eval 'var b = Array.from(document.querySelectorAll("button")).find(function(x){return x.textContent.trim() === "确认" && x.offsetHeight > 0}); if(b){b.click();"clicked"}else"not found"'
```

The crop dialog may default to a smaller region than 1080×640 (e.g. 972×576). Verify the cropped output matches the design or adjust the crop handles.

### 5. Set date and time

Check `.claude/skills/PREFERENCES.md` for the canonical start/end time. Date pickers are `el-date-editor` text inputs — set values directly:

```bash
agent-browser --session hdx eval 'var inputs = document.querySelectorAll(".el-date-editor input"); ["2026-05-07","2026-05-07"].forEach(function(d,i){inputs[i].value = d; inputs[i].dispatchEvent(new Event("input",{bubbles:true})); inputs[i].dispatchEvent(new Event("change",{bubbles:true}))}); "set"'
```

If the direct-set approach is rejected (rare), fall back to clicking day cells in the picker popup — that path is more tolerant of validation. Navigate months with the arrow buttons in the popup.

Times use Element UI selects — open by `.el-select` index, click the option (see "Element UI Selects" pattern below). Index 1 = start time, index 2 = end time. **Ref-based access (`@e37`, `@e38`) shifts between sessions** — always re-`snapshot -i` or use the index pattern.

### 6. Set address

Province (index 5) → city (index 6) → detailed address textbox. Use the `.el-select` index pattern. Address textbox accepts plain `inp.value = ...; dispatchEvent("input")`.

**Note:** BAKER&SPICE Wheelock Square is in 静安 (Jing'an).

### 7. Fill highlights (活动亮点)

Plain `<textarea>`, max **150 chars**, bilingual. Find by placeholder `请简要概述活动亮点...`. See `.claude/skills/PREFERENCES.md` and recent events for the typical phrasing.

### 8. Fill 活动详情 (TinyMCE)

The create page uses TinyMCE; the edit page uses UEditor. If unsure which is loaded:

```bash
agent-browser --session hdx eval 'typeof tinymce !== "undefined" ? "tinymce" : typeof UE !== "undefined" ? "UEditor" : "unknown"'
```

Build the HTML with: event title, date/time, venue, address, agenda/theme (bilingual), and a "free event" note. Then set and save:

```bash
agent-browser --session hdx eval 'var html = "<h2>...</h2><p>...</p>"; document.querySelector(".tinymce-wrap.mce-content-body").innerHTML = html; tinymce.activeEditor.save(); "saved, len:" + tinymce.activeEditor.getContent().length'
```

**Use literal Unicode characters** (`·`, `–`, `—`, `'`, `"`) in HTML, not entity references — UEditor on the edit page double-escapes `&middot;` → `&amp;middot;`.

For inserting the poster image, see "UEditor Image Insertion" under Edit Page Differences. On the create page TinyMCE has its own image upload but the simpler pattern is to set `innerHTML` with an `<img src="...vercel-blob...">` directly. As a fallback, the click-driven dialog flow also works: click the 图片 toolbar button → an upload dialog appears with a "+" and a hidden `<input type="file">` (index `[1]` of all file inputs on the page) → set an `id` on it, `agent-browser upload`, then click 上传 (scope by `button.el-button--success` to disambiguate from the banner upload button — see "File uploads" below).

### 9. Add free ticket via drawer

Clicking 免费票 opens a side drawer (`.ticket-drawer` inside `.el-overlay`):

```bash
agent-browser --session hdx eval 'document.querySelectorAll(".ticket-form .btn-group button")[0].click(); "clicked"'
agent-browser --session hdx wait 1500

# Drawer inputs: [0]=name, [1]=quantity, [2]=needs-review checkbox
agent-browser --session hdx eval 'var inp = document.querySelectorAll(".ticket-drawer input")[1]; inp.focus(); inp.value = "25"; inp.dispatchEvent(new Event("input",{bubbles:true})); inp.dispatchEvent(new Event("change",{bubbles:true})); inp.value'

agent-browser --session hdx eval 'var btn = Array.from(document.querySelectorAll(".ticket-drawer button")).find(function(b){return b.textContent.trim() === "保存"}); btn.click(); "saved"'
```

Verify the placeholder is gone:

```bash
agent-browser --session hdx eval 'Array.from(document.querySelectorAll("*")).find(function(el){return el.textContent.trim() === "暂无票种"}) ? "still empty" : "ticket added"'
```

**Standard:** free ticket, 25 max attendees (see `.claude/skills/PREFERENCES.md`). **Also set the master 总名额 input to 25** (default is 500) — it's a separate cap from the ticket-type quantity. The listing page shows whichever is larger.

### 10. Accept agreement and submit

The agreement checkbox **toggles** when clicked — verify state first:

```bash
agent-browser --session hdx eval 'document.querySelector(".el-checkbox.is-checked") ? "checked" : "not checked"'
# Only click if "not checked":
agent-browser --session hdx find text "已阅读并同意" click
```

Then submit:

```bash
agent-browser --session hdx eval 'var b = Array.from(document.querySelectorAll("button")).find(function(x){return x.textContent.trim()==="创建活动"}); b.click(); "submitted"'
agent-browser --session hdx wait 5000
agent-browser --session hdx get url
# On success: https://www.huodongxing.com/myevent/home?id=NEW_EVENT_ID
```

If the URL didn't change, check `window._toastLog`. As a fallback verification, open the listings page to confirm the new event appears at the top:

```bash
agent-browser --session hdx open https://www.huodongxing.com/console/eventadmin
agent-browser --session hdx screenshot /tmp/hdx-verify.png
```

---

## Form Interaction Patterns

### Element UI selects (the reliable way)

Element UI dropdowns are NOT real `<select>` elements. The reliable pattern is the **index method**:

```bash
# 1. Map all selects on the page to find which index is which
agent-browser --session hdx eval 'Array.from(document.querySelectorAll(".el-select")).map(function(s,i){return i+":"+s.textContent.trim().substring(0,30)}).join("|")'
# Output: "0:公开发布|1:09:00|2:18:00|3:线下场地举办|4:中国|5:省份/直辖市|6:城市/地区"

# 2. Open the dropdown by index
agent-browser --session hdx eval 'document.querySelectorAll(".el-select")[6].querySelector("input").click(); "clicked"'
agent-browser --session hdx wait 500

# 3. Click the option from the visible dropdown (use \uXXXX for Chinese)
agent-browser --session hdx eval 'var dd = Array.from(document.querySelectorAll(".el-select-dropdown")).filter(function(d){return d.offsetHeight > 0})[0]; var spans = dd.querySelectorAll(".el-select-dropdown__item span"); var t = Array.from(spans).find(function(s){return s.textContent.trim() === "静安"}); if(t){t.click();"clicked"}else{"not found"}'
```

**Layout reference for the create-page row of selects:**

- Row 1 (y~385): start date · start time · event type · country · province
- Row 2 (y~437): end date · end time · city/district

### File uploads

Two hidden file inputs on the create page: `[0]` = banner, `[1]` = TinyMCE image. Tag the right one with an ID and use `agent-browser upload`:

```bash
agent-browser --session hdx eval 'document.querySelectorAll("input[type=file]")[1].id = "poster-upload-input"; "set"'
agent-browser --session hdx upload "#poster-upload-input" "/path/to/poster-no-qr.png"
```

The "上传" button label is **ambiguous** (banner vs. TinyMCE dialog both use it). `find role button click --name "上传"` fails with strict-mode violation — use eval to scope by class:

```bash
agent-browser --session hdx eval 'var btns = Array.from(document.querySelectorAll("button.el-button--success")); var btn = btns.find(function(b){return b.textContent.trim() === "上传"}); if(btn){btn.click();"clicked"}else{"not found"}'
```

### Click handlers that won't fire

If `agent-browser click @ref` returns success but nothing happens, possible causes (in order):

1. **Silent validation toast** — check `window._toastLog`
2. **Button is below viewport** — `agent-browser eval 'el.scrollIntoView({block:"center"})'` then click
3. **`os error 35`** — retry, or fall back to `find text` / direct DOM `.click()`
4. **Last resort:** Vue data manipulation via `el.__vue__.$parent` chain + `$forceUpdate()`

### Smart-quote corruption in `eval`

Shell can mangle straight quotes into curly quotes inside JS strings, causing `SyntaxError`. Workarounds:

- Single-quote the outer shell string, double-quote inside JS
- Use `\uXXXX` Unicode escapes for Chinese chars instead of literals
- For complex JS, test simple expressions first

### Links open in new tabs

Many huodongxing links use `target="_blank"`. After clicking any link, run `agent-browser --session hdx tab` to check for new tabs and switch into the right one before continuing.

---

## Edit Page Differences

The edit page (`/myevent/edit?id=XXX`) is a different React/Vue tree from the create page. Key differences:

| Aspect                | Create page                      | Edit page                             |
| --------------------- | -------------------------------- | ------------------------------------- |
| Country/province/city | Element UI `.el-select`          | **Vue Multiselect `.multiselect`**    |
| Rich-text editor      | TinyMCE (`tinymce.activeEditor`) | **UEditor (`UE.instants[...]`)**      |
| Date inputs           | `.el-date-editor`                | **flatpickr (`el.__vue__.$data.fp`)** |
| Save button           | "创建活动"                       | "保存活动信息" / "提交"               |
| Banner upload         | Crop dialog                      | No crop dialog                        |
| Layout                | Single scroll                    | Left sidebar nav                      |
| File inputs           | `[0]`=banner, `[1]`=TinyMCE      | `[0]`=banner only                     |

### Multiselect on edit page

```bash
agent-browser --session hdx eval 'var ms = document.querySelectorAll(".multiselect"); Array.from(ms).map(function(s,i){return i+":"+(s.querySelector("input")?.placeholder || "")+"|val:"+s.querySelector(".multiselect__single")?.textContent.trim()}).join("\n")'
```

The detailed-address textbox (placeholder `请先选择省市，然后输入详细地址`) is a regular text input.

### UEditor image insertion (Vercel Blob trick)

The `.edui-for-simpleupload` button does **not** respond to programmatic clicks. Workaround: upload the local PNG to a public URL, then `setContent` with an `<img>`:

```bash
# 1. Upload to Vercel Blob via the poster website's /api/upload (assumes bun dev is running)
curl -s -X POST -F "file=@/path/to/poster-no-qr.png" -F "filename=ai-breakfast-NUM-poster-no-qr.png" http://localhost:3000/api/upload
# Returns: {"url":"https://...vercel-storage.com/...png"}

# 2. Set UEditor content
agent-browser --session hdx eval 'var ed = UE.instants[Object.keys(UE.instants)[0]]; ed.setContent("<p style=\"text-align:center\"><img src=\"" + posterUrl + "\" style=\"max-width:100%\"/></p>" + existingHtml); "set"'
```

### Fields don't always carry over from create → edit

The detailed-address textbox came back **empty** on the edit page even though it was set on create (country/province/city DID persist). After every navigation between create/edit, re-verify all fields are populated.

### Flatpickr on edit page

```bash
# Access the flatpickr instance via Vue and set programmatically
agent-browser --session hdx eval 'el.__vue__.$data.fp.setDate("2026-04-09 08:00", true)'
```

### `node-Address` error on edit submit

The edit page sometimes throws `找不到对应ID的元素: node-Address` in the console, which silently blocks submission. Workaround: use the create page (`/createv3#/`) instead of editing.

### Miniprogram-created events can't be fully edited in browser

Events created in the WeChat miniprogram redirect or show a limited editor. Always create new events via the browser if you need full editability.

---

## After Submission: Get the QR Code

The QR code generation has a **~10-minute server-side delay**. See `huodongxing-qr` skill — but the rule is: don't request the QR before the 10-min mark, or the server marks it permanently broken.

After the wait:

```bash
agent-browser --session hdx open "https://www.huodongxing.com/myevent/promote?id=EVENT_ID&tab=0"
agent-browser --session hdx wait 3000
agent-browser --session hdx eval 'Array.from(document.querySelectorAll("img")).filter(function(i){return (i.src||"").includes("promoteMini")}).map(function(i){return i.src})'
# https://cdn.huodongxing.com/logo/YYYYMM/EVENT_ID/promoteMini.png

curl -sf -H "Referer: https://www.huodongxing.com/" -o /path/to/wechat-mini-program.png "https://cdn.huodongxing.com/logo/YYYYMM/EVENT_ID/promoteMini.png"
file /path/to/wechat-mini-program.png  # MUST be: PNG image data, 400 x 400
```

If the file is ~1KB or HTML, the QR isn't ready — wait longer, do NOT retry rapidly.

---

## File Organization

```
~/Projects/youngchingjui/ai-breakfast/events/2026/ai-breakfast-{NUM}/images/
├── graphics/
│   ├── banner-1080x640.png      # Huodongxing banner slot
│   ├── poster-no-qr.png         # Huodongxing 活动详情 + social sharing
│   └── poster-with-qr.png       # WeChat/social sharing
└── qr-codes/
    └── wechat-mini-program.png   # 400x400, downloaded after 10-min wait
```

Defaults (venue, time, capacity) are in `.claude/skills/PREFERENCES.md`. Poster generation lives in the `generate-posters` skill.

---

## Quick Troubleshooting

- **Click did nothing** → check `window._toastLog` first, then check button is in viewport
- **"暂无票种" still showing** → ticket drawer save didn't fire; re-do step 9
- **`os error 35`** → retry, or use `find text` / direct DOM `.click()` instead of `@ref`
- **Smart-quote SyntaxError in eval** → use `\uXXXX` escapes for Chinese
- **TinyMCE content not saving** → call `tinymce.activeEditor.save()` after setting `innerHTML`
- **Form submission stays on /createv3** → run through validation order checklist; check toast log
- **Wrong district** → BAKER&SPICE is 静安, not 徐汇
- **Listing shows wrong capacity** → set BOTH the master 总名额 AND the ticket drawer quantity to 25
