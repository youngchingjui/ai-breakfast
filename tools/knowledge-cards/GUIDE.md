# Knowledge Cards Guide

Weekly shareable insight cards for WeChat Moments after each AI Breakfast meetup.

## Purpose

Standalone image cards that deliver real value — not teasers. Each card contains one complete insight from the meetup. If someone only reads the titles across all cards, they get the full picture. The supporting points provide evidence and context, not the main point.

This builds the AI Breakfast brand and Ching's reputation as someone who deeply understands AI topics. People save, forward, and share the images because they contain useful information — not because they're being sold something.

## Content Principles

1. **Title IS the insight.** Full sentence. The complete value of the information lives in the title. No clickbait, no teasing, no "read more to find out." If a user skims only titles, they still get full value.
2. **Supporting points are evidence.** 2-3 bullets that back up the title with specifics — numbers, member experiences, technical details.
3. **Go deeper than a reporter.** Include first-hand observations and experiences from members (check the transcript), not just surface-level facts anyone could find online.
4. **Neutral observations.** Write as factual observations, not personal takes. "Members found X" not "I think X."
5. **No CTA.** Don't tease or hold back. Deliver value directly. The footer mentions the next meetup — that's enough.
6. **English only.**

## Card Types

- **Standard card** — an insight from the group discussion
- **Member Highlight** — showcases something a member built or demoed. Uses the "Member Highlight" badge. Keep it about the product/tool, not personal details about the member.

## Content Selection

From each meetup's notes and transcript, pick 3-5 topics that:
- Have the most insider detail (member experiences, specific numbers, first-hand testing)
- Would be valuable to corporate folks looking to improve AI in their organizations
- Are concrete enough to fit in a single-sentence title

Skip topics that are too niche or product-specific without broader relevance.

## Card Structure — Editorial Masthead Layout

```
[Masthead: "AI BREAKFAST SHANGHAI · APR 16 MEETUP" — single line]

[Optional: "MEMBER HIGHLIGHT" small label]

[Title — full sentence, Playfair Display 800, 24px]

[Terracotta divider line]

[2-3 supporting points with dot markers]

[Footer: "AI Breakfast" brand mark]
```

## Design Specs

### Branding (from BRAND.md)

| Element | Value |
|---------|-------|
| Background | Warm White `#FFFAF5` |
| Title font | Playfair Display, 800 weight, 24px |
| Title color | Stone 900 `#292524` |
| Body font | Inter, 400 weight, 13px |
| Body color | Stone 500 `#78716C` |
| Masthead brand | Inter, 600 weight, 11px, uppercase, `#C2410C` |
| Masthead date | Inter, 500 weight, 11px, uppercase, `#78716C` |
| Masthead dot | 3px circle, `#C2410C` |
| Member label | Inter, 600 weight, 10px, uppercase, `#EA580C` |
| Brand color | Terracotta `#C2410C` |
| Accent | Flame `#EA580C` (bullet markers, member label) |

### Dimensions

- CSS viewport: 360px wide, height fits content
- Render at 3x pixel density (deviceScaleFactor: 3)
- Output: 1080px wide PNG, height varies per card
- Padding: 40px top, 32px sides and bottom

### Spacing

| Between | Gap |
|---------|-----|
| Masthead → Title | 32px |
| Member label → Title | 10px |
| Title → Divider | 32px |
| Divider → Points | 28px |
| Point → Point | 18px |
| Points → Footer | 32px (auto push) |

### Footer

- "AI Breakfast" in Playfair Display 700, 13px, left-aligned
- No divider line above footer

## How to Generate

### Prerequisites

- Node.js
- Playwright (`bun add playwright` in the `tools/knowledge-cards/` directory)
- Chromium installed (`bunx playwright install chromium`)

### Steps

1. **Read the notes and transcript.** Pull out 3-5 insights with member-specific detail.
2. **Edit `render-cards.mjs`** — update the `cards` array with new content. Each card needs:
   - `slug`: filename (kebab-case)
   - `badge`: `null` for standard, `"Member Highlight"` for member cards
   - `title`: the full insight as a complete sentence
   - `points`: array of 2-3 supporting detail strings
3. **Update the date** in `card-template.html` masthead (the `masthead-date` span).
4. **Render:**
   ```bash
   cd ~/Projects/youngchingjui/ai-breakfast/tools/knowledge-cards
   node render-cards.mjs
   ```
5. **Review** the output in `output/` directory.
6. **Import to Apple Photos** for easy WeChat sharing:
   ```bash
   osascript -e 'tell application "Photos" to import POSIX file "/path/to/card.png"'
   ```

## File Organization

```
tools/knowledge-cards/
  card-template.html    # HTML/CSS template (shared by all cards)
  render-cards.mjs      # Card content + Playwright render script
  GUIDE.md              # This file
  package.json          # Dependencies (playwright)
  output/               # Generated PNGs (gitignored)
```

## WeChat Moments Posting

- Post all cards as a multi-image Moments post with a short caption
- Caption should be brief — the cards carry the content
- Include the group photo from the meetup if available
- Cards are designed to be saved and forwarded as standalone images
