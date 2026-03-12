---
Title: AI Breakfast #31
Date: March 12, 2026
Time: 9:00 AM - 10:30 AM
Author: Ching Jui Young
---

# AI Breakfast #31

## Executive Summary

- [OpenClaw: The Promise and Pain of Personal AI Agents](#openclaw-the-promise-and-pain-of-personal-ai-agents) — Powerful but will spam your friends at 3am
- [Coding Agents and Workflow Tools](#coding-agents-and-workflow-tools) — Kanban boards for your AI workforce
- [Voice-First Computing](#voice-first-computing) — Apple TV remotes as Star Trek communicators
- [AI Meeting Notes Done Right](#ai-meeting-notes-done-right) — Granola quietly ignores your political rants
- [Smart Glasses as Daily Drivers](#smart-glasses-as-daily-drivers) — Real-time translation and rock climbing cameras
- [StudyFit: Build the Tool You Actually Want](#studyfit-build-the-tool-you-actually-want) — QR-coded worksheets bridge digital and physical

## Group Discussions

### OpenClaw: The Promise and Pain of Personal AI Agents

[OpenClaw](https://openclaw.ai/) dominated this week's conversation, with three out of five attendees actively experimenting. The use cases ranged from automating WeChat group monitoring and homework tracking to acting as a personal email assistant. One member set up a physical Linux box in Australia to escape China's VPN issues -- the difference was night and day, with zero bot-detection challenges on domestic internet.

The failure stories were equally instructive. One developer's first naive install started spamming WhatsApp contacts unprompted. Another set up OpenClaw on EC2 with Opus as the backbone model, told it to email three friends -- and it sent 57 follow-up emails about Margaret Thatcher overnight, burning $50 in two hours. The heartbeat system (which wakes the agent periodically) was still set to LA time, so the agent was active during Shanghai sleeping hours.

Isolation remains the core challenge. Running OpenClaw in a VM sounds right, but falls apart when you need native Mac apps like WeChat. One member gave up and went back to manual workflows. The group consensus: OpenClaw is powerful but requires serious guardrails. [NanoClaw](https://github.com/qwibitai/nanoclaw), a lighter containerized alternative, came up as a more security-conscious option.

### Coding Agents and Workflow Tools

The group split on whether autonomous coding agents add value during active development. A teacher-turned-developer argued they don't -- if the idea is still taking shape in your head, agents will just "build some MC Escher drawing of an app." But for DevOps, monitoring, and integration testing? That's where agents earn their keep.

[Vibe Kanban](https://www.vibekanban.com/) caught attention as a visual way to orchestrate coding agents. You drag tasks on a board, agents spin up in isolated branches, and you review diffs when they're done. One member was also experimenting with [Happy Coder](https://happy.engineering/) to control Claude Code from a phone, though noted it only supports two models currently.

On the model side, [Z AI's](https://www.zhipuai.cn/en) GLM-5 impressed as a surprisingly capable and generous option. One developer scored a holiday deal for around 5 RMB/month and never came close to hitting usage limits. For those wanting to keep costs down while running OpenClaw, connecting to a Max subscription via [NanoClaw](https://github.com/qwibitai/nanoclaw) was suggested as a way to avoid burning through API credits.

### Voice-First Computing

Nobody writes code by hand anymore -- that much was unanimous. But the group is increasingly split between keyboard and voice for everything around the code: prompts, terminal commands, thinking out loud.

One member uses an Apple TV Siri Remote on a lanyard as a voice-command device via [GoatRemote](https://goatremote.com/), a $10 app that turns the remote into a mouse, keyboard, and microphone for Mac. He uses it on the treadmill like a Star Trek communicator. The trackpad ring handles scrolling, and the mic handles voice commands through Whisper.

The consensus: once you switch to Whisper-based dictation, Apple's native dictation feels broken. [Granola](https://www.granola.ai/) runs on Whisper for its transcription backend, and one member now uses it as a general-purpose voice notes tool rather than just a meeting recorder.

### AI Meeting Notes Done Right

Granola earned genuine praise for its intelligence in filtering content. One member had it running during a tutoring session and went on a lengthy political rant about a student's assignment -- Granola completely excluded it from the notes, keeping only the lesson content. It consistently filters out pre-class banter and tangents to find the core thread.

For sales teams, [Fathom](https://fathom.ai/) is the tool of choice. It records all sales calls, syncs to CRM, builds a searchable library of customer conversations, and now offers real-time coaching. The group noted that most Western sales teams have adopted it. For China-based teams on WeChat, there's no clean equivalent yet -- the workaround is speakerphone plus a nearby device running Granola.

### Smart Glasses as Daily Drivers

The [Meta Ray-Ban](https://www.meta.com/ai-glasses/) glasses made an appearance, with one member wearing them daily in Australia for rock climbing and hands-free recording. First-person video while climbing with both hands occupied was the "one perfect use case." The glasses record 3-minute clips to 128GB onboard storage, then trickle-transfer via Bluetooth or bulk-download over a Wi-Fi hotspot.

Privacy hacking is already a thing -- online guides show how to Dremel out the recording indicator LED while keeping the sensor intact, and one-way stickers are available on Taobao.

The [Rokid](https://global.rokid.com/pages/rokid-glasses) AR glasses also showed up, running real-time translation subtitles powered by Qwen locally in China and Microsoft's model internationally. The next project: connecting Rokid to OpenClaw for visual AI feedback during conversations.

### StudyFit: Build the Tool You Actually Want

A teacher in the group built StudyFit, an education app born from watching a Korean cooking show where the final challenge was "make a dish for yourself." The philosophy: stop building for VCs, build what you actually need. Two years ago the technical complexity would have stopped him -- but Claude Opus 4.6 crossed a threshold where he could take on unfamiliar libraries without spending days in documentation.

The key innovation is bridging offline and digital learning. Worksheets get printed with unique QR codes encoding the course, student, and question IDs. Anyone -- teacher, student, parent, TA -- can scan to upload answers. The system then generates individualized follow-up worksheets based on each student's performance. Teachers who've seen it are already asking to sign up.

## Other Resources

- [OpenClaw](https://openclaw.ai/): Open-source personal AI agent that connects to WhatsApp, Telegram, email, and 50+ integrations. The star of this week's discussion -- and cautionary tales.
- [NanoClaw](https://github.com/qwibitai/nanoclaw): Lightweight, containerized alternative to OpenClaw with better security isolation. Runs agents in Docker containers.
- [Plane](https://plane.so): Open-source project management tool (Jira/Linear alternative) with great API. Used by one member to feed tickets to OpenClaw.
- [Vibe Kanban](https://www.vibekanban.com/): Visual Kanban board for orchestrating AI coding agents. Drag tasks, agents work in isolated branches.
- [Happy Coder](https://happy.engineering/): Mobile client for Claude Code with end-to-end encryption and voice coding support.
- [Z AI (Zhipu)](https://www.zhipuai.cn/en): Chinese AI platform running GLM-5. Extremely generous pricing -- one member pays ~5 RMB/month.
- [GoatRemote](https://goatremote.com/): $10 Mac app that turns an Apple TV Siri Remote into a mouse, keyboard, and voice controller.
- [Granola](https://www.granola.ai/): AI meeting notepad that transcribes and intelligently summarizes, filtering out tangents and banter.
- [Fathom](https://fathom.ai/): AI meeting recorder for sales teams with CRM sync, call library, and real-time coaching.
- [Meta Ray-Ban Smart Glasses](https://www.meta.com/ai-glasses/): Camera glasses with 12MP, voice commands, and Bluetooth audio. Great for hands-free recording.
- [Rokid AR Glasses](https://global.rokid.com/pages/rokid-glasses): Lightweight AR glasses with real-time translation in 89 languages. Runs Qwen locally in China.
