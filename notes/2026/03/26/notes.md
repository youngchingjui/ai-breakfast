---
Title: AI Breakfast #33
Date: March 26, 2026
Time: 9:00 AM - 10:30 AM
Author: Ching Jui Young
---

## Summary

- [OpenClaw Reality Check](#openclaw-reality-check) — Hyped framework, broken in practice
- [30-Minute Mac Apps](#30-minute-mac-apps) — Native desktop apps as personal tools
- [ToyKind World: An Idle Game for AI Agents](#toykind-world-an-idle-game-for-ai-agents) — Send your bot on vacation while you work
- [DIY Market Intelligence](#diy-market-intelligence) — Python scripts that replace a Bloomberg terminal
- [Spec-Driven Development](#spec-driven-development) — Write English, ship code

## Group Discussions

### OpenClaw Reality Check

OpenClaw keeps getting hyped but multiple attendees agreed: it doesn't work reliably. One member spent eight hours debugging configuration issues with no useful error messages. The Reddit sentiment matches — endless complaints about things breaking with every biweekly update.

DeepSeek is the worst model choice for it — one member burned through 6 million tokens overnight due to runaway tool calls. Gemini 2.5 Flash at least handles tool calling correctly. The group consensus: take the useful architectural ideas (heartbeat, agent channels, memory system) and rebuild them yourself with a simple Telegram + tool-call setup.

A newcomer running an online school tried [Kimi Claw](https://www.kimi.com/bot)'s OpenClaw integration — it couldn't access Google Docs, Calendar, or any external links. Customer support never responded to tickets or emails. Not recommended.

### 30-Minute Mac Apps

The organizer demoed a personal analytics dashboard built as a native Swift Mac app in 30 minutes with Claude Code. It pulls directly from Stripe and GitHub APIs, displays everything with native macOS UI, and weighs just 5 megabytes.

The unexpected insight: local desktop apps are _more secure_ than web apps for personal tools. API keys live only on your laptop — no server to secure, no third-party hosting to worry about. Cached data makes navigation instant compared to clicking through GitHub's web UI. And it lives in Raycast, which beats `localhost:3000` for muscle memory.

A second Mac app followed — a markdown reader, also 30 minutes, complete with auto-generated icon. The group discussed using LLMs as cross-compilers to port native apps across platforms, rather than dealing with traditional cross-compilation toolchains.

### ToyKind World: An Idle Game for AI Agents

One member built [ToyKind World](https://toykind.world), an idle game where you send your OpenClaw agent on virtual trips. Built on the [AgentNet Protocol](https://github.com/betta-lab/agentnet) — essentially IRC for AI agents — it runs a relay server with themed rooms representing destinations like the Eiffel Tower and Oriental Pearl Tower.

The design is intentionally slow. Stories progress in 30-minute heartbeat intervals, taking 1-2 days for a full adventure. A game master agent weaves daily news into 20 rotating story templates per location. It's modeled after [Travel Frog](https://en.wikipedia.org/wiki/Travel_Frog), the Japanese idle game where you raise a frog that goes on trips and sends postcards.

The wildest output so far: a visitor using ByteDance's ArkClaw client had their agent auto-generate images and video journals from its Eiffel Tower adventure. As one user put it: "We hoped we could travel while our AIs worked. Instead, we're working while our AIs are travelling." Another attendee flagged the "idle games" genre as the right marketing angle — package it as a game, not an AI project.

### DIY Market Intelligence

A member with an investment background demoed a Python-based portfolio analysis system. Two terminal scripts — one runs about 10 minutes to download and cache market data locally (6-hour cache, daily granularity). The output: Excel reports covering market regime classification, sector rotation, and industry scoring.

The regime detection uses Monte Carlo simulations to calculate risk-on/risk-off/neutral probabilities. The war commenced February 28; volatility spiked on the first trading day (March 2), risk-off probability climbed through March 9, and the regime formally flipped to risk-off on March 13. But even before the war, the system was already showing warning signs — a neutral regime with weakening breadth and choppy, range-bound structure. Currently, money is rotating into agriculture ([fertilizer prices up 28%](https://farmdocdaily.illinois.edu/2026/03/strait-of-hormuz-closure-and-fertilizer-supply-risks-for-us-agriculture.html) as the [Strait of Hormuz disruption threatens global supply](https://news.un.org/en/story/2026/03/1167182)), energy ([oil prices up 25%+](https://www.aljazeera.com/news/2026/3/8/iran-war-threatens-prolonged-impact-on-energy-markets-as-oil-prices-rise) since the war started), and clean energy.

No LLM generates these reports — it's all deterministic Python pulling real numbers. [TradingView](https://www.tradingview.com/) supplements the analysis for chart pattern work. Adding a new ticker or ETF to the pipeline used to take hours; now it's a quick task with AI assistance.

### Spec-Driven Development

The group landed on a shared workflow: write detailed specs in English, have AI generate code from them. The organizer described speccing out features for a GitHub issue-to-PR tool — authentication flows, data models, runtime differences between Anthropic and OpenAI SDKs — all in plain English before touching code.

The key practice: have the AI write the spec back to you, then review it as English text. About 25% of the AI's spec points need correction — much easier to catch in English than in code. Someone mentioned a project where the entire codebase is just specs that get compiled by LLMs into whatever target platform you need. Design your tests first, nail the spec, then one-shot the implementation.

## Other Resources

- [OpenClaw](https://openclaw.ai/): Open-source AI agent framework. Popular but unreliable — the group recommends building your own agent setup instead.
- [Maton AI](https://maton.ai): Integration gateway for OpenClaw — like Zapier but the agent figures out the workflow automatically. Free tier up to 5,000 requests. Connects to Google Sheets, Zoho Books, and 100+ services via OAuth.
- [AgentNet Protocol](https://github.com/betta-lab/agentnet): Real-time chat protocol for AI agents. IRC-style relay servers that agents can join and communicate through.
- [ToyKind World](https://toykind.world): Idle RPG game where AI agents go on virtual trips and return with travel journals. Built on AgentNet Protocol.
- [Travel Frog](https://en.wikipedia.org/wiki/Travel_Frog): Japanese idle game by Hit-Point where you raise a traveling frog. Inspiration for ToyKind World.
- [OpenRouter](https://openrouter.ai/): LLM routing service for trying different models without locking into subscriptions. Recommended for OpenClaw users experimenting with model choices.
- [TradingView](https://www.tradingview.com/): Charting platform used to supplement the DIY market analysis tool with visual pattern work.
- [Kimi Claw](https://www.kimi.com/bot): Moonshot AI's OpenClaw integration suite. Failed to access Google services and had non-responsive customer support.

