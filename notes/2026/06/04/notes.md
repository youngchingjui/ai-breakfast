---
Title: AI Breakfast #41
Date: June 4, 2026
Time: 9:00 AM - 10:30 AM
Author: Ching Jui Young
---

## TL;DR

- [What Are You Automating Outside of Code?](#what-are-you-automating-outside-of-code) — the answers were smaller than expected
- [The Anti-Automation Case](#the-anti-automation-case) — every automation is an unpaid maintenance contract
- [Using AI to Get Offline](#using-ai-to-get-offline) — prefetch the trip so you don't need a connection
- [Podcasts as Text, Not Audio](#podcasts-as-text-not-audio) — strip the parasocial bond, read the gist
- [The Second-Brain Problem](#the-second-brain-problem) — knowledge organization is a UI problem
- [Walking Through a PDF RAG Pipeline](#walking-through-a-pdf-rag-pipeline) — why markdown beats JSON for chunking
- [Quick Hits](#quick-hits) — Riemann hypothesis as entertainment, $200 cat-playing robots, AI vocab drills

## What Are You Automating Outside of Code?

The host opened with a narrow prompt: since January 1, what have you started automating outside of coding? The answers were smaller than expected.

One consultant said his wife — a French literature teacher — still won't use AI for work; the quality isn't there for her domain. But she now asks ChatGPT "what is this flower" with a picture, and his kids (12 and 16) have moved from "AI is cheating on homework" to casual lookups. Behavior change is happening, just not where the AI vendors keep pointing.

For most people at the table, the honest answer was: not much. Google.com use is down exponentially — replaced by a chat window left open for vocabulary and quick lookups — but that's research, not automation. Nobody had a slick personal pipeline to demo. The room kept circling the same conclusion: the moment something gets automated, you owe it maintenance, and most home-grown automations aren't worth the tax.

## The Anti-Automation Case

The most contrarian view came from a software architect who builds AI systems for clients but actively refuses to automate his home life. He tried the obvious projects — a doorbell that pings Telegram, smart shades on a schedule — and found the cost wasn't building them, it was explaining to houseguests "don't worry, the shades just close at this time." Automation narrows you. You start obeying the system.

His one exception: a small light that turns on when CO2 climbs past 1,000 ppm. Monitoring, not action. The decision to open the window stays with him. The framing he kept returning to: there's a moral dimension here. If you automate a habit, you might lose the cognitive muscle that habit was building — and end up worse off, not better.

The deeper point landed with the table: every automation is a small unpaid maintenance contract you sign with your future self. The threshold for "worth it" should be much higher than people set it.

## Using AI to Get Offline

The cleverest personal use case was inverted from what you'd expect. One member is using AI to spend less time online, not more. Before a short trip with his kids, he had Claude scrape and download a batch of anime onto his laptop so nothing on the trip needed a connection.

Framed technically, it's smart prefetch plus curation. Framed honestly, it's a way to keep his attention off whatever the streaming app's algorithm would have served next. The always-online assumption is baked into so many tools that an AI working to undo it feels genuinely useful, not just clever.

## Podcasts as Text, Not Audio

The host's own ongoing automation: pull transcripts from podcasts he'd otherwise have to listen to for hours, run them through an LLM, extract the actual claims and discard the parasocial filler. His read on the medium was sharp — most podcasts are an emotional product. The host is trying to be your friend. If you strip out the bond and read the transcript, you find maybe a minute of real information per hour of audio.

The same pipeline works for YouTube. One member uses Gemini for video summaries because Gemini can ingest the YouTube URL directly; he just hasn't paid for the API tier to automate it, so he copy-pastes links one by one. The Python path everyone agreed on: [yt-dlp](https://github.com/yt-dlp/yt-dlp) to pull transcripts (or audio plus [whisper.cpp](https://github.com/ggml-org/whisper.cpp) when subtitles aren't available), then feed the TXT into the LLM of your choice. The trick that makes it valuable isn't the tooling — it's deciding which podcasts deserve to be read instead of listened to.

The inverse case came from another member: he uses [NotebookLM](https://notebooklm.google/) the other direction — feeding scientific papers in and getting podcast-style discussions out. He listens during coffee, because audio with two voices arguing helps him build a mental framework around a topic in a way that silent reading doesn't. Same underlying tool, opposite use case. The split tracks personal learning style, not which tool is better.

## The Second-Brain Problem

One marketing-automation founder is rebuilding her client work in [Obsidian](https://obsidian.md/) — a folder of markdown files per topic (brand, sales, ops, content), with the whole tree mounted into Claude Code as context. When a new client audit comes in, she points Claude at the relevant folder and a custom skill, and it cross-references her past work to draft the new engagement. Her clients have started hiring her after seeing the knowledge graph alone.

That demo kicked off the longest thread of the morning: how do you actually organize a personal knowledge base for an agent? One member named the core problem cleanly. Files and folders are flat — even with cross-references, you pick one canonical home and pretend the rest are pointers. Gmail solved this for email a decade ago by replacing folders with tags, so one message can live in several dimensions at once. Knowledge has the same shape: a note on "schema design for a federated API" belongs under architecture, security, and a specific client at the same time. Today's tools force you to pick one.

Two partial answers came up. The graph-database view (carried over from last week's RAG thread): nodes are concepts, edges are relations, traversal beats embedding similarity when you actually know what you're looking for. The "don't bother" view: dump everything in flat files, let the agent figure it out, and accept the time cost at retrieval instead of at filing. Both are real. The table's consensus: invest upfront in structure, or invest later in search. There's no third option.

## Walking Through a PDF RAG Pipeline

The longest technical stretch had the host asking a software architect to walk through, from scratch, how he'd build a RAG layer over a directory of PDF books. The answer was instructive less for the destination than for the small decisions along the way.

OCR first — using a vision model instead of pure text extraction, so headers, footnotes, and tables come out structured. Roughly six seconds per page on an M-series Mac. Output to markdown, not JSON, for one specific reason: markdown stays syntactically valid if you slice it anywhere, so chunking is cheap. JSON breaks the moment you cut before the closing brace. That single argument convinced the table.

From there: chunk with a sliding window (1,000 words, 256-word overlap), embed each chunk into a vector DB with a back-reference to the source file, then at query time, retrieve the top-k chunks and inject them into the model's context. The host pushed on whether RAG was even needed — his own workflow loads one whole PDF into context and queries from there. The architect's honest answer: for one document, just load it. RAG starts paying when you hit 50+ documents and don't want to burn the context budget. The bigger lesson: knowing when you don't need RAG is more valuable than knowing how to build it.

The host's own [iChat](https://en.wikipedia.org/wiki/IChat) anecdote was the counter-case. He'd been sitting on 20-year-old chat archives in a deprecated Apple file format for a decade — unparseable in plain Python. With AI as a coding co-pilot, he extracted them in a month, dropped them into [Streamlit](https://streamlit.io/) with a RAG layer on top, and can now search college conversations by topic. Same archive, suddenly queryable. The tool unlocked something he'd given up on.

## Quick Hits

**One non-coder, completely outside the AI bubble.** A branding consultant at the table said plainly: she's downloaded every AI tool — Kimi, Qwen, ChatGPT, Claude, Gemini, [Doubao](https://www.doubao.com/) — and uses none of them. Her work is reading-heavy: she writes long, researched "lectures" as marketing for her hospitality consulting, each taking about a month. She doesn't like tools and has no patience for the learning curve. The table tried to nudge her toward $20/month ChatGPT for research drafts. The conversion attempt was friendly and unsuccessful. A real customer profile that AI companies routinely under-serve.

**GPT-5.5 Pro on unsolved math, as entertainment.** One member admitted he's been pointing the [GPT-5.5 Pro](https://openrouter.ai/openai/gpt-5.5-pro) tier at the Riemann hypothesis in his spare time — not because he expects an answer, but because watching a frontier model attempt it is fun. He doesn't understand the math it produces. Pro pricing is steep ($30/M input, $180/M output) and most attendees agreed the standard tier is enough for daily work; Pro is for the genuinely hard problems you'd otherwise pay a consultant for.

**Kids are an unexpectedly good cost-reduction lens.** A consultant returning from a Shanghai maker fair watched three 14-year-olds build, in a weekend, a robot arm that plays with a cat. Total bill of materials: about 200 RMB of [Taobao](https://www.taobao.com/) parts. The point that stuck wasn't the tech — it was that the kids never thought about cost. Adults building the same thing would spec the expensive version by default. Kids ship the cheap one because they don't know any better, and the cheap one usually works.

**AI for language acquisition, beyond translation.** The host pitched a workflow that hadn't occurred to anyone: pull a podcast transcript in your native language, extract the domain-specific vocabulary you'd need to talk about that topic, then generate Pimsleur-style audio drills (English prompt → Chinese answer → confirmation) so you can learn the vocab passively. The point isn't generic language learning — it's that you can now target vocab to the topics you actually care about. One member had built something similar at TikTok for trust-and-safety terminology.

## Other Resources

- [Obsidian](https://obsidian.md/): Markdown-based personal knowledge base. The marketing consultant's second-brain lives here, mounted into Claude Code as a folder.
- [NotebookLM](https://notebooklm.google/): Google's research tool that turns sources into AI-hosted podcast discussions. Used by one member to digest scientific papers during coffee.
- [yt-dlp](https://github.com/yt-dlp/yt-dlp): Python-friendly fork of youtube-dl. The default tool at the table for grabbing podcast and YouTube transcripts.
- [whisper.cpp](https://github.com/ggml-org/whisper.cpp): Lightweight C++ port of OpenAI's Whisper. The fallback when a podcast has no published transcript.
- [Streamlit](https://streamlit.io/): Python web-UI library. The host built his iChat-archive search front-end on top of it in a weekend.
- [Elasticsearch](https://www.elastic.co/elasticsearch): Distributed search engine with strong BM25 ranking. Suggested as a complement to RAG when short queries fail in vector space.
- [GPT-5.5 Pro](https://openrouter.ai/openai/gpt-5.5-pro): OpenAI's premium tier at $30/$180 per million input/output tokens. Reserved for genuinely hard problems; daily work runs fine on the standard tier.
- [Doubao](https://www.doubao.com/): ByteDance's consumer AI assistant. One member's only AI tool — for casual questions.
- [Taobao](https://www.taobao.com/): The marketplace where the 14-year-old roboticists sourced their entire bill of materials for under 200 RMB.
