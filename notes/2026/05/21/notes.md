---
Title: AI Breakfast #40
Date: May 21, 2026
Time: 9:00 AM - 10:30 AM
Author: Ching Jui Young
---

## TL;DR

- [Demo: A Newsletter That Writes and Sends Itself](#demo-a-newsletter-that-writes-and-sends-itself) — a non-technical member's self-running weekly report
- [Build an MCP, or Just Write a Script?](#build-an-mcp-or-just-write-a-script) — a simple script often beats a plug-in
- [Why Your MCP Burns the Whole Token Budget](#why-your-mcp-burns-the-whole-token-budget) — AI plug-ins quietly devour usage limits
- [Anthropic Quietly Taxes Third-Party Tools](#anthropic-quietly-taxes-third-party-tools) — outside coding tools get billed higher
- [Scraping: When the CAPTCHA Targets Your AI](#scraping-when-the-captcha-targets-your-ai) — trick images now fool vision models
- [Quick Hits](#quick-hits) — firewall tax, tooling churn, self-fixing software

## Demo: A Newsletter That Writes and Sends Itself

This week's centerpiece came from a self-described non-technical member who helps business owners and entrepreneurs adopt AI. His project: a weekly workforce-intelligence newsletter that researches, writes, formats, and emails itself. He hits "go" once a week — everything else is automatic.

It runs as a scheduled [Codex](https://openai.com/codex/) task with eight steps. Determine the date — models still get it wrong, so he built a dedicated tool. Read brand and methodology from local seed files. Check a coverage log to skip articles already covered. Web-search the past seven days for workforce restructurings and AI-driven layoffs, weighted to China and APAC. Then write a fixed eight-section report, render a PDF from a reusable Python template, email it via a custom MCP server — a connector that lets the AI use an outside tool — and append the week's articles to the log. (He's non-technical and said "Codex" and "Claude" interchangeably; the exact tool is fuzzy, the workflow isn't.)

The clever part is memory: the coverage log keeps week two from re-reporting week one's news. A second task fires an hour later, reads the finished report, and turns it into LinkedIn and WeChat drafts. He chose this kind of tool partly for local folders — his brand and context files stay on his machine, editable directly, not trapped in a cloud "project." The hardest part, he said, wasn't code — it was the prompt: turning raw news into "what this means for employees, managers, and executives."

The table's main fix: separate collection from publishing. Search runs only at report time, so a Tuesday story can be stale by Monday — better to scrape daily and write weekly. For deduplication and trend-spotting, one member pointed to [Gensim](https://radimrehurek.com/gensim/) and [spaCy](https://spacy.io/), which cluster similar articles and surface "this topic got 100 mentions this week."

## Group Discussions

### Build an MCP, or Just Write a Script?

To let the agent send email, he built a custom Outlook MCP server — the worst part of the whole project. Register an app in [Microsoft Entra ID](https://learn.microsoft.com/entra/identity/), grant Mail.Send permission, copy the tenant and client IDs, and grab the client secret immediately — it vanishes when you close the window (he re-registered the app twice after missing it). One stray character in the config file later crashed his desktop app for half a day.

The developers at the table had a blunter view: he overbuilt it. Most services don't need an MCP — write a small script to send the email and tell the agent to run it. The nuance that rescued his approach: Microsoft deliberately cripples plain email-sending (SMTP) on Outlook, so the heavier authenticated path may genuinely have been needed.

The keeper takeaway: default to a script the agent can call, and reach for an MCP only when the service blocks the simple path, as Microsoft does.

### Why Your MCP Burns the Whole Token Budget

One member keeps hitting daily limits on trivial work — asking an agent to tidy a small [Notion](https://www.notion.com/) database or delete 60-odd entries — even on Opus. The culprit isn't the task. A connected MCP loads every one of its tool definitions into the model's working memory before the agent does anything.

The fix the table named: dynamic tool sets. Instead of dumping every tool up front, the MCP exposes a lightweight router — just metadata — and the agent pulls only the tools it needs. Not every MCP supports this yet; if yours doesn't, that's where the budget goes.

One more distinction — token cost and token efficiency aren't the same (tokens being the text chunks an AI bills by). A model can look cheap per token yet waste them, burning several times as many for the same answer. The table's read: GPT-5.5 currently leads on efficiency, a $20 plan covers normal use, and heavy MCP workflows are what blow past the limits.

### Anthropic Quietly Taxes Third-Party Tools

Why doesn't the [OpenCode](https://opencode.ai/) CLI work on a Claude subscription anymore? The table's read: third-party harnesses — the apps you run an AI model through — reportedly don't play well with prompt caching (a billing discount for reusing the same instructions), so they generate far more compute than the first-party apps.

Anthropic's answer isn't an outright ban. As the table understood it, third-party harnesses get routed to API-rate billing: a $100 plan includes roughly $100 of API credit you can spend this way, but at API rates that runs out fast. Same effect as a block, with a grace period — experiment with outside tools, but not much.

### Scraping: When the CAPTCHA Targets Your AI

The hotel-influencer marketplace founder returned to the scraping wall and named what's behind it. [Cloudflare](https://www.cloudflare.com/application-services/products/turnstile/) Turnstile blocks bots at the door; harder still, Cloudflare now splits login into a separate worker, so the auth flow isn't on the page you're scraping. And some platforms' CAPTCHAs now serve adversarial images — subtly perturbed so a human sees an elephant while a vision model sees a car. Automated solving collapses; he pays human solver services, costly on the worst platforms.

He also sharpened the real problem. Bulk influencer data isn't the bottleneck — he already buys full RedNote and [Instagram](https://www.instagram.com/) datasets from a provider for a reasonable fee. What he can't do is search: "which influencers used this hashtag" needs a logged-in session, and platforms ban bot-like behavior. Instagram tolerates roughly 100 posts before an IP block; RedNote is far harsher and returns thin data unless you're logged in.

Practical notes: [gallery-dl](https://github.com/mikf/gallery-dl) handles bulk downloads across many sites if you run it locally and don't need it automated, and [Apify](https://apify.com/) has a ready-made RedNote scraper several found reliable. For small, specific lookups, paid scraping APIs (about $5 per 1,000 requests, billed per post) are worth it; at scale the economics break.

## Quick Hits

**The Great Firewall is an AI-adoption tax.** A designer admitted she uses AI for almost nothing — "what flower is this" on [Doubao](https://www.doubao.com/) — and named the reason plainly: behind the wall, the good tools are enough of a hassle that laziness wins. She's waiting until she leaves the country to bother. Access, not capability, is the real adoption ceiling for many people.

**You can't get comfortable in your tooling.** A developer who builds hobby apps in languages he doesn't know — Rust, a Swift app for a homemade thermometer — named his real frustration: tools go obsolete monthly. You finish a setup and it's already superseded. He's still hunting for a stable online/offline workflow that survives switching between laptop and phone.

**Software that fixes itself.** A software architect at a 3D-printing company is wiring monitoring straight to deployment: a scheduled job scans the system's own metrics and error logs, files [Linear](https://linear.app/) tickets for the bugs it finds, hands them to AI agents, and lets the resulting fixes merge and ship on their own. Half-built, but closing that full loop is the goal.

## Other Resources

- [Codex](https://openai.com/codex/): OpenAI's agentic coding tool. Its scheduled tasks and local project folders power the automated newsletter demo.
- [Gensim](https://radimrehurek.com/gensim/): Topic-modeling and document-similarity library. Suggested for deduplicating and clustering scraped articles.
- [spaCy](https://spacy.io/): Industrial-strength NLP library. Paired with Gensim for spotting trending topics across a corpus.
- [Microsoft Entra ID](https://learn.microsoft.com/entra/identity/): Microsoft's identity platform. Where you register an app and grant Mail.Send to script Outlook email.
- [Notion](https://www.notion.com/): Workspace tool with an MCP server — cited as a token hog because it loads every tool into context.
- [OpenCode](https://opencode.ai/): Open-source coding CLI. No longer works on Claude subscriptions; routed to API-rate billing.
- [gallery-dl](https://github.com/mikf/gallery-dl): Command-line bulk media downloader supporting many sites. Good for local, non-automated scraping.
- [Apify](https://apify.com/): Hosted scraping platform. Its ready-made RedNote scraper was rated reliable for influencer data.
- [Cloudflare Turnstile](https://www.cloudflare.com/application-services/products/turnstile/): Cloudflare's CAPTCHA replacement. One of the main walls blocking the founder's scrapers.
- [Granola](https://www.granola.ai/): AI meeting-notes app. A member uses it in China by sticking it on the back of a phone.
- [Doubao](https://www.doubao.com/): ByteDance's consumer AI assistant. One member's only AI tool — for casual questions.
