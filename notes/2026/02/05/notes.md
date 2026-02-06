---
Title: AI Breakfast #28
Date: February 5, 2026
Time: 9:00 AM - 10:30 AM
Author: Ching Jui Young
---

# AI Breakfast #28

## Executive Summary

This week's AI breakfast covered [AI slide makers](#ai-slide-makers-that-actually-work), the [AI coding tool arms race](#the-ai-coding-tool-arms-race), [MCP architecture](#mcp-and-custom-domain-knowledge), [cognitive amplification](#cognitive-amplification-and-the-junior-dev-question), [OpenClaw](#openclaw-exciting-and-terrifying), [git work trees](#git-work-trees-for-parallel-ai-development), and a [Meeseeks-inspired recursive agent](#the-meeseeks-mcp).

## Group Discussions

### AI Slide Makers That Actually Work

One user found [Gamma](https://gamma.app/) and [Manus](https://manus.im/) surprisingly good at making slides. They actually "look" at stock photos before choosing which one to include, making the output much better than expected. Small prompts, polished results.

For developers who want more control, [Reveal.js](https://revealjs.com/) and [Slidev](https://sli.dev/) both use Markdown with syntax highlighting. Since the output is just code, you can have an LLM edit slides directly.

### The AI Coding Tool Arms Race

Everyone has too many AI coding tools installed. One attendee lost count listing them all.

[Charm Crush](https://github.com/charmbracelet/crush) stood out: "OpenCode on steroids" with rich diff viewing in the terminal. The new [OpenAI Codex](https://openai.com/codex/) desktop app also impressed with its clean all-in-one UI for diffs, terminal, and PR reviews.

The bigger story was cost. One attendee burned $200/month on [OpenCode](https://opencode.ai/) API calls, then switched to [Google Antigravity](https://developers.googleblog.com/build-with-google-antigravity-our-new-agentic-development-platform/) with a Gemini Pro promo at six euros per month. Same quality. [Kimi K2.5](https://kimi.com/ai-models/kimi-k2-5) is even cheaper at Chinese pricing. If you're not shopping around for tokens, you're overpaying.

### Cognitive Amplification and the Junior Dev Question

Someone shared a concept from a friend: "cognitive amplification." AI doesn't boost everyone equally. Deep domain knowledge gets multiplied. No domain knowledge? You might not even get to the right answer.

One attendee's Three.js experience proved the point. AI built in two days what took him months, but only because he could steer it past dead ends. Another attendee's co-founder codes with AI and it works 60-70% of the time. The other 30-40%? He's stuck and needs a senior dev.

The blunt conclusion: senior developers matter more than ever. But "what's the point of junior devs?" The group agreed the junior pipeline is under real threat.

### OpenClaw: Exciting and Terrifying

[OpenClaw](https://openclaw.ai/) is the personal AI assistant everyone wants but nobody fully trusts. It runs locally, connects through WhatsApp or Telegram, and uses bridge tools to access Apple Notes, email, and more. Over 500 installable skills.

One attendee set it up on a spare MacBook with a fresh account. His company banned it on work devices. The concern: skill injection, where a bad skill gets access to everything on your machine.

Practical advice from the group: dedicated hardware, dedicated accounts, start with one thing at a time. Don't hand it your real email on day one.

### MCP and Custom Domain Knowledge

Two approaches to giving AI domain knowledge came up. First: classic RAG. Generate an embedding from the user query, search a vector database, preload relevant docs into the LLM context. One attendee used [Jina AI](https://jina.ai/) for multimodal embeddings covering both text and images.

Second: ship a custom MCP server with domain knowledge baked in, and let users bring their own LLM API key. The company avoids token costs entirely. Why don't more companies do this? Most users don't know what an API key is.

Everyone agreed GitHub's MCP is too heavy on context. Several attendees already wrote their own lightweight MCPs with just the tool calls they actually need.

### Git Work Trees for Parallel AI Development

Git work trees were an obscure feature. Now they're essential. AI agents are fast enough to use parallel branches.

[OpenAI Codex](https://openai.com/codex/) shows this well: multiple tabs, each a separate work tree, each on a different issue. One attendee pair-programmed with a human on one issue while two AI agents worked on two other repos simultaneously. All three done by end of day.

The insight: work trees existed for years, but humans were never fast enough to justify them. AI changed that.

### The Meeseeks MCP

A fun pitch: a "V6 MCP" named after the Meeseeks from Rick and Morty. One task. Won't stop until it's done. If stuck, it spawns another copy of itself. The name alone got the group excited: "That will catch on fast."

The debate: is this really an MCP or a sub-agent pattern? The plan is to use [Vercel AI Gateway](https://vercel.com/ai-gateway) so users can plug in any LLM provider. Ship it with just a README and a picture of the Meeseeks character.

## Other Resources

- [Gamma](https://gamma.app/): AI slide maker that evaluates stock photos before placing them. Surprisingly polished output from short prompts.
- [Manus](https://manus.im/): AI agent that researches and builds full presentations. Works on mobile, exports to PPT/PDF.
- [Reveal.js](https://revealjs.com/): Open-source HTML presentation framework with code syntax highlighting.
- [Slidev](https://sli.dev/): Markdown-based slide framework for developers, built on Vue.js.
- [OpenCode](https://opencode.ai/): Open-source terminal AI coding agent. Great quality, expensive at ~$200/month in API costs.
- [Charm Crush](https://github.com/charmbracelet/crush): Terminal AI coding agent described as "OpenCode on steroids."
- [Google Antigravity](https://developers.googleblog.com/build-with-google-antigravity-our-new-agentic-development-platform/): VS Code fork by Google with Gemini integration. Six-euro/month Gemini Pro promo is a steal.
- [OpenAI Codex](https://openai.com/codex/): Desktop coding agent with git work trees for parallel development. Just launched for macOS.
- [OpenClaw](https://openclaw.ai/): Open-source personal AI assistant running locally via messaging apps. Exciting but raises security concerns.
- [RALPH Loop](https://github.com/snarktank/ralph): Recursive AI agent loop that runs coding tasks with fresh context until all PRD items are complete.
- [Jina AI](https://jina.ai/): Multimodal embedding provider for text and images, acquired by Elastic.
- [Vercel AI Gateway](https://vercel.com/ai-gateway): Unified API across multiple LLM providers.
- [KCL](https://www.kcl-lang.io/): CNCF configuration language for Kubernetes with type safety and compile-time checks.
- [Crossplane](https://www.crossplane.io/): Kubernetes-native infrastructure management with continuous state reconciliation.
- [Three.js Journey](https://threejs-journey.com/): WebGL course by Bruno Simon for 3D web development.
- [Helio Additive](https://www.helioadditive.com/): 3D printing simulation predicting failures before you print. Integrated with Bambu Studio.
- [Pleco](https://www.pleco.com/): Chinese dictionary app with OCR. Android's screen overlay permissions make it better than iOS for this.
- [Kimi K2.5](https://kimi.com/ai-models/kimi-k2-5): Open-source multimodal model from Moonshot AI. Very cheap tokens, especially at Chinese pricing.
