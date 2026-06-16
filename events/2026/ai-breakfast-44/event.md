# AI Breakfast #44

- **Date:** Thursday, June 18, 2026
- **Time:** 8:00 – 10:00 AM
- **Venue:** Baker & Spice, Wheelock Square
- **Address:** 1717 West Nanjing Road, Wheelock Square, Jing'an
  - 南京西路 1717 号 会德丰国际广场南院首层 101 号商铺
- **City:** Shanghai
- **Venue hint:** Look for the long table in the back, past the grilling station.

## This Week's Demo

**Title:** Automating browser work with agents
**Speaker:** Ching Jui Young — host of AI Breakfast, Young & AI

Ching will share how he configured agents to manage some workflows that can only be done in the browser, and why you should look for similar opportunities. He'll alos share how he built them, failure modes to look out for, and how to setup automatic improvements every time you use them.

## Agenda

- **8:00** — Intros
- **8:30** — Demo on agentic browser work
- **9:00** — Open chat

## Huodongxing

- **Event ID:** 8865474059900
- **Admin URL:** https://www.huodongxing.com/myevent/home?id=8865474059900
- **Public URL:** https://www.huodongxing.com/event/8865474059900
- **Created:** 2026-06-16 05:48:10 CST (QR generation clock starts here — fetch mini-program QR after ~05:58)

## Notes

- Meta theme: the event listing, poster, and QR were all produced by the agent Ching is demoing. The poster's demo card calls this out directly ("the proof is this poster").
- No speaker photo on file for Ching — byline uses the "C" initials avatar fallback.
- Speaker is the host, so the demo beat doubles as the host walking the room through his own automation stack.
- QR fetched 2026-06-16 ~06:00 CST (after the 10-min delay); `poster-with-qr.png` rendered and imported to Apple Photos.
- 活动详情 is bilingual text only — the create-page image uploader hard-locks to a 1:1 square crop (see quirk below), so the tall poster was not embedded. Add via edit-page UEditor + hosted URL if wanted.

## Skill quirk encountered (huodongxing-create-event)

- **Create-page 上传图片 (TinyMCE image upload) forces a 1:1 square crop.** The crop dialog is `vue-cropper` with `fixed:true, fixedNumber:[200,200], fixedBox:true`. These are parent-controlled props — overriding `fixed`/`cropW`/`cropH` on the live component instance (`document.querySelector(".vue-cropper").__vueParentComponent.ctx`) reverts immediately via watchers. A 1080×1920 poster can't be inserted full-frame through this dialog. Use the documented hosted-URL route (set `innerHTML`/`setContent` with an `<img src>`) instead.
