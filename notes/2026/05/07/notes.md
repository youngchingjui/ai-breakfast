---
Title: AI Breakfast #38
Date: May 7, 2026
Time: 9:00 AM - 10:30 AM
Author: Ching Jui Young
---

## Executive Summary

At AI Breakfast #38, our group of software architects, founders, engineers, and consultants discussed [a hands-on demo of Descript](#demo-descript), [the em-dash as the new AI tell](#the-em-dash-as-the-ai-tell), [agent-as-reviewer patterns for code and copy](#analyst-and-reviewer-agents-the-pattern-that-actually-ships), [storytelling on top of insurance data](#storytelling-on-top-of-insurance-data), [the influencer-marketplace scraping treadmill](#the-influencer-marketplace-scraping-treadmill), [GraphRAG for invoice parsing](#graphrag-for-invoice-parsing), and [whether quantum computing actually breaks RSA](#does-quantum-computing-actually-break-rsa). The group also kicked off a new format: weekly tool demos from members.

## Summary

- [Demo: Descript](#demo-descript) — Honest review of the transcript-driven video editor
- [The Em-Dash as the AI Tell](#the-em-dash-as-the-ai-tell) — Why "—" became LinkedIn's tofu signal
- [Analyst and Reviewer Agents: The Pattern That Actually Ships](#analyst-and-reviewer-agents-the-pattern-that-actually-ships) — Agent pushback beats human review for both code and copy
- [Storytelling on Top of Insurance Data](#storytelling-on-top-of-insurance-data) — Connecting nutrition, pathology, claims, and medication into one recommendation
- [The Influencer Marketplace Scraping Treadmill](#the-influencer-marketplace-scraping-treadmill) — The data side eats the product side
- [GraphRAG for Invoice Parsing](#graphrag-for-invoice-parsing) — Why a graph layer beats a vector DB for entity-heavy data
- [Does Quantum Computing Actually Break RSA?](#does-quantum-computing-actually-break-rsa) — One attendee's contrarian read: a small patch and you're done

## Demo: Descript

A new format kicked off this week: one member demos a tool they use daily. First up was [Descript](https://www.descript.com/), a video editor where you edit the transcript and the video follows.

The core editing flow is genuinely fast. Record a screen capture with a webcam picture-in-picture, get an automatic transcript, and delete words from the text to delete clips. No timeline scrubbing. The "shorten filler words" pass auto-finds every "um" and "you know" in one click. "Edit for clarity" flags repetitions; "remove retakes" does the same for spoken second tries. The one-click YouTube export worked end-to-end during the demo.

The AI avatar feature is impressive in its own right: upload a script, get voice plus avatar plus speaking video in one smooth workflow. Generation takes around 30 minutes and the avatars come from a fixed gallery, but the pipeline itself is slick. The presenter has tested it but hasn't yet found a place for it in his actual workflow — flagged as something to revisit. Pricing was picked up via [Lenny's Pro Pass bundle](https://www.lennysnewsletter.com/) initially, though Descript is no longer included there; the standalone option is around $16/month. Worth it if you'll actually use it, overkill if you're just playing around.

Who it's for: solo builders making short demo videos, replacing the now-clunky Atlassian-owned [Loom](https://www.loom.com/) workflow. Less of a fit if you want After Effects-style motion graphics — the animation library is thin. The presenter is sticking with it. The rest of the table noted Apple's [native Speech framework](https://developer.apple.com/documentation/speech) handles transcription free and on-device if you want to roll your own.

## Group Discussions

### The Em-Dash as the AI Tell

The em-dash got a full-table autopsy. One member now stops reading any LinkedIn post the moment a "—" shows up. A communications expert had told them the em-dash is grammatically correct and underused — which is precisely why models love it, and why it's now the signal that no human touched the draft. The workflow at the table converged: read the AI draft, rewrite in your own voice, strip the em-dashes even when correct. One member half-joked there should be a "model for humans" trained to write with typos.

Related observation: students at lower English levels now produce essays with sophisticated vocabulary that don't match anything else in their writing. The mismatch is the tell, not the words.

### Analyst and Reviewer Agents: The Pattern That Actually Ships

Two members independently landed on the same agent architecture for very different problems. The host runs his code agents this way: a writer agent produces the PR, two reviewer agents push back ("too complicated," "wrong abstraction"), and the writer revises before any human looks. The PRs that reach him are visibly different from the first draft — usually shorter and more aligned with house style.

He transplanted the same pattern from his earlier consulting life. The hard problem there wasn't generating insight — it was compressing it into a one-line message a CEO of a 10k-person org will accept. Junior analysts drafted, senior managers tore it apart, juniors rewrote. Encode that loop as an agent skill plus a corpus of past approved reports, and you get a storyline reviewer that knows what management will sign off on. No public model has trained on this domain — there's no "writes-like-a-strategy-consultant" benchmark — but the skills/MD pattern lets you fake it locally.

The actuary at the table is reaching for the same idea on a different problem: connecting the dots across nutrition logs, pathology results, claims, and medication into one personalized recommendation. Pure LLM reasoning is plausible-sounding but unverified. He wants a reviewer agent skilled on past clinician-approved outputs to ground future ones.

The software architect added one more metric his team uses to grade agent quality: not test coverage, not lines shipped, but how many human prompts each task takes. The number keeps dropping. He used to think four parallel threads was the human limit; with skills and context loaded properly, he's now running ten to twelve. The framing he keeps repeating: "I won't think of you as engineers, I'll think of you as orchestrators."

### Storytelling on Top of Insurance Data

A returning member, an actuary at a Chinese insurance company, walked through three AI products he's building on top of a health-and-wellness program. The cleanest win is multimodal: instead of OCR-ing a blood pressure monitor, take a photo and ask the model "is this a real monitor or someone faking it?" Cheating is now harder than just measuring. Same trick for vaccinations, weight scales, and lung-nodule follow-ups.

The harder problem is "connecting intelligence" — pulling nutrition logs, pathology results, claims, and medication into one personalized recommendation across many different data fields. Pure LLM reasoning produces plausible output, but validating it without a clinician is the open question. The plan: have clinicians approve recommendations on existing customers, accumulate enough approvals to seed a reference database, and use that to ground future outputs.

Hardest of all is claims attribution. Three full-time analysts cut SQL dashboards every month to answer "why did claims go up 2%?" The answer is never one variable — it's a province, a product mix, a customer batch, all interacting. SHAP values can attribute mathematically but can't tell the story. Generic AI agents produce cuts that don't quite make sense. The table's suggestion echoed the reviewer-agent pattern: skill the agent on the company's last three years of analyst reports, run a writer/reviewer loop, let the institutional voice come through context engineering rather than fine-tuning.

### The Influencer Marketplace Scraping Treadmill

One founder is building a marketplace matching hotels with influencers — barter deals where the hotel gives a free stay in exchange for posts. The product side is fine. The data side is hell.

Every major platform has shut down its public scraping surface since ChatGPT made data the bottleneck. Reddit, Twitter, Instagram all now require paid developer access or block aggressively. He's burning Instagram accounts daily to keep profile data fresh, buying replacements in bulk, and considering a hire just to manage the scraping infrastructure. Hotels themselves are brutal customers: a Taiwanese team flew from Taiwan to Singapore for two years pitching a hotel product before giving up. The lesson: hotels only buy things that fill rooms. Anything else is a gimmick, no matter how good the UX.

### GraphRAG for Invoice Parsing

A backend-leaning member walked through a from-scratch RAG system for parsing Chinese invoices and contracts at a small company. The OCR layer is [MinerU](https://github.com/opendatalab/MinerU) — open source, breaks documents into paragraphs, tables, and images, hands each to a specialized model. Quality on Chinese is "impressive." Total RAM footprint around 14GB on an M3, so the whole stack runs locally on his Mac and serves a web UI from a VPS over SSH.

The interesting choice is using [LightRAG](https://github.com/HKUDS/LightRAG) — embeddings plus a graph layer — instead of pure vector search. The argument from a former graph-database engineer at the table: vector DBs find semantic similarity, but graph DBs let you traverse the actual entities and their relationships. Useful when an invoice number appears three times under slightly different spellings (Chinese name, English name, hex code) and you want them collapsed into one canonical entity. Graphs are more upfront work — you have to know what you're modeling — but they pay back as soon as you need to navigate "who signed this," "what's adjacent," "which client does this belong to." Counter-perspective: for a corpus of news articles where you just want the most relevant document, vector embeddings are simpler and cheaper.

A side benefit: company description fields are stored in English even when source documents are Chinese, so the expat owner can query in English without runtime translation.

### Does Quantum Computing Actually Break RSA?

The crypto sidetrack started with passkeys (one member doesn't trust the Google/Apple lock-in; another swears by 1Password as the cross-platform store) and ended somewhere unexpected. The actuary pushed back hard on the popular "quantum will break RSA" narrative.

His read, from researching this five years ago at a strategy consultancy: the fundamental hard problem behind RSA — factoring very large primes — doesn't actually need to be replaced. A small modification to how RSA's private key is constructed makes it quantum-resistant without abandoning the algorithm. If that's right, the whole "post-quantum cryptography is a civilizational migration" framing is overblown, and quantum's actual use cases collapse to a narrow set (molecular simulation, certain optimization problems) — nothing that displaces classical computing for everyday workloads.

The table didn't fully buy it. The architect, with a physics background, kept circling back to the parallelism argument: quantum's value is doing many computations at once, which should map well to massive matrix work like LLM inference. The actuary's counter: quantum results are probabilistic, not deterministic, and most real-world problems aren't probability functions.

## Other Resources

- [Descript](https://www.descript.com/): Transcript-driven video editor with auto-filler-word removal, retake detection, and stock-avatar generation. Daily driver for the demo presenter; full review above.
- [Lenny's Newsletter Pro Pass](https://www.lennysnewsletter.com/): Bundle subscription that includes Descript and other product/builder tools. How the demo presenter ended up on Descript Pro.
- [Apple Speech framework](https://developer.apple.com/documentation/speech): Native macOS/iOS speech-to-text, free and on-device. Mentioned as the alternative if you want Descript-quality transcription without cloud sync.
- [MinerU](https://github.com/opendatalab/MinerU): Open-source document parser that splits PDFs into structured paragraphs, tables, and images. Powering one member's invoice/contract pipeline; quality on Chinese rated very highly.
- [LightRAG](https://github.com/HKUDS/LightRAG): RAG framework that augments embeddings with a graph layer over extracted entities. The graph-on-vectors approach the same member uses for invoice retrieval.
- [Docling](https://github.com/docling-project/docling): IBM's open-source document parsing library, mentioned as a comparison point against MinerU.
- [LightOnOCR](https://huggingface.co/lightonai/LightOnOCR-1B-1025): French ~8B-parameter OCR model that runs in ~6 seconds per page on M-series Macs via MLX. Recommended as a faster alternative for OCR-only workflows.
- [Argo Workflows](https://argoproj.github.io/workflows/): Kubernetes-native workflow engine, used by the architect's team for ML pipelines and agent orchestration. Recommended over n8n for serious infra.
- [Modal](https://modal.com/): Serverless GPU runtime with on-demand cold starts. Used by the architect's team for non-critical GPU work where a 90-second cold start is acceptable.
- [Zed parallel agents](https://zed.dev/parallel-agents): Returning recommendation as the orchestration UI for handling 10+ concurrent threads alongside terminals, git, and file explorer.
- A minimal "PI" CLI coding agent (the member's daily driver — a handful of core tools like read, cat, and curl, open source so the UI can be forked per project). Used in place of OpenCode and Claude Code; he likes that it's not opinionated about workflow.
- [GLM coding plan](https://docs.z.ai/devpack/tool/claude): Z.ai's coding subscription, recently doubled in price ($30 to $180/month at the top tier) — one member dropped to ChatGPT Pro for everyday work and only routes to GLM for specific PI experiments.
- [Kimi](https://www.kimi.com/): Chinese chatbot used heavily by one member for tender/RFP discovery across APAC; rated more reliable than Gemini for that use case but inconsistent at producing report layouts day-to-day.
- [Bitwarden](https://bitwarden.com/): Open-source password manager. One member mentioned a recent supply-chain attack against it; another switched to 1Password as a result.
- [Tesseract OCR](https://github.com/tesseract-ocr/tesseract): The classic OCR engine, used in another member's certification-industry demo specifically because it returns location coordinates so AI-generated claims can highlight back to source.
