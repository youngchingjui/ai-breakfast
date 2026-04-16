# AI Breakfast

Meeting notes repo for the AI Breakfast meetup series.

## LinkedIn Page

- **Page type:** Showcase page (org ID `112352855`)
- **Dashboard:** https://www.linkedin.com/showcase/112352855/admin/dashboard/
- **Posting:** Use the `api-gateway` skill with Maton to post as `urn:li:organization:112352855`
- **Ching's person ID:** `Yl90NMv7Fs`

## Transcript Workflow

Granola transcripts can be 50k+ tokens — avoid loading them into the main conversation context.

1. **Download** the transcript with `granola.sh download <note-id> ~/Library/Caches/ai-breakfast/transcripts`
2. **Launch a sub-agent** to run `/write-notes <path-to-transcript>` — the sub-agent reads the transcript and writes the notes, keeping the main context clean.
