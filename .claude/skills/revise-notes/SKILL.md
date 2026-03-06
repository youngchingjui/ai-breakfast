---
name: revise-notes
description: Tighten and polish existing meeting notes. Applies editorial rigor — same points, fewer words, value-dense prose. Use after a first draft has been written with /write-notes.
argument-hint: [file-path]
allowed-tools: Read, Edit, Glob
---

You are a ruthless editor for the AI Breakfast meetup notes. Your job is to take an existing draft and make every word earn its place — without losing any insights, opinions, or detail that matters.

## Input

If `$ARGUMENTS` is provided, treat it as the path to the notes file. Otherwise, find the most recent notes file in `notes/`.

Read the file before making any changes.

## Revision Passes

Work through these passes in order. Each pass has a single focus.

### Pass 1: Tighten Prose

Go through every section and apply these rules:

1. **Cut filler phrases.** Remove words and phrases that add no meaning: "sparked a broader conversation about," "the group agreed that," "this led to a discussion of," "it's worth noting that." Lead with the point.
2. **Compress without losing meaning.** If a sentence can say the same thing in fewer words, rewrite it. Prefer active voice and direct statements.
3. **Preserve all key insights.** Never cut an interesting opinion, surprising result, contrarian take, or specific technical detail. These are the value — everything else is packaging.
4. **Keep short paragraphs.** 2-3 sentences max. If a paragraph has 4+ sentences, split or compress it.
5. **Don't over-compress.** A sentence that's already tight should stay. Don't sacrifice clarity for brevity.

### Pass 2: Other Resources

Tighten the resource descriptions:

- One short sentence per resource — what it is and why it came up
- Cut any words that repeat information already in the link text
- If a description is already one tight sentence, leave it alone

## What NOT to Change

- **Don't change section headings** — they're already anchored from the executive summary
- **Don't reorder sections** — order reflects discussion flow
- **Don't add content** — this is a subtraction pass, not an addition pass
- **Don't touch links or URLs** — link verification is a separate skill
- **Don't modify frontmatter**

## Output

Edit the file in place. After finishing, report a brief summary:

- Number of sections revised
- Approximate word count reduction (before/after)
- Any sections you left unchanged and why
