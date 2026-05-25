# AI Breakfast Brand Guide

## What We Are

AI Breakfast is a weekly morning meetup in Shanghai where AI enthusiasts, builders, creatives, and professionals gather over coffee every Thursday at Baker & Spice, Wheelock Square. No slides, no sponsors — just roundtable conversations, demos, and peer feedback. English language.

## Color Palette: Terracotta

Warm, earthy, and grounded — but with enough saturation to stand out on social feeds.

### Primary Colors

| Name         | Hex       | Usage                                     |
| ------------ | --------- | ----------------------------------------- |
| Terracotta   | `#C2410C` | Primary brand color, links, accents, ring |
| Flame        | `#EA580C` | Secondary accent, hover states            |
| Burnt Sienna | `#9A3412` | Deep accent, secondary foreground         |
| Peach        | `#FB923C` | Charts, highlights, dark-mode primary     |
| Sand         | `#FDBA74` | Charts, light accents                     |

### Backgrounds & Surfaces

| Name       | Hex       | Usage                       |
| ---------- | --------- | --------------------------- |
| Warm White | `#FFFAF5` | Page background             |
| Peach 50   | `#FFF1E6` | Secondary background, cards |
| Sand       | `#F5EDE6` | Muted surfaces, sidebar     |
| Border     | `#E7DDD4` | Borders, dividers, inputs   |

### Text

| Name      | Hex       | Usage                  |
| --------- | --------- | ---------------------- |
| Stone 900 | `#292524` | Primary text, headings |
| Stone 500 | `#78716C` | Muted text, captions   |

### Dark Mode

Dark mode swaps to lighter terracotta tones on dark stone backgrounds:

- Background: `#1C1917`
- Foreground: `#F5EDE6`
- Primary: `#FB923C` (peach — brighter for contrast)
- Accent: `#EA580C`
- Muted: `#292524`
- Border: `#44403C`

## Typography

Two fonts plus monospace. No more.

### Playfair Display (Display & Headings)

- **Role:** Logo, hero text, h1/h2/h3 in prose, brand name in nav
- **Weights:** 400–900 (typically 700–800 for headings)
- **Character:** High-contrast serif with drama. Editorial, magazine-cover feel. Elegant and bold.
- **CSS variable:** `--font-display`

### Inter (Body & UI)

- **Role:** Body text, navigation, buttons, captions, form elements
- **Weights:** 400–800
- **Character:** Clean, modern sans-serif. Friendly and readable.
- **CSS variable:** `--font-sans`

### Ubuntu Mono (Code)

- **Role:** Code snippets, technical details, monospace accents
- **Weights:** 400, 700
- **CSS variable:** `--font-mono`

### Prose (Meeting Notes)

The `.container-prose` container uses Inter for body text at `1.0625rem` with `1.8` line height for a comfortable reading experience. Headings within prose use Playfair Display to create editorial contrast.

## Voice & Tone

### We Are

- **Conversational** — like explaining something to a friend over coffee
- **Practical** — real tools, real demos, real experiences
- **Curious** — sharing what we're learning, not what we've mastered
- **Community-first** — peer-led, no hierarchy, everyone contributes

### We Are Not

- **Corporate** — no "synergize" or "leverage our capabilities"
- **Hype-driven** — no "revolutionary," "game-changing," or "the future of"
- **Exclusive** — explain things simply, no jargon gatekeeping
- **Sales-oriented** — no pitches, no lead generation, no sponsors

### Writing Style

- Journalistic, ~5th-grade reading level
- Flowing paragraphs, not bullet-point walls
- Anonymous descriptions (role + context) instead of personal names
- Sections flow like a story, not a numbered agenda
- Link to specific resources, not generic homepages

See `notes/guidelines.md` for detailed notes writing standards.

## Brand Personality

**Warm, Curious, Unpretentious, Practical, Builder-focused, Multilingual**

The brand should feel like a well-lit cafe on a Thursday morning — coffee in hand, laptop open, someone sharing their screen. The coffee is there, but it's fuel, not the main character.

## Logo

**Status:** Not yet finalized. Four directions exist in `public/images/logo-option-*.svg` but none are locked in. The brand guide explorer (`brand-guide.html`) shows all options with live palette/font switching.

## Where These Decisions Live

| Asset               | File                                                                       |
| ------------------- | -------------------------------------------------------------------------- |
| Colors & fonts      | `app/globals.css`                                                          |
| Font loading        | `app/layout.tsx`                                                           |
| Prose styles        | `app/globals.css` (`.container-prose`)                                     |
| Notes writing guide | `notes/guidelines.md`                                                      |
| Brand explorer      | `brand-guide.html`                                                         |
| Poster generation   | `.claude/skills/generate-posters/` (hand-authored HTML, terracotta palette) |
| Poster templates    | Latest event's `poster.html` / `poster-qr.html` / `banner.html`            |

## Open Decisions

- **Logo:** Pick a direction and finalize
- **Chinese voice guide:** Brand voice is defined only in English; needs Chinese-language guidance for WeChat content
- **"Shanghai" in the name:** Is it always "AI Breakfast Shanghai" or just "AI Breakfast"?
- **Tagline:** "Where AI meets over coffee" — keep, evolve, or drop?
