---
Title: AI Breakfast #38
Date: May 7, 2026
Time: 9:00 AM - 10:30 AM
Author: Ching Jui Young
---

## TL;DR

- **Reviewer agents are the pattern that ships.** Two members independently used writer-plus-reviewer agent loops for code reviews, executive-style consulting reports, and insurance claims attribution — agent pushback now beats human review for landing first drafts close to "shippable."
- **The em-dash is the new AI tell on LinkedIn.** Strip every "—" from your drafts even when grammatically correct; the table now closes any post on first sight of one.
- **Cheating is harder than measuring.** A South African insurer's China JV replaced OCR-ing blood pressure monitors with one multimodal prompt — "is this a real device or fake?" — and the same trick generalizes to vaccinations, weight scales, and lung-nodule follow-ups.

## Executive Summary

At AI Breakfast #38, our group of software architects, founders, engineers, and consultants discussed [a hands-on demo of Descript](#demo-descript), [the em-dash as the new AI tell](#the-em-dash-as-the-ai-tell), [reviewer agent patterns for code, claims, and consulting copy](#analyst-and-reviewer-agents-the-pattern-that-actually-ships), [multimodal anti-fraud in insurance](#storytelling-on-top-of-insurance-data), and [GraphRAG for invoice parsing](#graphrag-for-invoice-parsing). [Quick Hits](#quick-hits) covered the influencer-marketplace scraping treadmill and one contrarian read of quantum vs RSA. The group also kicked off a new format: weekly tool demos from members.

## Summary

