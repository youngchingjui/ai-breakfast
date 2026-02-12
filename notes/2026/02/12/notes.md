---
Title: AI Breakfast #29
Date: February 12, 2026
Time: 9:00 AM - 10:30 AM
Author: Ching Jui Young
---

# AI Breakfast #29

## Executive Summary

At our AI Breakfast, a group of entrepreneurs, freelance developers, and automation specialists — joined by a newcomer interning at a local tech firm — discussed topics ranging from [being the bottleneck in AI workflows](#the-human-bottleneck), [sandboxing agents to prevent destructive actions](#agent-safety-and-sandboxing), [Anthropic's Opus 4.6 sabotage report](#the-sabotage-report), [the problem with AI-generated content on LinkedIn](#ai-generated-content-and-authenticity), and [multi-agent coding workflows](#multi-agent-workflows-and-tooling). The group also shared updates on their projects, including [a digital personas product](#member-work) and [a go-to-market automation platform](#member-work).

## Group Discussions

### The Human Bottleneck

The session's opening question set the tone: instead of the usual show-and-tell, the organizer asked everyone to share what they need help with. His own answer was immediate — he feels like the bottleneck. He has agents writing blog posts, building features, and setting up Stripe integrations, but every one of them is waiting for him to sit down, review the output, and approve the next step. "There's a lot of work that can be done, but it's all waiting for me," he said.

A freelance developer echoed the feeling but came at it from the opposite direction. He'd rather work one stream at a time than split his attention across multiple agents. The idea of managing five or ten parallel agents felt like "fast track to Alzheimer Land." He's comfortable in his current setup and would rather wait for the tooling to mature than chase the bleeding edge. The automation specialist in the group saw both sides — the bottleneck is real, but the solution isn't just running everything autonomously. It's figuring out exactly which commands are safe to auto-approve and which ones need a human eye.

### Agent Safety and Sandboxing

The bottleneck conversation naturally led to the scariest topic of the morning: what happens when you give agents too much freedom. The organizer shared two war stories. In the first, an agent ran `rm -rf`, permanently deleting files that never went through the Mac trash. In the second, an agent decided a messy local database should get a fresh start and wiped it clean. The only thing that saved him was a backup from the day before.

The automation specialist had his own wake-up call the previous week. He realized that letting an agent run Python scripts effectively gave it read access to every file on his system — no permission setting could stop a script from reading whatever it wanted. He overhauled his entire setup, removing the ability for agents to execute code directly. His new rule: don't rely on the model choosing not to do something dangerous. Instead, make sure it physically can't. The group agreed that write operations inside a git-tracked folder are generally safe since you can always revert, but anything outside that boundary — system settings, environment variables, production configs — needs manual approval.

### The Sabotage Report

The automation specialist brought up [Anthropic's sabotage evaluation for Opus 4.6](https://www-cdn.anthropic.com/14e4fb01875d2a69f646fa5e574dea2b1c0ff7b5.pdf). The report assesses whether the model could act against a user's interests without being detected. The conclusion: it has the capability but not yet the ability to hide malicious actions from a careful observer, putting it at a "low but not negligible" risk level. What caught the group's attention was the implication that future models may cross that threshold. If a model can install a backdoor that a later, more powerful model could exploit, the game changes entirely. One attendee noted that tools like OpenClaw, where users deploy agents with broad system access, become much riskier in that scenario. The group also briefly noted that [Anthropic's head of AI safety research recently resigned](https://www.businesstoday.in/technology/news/story/anthropics-head-of-ai-safety-mrinank-sharma-resigns-says-world-is-in-peril-in-resignation-letter-515448-2026-02-10), saying the situation is becoming "too gray."

### AI-Generated Content and Authenticity

The organizer has 70 draft blog posts sitting unreviewed. He knows he needs to share more about his work, but every AI-generated draft sounds wrong — too verbose, too generic, hitting the wrong notes. He trained in consulting where teams spent hours crafting two-line slide titles, and AI doesn't replicate that precision. His current workaround: have the AI list the key bullet points, then type the actual post himself on his phone during his train commute. Manual, but it sounds like him.

The group split on whether voice even matters. The automation specialist argued that the substance behind a post matters more than how it's written — if someone built something genuinely interesting, he doesn't care if AI polished the writeup. The newcomer pushed back, saying he wants to "hear the person's voice" when reading LinkedIn, not emoji-laden AI slop. The conversation drifted to deepfakes, with the newcomer bringing up a viral fake video of an ICE agent being refused service at a store. Some commenters knew it was AI-generated but said "the message is right," which troubled the group. The organizer pointed out that the practical solution won't be labeling AI content — it'll be cryptographically signing real content at the device level, since proving authenticity is easier than proving fabrication.

### Multi-Agent Workflows and Tooling

On the practical side, the organizer showed off his current workflow: a script that spawns separate Claude Code agents for each task on his to-do list, while he reviews their changes across multiple projects in a VS Code workspace. The workspace view lets him see uncommitted diffs across all repos in one place — a feature he never needed before agents started editing code across projects simultaneously.

Both the organizer and the automation specialist have cancelled their Cursor subscriptions. They still use the Cursor editor for reviewing diffs, but all coding now happens through Claude Code in the terminal. The friction point is switching between the terminal and the editor — file links from Claude Code don't open directly in Cursor. The organizer's fix: change the default app for each file extension at the OS level. The freelance developer, meanwhile, plans to stick with Cursor and wait for the dust to settle, reasoning that switching workflows too often costs more cognitive energy than it saves.

## Member Work

The organizer introduced a new project called Refolk — a platform for creating deep digital personas that go far beyond traditional marketing profiles. The name came from a product naming skill he built, which automatically checks domain availability. The concept, born from a recent hackathon, uses LLMs to build rich persona profiles that can respond with depth and nuance. Potential use cases range from training simulations to marketing campaign testing across diverse audience segments. The automation specialist shared a link to a similar company in the twin/persona space, though the group noted its landing page suffered from the same problem most AI startups have: beautiful design, all the right buzzwords, but no clear explanation of what it actually does.

The newcomer introduced himself as a digital commerce graduate from Germany, now interning at a local tech company to learn about AI. He's familiar with ChatGPT but new to the broader ecosystem. His big question for the group: is AI going to be dangerous in the coming years? The group addressed this through the sabotage report discussion and the sandboxing conversation rather than giving a simple yes or no.

## Other Resources

- [Anthropic Opus 4.6 System Card](https://www-cdn.anthropic.com/14e4fb01875d2a69f646fa5e574dea2b1c0ff7b5.pdf): Safety evaluation report assessing whether the model can act against user interests undetected. The group found the "low but not negligible" risk conclusion thought-provoking, especially the discussion of backdoor installation for future models.
- [Claude Code](https://docs.anthropic.com/en/docs/claude-code): Anthropic's CLI coding agent. Two attendees have switched to it full-time and cancelled their Cursor subscriptions, using the editor only for diff review.
- [VS Code Workspaces](https://code.visualstudio.com/docs/editor/workspaces): Multi-root workspace feature for viewing multiple repos in one window. The organizer uses it to review uncommitted changes across all projects his agents are editing.
- [Angela Duckworth's commencement speech](https://singjupost.com/transcript-of-angela-duckworths-commencement-speech-to-2025-penn-gse-graduates/): Referenced as an example of AI-assisted content that works because it's grounded in real personal experience, even if the final words were polished by AI.
