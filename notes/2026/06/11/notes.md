---
Title: AI Breakfast #43
Date: June 11, 2026
Time: 9:00 AM - 10:30 AM
Author: Ching Jui Young
---

## TL;DR

- [A Compliance App, Built Solo in a Month](#a-compliance-app-built-solo-in-a-month) — non-coder shipped a paid pilot
- [Auditing Is Pattern Matching](#auditing-is-pattern-matching) — but the signature still carries liability
- [Service as Software, Not Slides](#service-as-software-not-slides) — consulting's new deliverable is the tool
- [AI Creative Output Still Reads as Fake](#ai-creative-output-still-reads-as-fake) — clients buy it, designers refuse
- [The 90s Computer Lesson on AI Adoption](#the-90s-computer-lesson-on-ai-adoption) — bolt-on AI doesn't pay; rewiring does
- [The Skill That's Quietly Decaying](#the-skill-thats-quietly-decaying) — debugging atrophies as AI does more
- [Quick Hits](#quick-hits) — deployment's last mile, dating apps can't take money, a regret meter for texts, an accountant shipping Veo 3 reels

## A Compliance App, Built Solo in a Month

The morning's demo: a compliance auditor, no software background, shipped a working app to a paying pilot in about a month. It takes source docs (PDFs, Word, images), runs them against a chosen standard (EU MDR, ISO 27001, etc.), and returns pass/fail per checkpoint with citations.

Each checkpoint is a small skill the agent runs — some trigger a SQL lookup against a regulation DB, some depend on the result of an earlier check, some carry a sample output to match against. Built in VS Code with [Claude Code](https://www.anthropic.com/claude-code) and [DeepSeek](https://www.deepseek.com/), after a first prototype on ByteDance's [Coze](https://www.coze.com/).

The mid-build story was the most useful part. A month ago the demo was polished but faked — front-end rendered, calls returned plausible JSON, nothing worked end to end. She spent the last few weeks reviewing every function, decoupling modules, and stopping the agent from papering over gaps with fallbacks. Her lesson for non-engineers: terminology is the unlock. Name what you want — "module," "fallback," "VPS," "environment mismatch" — and the agent stops guessing.

## Auditing Is Pattern Matching

The sharper insight underneath the demo: most auditing isn't expertise. It's checklist matching. Auditors brand by domain — sustainability, functional safety, cybersecurity — but the job is matching the right documents to the right clauses. The top 10–20% understand the underlying tech and the risk the regulation targets. The other 80%, in her telling, are exactly what AI replaces.

The honest caveat the table pushed back with: auditors carry liability. The signature on a compliance report is a legal artifact, not a knowledge artifact, and AI can't sign. So the product probably doesn't replace auditors — it lets the top 10–20% run their book at much higher leverage and squeezes the middle out underneath them.

## Service as Software, Not Slides

She also reframed her business model in a way the table latched onto: not software-as-a-service, but service-as-software. The old consulting deliverable was slides a client filed and ignored. The new one is a working tool embedded in the client's process, recommending continuously.

The trick is modular customization. Input layer (PDF/Word/image) and output layer (the client's report template) vary per engagement; the core pipeline stays the same. Each client thinks they bought a bespoke system. Each engagement reuses 80% of the last one. That's the consulting margin most agencies leave on the table.

## AI Creative Output Still Reads as Fake

A marketing and PR consultant brought a designer-generated sample — a summer event poster, full of ice and fruit, technically clean. She refused to use it. "It's so fake." Her clients push for AI because it's cheaper than a photo shoot. Her designers push back because their pride is on the line. The result: a stalemate where good designers spend hours editing AI output into something worse than starting from scratch.

A fashion photographer from London, recently moved to Shanghai, gave the harder version: photography is becoming "glorified scanning." The artistry isn't the image anymore — it's feeding the model clean, well-framed input it can transform. Video has more runway, but the cost incentive to automate is enormous — he cited a recent luxury exhibition with 50 short films, each crewed by dozens to hundreds. That's why he's looking for a different business to build.

A media-agency partner whose firm ships ~10,000 pieces a month framed it differently: the question isn't whether AI can make content. They can't tell their own AI work from human work in the feed anymore. Content is now infinite, so the agency's job has to move up the stack — from pixels to business narratives, supply-chain analyses, and proposals that shape client decisions. He demoed a 20-minute auto-generated client proposal with custom branding and layered analyses. Verdict: the prose reads a half-step generic, but the layout and data work are good enough that the next iteration is just craft.

## The 90s Computer Lesson on AI Adoption

The 3D-printing-company architect from earlier sessions gave the framing of the morning. In the early '90s, companies put computers on every desk and complained for years that productivity didn't move. The gains only landed once operations were rebuilt around the computer, not bolted onto paper. AI is in the same phase. Companies adopting it in pockets report the same flat ROI. The ones who go AI-native — single graph of every data source, single entry point for every team — start to see the curve bend.

His implementation: a graph database where every piece of company data (marketing copy, sales notes, engineering tickets, monitoring traces) lives with NLP analysis on top, queried through one AI-native interface. Engineers, marketers, and execs hit the same graph through the same prompt. Before building a predictive model, they run dimensionality analysis to find low-variance data — what's too thin to model usefully — so they know exactly what to instrument next. That last step is the discipline most "AI adoption" projects skip.

## The Skill That's Quietly Decaying

A related warning from the same architect: as juniors ship faster with AI, debugging is the skill quietly atrophying underneath. His team spent a week stuck on a bug; he found it in a morning. The faster people ship, the less practice they get tracing a multi-domain problem to root — and AI still can't reliably crack distributed, real-time, cross-service bugs.

An ex-Google engineer pushed back: he doesn't read code anymore. UI misbehaves, he screenshots it to the agent, which finds and fixes its own bug. Works until it doesn't — and nobody at the table thinks current models can take you the rest of the way. The skill gap is real; the timeline to closing it isn't.

## Quick Hits

**Deployment's last mile.** Builder consensus on what to use when local works but the cloud fights you: [Digital Ocean App Platform](https://www.digitalocean.com/products/app-platform) for solo web apps — auto-detects the stack, deploys on push, ~$5–10/month. AWS and GCP are powerful and miserable to click through. The newer move: grab an API token from [Vercel](https://vercel.com/) or your registrar, drop it in a config file, and tell Claude Code to deploy. The agent picks the region, writes the Terraform, ships.

**Dating apps can't take money.** The ex-Google engineer building video-based speed-dating hit the wall every founder in the category hits: Stripe, Mercury, [Airwallex](https://www.airwallex.com/), and most startup-friendly processors ban dating as "adult/escort." Only options left: high-risk processors built for firearms and chargebacks — until you're big enough that any processor will take you. Not a product problem, a payments problem.

**A regret meter for texts.** The fashion photographer's side project: a layer that flags texts you're about to regret before sending. Three options — see the regret prediction and rewrite, send anyway, or let the AI rewrite. Pitched as conflict reduction; the table joke was that the cheaper way to save money in a relationship is to fight less. Scoping it as either a standalone app or an embed in a dating product.

**An accountant in Suzhou is shipping [Veo 3](https://deepmind.google/models/veo/) reels.** A digital-transformation consultant flagged his accountant — non-technical, "just figured it out" — now producing a few seconds of [Kling](https://klingai.com/) or Veo 3 per week for his wife's WeChat channel. A marker of where adoption actually is: the people who don't read about AI are quietly using it for the boring jobs first.

## Other Resources

- [Claude Code](https://www.anthropic.com/claude-code): Anthropic's terminal coding agent. The compliance-app builder's primary tool, via VS Code.
- [DeepSeek](https://www.deepseek.com/): Chinese frontier model behind the compliance app. Cheaper API, picked over Anthropic's.
- [Coze](https://www.coze.com/): ByteDance's no-code agent platform. The early-prototype home before the founder moved to a full stack.
- [Digital Ocean App Platform](https://www.digitalocean.com/products/app-platform): Push-to-deploy PaaS with auto stack detection. The table's pick over AWS for solo builders.
- [Vercel](https://vercel.com/): Front-end hosting that pairs with token-based CLI deploys from Claude Code.
- [Airwallex](https://www.airwallex.com/): Multi-currency payments platform. Also blocks dating apps.
- [Kling](https://klingai.com/): Kuaishou's text-to-video model. Already in non-technical small-business hands in China.
- [Veo 3](https://deepmind.google/models/veo/): Google DeepMind's video model. What amateurs use alongside Kling for short-form social.
- [Genie 3](https://deepmind.google/discover/blog/genie-3-a-new-frontier-for-world-models/): Google DeepMind's interactive-world generator. Cited as why a member shorted a game-publisher stock — playable AI worlds are an existential question for game studios.
