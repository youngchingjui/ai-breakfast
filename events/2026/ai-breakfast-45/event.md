# AI Breakfast #45

- **Date:** Thursday, June 25, 2026
- **Time:** 8:00 – 10:00 AM
- **Venue:** Baker & Spice, Wheelock Square
- **Address:** 1717 West Nanjing Road, Wheelock Square, Jing'an
  - 南京西路 1717 号 会德丰国际广场南院首层 101 号商铺
- **City:** Shanghai
- **Venue hint:** Look for the long table in the back, past the grilling station.

## This Week's Demo

**Title:** Process stacking and workflow chaining
**Speaker:** Alex Gill — Lead Software Architect, Helio-Additive

## Agenda

- **8:00** — Intros
- **8:30** — Demo by Alex
- **9:00** — Open discussion

## Huodongxing

- **Event ID:** 4865756525400
- **Admin URL:** https://www.huodongxing.com/myevent/home?id=4865756525400
- **Public URL:** https://www.huodongxing.com/event/4865756525400
- **Short URL:** https://hdxu.cn/1JP4W
- **Created:** 2026-06-18 08:58 CST (QR generation clock starts here — fetch mini-program QR after ~09:08)

## Notes

- Created during a live demo of the end-to-end event creation flow.
- Banner uploaded uses event #44's banner as a placeholder; will be replaced once #45's banner is rendered.

## Skill quirks encountered (huodongxing-create-event)

Several silent failures bit during this run. Worth folding into the skill doc.

### 1. `+免费票` button needed a low-level mouse-coord click

`agent-browser click @ref` and `el.click()` both silently no-op'd. Only `agent-browser mouse move x y; mouse down; mouse up` actually opened the ticket drawer. Likely a synthetic-event guard somewhere in Element UI's button wrapper that requires real pointer events.

### 2. Apostrophes / unicode chars get mangled via `agent-browser eval`

Setting UEditor / TinyMCE content via `agent-browser eval '...'` with literal unicode chars (`—`, `·`, `–`, `'`) is unreliable. Two failure modes hit on this run:
- `\\u0027` → JS sees literal `'` (5 chars), gets stored as text. Reason: bash single-quotes pass `\\` literally, so JS source has `\\u0027` which JS parses as `'` text, not the apostrophe.
- Em-dash/middot/en-dash got re-encoded as `&amp;mdash;`/`&amp;middot;`/`&amp;ndash;` somewhere in the create-page TinyMCE → UEditor handoff. Visually fine on the public page (entity decoded), but ugly in source.

**Fix:** pipe the payload through base64 in bash, decode in JS:
```bash
CONTENT=$(printf '%s' "<p>... Jing'an ...</p>" | base64)
agent-browser eval "const c = decodeURIComponent(escape(atob('$CONTENT'))); window.UE.instants.ueditorInstant0.setContent(c)"
```
This survives apostrophes, em-dashes, and multibyte chinese without shell-quoting hell.

### 3. `保存活动信息` button silently fails until ALL required fields are filled

On the post-publish edit page, clicking `保存活动信息` (the green button next to the location row) is a NO-OP if any required field (`* 活动地址`, `* 活动亮点`, etc.) is empty. No toast, no console error, no network request — just nothing. Confirm by instrumenting `XMLHttpRequest.prototype.send` and watching for `/myevent/SaveEvent` — if absent, validation is silently rejecting.

Required fields that need values before save fires:
- `活动标题`, `举办时间`, `活动地址` (full: country + province + city + detail input), `活动海报`, `活动亮点` (the textarea), `活动人数`

The `活动地址` detail input visually shows the wrong placeholder ("请先选择省市，然后输入详细地址") even when province/city dropdowns are populated — and after a banner re-upload, the detail field gets cleared. Re-fill it before each save.

### 4. The submit button at the bottom (`提交`) hits `/myevent/set_layout`, not `/SaveEvent`

Don't use 提交 to persist event-info edits. It only saves the layout/module config. Use 保存活动信息 with all required fields populated.

### 5. UEditor's `getContent()` returns entity-encoded text but the backend stores the actual chars

After save, reload the EDIT page and `getContent()` shows e.g. `&amp;mdash;` — looks broken. But the PUBLIC page shows the actual `—`. Verify saves against the public event page, not the editor source.

### 6. Banner re-upload on edit page uses a different cropper

Create page: `el-dialog` with `vue-cropper`, confirm = `button` with text "确认".
Edit page: `.create-modal.poster-modal` (custom modal), confirm = `<a>` with class `create-modal-foot__btn create-text` and text "上传".

Same skill, two different DOM trees. Branch on which page you're on.

### 7. Re-uploading the banner on the edit page wipes the detail-address field

Confirmed twice: upload new banner → save → reload → 活动地址 detail input is empty (but city/district dropdowns retain their values). Always re-fill 活动地址 after a banner replace before saving.

### 8. QR clock — confirmed ~10 min wait is safe

Created 08:58, fetched QR at 09:10 — returned a valid 400×400 PNG. No bug triggered. Don't go below 10 min.
