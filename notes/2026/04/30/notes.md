---
Title: AI Breakfast #37
Date: April 30, 2026
Time: 9:00 AM - 10:30 AM
Author: Ching Jui Young
---

## Executive Summary

At AI Breakfast #37, our group of software architects, founders, engineers, and consultants discussed [parallel agents in Zed](#parallel-agents-and-the-end-of-the-single-thread-workflow), [the rise of the Context Lake](#the-context-lake-pattern), [why Codex outshines Claude on instruction-following](#codex-vs-claude-blank-slates-and-training-wheels), [running PR-review-less engineering teams](#shipping-without-pr-reviews), and [Cursor for game development](#cursor-for-games-the-unity-and-unreal-bottleneck). One attendee also shared their work on [AI tooling for compliance and certification](#ai-for-the-certification-industry).

## Summary

- [Parallel Agents and the End of the Single-Thread Workflow](#parallel-agents-and-the-end-of-the-single-thread-workflow) — Zed's ACP unlocked multi-agent, multi-codebase orchestration
- [The Context Lake Pattern](#the-context-lake-pattern) — Logs, metrics, transcripts, and tickets in one MCP-addressable space
- [Codex vs Claude: Blank Slates and Training Wheels](#codex-vs-claude-blank-slates-and-training-wheels) — Why instruction-following beats helpfulness for power users
- [Shipping Without PR Reviews](#shipping-without-pr-reviews) — Audit cadence replaces synchronous review
- [Cursor for Games: The Unity and Unreal Bottleneck](#cursor-for-games-the-unity-and-unreal-bottleneck) — Why game devs are years behind on AI adoption
- [AI for the Certification Industry](#ai-for-the-certification-industry) — Why every comment needs a traceable source
- [Mini Programs, EVs, and the Reality Gap](#mini-programs-evs-and-the-reality-gap) — A returning American on what the West doesn't see
- [The Junior Engineer Becomes the Orchestrator](#the-junior-engineer-becomes-the-orchestrator) — Don't lay off, retrain

## Group Discussions

### Parallel Agents and the End of the Single-Thread Workflow

The biggest workflow shift at the table came from [Zed's parallel agents](https://zed.dev/parallel-agents) running over the [Agent Client Protocol](https://zed.dev/acp). One software architect described it as a step-change: bring your own Claude or Codex subscription, route it through Zed's agent panel, and dispatch threads across multiple codebases at once. Each thread keeps its own persistent terminal, file explorer, git, and profiler — none of the rot you get juggling tmux tabs against the desktop apps.

The same architect tried [Claude's desktop app](https://claude.com/download) but kept hitting crashes and non-sticky terminals. Codex got higher marks for stability but felt verbose — one attendee cited reports that Codex burns roughly 4x more tokens than Claude for equivalent work (though [morphllm's benchmarks](https://www.morphllm.com/comparisons/codex-vs-claude-code) actually find the inverse — Claude Code uses ~4x more tokens than Codex). The compromise: stay in the IDE, push out parallel agents, and only context-switch when you genuinely need to write code by hand. Some changes are still 30 seconds of human typing — faster than any agent can boot.

### The Context Lake Pattern

One attendee is building what [Port.io now calls a "Context Lake"](https://www.port.io/glossary/context-lake): a unified surface that pulls in logs, metrics, traces, build costs, security warnings, customer requests, and meeting transcripts — all queryable by humans and agents through a single MCP. Every morning, engineers log in and ask "what's going on?" The agent answers from real data: which repos are throwing warnings, which builds are getting expensive, which business metric is plateauing.

The architectural twist: don't actually build a real data lake. Iceberg, Trino, and Polaris all change their schemas too often. Instead, expose each data source as its own narrow MCP tool. When the underlying system changes, you swap one tool — the interface to the agent stays clean. The next step is layering a graph database on top, since agents are okay at finding relationships but a real graph traversal beats an LLM guessing every time.

### Codex vs Claude: Blank Slates and Training Wheels

A founder running a US-based AI gaming studio framed the model split sharply: Codex models are an "intentionally blank slate" with strong instruction-following architecture, while Claude is "training wheels" — easier to start with but more eager to make assumptions. Give Codex a real prompt and it goes deeper, longer, and further. Give Claude nothing and it still tries to help, which means it skips ahead.

Not everyone agreed. One attendee said Claude "just gets it" — which the founder reframed as exactly the problem: getting it requires assumptions. The takeaway most of the table landed on: load up on skills, context files, and tools rather than perfecting the prompt. The newer [GPT-5.5 release](https://techcrunch.com/2026/04/23/openai-chatgpt-gpt-5-5-ai-model-superapp/) was singled out as a noticeable jump, especially through ACP.

### Shipping Without PR Reviews

The same software architect's team has dropped synchronous PR review entirely. Unit tests, integration tests, linting, schema checks, and security scans run on every merge. If staging breaks, the trace points to one engineer, and that engineer gets targeted training — instead of a company-wide retrospective.

Human review hasn't disappeared, it's been shifted in cadence. Every week or two, the architect sits down with each engineer for an audit-style code pair, walks the recent diffs, and writes the conclusions back into the repo as context for the agents. The agents then know "this senior engineer specifically checks for man-in-the-middle vulnerabilities here" and incorporate it on the next pass. Critical schema changes — like federated API contracts — still gate on a human, automatically routed by path matching.

The team is also 100% Rust now, including [Cloudflare's Pingora](https://github.com/cloudflare/pingora) replacing nginx. Pingora's appeal isn't just speed — it's that routing logic lives in code instead of config, so the same agents reviewing application changes also review proxy changes.

### Cursor for Games: The Unity and Unreal Bottleneck

The visiting founder is building a "cursor for games" — an AI-native dev environment for Unity and Unreal, made by [Playco](https://www.play.co/). The argument: 80% of professional games are built in those editors, and AI coding tools assume you're working on a website. You can point Claude at Unity code, but the editor work — scene setup, asset wiring, prefabs — is still all manual. The result is that the 8-million-strong professional game-dev population is years behind the rest of software on AI adoption, partly because game engineers and web engineers barely cross paths.

Their studio is about 50 people, with four on the AI product. Launch is targeted for May. They support Godot too (easy integration, low single-digit market share) but skipped China — both because of the regulatory overhead and because Chinese game devs are already extraordinarily good without external tooling.

### AI for the Certification Industry

A solo founder building AI tools for the certification and compliance industry surfaced a problem the group recognized broadly: in regulated work, every AI-generated sentence in a final report needs to trace back to its source — either the regulation it cites or the client information it interprets. Without that trace, human reviewers spend just as long verifying the AI's two-page document as they would writing it from scratch. No time saved.

The group's suggestions converged on agent tracing patterns and proper RAG with surfaced citations — letting the reviewer click any sentence to jump to the source paragraph. One attendee floated a confidence threshold: above 95% accept rate, the system shifts toward auto-acceptance; below it, every output stays human-gated. The deeper business question, raised by an insurance-side attendee: if AI handles the review entirely, the certification service itself becomes redundant. The moat is the human signature and the institutional knowledge behind it — not the report-writing labor.

### Mini Programs, EVs, and the Reality Gap

The visiting founder, on his first trip to mainland China after a decade in Asia, kept circling back to how invisible China's tech reality is from outside. WeChat mini programs feel like infrastructure here; in Japan, his biggest partner Line is "humming and hawing" about whether mini programs are even a viable strategy. [PayPay owns half the Japanese payments market](https://about.paypay.ne.jp/en/pr/20250715/01/) — the other half is split across 19 services. WeChat just is the market.

Same story for EVs. [Korea is the most electric country](https://www.koreaherald.com/article/10580014) he's been to outside China. Japan [still has effectively zero electric cars](https://www.jato.com/resources/news-and-insights/japans-automotive-electrification-trends-2025-h1) and was pursuing hydrogen until last year. The really shocking part wasn't the cars — it was the electric scooters, often 30 years old, hot-wired with what look like car batteries, driven by 80-year-olds through red lights with no plates and no police interest. They work. They're quiet. They're ubiquitous. None of it exists in the West.

For finding things locally, the table converged on an unexpected winner: ChatGPT was "shockingly good" at Chinese restaurant recommendations, directions, and clinic searches — better than DeepSeek, far better than Gemini. The Chinese answer is different though: people don't go to a separate AI app. The AI is baked into Dianping, Xiaohongshu, and Amap. You search inside the app you're already in.

### The Junior Engineer Becomes the Orchestrator

The closing thread pushed back on the obvious "AI means layoffs" narrative. The same team running PR-review-less and shipping every two days isn't hiring less because they fired anyone — they're absorbing more workload at the same headcount. Junior engineers, the people most exposed to AI replacement, are being deliberately retrained as agent orchestrators: project management, time management, context-engineering for agents, knowing when to step back from a system and redirect it.

The framing: "By the middle of next year I won't think of you as engineers anymore. I'll think of you as orchestrators." Being a good orchestrator is being a good manager — of agents, of time, of direction. The people who can grow into that get kept. The ones who can't are the ones who'd be replaced anyway.

## Other Resources

- [Zed Agent Client Protocol (ACP)](https://zed.dev/acp): Open standard letting any IDE talk to any agent. Multiple attendees switched their daily driver to Zed once parallel agents shipped.
- [Pingora](https://github.com/cloudflare/pingora): Cloudflare's Rust-based reverse proxy, open-sourced under Apache 2.0. Replacing nginx for teams that want routing logic in code instead of config.
- [Port Context Lake](https://www.port.io/platform/context-lake): Unified engineering knowledge layer combining catalog, operational state, and metadata for both humans and AI agents. The conceptual model the architect's team is implementing.
- [Plain](https://www.plain.com/): Unified support inbox across Slack, Teams, Discord, and email with built-in Linear integration. Mentioned as the "radio logo" customer-support platform replacing GitHub-issues-as-helpdesk.
- [Linear Customer Requests](https://linear.app/customer-requests): Linear's native support intake. Pulls Discord, email, and Slack into the same issue tracker engineers already live in.
- [Langfuse](https://langfuse.com/): Open-source LLM observability and tracing platform. One attendee uses it to inspect agent behavior instead of building a custom UI.
- [DeepSeek V4](https://api-docs.deepseek.com/news/news260424): Released April 23. The 3D-printing software team runs it for non-sensitive workloads — "infinitely better than V3, 40x cheaper than Codex per token."
- [Outline VPN](https://getoutline.org/): Google-developed VPN running over Shadowsocks, easy to self-host on AWS Lightsail (~$7/month). Recommended over standalone Shadowsocks setups that get detected and blocked.
- [Playco](https://www.play.co/): Instant-games studio building HTML5 mini-program games for Line, Snap, and other messaging platforms. Their AI product for Unity/Unreal launches in May.
- F45: Functional training franchise. One attendee's six-day-a-week regimen, mentioned in passing.
