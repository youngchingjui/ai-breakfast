# AI Breakfast

Meeting notes repo for the AI Breakfast meetup series.

## LinkedIn Page

- **Page type:** Showcase page (org ID `112352855`)
- **Dashboard:** https://www.linkedin.com/showcase/112352855/admin/dashboard/
- **Posting:** Use the `api-gateway` skill with Maton to post as `urn:li:organization:112352855`
- **Ching's person ID:** `Yl90NMv7Fs`

## Transcript Workflow

Granola meeting transcripts are large and should NOT be loaded directly into the main agent's context. Use this two-step workflow:

### Step 1: Download the transcript

Use the `transcript-downloader` agent to fetch from Granola MCP and save locally:

```
Use the transcript-downloader agent to download the latest AI Breakfast transcript.
```

This saves the transcript to `latest.transcript` (gitignored).

### Step 2: Write the notes

Run `/write-notes latest.transcript` — the skill will read from the file.

### Why this matters

Granola transcripts can be 50k+ tokens. Loading them into the main conversation wastes context and slows things down. The subagent approach keeps the main agent lean — it only reads the transcript file when writing notes, and the subagent's context is discarded after download.
