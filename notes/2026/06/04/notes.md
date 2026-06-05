---
Title: AI Breakfast #42
Date: June 4, 2026
Time: 9:00 AM - 10:30 AM
Author: Ching Jui Young
---

## Executive Summary

At AI Breakfast #42, our group of software architects, consultants, and founders discussed [what people actually automate outside of code](#what-are-you-automating-outside-of-code), [the case against automation](#the-anti-automation-case), [using AI to spend less time online](#using-ai-to-get-offline), and [turning podcasts into readable text](#podcasts-as-text-not-audio). They also worked through [how to organize a personal knowledge base for an AI agent](#the-second-brain-problem) and [how to build a PDF RAG pipeline from scratch](#walking-through-a-pdf-rag-pipeline).

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

For most people at the table, the honest answer was: not much. Google.com use is sharply down — replaced by a chat window left open for vocabulary and quick lookups — but that's research, not automation. Nobody had a slick personal pipeline to demo.

## The Anti-Automation Case

A software architect who builds AI systems for clients refuses to automate his home life. He tried the obvious projects — a doorbell that pings Telegram, smart shades on a schedule — and found the cost wasn't building them, it was explaining to houseguests "don't worry, the shades just close at this time." Automation narrows you. You start obeying the system.

His one exception: a small light that turns on when CO2 climbs past 1,000 ppm. Monitoring, not action — the decision to open the window stays with him. There's a moral dimension too: automate a habit and you might lose the cognitive muscle it was building, ending up worse off, not better.

Every automation is a small unpaid maintenance contract with your future self. The threshold for "worth it" should be much higher than most people set it.

## Using AI to Get Offline

The most interesting use case ran in reverse: one member is using AI to spend less time online, not more. Before a short trip with his kids, he had Claude write a script that downloaded a batch of anime onto his laptop so nothing on the trip needed a connection.

Technically, it's smart prefetch plus curation. Honestly, it's a way to keep his attention off whatever the streaming app's algorithm would have served next. Most tools assume you're online; an AI working against that assumption is genuinely useful, not just clever.

## Podcasts as Text, Not Audio

The host's own ongoing automation: pull transcripts from podcasts he'd otherwise listen to for hours, run them through an LLM, keep the actual claims, discard the parasocial filler. Most podcasts are an emotional product — the host is trying to be your friend. Strip the bond and read the transcript, and you find maybe a minute of real information per hour of audio.

