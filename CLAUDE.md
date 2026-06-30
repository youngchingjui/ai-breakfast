# AI Breakfast

Meeting notes and event tooling for the AI Breakfast meetup series.

## Repo paths

Skills resolve the repo root from `$AI_BREAKFAST_ROOT` if set, otherwise from the current working directory. Run Claude Code from the repo root.

## LinkedIn (organizer-only)

- **Page:** Showcase page (org ID `112352855`) — https://www.linkedin.com/showcase/112352855/admin/dashboard/
- **Posting:** Use the `api-gateway` skill with Maton to post as `urn:li:organization:112352855`
- **Organizer person ID:** `Yl90NMv7Fs`

## Transcript workflow

Granola transcripts can be 50k+ tokens — keep them out of the main context.

1. **Download** with `granola.sh download <note-id> <transcript-cache-dir>` (organizer uses `~/Library/Caches/ai-breakfast/transcripts`; any path works)
2. **Launch a sub-agent** to run `/write-notes <path-to-transcript>`
