---
Title: AI Breakfast #30
Date: March 5, 2026
Time: 9:00 AM - 10:30 AM
Author: Ching Jui Young
---

# AI Breakfast #30

## Executive Summary

- [Eliminating humans from PR review](#eliminating-humans-from-pr-review) — auto-deploy through steroid-level testing
- [Orchestration layers and mobile dev](#orchestration-layers-and-mobile-dev) — controlling agents from your phone
- [Knowledge management](#knowledge-management-is-still-a-mess) — no one has a good system yet
- [Self-hosted hardware](#self-hosted-hardware-and-networking) — hardened servers and VPN workarounds in China
- [Agent safety](#agent-safety-and-alignment) — probabilistic tools need deterministic guardrails
- [Upskilling teams](#upskilling-teams-on-ai) — structured learning paths vs. weekly workshops

## Group Discussions

### Eliminating Humans from PR Review

AI closes the gap between "problem described" and "code written" almost instantly — but review and testing create a new chokepoint. A software architect's answer: make testing so thorough that humans become unnecessary.

His stack: integration tests on every push to staging via [Blacksmith](https://www.blacksmith.sh/) runners (cheap enough to run the full suite every time), central schema registries with formal contracts between services to catch breaking changes at compile time, and [tree-sitter](https://tree-sitter.github.io/) AST parsing on every PR to identify changed code paths — then cross-referencing with [ClickStack](https://clickhouse.com/use-cases/observability) observability data to verify no errors in affected spans.

The contrarian take: stop resisting. One developer reviews maybe 20% of AI-generated code now — gives him "stomach problems," but ships faster. The architect's analogy: companies that fully automated Excel always beat those that kept humans in the loop. With sufficient testing, auto-deploy from problem description to production should be the goal.

### Orchestration Layers and Mobile Dev

A solopreneur demoed a custom orchestration platform — a web-based control center for coding agents that syncs across devices in real-time. Dispatch tasks from your phone, watch agents work, review PRs anywhere. It runs on an overseas server (no VPN needed from China) and sessions persist when you close your laptop.

The key unlock: "small chunks of time." Five-minute windows to kick off a task or course-correct an agent. [Happy](https://happy.engineering/) (a Claude Code mobile wrapper) serves a similar purpose — one attendee used it extensively while driving across Australia, coding via phone while the agent ran remotely.

The group agreed the orchestration layer is the missing piece — not just for solo productivity but team-level agent management with observability and permission controls. [Helix](https://helix.ml/) was mentioned as another platform taking this approach.

### Knowledge Management Is Still a Mess

AI generates mountains of content — transcripts, chat logs, summaries, recommendations — but nobody has a good retrieval system. One person records meetings, transcribes with [TurboScribe](https://turboscribe.ai/) (preferred over [Sonix](https://sonix.ai/) for accuracy), then manually prompts an LLM for summaries and action items.

A data team lead at a major beauty company raised the core question: how should knowledge management work when both humans and agents need access? Meeting insights, demo recordings, agent outputs all need classification and search. Traditional tools (OneNote, Confluence, Notion) weren't built for this. Someone quipped it "sounds like a product" — and they're right.

### Self-Hosted Hardware and Networking

An AI consultant spent five weeks driving across Australia while hardening a [Proxmox](https://www.proxmox.com/) server on an N100 mini PC — coding through [Happy](https://happy.engineering/) on his phone while belaying his daughters at rock climbing. The setup: five LXC containers, one security box holding all keys, and an [OpenClaw](https://openclaw.ai/) instance with zero direct access to secrets.

[Tailscale](https://tailscale.com/) works beautifully for mesh networking — until you're in China where it's blocked. The workaround: tunnel Tailscale through a separate VPN. Several people compared router-based VPN services from Chinese providers on WeChat, ranging from $260 to $1,600/year.

### Agent Safety and Alignment

Coding agents are probabilistic. Two questions matter: is the task small enough for the probability to land right, and is the agent fully aligned with your intent? Someone referenced [Anthropic's sabotage risk report](https://alignment.anthropic.com/2025/sabotage-risk-report/) — with enough autonomy, an agent could act against your instructions. This reinforced the consensus that observable orchestration with permission controls isn't optional.

### Upskilling Teams on AI

A data team lead partners with HR to create structured learning paths with prerequisites — complete this [Google ADK](https://google.github.io/adk-docs/) course before attending the meeting on agent evaluation. Different tracks for builders, project managers, and AI leads.

A software architect takes a different approach: weekly workshops, every Friday, relentlessly. Consistency matters more than curriculum. Even non-coders on his team now use branching workflows and validate before merging. The forcing function: make it visible enough that people want to be "that powerful."

## Other Resources

- [Claude Code](https://docs.anthropic.com/en/docs/claude-code): Anthropic's CLI coding agent. Used with a multi-agent spawning pattern — one agent creates new terminal panes for parallel tasks.
- [Codex](https://openai.com/codex/): OpenAI's coding agent (CLI + app). Multiple attendees use it, including a non-technical co-founder who codes with it all day.
- [Happy](https://happy.engineering/): Mobile wrapper for Claude Code. Control sessions from your phone. Used for coding while driving across Australia.
- [Blacksmith](https://www.blacksmith.sh/): GitHub Actions runner plugin. Fast, cheap CI — run full integration tests on every push to staging.
- [ClickStack](https://clickhouse.com/use-cases/observability): ClickHouse-based observability stack. Replaced Grafana — all metrics, logs, and traces in one place, easy for agents to query via MCP.
- [Tree-sitter](https://tree-sitter.github.io/): AST parser for detecting changed code paths in PRs, cross-referenced with observability data for automated validation.
- [TurboScribe](https://turboscribe.ai/): Whisper-based transcription. More accurate than Sonix for meeting transcriptions.
- [Sonix](https://sonix.ai/): AI transcription with a proprietary model. Lower accuracy than TurboScribe in testing.
- [Google ADK](https://google.github.io/adk-docs/): Google's Agent Development Kit for Vertex AI. Used at a major beauty company for enterprise agent development.
- [AgentOps](https://www.agentops.ai/): AI agent observability platform. Being evaluated as a buy-vs-build alternative for agent monitoring.
- [Arize](https://arize.com/): LLM observability and evaluation. Mentioned alongside AgentOps for agent quality monitoring.
- [Tailscale](https://tailscale.com/): WireGuard-based mesh VPN. Makes any device feel like it's on LAN — works everywhere except China.
- [Proxmox](https://www.proxmox.com/): Open-source virtualization platform. Running LXC containers on an N100 mini PC for self-hosted AI development.
- [OpenClaw](https://openclaw.ai/): Open-source personal AI assistant (formerly Clawdbot) that runs on your own hardware. Talk to it through iMessage, Telegram, WhatsApp, and other messaging platforms. Self-hosted on hardened hardware with no direct access to secrets.
- [Helix](https://helix.ml/): Agent orchestration platform with desktop sandboxes and a single orchestration plane.
- [Rokid Glasses](https://global.rokid.com/): AR glasses with built-in display screens. Demoed at the breakfast.
- [Ray-Ban Meta Glasses](https://www.ray-ban.com/usa/ray-ban-meta-ai-glasses): Smart glasses with camera and audio — better build quality than Rokid but no screen. Used hands-free for filming rock climbing.
- [Coze](https://www.coze.com/): ByteDance's no-code AI app builder. Used to build certification workflow demos on an iPad.
- [Anthropic Sabotage Risk Report](https://alignment.anthropic.com/2025/sabotage-risk-report/): Assessment of whether AI agents might act against instructions when given sufficient autonomy.