The same pipeline works for YouTube. One member uses Gemini because it ingests YouTube URLs directly; he copy-pastes links one by one rather than paying for the API tier. The Python path: [yt-dlp](https://github.com/yt-dlp/yt-dlp) to pull transcripts (or audio plus [whisper.cpp](https://github.com/ggml-org/whisper.cpp) when subtitles aren't available), then feed the TXT into your LLM. The value isn't the tooling — it's deciding which podcasts deserve to be read instead of listened to.

Another member uses [NotebookLM](https://notebooklm.google/) the other direction — feeding scientific papers in, getting podcast-style discussions out. He listens during coffee because audio with two voices arguing helps him build a mental framework in a way silent reading doesn't. Same tool, opposite use case — the split is about learning style, not tooling.

## The Second-Brain Problem

One marketing-automation founder is rebuilding her client work in [Obsidian](https://obsidian.md/) — a folder of markdown files per topic (brand, sales, ops, content), with the whole tree mounted into Claude Code as context. When a new client audit comes in, she points Claude at the relevant folder and a custom skill, and it cross-references her past work to draft the new engagement. Her clients have started hiring her after seeing the knowledge graph alone.

That demo opened the longest thread of the morning: how do you actually organize a personal knowledge base for an agent? Files and folders are flat — even with cross-references, you pick one canonical home and pretend the rest are pointers. Gmail solved this for email a decade ago by replacing folders with tags, so one message can live in several dimensions at once. Knowledge has the same shape: a note on "schema design for a federated API" belongs under architecture, security, and a specific client at the same time. Today's tools force you to pick one.

Two partial answers came up. Graph database (carried over from last week's RAG thread): nodes are concepts, edges are relations, traversal beats embedding similarity when you know what you're looking for. "Don't bother": dump everything in flat files, let the agent figure it out, pay the cost at retrieval instead of at filing. Either way, the work doesn't disappear — it just moves.

## Walking Through a PDF RAG Pipeline

The host asked a software architect to walk through, from scratch, how he'd build a RAG layer over a directory of PDF books. The value was in the small decisions along the way.

OCR first — vision model rather than pure text extraction, so headers, footnotes, and tables come out structured. Roughly six seconds per page on an M-series Mac. Output to markdown, not JSON: markdown stays syntactically valid if you slice it anywhere, so chunking is cheap. JSON breaks the moment you cut before a closing brace.

From there: chunk with a sliding window (1,000 words, 256-word overlap), embed each chunk into a vector DB with a back-reference to the source file, then at query time retrieve the top-k chunks and inject them into the model's context. The host pushed on whether RAG was even needed — his own workflow loads one whole PDF into context and queries from there. The architect's honest answer: for one document, just load it. RAG starts paying when you hit 50+ documents and don't want to burn the context budget. Knowing when you don't need RAG is more valuable than knowing how to build it.

Counter-case: the host had sat on 20-year-old [iChat](https://en.wikipedia.org/wiki/IChat) archives in a deprecated Apple file format for a decade — unparseable in plain Python. With AI as a coding co-pilot, he extracted them in a month, dropped them into [Streamlit](https://streamlit.io/) with a RAG layer on top, and can now search college conversations by topic. The tool unlocked something he'd given up on.

## Quick Hits

**One non-coder, completely outside the AI bubble.** A branding consultant has downloaded every AI tool — Kimi, Qwen, ChatGPT, Claude, Gemini, [Doubao](https://www.doubao.com/) — and uses none. Her work is reading-heavy: long, researched "lectures" as marketing for her hospitality consulting, each taking about a month. She doesn't like tools and has no patience for the learning curve. The table's nudge toward $20/month ChatGPT was friendly and unsuccessful. A real customer profile AI companies routinely under-serve.

**GPT-5.5 Pro on unsolved math, as entertainment.** One member points [GPT-5.5 Pro](https://openrouter.ai/openai/gpt-5.5-pro) at the Riemann hypothesis in his spare time — not expecting an answer, just watching a frontier model attempt it. He doesn't understand the math it produces. Pricing is steep ($30/M input, $180/M output); the standard tier handles daily work, Pro is for problems you'd otherwise pay a consultant for.

**Kids are an unexpectedly good cost-reduction lens.** At a Shanghai maker fair, three 14-year-olds built a robot arm in a weekend that plays with a cat. Bill of materials: about 200 RMB of [Taobao](https://www.taobao.com/) parts. The point wasn't the tech — the kids never thought about cost. Adults would spec the expensive version by default. Kids ship the cheap one because they don't know any better, and the cheap one usually works.

**AI for language acquisition, beyond translation.** A workflow nobody else had tried: pull a podcast transcript in your native language, extract the domain-specific vocabulary you'd need to discuss that topic, then generate Pimsleur-style audio drills (English prompt → Chinese answer → confirmation) and learn passively. The point isn't generic language learning — it's targeting vocab to topics you actually care about.

## Other Resources

- [Obsidian](https://obsidian.md/): Markdown knowledge base. The marketing consultant's second-brain, mounted into Claude Code as a folder.
- [NotebookLM](https://notebooklm.google/): Google's research tool that turns sources into AI-hosted podcast discussions; one member uses it for scientific papers.
- [yt-dlp](https://github.com/yt-dlp/yt-dlp): Python-friendly fork of youtube-dl. The default for grabbing podcast and YouTube transcripts.
- [whisper.cpp](https://github.com/ggml-org/whisper.cpp): Lightweight C++ port of OpenAI's Whisper. The fallback when a podcast has no published transcript.
- [Streamlit](https://streamlit.io/): Python web-UI library. The host's iChat-archive search front-end runs on it.
- [GPT-5.5 Pro](https://openrouter.ai/openai/gpt-5.5-pro): OpenAI's premium tier at $30/$180 per million input/output tokens. For genuinely hard problems; daily work runs fine on the standard tier.
