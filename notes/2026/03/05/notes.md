---
Title: AI Breakfast #30
Date: March 5, 2026
Time: 9:00 AM - 10:30 AM
Author: Ching Jui Young
---

# AI Breakfast #30

## Executive Summary

This week: [the PR bottleneck problem](#eliminating-humans-from-pr-review), [orchestrating coding agents from your phone](#orchestration-layers-and-mobile-dev), [knowledge management in the AI era](#knowledge-management-is-still-a-mess), and [self-hosted infrastructure for AI development](#self-hosted-hardware-and-networking).

## Group Discussions

### Eliminating Humans from PR Review

The biggest thread of the morning: AI generates code so fast that PR review is now the bottleneck. A software architect laid out the core insight — the funnel from "problem described" to "code written" has widened to near-zero gap, but review and testing create a new chokepoint.

His solution: steroid-level testing infrastructure. Integration tests on every push to staging using [Blacksmith](https://www.blacksmith.sh/) runners (cheap enough to just run the whole suite every time). Central schema registries with formal contracts between services, so breaking changes get caught at compile time. And [tree-sitter](https://tree-sitter.github.io/) AST parsing on every PR to identify exactly which code paths changed, then cross-referencing that with [ClickStack](https://clickhouse.com/use-cases/observability) observability data to verify no errors in affected spans.

The contrarian take: stop resisting. One developer admitted he reviews maybe 20% of AI-generated code now and it gives him "stomach problems" — but ships faster. The architect pushed further: like Excel automation, any company keeping humans in the loop will be slower than one that doesn't. With sufficient test coverage, auto-deploy from problem description to production should be the goal.

### Orchestration Layers and Mobile Dev

A solopreneur demoed a custom orchestration platform he built — a web-based control center for coding agents that syncs across devices in real-time. Dispatch tasks from your phone, watch agents work, review PRs on the toilet. The key insight: it runs on an overseas server, so no VPN needed from China, and sessions persist when you close your laptop.

This sparked a broader conversation about unlocking "small chunks of time" — those 5-minute windows between activities where you can kick off a task, review a PR, or course-correct an agent going in the wrong direction. [Happy](https://happy.engineering/) (a Claude Code mobile wrapper) came up as a similar tool — one attendee used it extensively while driving across Australia, coding via phone while the agent ran remotely.

The group agreed: the orchestration layer is the missing piece. Not just for individual productivity, but for team-level agent management — observable, with permission controls and safety guarantees. [Helix](https://helix.ml/) was mentioned as another platform taking this approach with headless IDEs in containers.

### Knowledge Management Is Still a Mess

A recurring theme: we're generating mountains of AI-assisted content — meeting transcripts, chat logs, summaries, recommendations — but nobody has a good system for storing and retrieving it. One person records meetings, transcribes with [TurboScribe](https://turboscribe.ai/) (preferred over [Sonix](https://sonix.ai/) for accuracy), then manually prompts an LLM for summaries and action items.

The real question came from a data team lead at a major beauty company: how should knowledge management work in the AI era? Meeting insights, demo recordings, agent outputs — all need to be classified, searchable, and available to both humans and agents. The traditional tools (OneNote, Confluence, Notion) weren't built for this. Someone quipped it "sounds like a product" — and they're right.

### Self-Hosted Hardware and Networking

An AI consultant spent five weeks driving across Australia while setting up a hardened [Proxmox](https://www.proxmox.com/) server on an N100 mini PC — coding through [Happy](https://happy.engineering/) on his phone while belaying his daughters at rock climbing. The setup: five LXC containers, one security box holding all keys, and an [OpenCode](https://opencode.ai/) instance with zero direct access to secrets.

The networking rabbit hole went deep. [Tailscale](https://tailscale.com/) works beautifully for mesh networking — until you're in China where it's blocked. The workaround: tunnel Tailscale through a separate VPN. Several people compared VPN services, with prices ranging from $260 to $1,600/year for router-based solutions from Chinese providers on WeChat.

### Agent Safety and Alignment

A brief but pointed thread: coding agents are probabilistic, and the two real questions are whether the task is small enough for the probability to land right, and whether the agent is fully aligned with your intent. Someone referenced [Anthropic's sabotage risk report](https://alignment.anthropic.com/2025/sabotage-risk-report/) — if an agent has enough autonomy, it could act against your instructions. This reinforced the group's consensus that observable orchestration with permission controls isn't optional.

### Upskilling Teams on AI

A data team lead shared their approach to getting non-technical teams AI-literate: partnering with HR to create structured learning paths with prerequisites (complete this Google ADK course before attending the meeting on agent evaluation). Different paths for builders vs. project managers vs. AI leads.

A software architect took a different tack — weekly workshops, every Friday, relentlessly. The consistency matters more than the curriculum. Even non-coders on his team now use branching workflows and understand how to validate before merging. The forcing function: make it visible enough that people want to be "that powerful."

## Other Resources

- [Claude Code](https://docs.anthropic.com/en/docs/claude-code): Anthropic's CLI coding agent. Used by the organizer with a multi-agent spawning pattern — one agent creates new terminal panes for parallel tasks.
- [Codex](https://openai.com/codex/): OpenAI's coding agent (CLI + app). Multiple attendees use it, including a non-technical co-founder who codes with it all day.
- [Happy](https://happy.engineering/): Mobile wrapper for Claude Code. Run `happy` instead of `claude` and control your session from your phone. Used for coding while driving across Australia.
- [Blacksmith](https://www.blacksmith.sh/): GitHub Actions runner plugin. Fast, cheap CI — run your full integration test suite on every push to staging.
- [ClickStack](https://clickhouse.com/use-cases/observability): ClickHouse-based observability stack. Replaced Grafana — all metrics, logs, and traces in one place, easy for agents to query via MCP.
- [Tree-sitter](https://tree-sitter.github.io/): AST parser used to detect changed code paths in PRs, then cross-reference with observability data for automated validation.
- [TurboScribe](https://turboscribe.ai/): Whisper-based transcription tool. Found to be more accurate than Sonix for meeting transcriptions.
- [Sonix](https://sonix.ai/): AI transcription with a proprietary model. Lower accuracy than TurboScribe in testing.
- [Google ADK](https://google.github.io/adk-docs/): Google's Agent Development Kit for building agents on Vertex AI. Used at a major beauty company for enterprise agent development.
- [AgentOps](https://www.agentops.ai/): AI agent observability platform. Being evaluated as a buy-vs-build alternative for agent monitoring.
- [Arize](https://arize.com/): LLM observability and evaluation platform. Mentioned alongside AgentOps for agent quality monitoring.
- [Tailscale](https://tailscale.com/): WireGuard-based mesh VPN. Makes any device feel like it's on LAN — works everywhere except China.
- [Proxmox](https://www.proxmox.com/): Open-source virtualization platform. Used to run LXC containers on an N100 mini PC for self-hosted AI development.
- [OpenCode](https://opencode.ai/): Open-source AI coding agent for the terminal. Self-hosted on hardened hardware with no direct access to secrets.
- [Helix](https://helix.ml/): Private agent swarm platform with headless IDEs in containers and a single orchestration plane.
- [Rokid Glasses](https://global.rokid.com/): AR glasses with built-in display screens. Demoed at the breakfast.
- [Ray-Ban Meta Glasses](https://www.ray-ban.com/usa/ray-ban-meta-ai-glasses): Smart glasses with camera and audio — better build quality than Rokid but no screen. Used hands-free for filming rock climbing.
- [Coze](https://www.coze.com/): ByteDance's no-code AI app builder. Used by an attendee to build certification workflow demos on an iPad.
- [Anthropic Sabotage Risk Report](https://alignment.anthropic.com/2025/sabotage-risk-report/): Anthropic's assessment of whether AI agents might act against instructions when given sufficient autonomy.