- [Demo: Descript](#demo-descript) — transcript-driven video editor
- [The Em-Dash as the AI Tell](#the-em-dash-as-the-ai-tell) — LinkedIn's new tofu signal
- [Analyst and Reviewer Agents: The Pattern That Actually Ships](#analyst-and-reviewer-agents-the-pattern-that-actually-ships) — writer-plus-reviewer loops
- [Storytelling on Top of Insurance Data](#storytelling-on-top-of-insurance-data) — multimodal anti-fraud win
- [GraphRAG for Invoice Parsing](#graphrag-for-invoice-parsing) — graph layer beats vector search
- [Quick Hits](#quick-hits) — influencer scraping, quantum vs RSA

## Demo: Descript

A new format kicked off this week: one member demos a tool they use daily. First up was [Descript](https://www.descript.com/), a video editor where you edit the transcript and the video follows.

The core editing flow is genuinely fast. Record a screen capture with a webcam picture-in-picture, get an automatic transcript, and delete words from the text to delete clips. No timeline scrubbing. The "shorten filler words" pass auto-finds every "um" and "you know" in one click. "Edit for clarity" flags repetitions; "remove retakes" does the same for spoken second tries. The one-click YouTube export worked end-to-end during the demo.

What didn't land: the AI avatar feature. Generation takes around 30 minutes, the avatars come from a fixed gallery (no voice cloning on the plan they were on), and the result feels like exactly what it is — a stock person reading your words. Useful when you don't want to be on camera, not as a primary output. Pricing drew a wince — picked up via [Lenny's Pro Pass bundle](https://www.lennysnewsletter.com/), around $24/month at sticker.

Who it's for: solo builders making short demo videos who want a [Loom](https://www.loom.com/) replacement; less of a fit if you want After Effects-style motion graphics. The presenter is sticking with it.

## Group Discussions

### The Em-Dash as the AI Tell

**The em-dash is the new AI tell on LinkedIn.** One member now stops reading any post the moment a "—" shows up. A communications expert had told them the em-dash is grammatically correct and underused — which is precisely why models love it, and why it's now the signal that no human touched the draft. The same mismatch tell works elsewhere: students at lower English levels now produce essays with sophisticated vocabulary that don't match anything else in their writing — the inconsistency is the giveaway, not the words themselves. The workflow at the table converged: read the AI draft, rewrite in your own voice, strip the em-dashes even when correct. One member half-joked there should be a "model for humans" trained to write with typos.

### Analyst and Reviewer Agents: The Pattern That Actually Ships

**Two members independently landed on the same writer-plus-reviewer agent pattern for very different problems.** The software architect runs his code agents this way: a writer agent produces the PR, two reviewer agents push back ("too complicated," "wrong abstraction"), and the writer revises before any human looks. The PRs that reach him are visibly different from the first draft — usually shorter and more aligned with house style.

The architect transplanted the same pattern from his earlier consulting life. The hard problem there wasn't generating insight — it was compressing it into a one-line message a CEO of a 10k-person org will accept. Junior analysts drafted, senior managers tore it apart, juniors rewrote. Encode that loop as an agent skill plus a corpus of past approved reports, and you get a storyline reviewer that knows what management will sign off on. No public model has trained on this domain — there's no "writes-like-a-strategy-consultant" benchmark — but the skills/MD pattern lets you fake it locally.

The actuary at the table reached for the same idea in two domains. First, connecting nutrition logs, pathology results, claims, and medication into one personalized recommendation — pure LLM reasoning is plausible-sounding but unverified, so a reviewer agent skilled on past clinician-approved outputs would ground future ones. Second, claims attribution: three full-time analysts cut SQL dashboards every month to answer "why did claims go up 2%?" The answer is never one variable — it's a province, a product mix, a customer batch, all interacting. SHAP values can attribute mathematically but can't tell the story. Skill the agent on the company's last three years of analyst reports, run a writer/reviewer loop, and the institutional voice comes through context engineering rather than fine-tuning.

The architect added one more metric his team uses to grade agent quality: not test coverage, not lines shipped, but how many human prompts each task takes. The number keeps dropping. He used to think four parallel threads was the human limit; with skills and context loaded properly, he's now running ten to twelve. The framing he keeps repeating: "I won't think of you as engineers, I'll think of you as orchestrators."

### Storytelling on Top of Insurance Data

**Cheating is now harder than measuring.** The new face this week — an actuary now at a South African insurer's China JV — is building AI products on top of a health-and-wellness program. The cleanest win is multimodal: instead of OCR-ing a blood pressure monitor, take a photo and ask the model "is this a real monitor or someone faking it?" Same trick for vaccinations, weight scales, and lung-nodule follow-ups. His harder reasoning problems — connecting nutrition, pathology, claims, and medication; attributing month-on-month claims movements — are covered above in [the reviewer agents pattern](#analyst-and-reviewer-agents-the-pattern-that-actually-ships).

### GraphRAG for Invoice Parsing

**A graph layer beats pure vector search when entities appear under different names.** A backend-leaning member walked through a from-scratch RAG system for parsing Chinese invoices and contracts at a small company. The OCR layer is [MinerU](https://github.com/opendatalab/MinerU) — open source, breaks documents into paragraphs, tables, and images, hands each to a specialized model. Quality on Chinese is "impressive." Total RAM footprint around 14GB on an M3, so the whole stack runs locally on his Mac and serves a web UI from a VPS over SSH.

The interesting choice is using [LightRAG](https://github.com/HKUDS/LightRAG) — embeddings plus a graph layer — instead of pure vector search. The argument from a former graph-database engineer at the table: vector DBs find semantic similarity, but graph DBs let you traverse the actual entities and their relationships. Useful when an invoice number appears three times under slightly different spellings (Chinese name, English name, hex code) and you want them collapsed into one canonical entity. Graphs are more upfront work — you have to know what you're modeling — but they pay back as soon as you need to navigate "who signed this," "what's adjacent," "which client does this belong to." Counter-perspective: for a corpus of news articles where you just want the most relevant document, vector embeddings are simpler and cheaper.

## Quick Hits

**Hotels only buy things that fill rooms.** A founder building a hotel-influencer barter marketplace says the product side is fine — it's the data side that's hell. Every major platform has shut its public scraping surface since ChatGPT made data the bottleneck; he's burning Instagram accounts daily and considering a hire just to manage scraping infrastructure. A Taiwanese team flew from Taiwan to Singapore for two years pitching a hotel product before giving up. Anything that doesn't directly fill rooms is a gimmick to a hotel buyer, no matter how good the UX.

**One contrarian read: RSA doesn't actually need replacing.** The actuary pushed back on the popular "quantum will break RSA" narrative. His read, from researching this five years ago: a small modification to how RSA's private key is constructed makes it quantum-resistant without abandoning the algorithm. If true, the post-quantum-cryptography migration is overblown and quantum's actual use cases collapse to a narrow set (molecular simulation, certain optimization problems). The architect, with a physics background, pushed back on the parallelism argument for matrix-heavy LLM workloads; the actuary's counter was that quantum results are probabilistic, not deterministic. They agreed to disagree pending links — worth flagging because most rooms agree quantum will eat encryption; this one didn't.

## Other Resources

- [Apple Speech framework](https://developer.apple.com/documentation/speech): Native macOS/iOS speech-to-text, free and on-device. Mentioned as the alternative if you want Descript-quality transcription without cloud sync.
- [Docling](https://github.com/docling-project/docling): IBM's open-source document parsing library, mentioned as a comparison point against MinerU.
- [LightOnOCR](https://huggingface.co/lightonai/LightOnOCR-1B-1025): French ~8B-parameter OCR model that runs in ~6 seconds per page on M-series Macs via MLX. Recommended as a faster alternative for OCR-only workflows.
- [Argo Workflows](https://argoproj.github.io/workflows/): Kubernetes-native workflow engine, used by the architect's team for ML pipelines and agent orchestration. Recommended over n8n for serious infra.
- [Modal](https://modal.com/): Serverless GPU runtime with on-demand cold starts. Used by the architect's team for non-critical GPU work where a 90-second cold start is acceptable.
- [Zed parallel agents](https://zed.dev/parallel-agents): Returning recommendation as the orchestration UI for handling 10+ concurrent threads alongside terminals, git, and file explorer.
- PI CLI: minimal open-source coding agent (read/cat/curl as core tools, fork the UI per project). One member's daily driver in place of OpenCode and Claude Code; he likes that it's not opinionated about workflow.
- [GLM coding plan](https://docs.z.ai/devpack/tool/claude): Z.ai's coding subscription, recently raised six-fold ($30 to $180/month at the top tier) — one member dropped to ChatGPT Pro for everyday work and only routes to GLM for specific PI experiments.
- [Kimi](https://www.kimi.com/): Chinese chatbot used heavily by one member for tender/RFP discovery across APAC; rated more reliable than Gemini for that use case but inconsistent at producing report layouts day-to-day.
- [Bitwarden](https://bitwarden.com/): Open-source password manager. One member mentioned a recent supply-chain attack against it; another switched to 1Password as a result.
- [Tesseract OCR](https://github.com/tesseract-ocr/tesseract): The classic OCR engine, used in another member's certification-industry demo specifically because it returns location coordinates so AI-generated claims can highlight back to source.
