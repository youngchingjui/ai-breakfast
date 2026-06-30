# AI Breakfast

Tooling and archive for the AI Breakfast meetup series (Shanghai, weekly). Driven by Claude Code skills in `.claude/skills/` — clone the repo, install the prerequisites, and Claude can create events, generate posters, and write notes.

## Contents

- `.claude/skills/` — Claude Code skills (event creation, poster generation, note-writing)
- `events/` — per-event folder with `event.md`, poster HTML, rendered PNGs
- `notes/` — meeting notes, organized by `YYYY/MM/DD/`
- `briefs/` + `ai-brief/` — AI news roundups published on the site
- `app/` — Next.js site (homepage, notes browser, briefs reader)
- `BRAND.md` — colors, fonts, voice

## Prerequisites

- [`agent-browser`](https://www.npmjs.com/package/agent-browser) — `npm i -g agent-browser && agent-browser install`
- [bun](https://bun.sh) (only if running the Next.js site) — `bun install` then `bun dev`

The skills are self-contained otherwise.

## Quick start: set up the next event

```bash
# In Claude Code, from the repo root:
/create-weekly-event #46 theme: your topic here
```

Or step-by-step:

1. `/huodongxing-create-event` — creates the event listing
2. `/generate-posters` — renders banner + poster PNGs from HTML
3. `/huodongxing-qr` — downloads the WeChat mini-program QR code
4. `/write-notes` — turns a meeting transcript into formatted notes

Each skill's `SKILL.md` documents inputs, outputs, and quirks.

## Configuration

Defaults (venue, time, capacity) live in `.claude/skills/PREFERENCES.md`. Edit before running event skills.

Skills resolve repo paths from `$AI_BREAKFAST_ROOT` if set, otherwise from the current working directory — run Claude Code from the repo root.

## Notes workflow

Transcripts can be 50k+ tokens. Hand them to a sub-agent via `/write-notes <transcript-path>` to keep the main context clean. Drafts get a `/revise-notes` pass and optional `/verify-links` check before publishing.
