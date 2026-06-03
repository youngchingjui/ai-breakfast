---
Title: AI Breakfast #41
Date: May 28, 2026
Time: 9:00 AM - 10:30 AM
Author: Ching Jui Young
---

## TL;DR

- [The Graph Made the Answers Worse](#the-graph-made-the-answers-worse) — adding a knowledge graph degraded RAG quality
- ["RAG Is Dead" Is Half True](#rag-is-dead-is-half-true) — extraction got great, retrieval stayed fragile
- [Pay Upfront or Pay Forever](#pay-upfront-or-pay-forever) — pre-processing is the cost you can't dodge
- [Words as Nodes, Not Documents](#words-as-nodes-not-documents) — a decade-old NLP graph beats vectors
- [Local-First Is a Memory Budget Problem](#local-first-is-a-memory-budget-problem) — 32GB forces hard model trade-offs
- [Build the Ugly Helper Tools](#build-the-ugly-helper-tools) — vibe-coded debugging tools earn their keep
- [The Glossary Gap](#the-glossary-gap) — a non-coder asks for a translation layer

## Group Discussions

### The Graph Made the Answers Worse

A returning project drove the morning: a from-scratch system for parsing Chinese invoices and contracts, running entirely on a 32GB Mac. (RAG = retrieval-augmented generation, where an AI answers from your own documents instead of its training data.) Since it last appeared here, the builder ran a real comparison — plain vector embeddings versus embeddings plus a knowledge graph — and the graph *lost*.

On a simple query like "what's the tax number on this invoice," the vector-only version returned the right chunk. The graph version sometimes stopped with no answer at all, or invented an invoice number that didn't exist. His read: the graph extraction stage mis-builds the nodes and edges, so it pollutes results rather than enriching them. He's read papers arguing it's often better to have no graph than a partly-wrong one, and that matched his experience exactly.

A former graph-database engineer insisted graphs *should* win — but only with "top-notch" pre-processing. Both agreed on the lesson: a graph is only as good as the embeddings and extraction underneath it. Garbage nodes get amplified, not corrected.

### "RAG Is Dead" Is Half True

The table pulled apart the popular "RAG is dead" line. Their verdict: one half of the pipeline genuinely leapt forward, the other half barely moved.

Document *extraction* is the win. Pulling clean text, tables, and figures out of a messy PDF has gone from roughly 70% usable to near-90% in the last year — the single biggest gain anyone at the table had seen in this domain. *Retrieval* is the laggard. Embedding quality, chunking, and ranking are still fragile and tedious, and you only discover the gaps after running real queries.

That's why the room sees everyone pivoting to "agent memory" and context engineering to paper over retrieval's weak spots. One concrete pointer: Redis just shipped an enterprise RAG-and-memory layer for agents ([Redis Context Engine / Iris](https://redis.io/blog/ai-agent-architecture/), launched mid-May) — promising, but, as one member noted, you still have to test it against your own documents before believing the pitch.

### Pay Upfront or Pay Forever

A line that recurred all morning: with retrieval, you either pay the cost upfront in pre-processing, or you pay it forever in bad answers. Several people had independently landed there.

A former recipe-site engineer offered the cautionary tale. Her team tried replacing keyword search with semantic search so users could query in Spanish and get English recipes, or ask "I'm allergic to nuts, what fruit pie can I make?" Cross-language and loosely-contextual queries worked nicely. But anything *precise* — "is this recipe gluten-free?" — failed unless that fact lived in structured metadata and got filtered separately. Net verdict: RAG was overkill, and a well-tuned [Elasticsearch](https://www.elastic.co/elasticsearch) setup would have been far cheaper for most of it.

The takeaway: deterministic facts (tax numbers, dietary flags, invoice IDs) belong in structured fields you can filter on, not in a vector space you hope ranks them right. For precise, standardized data like invoices, several argued plain enriched lookup beats RAG outright — the language model only adds a chance of getting the exact figure wrong.

### Words as Nodes, Not Documents

The most distinctive take came from an engineer who's spent a decade in NLP and quietly built his own retrieval system. Instead of embedding whole documents or chunks, he embeds individual *words* — using [spaCy](https://spacy.io/)'s per-language models (separate English and Chinese cores) — and maps them to abstract, language-independent meanings.

So "tomato," its Chinese equivalent, and a photo of one all point to the same concept node. Input language stops mattering; everything resolves to shared meaning. The weighted edges between word-nodes then become the basis for similarity and graph traversal. He uses it to cross-reference GitHub issues, logs, traces, meeting transcripts, and Slack messages — find a phrase like "request failed" in one source and walk the graph to every related artifact. He calls this his "context link."

He swears spaCy is still best-in-class and he "cannot get better than this." The friendly pushback: that's barely embeddings anymore, it's a hand-built knowledge graph — which he cheerfully conceded is the point. The mixed-language edge case (a document that's 50/50 two languages) stays unsolved; for the odd foreign word, language detection plus tagging handles it. A separate thread wondered aloud whether vector spaces have a hard ceiling — one member recalled a podcast claiming that past some document count, embedding distances collapse and become indistinguishable, loosely analogized to electrons quantum-tunneling through a too-thin chip gate. Interesting framing, but nobody could confirm it.

### Local-First Is a Memory Budget Problem

The invoice builder's real obsession is running everything locally — no client data leaving the machine. His target customers are privacy-sensitive European firms, law offices, and a coder who won't let his codebase touch the cloud. (In China, he noted, people drop sensitive docs into cloud AI freely, often unaware it can breach data-export rules.)

Half the project was just figuring out *where to run things* on 32GB of RAM. He uses [MLX](https://github.com/ml-explore/mlx) (Apple's on-device ML framework) for inference, but a single Gemma model already eats ~14GB, and the KV cache — the model's running memory of the conversation — is the real hog. He'd been juggling [Ollama](https://ollama.com/), which conveniently auto-swaps models but wastes ~4GB of overhead, and [LM Studio](https://lmstudio.ai/) (another ~1GB overhead) for models Ollama lacks.

The table's recommendation: drop Ollama for [llama.cpp](https://github.com/ggml-org/llama.cpp)'s own server — it has Metal support, uses less memory, generates tokens faster, and runs the same locally as the GPU [vLLM](https://github.com/vllm-project/vllm) setup you'd deploy in the cloud. The wrinkle: MLX can't run in containers, so production means renting expensive GPU nodes anyway. He's waiting on affordable local hardware — [NVIDIA's DGX Spark](https://www.nvidia.com/en-us/products/workstations/dgx-spark/) is here but ~$5K, and a 48GB GPU rig pencils out near $40K — and was warned off cheap 48GB cards from Taobao, which reportedly degrade in quality.

### Build the Ugly Helper Tools

A quieter but resonant point: the invoice builder vibe-coded four throwaway tools just to *see* what his pipeline was doing — one to inspect extracted JSON, one to score extraction quality, one to compare naive-vs-graph answers, and one to visualize the graph itself (he screenshotted LightRAG's UI from GitHub and one-shotted a clone).

His framing stuck: not everything needs to be "shiny, user-level" software. The AI makes it trivial to spin up a personal debugging tool, and that visibility is what let him catch the graph regression in the first place. Worth building even if only you ever use it.

## Quick Hits

**The glossary gap.** A non-technical attendee — who admitted he zoned out for stretches of the deep-tech talk — surfaced the most actionable idea of the day. Mine the meetup's own transcripts to auto-build (1) a glossary of the jargon that actually comes up ("RAG," "runs on metal"), and (2) a "what can non-engineers steal from engineers" guide. He knows every word in the sentence but not what the sentence means — and won't interrupt a flowing technical conversation to ask. A reminder that the room's range is the point, and a translation layer would widen the door.

**Make your own yogurt.** The off-ramp conversation: heat milk to ~90°C for 10–20 minutes to prime the proteins, cool to ~48°C, add a starter culture, and hold at that temperature 8–10 hours for a thicker set. One member does it for gut health, since commercially sold milk is pasteurized and strips the good bacteria.

## Other Resources

- [MLX](https://github.com/ml-explore/mlx): Apple's array/ML framework for on-device inference on Apple silicon. The invoice pipeline's local inference engine, picked for its unified-memory model.
- [llama.cpp](https://github.com/ggml-org/llama.cpp): C/C++ LLM inference with first-class Metal support. The table's recommended replacement for Ollama — less memory, faster tokens.
- [Ollama](https://ollama.com/): Convenient local model runner that auto-swaps models. Easy but carries ~4GB overhead and a reputation for weaker performance.
- [LM Studio](https://lmstudio.ai/): Desktop app for running local LLMs with a GUI and API server. Used for models Ollama doesn't carry, at ~1GB overhead.
- [vLLM](https://github.com/vllm-project/vllm): High-throughput GPU serving engine for LLMs. What you'd run on an actual cloud GPU node when local Macs run out.
- [spaCy](https://spacy.io/): Industrial NLP library with per-language models. The decade-long backbone of one member's word-level "context link" embeddings.
- [Elasticsearch](https://www.elastic.co/elasticsearch): Tunable keyword/text search engine. Repeatedly named as the cheaper, good-enough alternative to RAG for most search needs.
- [Redis Context Engine](https://redis.io/blog/ai-agent-architecture/): Redis's mid-May enterprise context-and-memory layer for AI agents (a.k.a. Iris). Cited as the latest attempt to fix RAG's retrieval gaps.
- [NVIDIA DGX Spark](https://www.nvidia.com/en-us/products/workstations/dgx-spark/): ~$5K desktop "AI supercomputer" with 128GB unified memory. The local-first hardware the invoice builder is waiting to become affordable.
