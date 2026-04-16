---
Title: AI Breakfast #37
Date: April 16, 2026
Time: 8:00 AM - 10:30 AM
Author: Ching Jui Young
---

## Executive Summary

At AI Breakfast #37, our group of engineers, founders, and tech enthusiasts discussed [AI-assisted tax filing](#ai-tax-filing-close-but-not-careful), [the growing rivalry between OpenClaw and Hermes Agent](#the-agent-shakeout-openclaw-vs-hermes), [open-source model breakthroughs from Google and PrismML](#gemma-4-and-the-1-bit-frontier), and [how China's autonomous driving stack undercuts Tesla on price](#autonomous-drivings-300-hardware-stack). Attendees also shared their latest projects, including [OmniClaude](#omniclaude-build-software-from-your-phone), a mobile-first workspace for orchestrating AI coding agents.

## Summary

- [AI Tax Filing: Close But Not Careful](#ai-tax-filing-close-but-not-careful) — saved $150 on taxes, nearly reported the wrong numbers
- [The Agent Shakeout: OpenClaw vs Hermes](#the-agent-shakeout-openclaw-vs-hermes) — nobody got OpenClaw working properly, and Hermes Agent is more reliable
- [Gemma 4 and the 1-Bit Frontier](#gemma-4-and-the-1-bit-frontier) — laptop-class open models and an LLM running in your browser tab
- [Autonomous Driving's $300 Hardware Stack](#autonomous-drivings-300-hardware-stack) — China's modular approach vs Tesla's $15,000 software unlock
- [OmniClaude: Build Software From Your Phone](#omniclaude-build-software-from-your-phone) — a mobile-first agent workspace for orchestrating AI coding agents
- [AI Coding Without a Safety Net](#ai-coding-without-a-safety-net) — when the backend goes down, nobody remembers how to code by hand

## Group Discussions

### AI Tax Filing: Close But Not Careful

One attendee used an AI tool to file US taxes and saved roughly $150 over TurboTax. The catch: it pulled the wrong standard deduction amount ($15,000 instead of the current $15,267) and generated an incorrect mailing address, which had already been sent to family members to post. Small errors, but the kind that compound when nobody double-checks.

The group's broader frustration: the US tax system feels deliberately complex, propped up by lobbying from companies like Intuit that profit from the confusion. Singapore auto-files your taxes and even says "thank you for your contribution to nation building" on the notice. The US form leads with fines. AI can navigate the complexity, but it still trips on the details that matter most.

### The Agent Shakeout: OpenClaw vs Hermes

OpenClaw frustration continues, but this week it was first-hand. One attendee spent days trying to get it running to auto-generate Douyin videos -- got through step three of the setup before hitting token issues and permission requests that felt dangerously broad. They stopped when they heard something better was coming.

That something is [Hermes Agent](https://hermes-agent.org/), a self-improving AI agent from Nous Research. It's currently #2 on [OpenRouter's app rankings](https://openrouter.ai/apps) behind OpenClaw, but the group's consensus was that it's significantly more reliable. One attendee who spent three days fighting OpenClaw's setup recommended Hermes as the first thing to try. Another suggested [Claude's desktop app](https://claude.ai/) with computer use as a safer alternative that doesn't require CLI setup at all -- particularly for non-technical users who just want task automation.

### Gemma 4 and the 1-Bit Frontier

Two open-source model releases caught the group's attention. [Gemma 4](https://blog.google/innovation-and-ai/technology/developers-tools/gemma-4/) from Google ships under Apache 2.0 -- fully open, no restrictions, better licensing than Llama. The 31B dense model ranks top-three among open-source models and fits on a laptop. One attendee highlighted the architectural innovation: hierarchical embedding layers, which help maintain quality at much smaller sizes.

Even more striking: [Bonsai](https://prismml.com/news/bonsai-8b) from PrismML, a truly 1-bit trained 8B model that fits in ~1GB and [runs in your browser via WebGPU](https://huggingface.co/spaces/webml-community/bonsai-webgpu). It can produce working code. The group found this more exciting than raw benchmark numbers -- if a useful model runs in a Chrome tab, the deployment story changes completely.

### Autonomous Driving's $300 Hardware Stack

An engineer working in autonomous driving broke down how China's EV ecosystem actually works. It's modular, like building a PC. Car manufacturers buy chips from compute providers (Nvidia, Qualcomm, Horizon, Huawei), cameras from sensor suppliers, and software from companies like [Momenta](https://www.momenta.ai/). A software provider handles integration, and the car rolls off the line.

The jaw-dropping number: the full sensor suite, compute platform, and cabling for a mid-range Chinese car costs under $300. Tesla charges consumers $15,000 to unlock the same capabilities in software -- on hardware that ships in every car regardless. China has 20-50% of new car brands shipping with some level of autonomous capability, versus essentially just Tesla and Waymo in the US. The sheer volume creates a data flywheel: more cars, more data, cheaper sensors, better models.

The Xiaomi car illustrates the model. They didn't build a car -- they designed one, handed manufacturing to Magna (an Austrian contract manufacturer), bought sensors from Continental and Sony, chips from Nvidia, and software from Momenta. Three years from concept to road.

### OmniClaude: Build Software From Your Phone

An attendee returned with a live demo of OmniClaude, a workspace for dispatching and monitoring Claude Code agents from any device -- phone, tablet, or laptop. Each project gets a manifest, phased plans, and the ability to spin up parallel agents on separate git worktrees.

The key insight from building it: existing tools assume you're at a laptop. OmniClaude's mobile-first design turns dead time -- metro rides, waiting rooms -- into productive sessions. You plan work, dispatch agents, and review results. The agents run on a US-based VPS, so there are no VPN issues and work continues even when the phone disconnects.

The waitlist opened during breakfast -- early access is free. The group's immediate question was whether it uses your own Claude subscription, and the answer is yes. The tool helps you burn through your $100/month allocation by running five agents in parallel instead of one.

### AI Coding Without a Safety Net

The same attendee shared a telling anecdote about dependence. Their AI backend went down for 15 minutes -- unclear whether it was a global outage or VPN issues -- and they simply stopped working. Couldn't code without it. A year ago, AI was autocomplete. Now it's "take this CSV, build a dashboard, deploy it so my colleagues can see it" -- done in a minute.

The group traded similar observations. One attendee described the progression through their boss's annual tradition of animating a photo of chocolate bunnies at Easter: 2024's attempt was "animated pixels," 2025 was good but had artifacts, 2026's was flawless. Each year the previous version looked primitive. The unsettling question isn't whether AI is improving -- it's how quickly you forget what "impressive" looked like twelve months ago.

AI code review is following the same curve. [CodeRabbit](https://www.coderabbit.ai/) comments on pull requests used to be 100% noise. Now roughly half are genuinely useful, and the cost is essentially zero. One engineer's workflow: write code with AI, then have a *different* AI model review it from a different context. The models catch each other's blind spots.

## Other Resources

- [Hermes Agent](https://hermes-agent.org/): Self-improving AI agent from Nous Research with 40+ built-in tools, multi-platform messaging support, and persistent memory. Group's recommended alternative to OpenClaw.
- [Gemma 4](https://blog.google/innovation-and-ai/technology/developers-tools/gemma-4/): Google's open-source model family under Apache 2.0 license. The 31B dense model fits on a laptop and ranks among the top open-source models.
- [Bonsai](https://prismml.com/news/bonsai-8b): PrismML's 1-bit trained 8B model (1.15GB). Runs in the browser via WebGPU and produces working code despite being 1/14th the size of full-precision equivalents.
- OmniClaude: Mobile-first workspace for orchestrating Claude Code agents across devices. Manages git worktrees, parallel agents, and project planning from your phone. Currently in early access with a waitlist.
- [CodeRabbit](https://www.coderabbit.ai/): AI code review tool that comments on pull requests. Quality has improved significantly -- now roughly half of comments are actionable.
- [Momenta](https://www.momenta.ai/): Chinese autonomous driving software provider powering vehicles for Mercedes-Benz, BMW, and Xiaomi. The integration layer between chips, sensors, and car manufacturers.
- [Neon](https://neon.com/): Serverless Postgres database. Mentioned as a lighter alternative to Supabase -- more bare-metal, fewer wrapper features.
- [Sam Altman New Yorker Profile](https://www.newyorker.com/magazine/2026/04/13/sam-altman-may-control-our-future-can-he-be-trusted): Ronan Farrow's 16,000-word investigation. The group discussed the pattern of misrepresentation documented across 100+ interviews.
- [Xianyu](https://www.trip.com/guide/info/xianyu.html): China's largest secondhand marketplace (Alibaba). One attendee is building an app to make it accessible to foreigners -- described it as "Craigslist of China" where knowing the right search terms unlocks anything.
