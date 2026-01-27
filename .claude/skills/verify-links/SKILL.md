---
name: verify-links
description: Verify that all external links in a markdown file are valid and that their content matches what the notes claim about them. Use after writing or editing notes with external references.
argument-hint: <file-path>
disable-model-invocation: true
allowed-tools: Bash, Read, WebFetch
---

Verify all external links in the specified markdown file: $ARGUMENTS

If no file path is provided, ask the user which file to verify.

## Process

### Step 1: Extract Links and Context

Read the file and extract all markdown links `[text](url)` along with their surrounding context.

For each link, capture:

- The URL
- The anchor text
- The surrounding sentence or bullet point describing what the link is about

### Step 2: Verify Each Link

For each link:

1. **Check HTTP Status** using curl:

   ```bash
   curl -s -o /dev/null -w "%{http_code}" "<URL>"
   ```

   - 200: Proceed to content verification
   - 301/302: Follow redirect, verify final destination
   - 404: Mark as broken
   - Other: Mark as problematic

2. **Verify Content Matches Context** - For links returning 200:
   - Use WebFetch to analyze the page content
   - Compare against what the notes claim about it
   - Flag mismatches where page content doesn't support the citation

### Step 3: Report Results

Provide a summary:

**Verified** - Links where HTTP status is good AND content matches the citation

**Broken** - Links returning errors, with suggested corrections if possible

**Content Mismatches** - Links where page exists but content doesn't match claims

**Redirects** - Links that redirect, with final destinations

## Example Output

```
## Link Verification Report for notes/2026/01/22/notes.md

### Verified (4 links)
- [Granola](https://www.granola.ai/) - Content confirms: meeting transcription tool
- [Prodigy](https://prodi.gy/) - Content confirms: annotation tool for ML

### Broken (1 link)
- [Apple Vision](https://developer.apple.com/.../poses-in-an-image)
  - Status: 404
  - Suggested: .../poses-in-images (plural)

### Content Mismatches (0 links)
None found.
```
