---
Title: AI Breakfast #32
Date: March 19, 2026
Time: 9:00 AM - 10:30 AM
Author: Ching Jui Young
---

## Summary

- [The OpenClaw Moment](#the-openclaw-moment) — Everyone's using it, nobody's sure it's ready
- [Agents Beyond Coding: Where's the Value?](#agents-beyond-coding-wheres-the-value) — A trader pushes back on agent hype
- [AI Consulting for Small Business](#ai-consulting-for-small-business) — Digitalization matters more than LLMs
- [The Software Factory Dream](#the-software-factory-dream) — Tickets in, PRs out — almost
- [The Skeptic Agent](#the-skeptic-agent) — Fighting hallucinations with adversarial verification
- [Obsidian as an Agent Knowledge Base](#obsidian-as-an-agent-knowledge-base) — Headless sync turns notes into context
- [AI-Generated Presentations](#ai-generated-presentations) — Three approaches, none perfect yet
- [Subscription Musical Chairs](#subscription-musical-chairs) — Canceling Cursor, OpenAI, and discovering bundles

## Group Discussions

### The OpenClaw Moment

OpenClaw has jumped out of the tech bubble — non-technical people now ask for it by name. But it's far from production-ready: you still hand over API keys and email access. [Nvidia's GTC keynote](https://blogs.nvidia.com/blog/gtc-2026-news/) this week announced [NemoClaw](https://techcrunch.com/2026/03/16/nvidias-version-of-openclaw-could-solve-its-biggest-problem-security/), an enterprise-grade security wrapper to address this.

A compelling theory on China's OpenClaw explosion: most Chinese users don't pay for LLMs, hopping between free offerings. OpenClaw forces token consumption — so Tencent, Alibaba Cloud, and others sponsored free installation events. Drug-dealer economics to build paid AI habits.

Three OpenClaw projects from the table: a bot-vs-bot roleplay game inspired by China's "Traveling Frog" where your agent visits locations and co-creates text adventures with a game-master bot — humans never see the conversation. A hotel platform building multi-user agent capabilities on OpenClaw's architecture (memory, heartbeat, channels). And a CRM integration for a client's sales team where the agent writes temporary Python to process API data. Key lesson: only expose GET endpoints.

### Agents Beyond Coding: Where's the Value?

A trader posed a sharp question: outside of coding, where are agents actually useful? His experience — equal to or worse than existing workflows, with a learning curve that makes him less productive.

The organizer's counter: using [Claude Code](https://github.com/anthropics/claude-code) to sort a messy desktop of random PDFs. The agent opens each file, identifies it (hospital invoice, utility bill), renames it with date and amount, and moves it to the right folder. The trader wasn't convinced — his chronological filing already works for his brain.

Research emerged as the strongest non-coding use case. One attendee feeds weekly Economist issues into ChatGPT for summarized analysis tied to his trading interests. An agent could automate the full loop. The counterpoint: publications like the Economist aggressively police scraping, especially behind VPNs.

### AI Consulting for Small Business

A consultant is scoping an AI integration for a company with two businesses (seafood and solar, ~50-60 people). The CEO said "AI" but means LLM integration — not ML or predictive analytics. Likely solution: workflow automation with [n8n](https://n8n.io/) where the client can visualize what's happening.

A veteran CTO reframed it: the highest-value first step is process documentation, not code. The consulting keyword is "digitalization" — getting everything out of paper and into digital formats. LLMs now bridge physical and digital easily: snap a photo of a messy document, push it through a schema, get structured data. Automation comes after.

### The Software Factory Dream

Two attendees independently chasing the same idea: write tickets, have agents resolve them into PRs. One built [IssuePR](https://github.com/youngchingjui/issue-to-pr) — install it on a repo and issues auto-generate PRs. The shared discovery: tickets are never well-formed enough for one-shot execution. You need the back-and-forth.

[OpenAI's Symphony](https://github.com/openai/symphony) just dropped, using [Linear](https://linear.app/) for orchestration with agent communication flowing through Linear's comments. [Vibe Kanban](https://vibekanban.com/) takes a similar approach with parallel agents in isolated git worktrees. One attendee tried [Plane](https://plane.so/) for its module structure but couldn't get the agent loop stable.

### The Skeptic Agent

Hallucinated links in AI-generated content led to a verification pattern: the organizer's note-writing workflow uses a second agent that opens every URL the first agent produced and confirms it matches context.

The broader idea: a "skeptic agent" with a system prompt to be maximally skeptical, run after other agents finish. The intuition holds — challenging an LLM's output and demanding evidence activates different parts of the network tied to defense and verification, producing deeper reasoning than the initial summary. Nobody had fully implemented it yet, but it's high on several to-do lists.

### Obsidian as an Agent Knowledge Base

A CTO made a strong case for [Obsidian](https://obsidian.md/) as the ideal agent knowledge base — it's just a folder of markdown files. The missing piece was server-side sync: you needed a desktop app running to keep files current.

That changed in February when Obsidian released a [headless CLI client](https://github.com/obsidianmd/obsidian-headless) that runs on Linux without a GUI — as a daemon on a server, Raspberry Pi, or Docker container. Combined with core skills for search, tagging, and database-like operations, it's now a live, syncing knowledge base for agents. The bigger insight: we've moved from "prompt engineering" to "context engineering" — what you feed the agent matters more than how you phrase the question.

### AI-Generated Presentations

Three approaches to AI slide decks: traditional PowerPoint, prompt-to-slide tools like [Gamma](https://gamma.app/) (hard to tweak manually), and agents writing HTML/code that renders as slides (customizable via prompts, zero mouse control).

AI-generated presentations still look generic. Design is fundamentally harder to train on — there's no clean loss function, just fuzzy human judgment. Unlike code or math, you can't verify correctness. The gap between AI design and AI coding hasn't closed much in two years. Best use for now: ideation (color schemes, layout suggestions) rather than final output.

### Subscription Musical Chairs

Multiple attendees have canceled Cursor and OpenAI subscriptions, moving to Claude Code for daily work — including personal tasks like passport research and to-do management running in background streams.

[Lenny's Product Pass](https://lennysproductpass.com/) came up as a power move: ~$200/year bundles free pro access to dozens of AI tools including Linear, Granola, and more. The math works if you'd pay for even one tool at retail. Tools rotate quarterly — ideal for exploration.

A Hong Kong-based attendee noted that ChatGPT still requires a VPN there, same as mainland China. [Poe](https://poe.com/) and [Perplexity](https://www.perplexity.ai/) work without one, making them practical alternatives for the region.

## Other Resources

- [OpenClaw](https://en.wikipedia.org/wiki/OpenClaw): Open-source AI agent framework gone mainstream. Everyone at the table is experimenting.
- [NemoClaw](https://techcrunch.com/2026/03/16/nvidias-version-of-openclaw-could-solve-its-biggest-problem-security/): Nvidia's enterprise security wrapper for OpenClaw, announced at GTC 2026.
- [Symphony](https://github.com/openai/symphony): OpenAI's framework for autonomous coding agents orchestrated through Linear boards.
- [Vibe Kanban](https://vibekanban.com/): Kanban board for parallel AI coding agents in isolated git worktrees.
- [Plane](https://plane.so/): Open-source Jira/Linear alternative with API support.
- [n8n](https://n8n.io/): Self-hostable workflow automation with 400+ integrations. Suggested for small business AI consulting.
- [Obsidian](https://obsidian.md/): Markdown-based knowledge management. Now has a headless CLI for server-side sync.
- [Obsidian Headless](https://github.com/obsidianmd/obsidian-headless): CLI client for syncing vaults without the desktop app. Released February 2026.
- [NotebookLM](https://notebooklm.google/): Google's AI research tool. Used to analyze 60+ hours of GTC videos via YouTube transcripts.
- [Autoresearch](https://github.com/karpathy/autoresearch): Karpathy's 630-line tool for autonomous ML experiments overnight. Discussed as a model for non-coding agent loops.
- [AMI Labs](https://techcrunch.com/2026/03/09/yann-lecuns-ami-labs-raises-1-03-billion-to-build-world-models/): Yann LeCun's world models startup. $1.03B seed round — largest in European history.
- [Gamma](https://gamma.app/): AI presentation tool. Good for structure, less so for visual polish.
- [Magic Patterns](https://www.magicpatterns.com/): AI design tool generating working prototypes with Claude integration for iterative tweaking.
- [Appium](https://appium.io/): Mobile test automation repurposed as agent "fingers on the phone." WeChat's bot detection makes it impractical.
- [Perplexity](https://www.perplexity.ai/): AI search with strong citation and recency. Runs its own Sonar model. Works in Hong Kong without VPN.
- [Poe](https://poe.com/): Quora's multi-model AI aggregator. Accessible where ChatGPT is blocked.
- [Lenny's Product Pass](https://lennysproductpass.com/): ~$200/year newsletter bundling free pro access to dozens of AI tools.
