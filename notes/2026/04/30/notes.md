---
Title: AI Breakfast #38
Date: April 30, 2026
Time: 8:00 AM - 10:30 AM
Author: Ching Jui Young
---

## Executive Summary

At AI Breakfast #38, our group of engineers, founders, and industry veterans gathered around the prompt "where do you need help with AI?" The conversation ranged from [building a shared "Context Lake" for humans and agents](#building-a-context-lake), [a team that ditched human pull request reviews entirely](#going-pull-request-review-less), [the daily duel between Codex and Claude Code inside Zed](#zed-and-acp-become-the-multi-agent-cockpit), and [picking AI models inside the Great Firewall](#picking-ai-models-inside-the-great-firewall). Members also shared their projects, including a [Cursor-for-Games tool for Unity and Unreal developers](#cursor-for-games-bringing-ai-to-unity-and-unreal), a [traceable RAG system for the certification industry](#rag-with-traceability-for-the-certification-industry), and a [philosophy for turning engineers into agent orchestrators](#from-engineers-to-agent-orchestrators) instead of laying them off.

## Summary

- [Where Do You Need Help With AI?](#where-do-you-need-help-with-ai) — the opening prompt and the friction members are still feeling
- [Building a Context Lake](#building-a-context-lake) — pulling logs, traces, transcripts, and metrics into one MCP-accessible space
- [Going Pull-Request-Review-Less](#going-pull-request-review-less) — replacing human PR review with weekly audit pairing sessions
- [Zed and ACP Become the Multi-Agent Cockpit](#zed-and-acp-become-the-multi-agent-cockpit) — running parallel agents across multiple codebases from a single editor
- [Codex Versus Claude Code](#codex-versus-claude-code) — the verbose specialist and the friendlier generalist
- [Cursor for Games: Bringing AI to Unity and Unreal](#cursor-for-games-bringing-ai-to-unity-and-unreal) — a startup tackling the editor problem unique to game dev
- [RAG With Traceability for the Certification Industry](#rag-with-traceability-for-the-certification-industry) — every sentence in the report has to point back to a source
- [Picking AI Models Inside the Great Firewall](#picking-ai-models-inside-the-great-firewall) — DeepSeek, Kimi, GLM, and the surprising winner for "find me a restaurant"
- [Rust All the Way Down](#rust-all-the-way-down) — replacing Nginx with Pingora and trading a config file for a code path
- [From Engineers to Agent Orchestrators](#from-engineers-to-agent-orchestrators) — upskilling instead of layoffs

## Group Discussions

### Where Do You Need Help With AI?

The opening prompt drew a wide spread of friction points. The host admitted he still hates how AI writes — the moment a prompt mentions "LinkedIn", the model snaps into the worst kind of cringe-worthy voice, and even careful prompting produces prose that a human reviewer can sniff out as AI in seconds. Several attendees agreed that switching models, especially between [GPT-5](https://openai.com/index/introducing-gpt-5/) and Claude, changes the writing personality more than any prompt tweak does.

A founder building AI-native mobile games said the bottleneck is simply hours in the day — he should have built his AI clone last month, not this month. A software developer felt the opposite anxiety: tooling moves so fast that whatever she configures this week will be obsolete next week, and she keeps abandoning half-built setups before they pay off. A software architect at a 3D printing company said his pain point is that the harness around agents still does not let him hook them deeply enough into the rest of his systems — but he refuses to build that himself, because by the time he ships it, the upstream tools will have caught up.

An engineer transitioning from insurance to insure-tech framed his help differently: he is not looking for tools, he is looking for opportunities to spot AI applications across distribution, customer service, fraud detection, and claims that genuinely lift efficiency without removing the human entirely from the loop.

### Building a Context Lake

The architect's main project — borrowed from a term coined by [Port.io](https://www.port.io/) — is what he calls a Context Lake. It is a shared space that every human and agent in the company can query, fed continuously by traces, logs, build metrics, security warnings, customer requests, business KPIs, and meeting transcripts. When a critical error spikes overnight, the system can auto-create an issue, dispatch an agent to investigate, and post a Slack alert to the right person without anyone manually triaging. Every engineer is expected to log in in the morning and ask "what's going on?" before starting their day.

The architectural choice he stressed was deliberately *not* using a traditional data lake. Iceberg, Trino, and Polaris all change shape every few months, and a single schema migration cascades through everything. Instead, each data source sits behind its own MCP tool. If the source structure changes, only that one tool gets updated; the agent-facing interface stays clean. He wants to add a graph database next, because graph traversal — finding "this warning is related to that customer complaint via this deployment" — is something agents currently brute-force their way through and a proper graph would make trivial.

The closest comparison the table reached was a [Langfuse](https://langfuse.com/)-style observability layer fused with a knowledge base, but with the explicit goal that humans rarely open a UI — they just chat with the agent.

### Going Pull-Request-Review-Less

The same team has eliminated human pull request reviews. Trunk-based merges, autoformatting, linting, schema checks, unit tests, and a heavy integration test suite that runs on every main-branch merge do the gatekeeping. Copilot or another agent posts a review, and a different model double-checks the output. PRs ship without a human signing off.

The replacement for human review is a weekly or biweekly audit. The senior engineer sits down with each developer for what feels like a traditional pair-coding session, walks the recent merges, and writes the findings into an audit log inside the repo itself. That log then becomes context the next time an agent works on that codebase — "we had a man-in-the-middle issue here last quarter, check for that pattern." A handful of paths still trigger mandatory human review: federated API schema changes, database migrations, and anything that breaks a public contract.

The reported effect on velocity was significant — shipping shifted from once every week or two to every two or three days — and developers no longer wait on a single bottleneck reviewer. The architect framed it as not "review-less" so much as "review at a different cadence", with the audit serving as targeted training for individuals rather than blanket review for everyone.

### Zed and ACP Become the Multi-Agent Cockpit

The biggest workflow shift in the past two weeks for several attendees was [Zed's agent panel via ACP](https://zed.dev/agent-client-protocol) (Agent Client Protocol). Unlike Cursor, which locks you to its model offerings, Zed lets you bring your own agent — Claude Code subscription, Codex, whatever — and run several of them in parallel against different projects from a single editor. Sticky terminals, the diff view, file explorer, and git panel all stay live as you switch sessions, which the architect said was the missing piece in Claude Code's standalone desktop app.

The standalone Claude desktop app drew unanimous complaints — frequent crashes, terminals that lose state on tab switches, and a clunky diff experience. Codex got mixed reviews depending on the user. One attendee called the Codex desktop app ten times better than Claude's; the architect said his Codex desktop has crashed plenty too. The shared landing point was that an editor with proper tooling around it (Zed, plus ACP) beats any of the standalone agent apps for serious multi-project work.

A useful detail: the architect's prompts have become very minimal because skills, tool calls, and surrounding context do most of the heavy lifting. He loads up the agent with everything it needs to know structurally, then asks for very small actions.

### Codex Versus Claude Code

A long thread compared Codex and Claude Code as daily drivers. The Codex camp argued that OpenAI's models are intentionally a blanker slate with much stronger instruction-following — a "super nerd, harder to communicate with but goes way deeper." Claude, by contrast, was described as friendlier and easier to start with, but more willing to make assumptions and quit early. One attendee strongly recommended trying [GPT-5.1 Codex Max](https://openai.com/index/gpt-5-1-codex-max/) and called it a huge upgrade.

The counter-view from the architect was that Claude Code "just gets it" without much prompting because his skills and MCP context do the work, and that the difference between the two models matters less when the surrounding harness is rich. Two members are on the [Codex $100/month plan](https://openai.com/chatgpt/pricing) and very happy with it; one mentioned an article suggesting Claude uses roughly four times fewer tokens for the same work because Codex is more verbose.

A frequent annoyance with Codex: daily updates and small regressions. One attendee mentioned an open bug where folder mentions stopped working two weeks ago. The trade-off is a ship-fast tool versus a slightly more stable one.

### Cursor for Games: Bringing AI to Unity and Unreal

A founder visiting from outside China gave a quick walkthrough of [PlayCo's](https://www.play.co/) new AI product, aimed at the roughly 8 million professional game developers worldwide. Around 80% of them work in Unity or Unreal, both of which have an editor problem: you can point Claude at the code, but a huge amount of game development happens in the editor itself — scenes, prefabs, blueprints — that text-based agents can't touch directly. Hooking an MCP server up to the editor works, but the experience today is janky and only the most advanced developers will tolerate it.

The pitch is "Cursor for games" — make the AI-assisted game-dev experience as smooth as the AI-assisted web-dev experience, but built specifically for professionals working inside Unity and Unreal editors. The team has a Godot integration too, which was easy to build, and considered Roblox and PlayCanvas, but Unity is the priority because of the mobile market. Launch is targeted for May.

The market-size argument was straightforward: Codex, Cursor, and Claude are each running at roughly $1–2 billion in annualized revenue. Capturing even a tenth of that within the game-developer slice is a serious business.

### RAG With Traceability for the Certification Industry

A solo founder with a background at a German testing-and-certification company is building tools for the regulatory certification industry. The work is heavily RAG: the workflow gathers information from a client, maps it against the relevant regulations, and produces a report with comments and judgments. The report has to be defensible — every sentence needs to trace back to either the client's input or a specific clause in the regulation, because at the end of the chain a human tester signs the document and is liable for what is in it.

She estimated that even with a strong system, every comment will need human evaluation for the next five to ten years. The realistic productivity gain is structural: a current team of ten typically has six or seven testers who run the machines, one or two admins who copy-paste raw data into formatted reports, and a senior reviewer. A good AI system collapses the admin role and the first-pass review role, leaving the testers with their domain expertise, an AI-drafted report, and a faster sign-off.

The architect responded by reframing this as the value-add of every domain expert in the room: AI now writes code, drafts UIs, and produces reports in a day, but it cannot supply the domain-specific eval loops that say "no, this number is too high, we know because of these ten years of internal data." That gap is what experienced operators are selling for the next few years — and probably what makes a custom-built solution worth more than a generic SaaS.

### Picking AI Models Inside the Great Firewall

The table compared notes on which models actually work well for daily use in China. [DeepSeek V4](https://api-docs.deepseek.com/news/news250928) was the consensus winner for code and back-end work — significantly better than its predecessor, very cheap, and the architect's team runs it as their default for non-sensitive workloads at their 3D printing company because they will eventually open-source the product under AGPL. [Kimi K2.6](https://moonshotai.github.io/Kimi-K2/) drew praise as a strong second; [Doubao](https://www.doubao.com/) also got a nod. [GLM](https://chatglm.cn/) was described as painfully slow and rate-limited right now; [OpenRouter](https://openrouter.ai/) was suggested as a way around that by switching providers.

The surprising finding from a recent visitor was that ChatGPT is shockingly good at China-specific local searches — restaurants, clinics, directions — better than DeepSeek or Gemini at the same task. DeepSeek did not even reliably estimate distances between Shanghai neighborhoods. One member explained the cultural reason: Chinese users do not generally open a separate AI app to find a restaurant. They open [Dianping](https://www.dianping.com/) or [Xiaohongshu](https://www.xiaohongshu.com/) and chat with the AI assistant baked into those apps, which is fed by the platform's own data. The standalone-LLM use case for "find me a restaurant" is largely a foreigner's habit.

### Rust All the Way Down

The 3D printing company has gone almost entirely Rust. The latest swap was replacing Nginx with [Pingora](https://github.com/cloudflare/pingora), the proxy framework Cloudflare open-sourced and uses internally. The trade-off is real: any routing change requires recompiling and redeploying instead of editing a config file. But Docker layer caching makes builds under a minute, the architect's team rarely changes routing, and they wanted everything — federated GraphQL, request routing, runtime — in one language.

For him, the pitch is not raw speed. It is stability and lower operational overhead: runtime errors in production have dropped sharply since the migration. The team is also experimenting with a [WASM runtime on Spin nodes](https://www.fermyon.com/spin) for workloads that need fast horizontal scaling — a 40-second cold start is fine for 15-minute scaling windows, and a queue handles the hand-off so nothing drops.

### From Engineers to Agent Orchestrators

The conversation closed on a recurring theme: as AI handles more of the implementation, what happens to the engineers? The architect's stance was firm — he is not thinking about layoffs, he is thinking about upskilling. By the middle of next year, he expects to no longer think of his team as engineers. He thinks of them as orchestrators, and being a good orchestrator looks a lot like being a good manager: time management, project decomposition, knowing when to step back from a problem and redirect the work.

He recommended one concrete habit for anyone trying to lead agents well — map everything topologically. He keeps large pieces of paper at home with the entire system laid out, because focusing on one component for too long blinds you to where the real bottlenecks sit. Step back, look at the whole tree, pick the one improvement that matters most this week, then zoom in.

The certification founder closed with a related observation: her clients are not yet ready for a "perfect system." They need someone who can equip them step by step over two or three years. That custom, hand-held service is exactly the kind of work AI cannot replace — and exactly the kind of work that pays.

## Other Resources

- [Zed editor](https://zed.dev/): Native Rust code editor with first-class multi-agent support via ACP. Several members switched to it in the past two weeks for parallel agent work across multiple repos.
- [Agent Client Protocol (ACP)](https://agentclientprotocol.com/): Open protocol that lets editors host any agent backend. Used in Zed to run a Claude Code subscription, Codex, and other agents side-by-side.
- [Pingora](https://github.com/cloudflare/pingora): Cloudflare's Rust framework for building HTTP proxies. One member's company replaced Nginx with it for stability and language consistency rather than speed.
- [Linear](https://linear.app/): Project management platform with built-in customer-request integrations across Discord, email, and WeChat. One member is trialing it as a layer above GitHub Issues for non-code work.
- [Port.io](https://www.port.io/): Internal developer portal company that originally coined the term "Context Lake," used as the inspiration for one member's shared agent context system.
- [Langfuse](https://langfuse.com/): Open-source LLM observability and tracing platform. The host uses it but is moving away from its UI in favor of agent-driven querying.
- [Plaud](https://www.plaud.ai/): Customer-request management platform that consolidates Discord, email, and WeChat threads. Mentioned as a single-purpose alternative before the discussion shifted to using Linear for the same role.
- [DeepSeek V4](https://api-docs.deepseek.com/news/news250928): Latest open-source model from DeepSeek, materially better than V3 and very cheap. The default model for one member's company across non-sensitive workloads.
- [Kimi K2.6](https://moonshotai.github.io/Kimi-K2/): Moonshot's latest model. Praised as a solid second behind DeepSeek for code work.
- [Doubao](https://www.doubao.com/): ByteDance's general-purpose model. Noted as good but not a daily driver for anyone at the table.
- [Dianping](https://www.dianping.com/): Chinese restaurant and local-services app. Brought up as the canonical example of an app whose built-in AI assistant beats any standalone LLM for finding places to eat.
- [Xiaohongshu](https://www.xiaohongshu.com/): Lifestyle and travel content platform. Recommended for travel and shopping recommendations, though one member warned its AI summaries can be unreliable.
- [Outline VPN](https://getoutline.org/): Self-hostable Shadowsocks-based VPN. One member runs it on AWS Lightsail at roughly $7/month and reports it has stayed reliable while other Shadowsocks setups get blocked.
- [F45 Training](https://f45training.com/): Functional fitness gym chain. The visiting founder uses it six days a week.
- [KubeCon Hong Kong 2025](https://events.linuxfoundation.org/kubecon-cloudnativecon-open-source-summit-ai-dev-china/): Last year's KubeCon was useful for one member; this year's edition in September will include a dedicated MCP day, which several attendees plan to attend.
- [Playco](https://www.play.co/): The studio behind the visiting founder's "Cursor for Games" product, also a publisher of casual mobile games for the US and Japan markets including a partnership with Line Messenger.
