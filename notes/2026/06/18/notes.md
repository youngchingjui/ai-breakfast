---
Title: AI Breakfast #44
Date: June 18, 2026
Time: 9:00 AM - 10:30 AM
Author: Ching Jui Young
---

## TL;DR

- [Two Hours of Weekly Pain, Compressed to Five Seconds](#two-hours-of-weekly-pain-compressed-to-five-seconds) — the host killed a hated weekly chore
- [Skills That Update Themselves](#skills-that-update-themselves) — the agent writes its own bug lore
- [Let the Agent Write a Script, Then Step Aside](#let-the-agent-write-a-script-then-step-aside) — deterministic by default, agent on failure
- [The Browser Is Everyone's Research Analyst Now](#the-browser-is-everyones-research-analyst-now) — paywalls, arbitrage, Instagram
- [Why Nobody at the Table Uses GitHub Copilot](#why-nobody-at-the-table-uses-github-copilot) — 200 lines of options bloats your code
- [Quick Hits](#quick-hits) — a Morse-coded jailbreak, a 120-episode AI satire series, an AI dog teaching Chinese

## Two Hours of Weekly Pain, Compressed to Five Seconds

The host killed a recurring chore: creating each week's event listing on [Huodongxing](https://www.huodongxing.com/), the Chinese event platform he'd come to dread. The site is a maze of dropdown pickers, two separate description fields (one rich-text, one plain), a ticket-type form blocked until you save a name first, and a QR code that crashes the server if you ask for it too early. Two hours of weekly cursing.

Now he tells [Claude Code](https://www.anthropic.com/claude-code) "create next week's event," walks away, and comes back to a finished listing. Human time: five seconds plus a WeChat scan. Build time: three hours, mostly the first session while the agent stumbled through every quirk.

The unlock was [agent-browser](https://github.com/vercel-labs/agent-browser), a skill from Vercel that drops a [Chrome for Testing](https://googlechromelabs.github.io/chrome-for-testing/) instance onto your machine and teaches the agent how to drive it. Skills, a non-coder asked, are they just prompts? Yes — layered ones, with "if you need X, load this sub-skill" pointers, so context only grows when needed. [Skills.sh](https://skills.sh/) and the official Anthropic catalog are where most people start browsing.

## Skills That Update Themselves

The real trick wasn't the browser — it was teaching the skill to update itself. At the end of every painful session, the host fed the agent one prompt: "everything you learned about this site, append to the skill file." The agent jotted down each gotcha — a dropdown that needs a special character to match Jing'an district, an image-upload field hiding behind a layer of HTML, a 3-second error message the agent's screenshot can't catch in time, the ten-minute server delay before QR codes become downloadable.

Four sessions in, no human intervention was needed. The skill file is now 370 lines of bug lore. It even sets its own ten-minute countdown timer to wait for the QR code to render.

A media veteran at the table called this pattern "reflect" — at the end of any task, ask the agent what it learned and have it write that back into its own instructions. The architecture has shifted. The work you used to do — debugging, generalizing, writing it down — is the agent's job now, and you supervise. As one journalist put it: tastes and discrimination are what's left of the human in the loop.

## Let the Agent Write a Script, Then Step Aside

A [Selenium](https://www.selenium.dev/) developer countered: once the agent has reverse-engineered a site, why keep paying tokens to re-derive every step? Have it emit a plain script that does the same clicks the same way every time. Run the script daily. Let the agent re-engage only when the script breaks — the script dumps a failure report, the agent reads it, patches the code, you're back to fast-and-cheap.

The host liked it. The trade-off is upkeep: every UI change still breaks the script — but at least the agent heals it instead of you. For anything you run more than weekly, the hybrid wins.

## The Browser Is Everyone's Research Analyst Now

The same trick scales beyond chore-killing. The visiting British journalist's research pipeline logs a headless browser into his New York Times, Washington Post, Atlantic, and Perplexity subscriptions, fans claims out to multiple frontier models, and runs adversarial review before he reads anything. Most sites either expose no API or have priced it out of reach.

He's also probing the limits — automating mispriced-odds arbitrage between traditional sportsbooks, [Polymarket](https://polymarket.com/), and [Kalshi](https://kalshi.com/). The edge is real but visibly shrinking as other bots find it. The cat-and-mouse twist: newer headless-browser libraries are evolving specifically to defeat the bot detection that betting and dating sites deploy.

A travel-agency founder wants to pull an influencer's full Instagram feed into her knowledge base. Instagram has no useful API; Reddit and X have priced theirs out; only [Grok](https://grok.com/) can search X natively (ChatGPT now reaches Reddit through an [OpenAI–Reddit data deal](https://openai.com/index/openai-and-reddit-partnership/), so the table's "only Grok" line overstated it). Agent-browser is the escape hatch.

## Why Nobody at the Table Uses GitHub Copilot

Nobody at the table uses [GitHub Copilot](https://github.com/features/copilot) anymore. The complaint was specific: ask Copilot to fix a bug and it returns 200 lines of options, of which two are relevant. Pick the wrong one and a future Copilot will suggest fixes for the bugs Copilot caused. The Italian freelancer who tried it has moved on. He doesn't see Microsoft winning the trust back even by going free.

The same underlying model — Claude, accessed through [Cursor](https://cursor.com/) — performs noticeably better on benchmarks. The table's read: the harness (prompts, tool-calling, context management) is the product now; the model is a commodity input.

## Quick Hits

**A Morse-coded jailbreak, as told at the table.** Two months back, someone tricked Grok into authorizing a $200K transfer by encoding the malicious prompt in Morse code and wrapping it in an innocent "please decode this" request. Same family as the old "my dead grandma used to give me Windows activation keys" jailbreak. (The story passed around the table without a source, but it checks out — the attacker first gifted Grok a Bankr Club Membership NFT to unlock transfer authority, then posted Morse code instructing `bankrbot` to send 3B DRB tokens (~$175–200K) to their wallet, and later returned ~80%. Writeups: [FYEO](https://fyeo.io/blog/morse-code-prompt-injection-grok-bankrbot-200k), [NeuralTrust](https://neuraltrust.ai/blog/grok-morse-code), [OECD AI Incidents](https://oecd.ai/en/incidents/2026-05-04-4a73).) The point stood for the demo above: never auto-approve agent actions on anything that can move money.

**A 120-episode AI satire series, posted daily.** One attendee has gotten hooked on a Chinese TikTok cartoon series where Iran is a Persian cat, Trump is an eagle (everyone keeps misreading it as an owl), and China is the panda referee. Generated daily through the Iran war, the run is ~120 episodes — AI-generated narrative content reliable enough to sustain a daily audience.

**Teaching a four-year-old Chinese with an AI dog.** The same attendee is producing short videos starring an AI version of his dog, voiced down to a four-year-old's vocabulary, to teach his niece Chinese and his nephew English. A bit embarrassing, he admits. But the kids watch.

**Fable went missing.** Anthropic's newer Fable model was intermittently unavailable in the last two weeks. Some users could still reach it inside Cursor while it was gone from the Claude app — you're not getting "the model," you're getting whatever harness is in front of it.

**Token economics on the Max plan.** A passing note worth flagging: the $100/month Claude Max plan operates on five-hour rolling session limits, with a 1M-token context window per thread (1M is the Claude Code / API ceiling — the Claude web app is still 200K per [Anthropic's plan docs](https://support.claude.com/en/articles/8606394-how-large-is-the-context-window-on-paid-claude-plans); the demo ran through Claude Code, so the budget applies). The 30-minute browser-automation run shown in the demo burned about 200K of that thread's context — a quarter of the budget for one fully automated chore.

## Other Resources

- [Huodongxing](https://www.huodongxing.com/): Chinese event-registration platform used by ~600K organizers. The site whose UX bane drove the morning's automation demo.
- [Claude Code](https://www.anthropic.com/claude-code): Anthropic's terminal coding agent. The host's daily driver and the engine behind the demo.
- [Claude Cowork](https://claude.com/product/cowork): Anthropic's non-developer wrapper over Claude Code. The host used the desktop UI, not the terminal, for the demo.
- [Agent-browser](https://github.com/vercel-labs/agent-browser): Vercel's open-source browser-automation skill. The discovery that made the demo possible.
- [Skills.sh](https://skills.sh/): Community marketplace for Claude Code skills. Where the host pointed non-coders to browse.
- [Chrome for Testing](https://googlechromelabs.github.io/chrome-for-testing/): Google's auto-update-free Chrome flavor for automation. What agent-browser drives under the hood.
- [Glaze](https://www.glaze.app/): Raycast's prompt-to-Mac-app tool. The host's first attempt broke; he's coming back to it.
- [Wispr Flow](https://wisprflow.ai/): Voice-to-text dictation, ~4× the host's typing speed. How he feeds context to the agent faster than typing.
- [Polymarket](https://polymarket.com/) and [Kalshi](https://kalshi.com/): Prediction markets. The arbitrage targets in the journalist's headless-browser betting experiments.
- [Cursor](https://cursor.com/): AI-first code editor. Cited as evidence that the harness matters more than the model.
- [GitHub Copilot](https://github.com/features/copilot): Microsoft's pioneer coding assistant. Now unused by anyone at the table.
- [Grok](https://grok.com/): xAI's chatbot. The only major model that can natively search X (ChatGPT also pulls Reddit content via its [OpenAI–Reddit partnership](https://openai.com/index/openai-and-reddit-partnership/)).
