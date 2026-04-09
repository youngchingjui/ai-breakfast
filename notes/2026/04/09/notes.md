---
Title: AI Breakfast #35
Date: April 9, 2026
Time: 9:00 AM - 10:30 AM
Author: Ching Jui Young
---

## Summary

- [Claude vs ChatGPT: Personality Matters](#claude-vs-chatgpt-personality-matters) — token hooks, 19-page analyses, and who actually just does the thing
- [OpenClaw: Still Messy](#openclaw-still-messy) — 57 identical emails, a banned Gmail account, and security holes only agents find
- [The Memoir App, Built Live](#the-memoir-app-built-live) — 10-minute demo and the case for oral tradition over Facebook
- [Running Agents at Scale](#running-agents-at-scale) — 1GB per agent, git worktrees, and US VPS to escape VPN friction
- [AI-Powered Video Editing](#ai-powered-video-editing) — local Whisper, auto-cuts, and why Opus Clip fails at story

## Group Discussions

### Claude vs ChatGPT: Personality Matters

An airline pilot who recently switched from ChatGPT described the conversion moment: he fed both tools 15 hours of interview transcripts to produce a cultural analysis report. Claude returned 19 comprehensive pages that mapped directly to what the team needed. ChatGPT returned a solid but shallow summary — accurate, but no judgment.

The group picked apart why the tools feel different. ChatGPT's habit of ending every response with "would you like me to highlight 3 key takeaways?" drew groans — the theory floated: it's intentional, more conversation means more tokens burned. Claude stops when it's done. One attendee put it simply: "I use ChatGPT when I know what I want. I use Claude when I'm not sure yet."

The more interesting angle: maybe the difference isn't model quality at all but system prompt priorities — OpenAI optimizes for engagement, Anthropic for task completion. To really test it, you'd need to strip both models into the same harness with the same system prompt. Nobody's done it cleanly. Meanwhile, one member trains their AI to speak like a caveman to save tokens; another writes prompts in Chinese because characters are more compact.

### OpenClaw: Still Messy

Ching tested his OpenClaw instance this week by giving it a dedicated Gmail address and inviting friends to message it freely. One friend asked for a random Wikipedia article. The bot responded 57 times — once every five minutes — because it read the inbox, found the message, responded, and never checked whether it had already replied. Gmail eventually flagged the account as a bot and killed it.

The construction firm story from last week resurfaced: a contractor pays someone $500/week to manage OpenClaw agents for his business. Privately, the manager says it breaks constantly. One attendee who came specifically to learn about OpenClaw — he's presenting on it to a French Tech data science group in two months — left with more questions than answers.

A sharper angle emerged: one member used Claude Code to probe their company's internal systems and found a configuration gap their cybersecurity team had entirely missed. The access controls were designed for human users, validated by token. An agent that methodically probes every API endpoint sidesteps that model entirely. Agents aren't just faster than humans; they're differently capable — and the security surface hasn't caught up. A brief mention from another attendee: Anthropic reportedly has a model they're not releasing publicly yet because it was too effective at finding exploitable gaps in software systems.

### The Memoir App, Built Live

An airline pilot pitched a product idea mid-session: an app that records conversations with elderly relatives, transcribes the stories regardless of order, and assembles them into a coherent memoir. Ching built a working proof-of-concept during the conversation — about ten minutes, Whisper API for transcription, basic record UI.

The group debated the product. Privacy concerns came up, but the proposer pushed back: his dad would happily share his stories — railroad work, Vietnam-era draft dodger years — he just doesn't use Facebook. The insight that actually landed: the app isn't competing with a social network. It's a recording booth for the oral tradition. Humans have always preferred telling stories to writing them. The book format is the anomaly.

Monetization brainstorm: free with bring-your-own API key, then upsell printed memory books through a print-on-demand partner. One attendee suggested adding AI-generated conversation starters — the questions that unlock the stories, not just the recording. Another pointed out that the Rita Skeeter "magic quill" from Harry Potter is basically what this app is. That landed better than any product description.

### Running Agents at Scale

One attendee — recovering from hip surgery and needing everything to work from a phone — built a multi-device agent orchestration platform that dispatches Claude Code sessions from a planning interface. Each session runs on a US-based VPS, which means Anthropic calls are made from outside China, no VPN required, and work continues even when the phone disconnects. On reconnect, the interface shows the latest status and you just pick up.

For parallel work, he uses git worktrees — one per agent, each with its own isolated database so agents don't collide. He estimates roughly 1GB of RAM per concurrent agent. Ten agents means 10GB — workable on an M4 Max, but a real constraint that pushes the question of where to run. He's planning to offer trial access to the group next week.

The core architectural insight: this is spec-driven development, not session-driven. The unit of work is a written plan that gets dispatched, not a prompt you type. That shift changes what "babysitting the agent" looks like — you're reviewing specs and outputs, not watching a terminal scroll.

### AI-Powered Video Editing

One attendee built his own video editing pipeline in a day instead of paying $40/month for Screen Studio. The pipeline: record video and audio separately, run local Whisper for transcription, analyze the audio waveform to detect pauses and filler words, then let Claude review the transcript and mark which segments to cut. The output plays back with clean jump cuts.

A video editor in the group tested [Opus Clip](https://www.opus.pro/) for class recordings and confirmed what others suspected: it's fine for talk shows, broken for anything with narrative structure. It picks moments by scoring, not by story — so a dance class becomes random snippets instead of the moments that actually matter.

The gap they identified: commercial video editing has formal frameworks — pacing, story beats, the theory behind where cuts go. If those could be encoded into a system prompt, a pipeline could make principled decisions rather than heuristic ones. Neither the video editor nor the pipeline builder knew the formal theory well enough to write that prompt yet. They agreed to experiment together.

## Other Resources

- [OpenClaw](https://openclaw.ai/): Open-source personal AI agent with computer control, iMessage integration, and email. Discussed again for reliability issues and the security risks of agents with unrestricted API access.
- [Opus Clip](https://www.opus.pro/): Long-form video to short social clips. Works for talking-head content; struggles with anything requiring narrative judgment.
- [Descript](https://www.descript.com/): Audio/video editor that removes filler words by editing a transcript. Mentioned as an earlier off-the-shelf approach to automated cutting.
- [Screen Studio](https://screen.studio/): Mac screen recording tool with automatic zoom and smooth cursor effects. The $40/month cost motivated one attendee to build their own Whisper-based pipeline.
- [Whisper](https://github.com/openai/whisper): OpenAI's open-source speech recognition model. Runs locally on Apple Silicon; transcribing 100 hours of audio costs under $1 in electricity vs. $36 through the API. Install via pip or Homebrew.
- [WannaFlix](https://wannaflix.com/): VPN recommended by the group for use in Shanghai. Fast enough that most forget it's running, around $7–8/month. Split tunneling lets Chinese banking apps stay off the VPN.
