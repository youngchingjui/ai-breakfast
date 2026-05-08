# Guidelines for Writing Notes

## Privacy & Anonymization

- Avoid using personal details like names or companies people work for. Instead, provide descriptions of the people and companies.
- For project showcases, include the name of the project if provided.
- Use varied, context-relevant descriptions instead of repeating "member" for every person. For example, refer to people by their role, background, or what they shared (e.g., "a full‑stack developer building an MBTI chat app") while still keeping them anonymous.

## Document Structure

### TL;DR

- Place a **TL;DR** section before the Executive Summary, immediately after the title/frontmatter (and any group photo).
- Format: 3 bullets max. Each starts with a bolded one-line thesis, followed by 1–2 sentences of context.
- Each bullet should be a concrete takeaway a reader can use, not a topic label. Pick the items multiple persona reviewers flagged as interesting.
- TL;DR is distinct from the Executive Summary: TL;DR surfaces what to remember; Executive Summary names what was discussed.

### Executive Summary

- Each notes document must include an **Executive Summary** section after the TL;DR (and any group photo) and before the longer table of contents.
- The Executive Summary should be a short paragraph (about 1–3 sentences) written in simple, straightforward language (around a 5th-grade reading level) with no marketing or promotional wording.
- The first sentence should generally follow this pattern (adjusted for each event):
  ```
  At our <event name>, our group of <short list of attendee roles> discussed topics ranging from <topic 1 with markdown link to its section>, <topic 2 with link>, etc. The attendees also shared the latest on their work and projects, including <project 1 with link>, <project 2 with link>, etc.
  ```
- Always link topics and projects to their detailed sections in the same document using markdown anchor links.
- For topics that live in Quick Hits rather than as full sections, link them collectively to `#quick-hits` rather than naming each anchor.

### Section Headers

- Do not use numbers to number chapters or sections. The document should flow like a story, not a numbered outline.
- Generally avoid grouping topics together with "and" or "&" in section headers or titles. Be definitive about what the topic is.
- Use descriptive section titles that read naturally, such as "Executive Summary", "Member Introductions", "Group Discussions", "Side Topics", and "Resources".

### Member Work Section

- The section about member work (typically titled "Member Introductions" or similar) should focus on projects and works that members shared, not member introductions themselves. This section is about celebrating and highlighting our members' work.

### Quick Hits

- For topics that landed but don't merit a full section, group them under a single **Quick Hits** section with one short paragraph (2–4 sentences) per item.
- Each Quick Hit starts with a **bolded one-line thesis**. No sub-headers inside Quick Hits — paragraphs only, so the long tail visually compresses.
- Use Quick Hits to keep minor topics out of the main flow rather than letting every side thread become its own section.

### Other Resources Section

- The last section should be titled "Other Resources".
- Include a bullet list of all the resources mentioned in the transcripts, especially smaller tools, links, or references that were not covered in detail in the main write‑up.
- **Do not duplicate** items already linked in the body prose. Resources is for items not previously linked — it is not a recap.
- Do an online search to find **direct, specific links** to these resources (e.g., the actual product page, not a company homepage). If a specific link cannot be found, omit the link rather than linking to a generic page.
- Each resource should have a concise, single-sentence description that combines:
  1. A brief description of what the resource is
  2. How attendees used it and their feedback/impressions
- Format: "Brief description. Usage and feedback summary in one sentence."
- Example: "Framework for building LLM applications. Some members found it to be too cumbersome to use, 1 member started with it but ended up scrapping it."

## Writing Style

- Write in a journalistic style at a 5th-grade reading level.
- Use descriptive, narrative prose that captures the conversation and members' insights. The document should flow like a story, with sections that transition naturally from one topic to the next.
- Avoid bullet points with headers—instead, write flowing paragraphs that describe what was discussed and what members shared.
- Avoid numbered sections or chapters—let the content flow organically without numerical structure.
- When you mention a tool, app, service, or website, include a markdown link only if it adds genuine value for readers. Follow these principles:
  - **Link to specific resources**, not generic homepages. For example, link to a specific documentary on YouTube, a specific product page, or a specific API reference—not the company's main website.
  - **Don't link to well-known brands** like OpenAI, Google, or Meta. Readers can find these easily.
  - **Do link to specific, harder-to-find things** discussed in the conversation: a particular video, article, tool feature, or niche product.
  - The goal is to help readers access the exact thing being discussed with one click.
- Later mentions of the same resource do not need to be linked again.

## Content Organization

- The volume of each section should reflect **signal, not airtime**. A long sidetrack that didn't land for the audience should be compressed (or moved to Quick Hits) even if it ate ten minutes of the meeting; a short remark that captured a real insight can earn a full paragraph.
- Aim for no more than about three short paragraphs per major section so that each topic stays focused and easy to skim.
- Keep the overall document to roughly a 5‑minute read. Prioritize the most important insights and examples rather than capturing every detail from the transcript.
- Avoid duplication across sections. If two sections describe the same person, the same pattern, or the same product applied to different problems, consolidate into one place — fragmenting a strong cross-cutting insight weakens it.

## Skim Aids

- **Bolded thesis lead.** Start each main discussion section and each Quick Hit with a single bolded one-liner stating the takeaway. The first sentence should not bury the lead.
- **Compressed table of contents.** TOC entries are link + 4–6 word descriptor. No subordinate clauses; descriptions belong in TL;DR.
- **Italic "for engineers" callouts (optional).** When a technical detail (specific framework, architecture choice, performance number) won't land for non-technical readers but is worth keeping for engineers, set it as an indented italic line so general readers can skip without losing the thread.