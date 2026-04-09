---
Title: AI Breakfast #35
Date: April 9, 2026
Time: 9:00 AM - 10:30 AM
Author: Ching Jui Young
---

## Summary

- [Claude vs ChatGPT: Personality Matters](#claude-vs-chatgpt-personality-matters) — token hooks, 19-page analyses, and who actually just does the thing
- [OpenClaw: Agents and the Security Gap](#openclaw-agents-and-the-security-gap) — how agents find holes humans miss, and Anthropic's model they're not releasing
- [The Memoir App, Built Live](#the-memoir-app-built-live) — 10-minute demo and the case for oral tradition over Facebook
- [Running Agents at Scale](#running-agents-at-scale) — 1GB per agent, git worktrees, and US VPS to escape VPN friction
- [AI-Powered Video Editing](#ai-powered-video-editing) — local Whisper, auto-cuts, and why Opus Clip fails at story

## Group Discussions

### Claude vs ChatGPT: Personality Matters

An airline pilot who recently switched from ChatGPT described the conversion moment: he fed both tools 15 hours of interview transcripts to produce a cultural analysis report. Claude returned 19 pages that mapped directly to what the team needed. ChatGPT returned a solid but shallow summary — accurate, but no judgment.

The group picked apart why the tools feel different. ChatGPT's habit of ending every response with "would you like me to highlight 3 key takeaways?" drew groans — the theory floated: it's intentional, more conversation means more tokens burned. Claude stops when it's done. One attendee put it simply: "I use ChatGPT when I know what I want. I use Claude when I'm not sure yet."

The more interesting angle: maybe the difference isn't model quality at all but system prompt priorities — OpenAI optimizes for engagement, Anthropic for task completion. To really test it, you'd need to strip both models into the same harness with the same system prompt. Nobody's done it cleanly. One member trains their AI to speak like a caveman to save tokens; another writes prompts in Chinese because characters are more compact.

### OpenClaw: Agents and the Security Gap

OpenClaw came up again, mostly through second-hand horror stories. One attendee came specifically to learn about it — he's scheduled to present on it to a French Tech data science group in two months — and left with more questions than answers. The room's collective experience: nobody fully trusts it yet.

The sharper discussion was about security. One member used Claude Code to probe their company's internal systems and found a configuration gap the cybersecurity team had entirely missed. The access controls were designed for humans — validated by user tokens — and an agent that methodically probes every API endpoint sidesteps that model entirely. Agents aren't just faster than humans; they're differently capable.

That thread connected to a timely news item: Anthropic is withholding its latest model, [Claude Mythos Preview](https://www.axios.com/2026/04/07/anthropic-mythos-preview-cybersecurity-risks), from public release. It can find tens of thousands of zero-day vulnerabilities and write working exploits. During testing it escaped its sandbox and emailed a researcher to explain how. Rather than a public launch, Anthropic is rolling it out to a consortium of 40+ security organizations via [Project Glasswing](https://www.nbcnews.com/tech/security/anthropic-project-glasswing-mythos-preview-claude-gets-limited-release-rcna267234). The group's takeaway: the security surface for AI agents hasn't caught up with what the models can actually do.

### The Memoir App, Built Live

An airline pilot pitched a product idea: an app that records conversations with elderly relatives, transcribes the stories regardless of order, and assembles them into a coherent memoir. The organizer built a working proof-of-concept during the conversation — about ten minutes, Whisper API for transcription, basic record UI.

The group debated the product. Privacy concerns came up, but the proposer pushed back: his dad would happily share his stories — railroad work, Vietnam-era draft dodger years — he just doesn't use Facebook. The insight that landed: the app isn't competing with a social network. It's a recording booth for the oral tradition. Humans have always preferred telling stories to writing them. The book format is the anomaly.

One attendee pointed out that the [Rita Skeeter magic quill](https://harrypotter.fandom.com/wiki/Quick-Quotes_Quill) from Harry Potter is basically what this app is — it transcribes what you say and renders it in narrative form, without you having to write anything. Monetization brainstorm: free with bring-your-own API key, then upsell printed memory books through a print-on-demand partner.

### Running Agents at Scale

One attendee — recovering from an injury and needing everything to work from a phone — built a multi-device agent orchestration platform that dispatches Claude Code sessions from a planning interface. Each session runs on a US-based VPS, which means Anthropic calls are made from outside China, no VPN required, and work continues even when the phone disconnects. On reconnect, the interface shows the latest status and you just pick up.

For parallel work, he uses git worktrees — one per agent, each with its own isolated database so agents don't collide. He estimates roughly 1GB of RAM per concurrent agent. Ten agents means 10GB — workable on an M4 Max, but a real constraint that pushes the question of where to run. He's planning to offer trial access to the group next week.

The core architectural insight: this is [spec-driven development](https://softwareengineeringdaily.com/2021/04/26/specification-driven-development/), not session-driven. The unit of work is a written plan that gets dispatched, not a prompt you type. That shift changes what "babysitting the agent" looks like — you're reviewing specs and outputs, not watching a terminal scroll.

### AI-Powered Video Editing

One attendee built his own video editing pipeline in a day instead of paying $40/month for [Screen Studio](https://screen.studio/). The pipeline: record video and audio separately, run local [Whisper](https://github.com/openai/whisper) for transcription, analyze the audio waveform to detect pauses and filler words, then let Claude review the transcript and mark which segments to cut. The output plays back with clean jump cuts.

A video editor in the group tested [Opus Clip](https://www.opus.pro/) for class recordings and confirmed what others suspected: it's fine for talk shows, broken for anything with narrative structure. It picks moments by scoring, not by story — so a dance class becomes random snippets instead of the moments that actually matter.

The gap they identified: commercial video editing has formal frameworks — pacing, story beats, the theory behind where cuts go. If those could be encoded into a system prompt, a pipeline could make principled decisions rather than heuristic ones. Neither the video editor nor the pipeline builder knew the formal theory well enough to write that prompt yet. They agreed to experiment together.

## Other Resources

- [Claude Mythos Preview](https://www.axios.com/2026/04/07/anthropic-mythos-preview-cybersecurity-risks): Anthropic's withheld model — too effective at finding zero-day vulnerabilities and writing exploits for public release. Rolling out to security orgs via Project Glasswing instead.
- [OpenClaw](https://openclaw.ai/): Open-source personal AI agent with computer control, iMessage integration, and email. Security risks of agents with unrestricted API access were a focus this session.
- [Opus Clip](https://www.opus.pro/): Long-form video to short social clips. Works for talking-head content; struggles with anything requiring narrative judgment.
- [Descript](https://www.descript.com/): Audio/video editor that removes filler words by editing a transcript. Mentioned as an earlier off-the-shelf approach to automated cutting.
- [Screen Studio](https://screen.studio/): Mac screen recording tool with automatic zoom and smooth cursor effects. The $40/month cost motivated one attendee to build their own pipeline.
- [Whisper](https://github.com/openai/whisper): OpenAI's open-source speech recognition model. Runs locally on Apple Silicon; transcribing 100 hours of audio costs under $1 in electricity vs. $36 through the API.
- [WannaFlix](https://wannaflix.com/): VPN recommended by the group for use in Shanghai. Fast enough that most forget it's running, ~$7–8/month. Split tunneling lets Chinese banking apps stay off the VPN.
