# AI Breakfast #17 Notes

Thursday, November 20, 2025

![Group Photo](/images/notes/2025/11/20/group-photo.jpeg)

## Executive Summary

At our AI Breakfast #17, our group of developers, entrepreneurs, teachers, parents, and engineers talked about [AI tools for building software](#ai-tools-for-building-software), [AI in group chats](#ai-in-group-chats), [speech recognition for language learning](#speech-recognition-for-language-learning), [agent frameworks](#agent-frameworks), and [AI travel planning limitations](#ai-travel-planning-limitations). People also shared live demos of their work, including [Issue to PR](#issue-to-pr-voice-based-websiteapp-builder), [BumpSend](#bumpsend-hackathon-project), a [German reading coach app](#german-reading-coach-app), a [triple-tap screenshot-based reply assistant](#triple-tap-screenshot-based-reply-assistant), and an [MBTI communication platform](#mbti-communication-platform).

---

## Table of Contents

- [AI Breakfast #17 Notes](#ai-breakfast-17-notes)
	- [Executive Summary](#executive-summary)
	- [Table of Contents](#table-of-contents)
	- [Member Introductions](#member-introductions)
		- [Issue to PR (Voice-Based Website/App Builder)](#issue-to-pr-voice-based-websiteapp-builder)
		- ["BumpSend" Hackathon Project](#bumpsend-hackathon-project)
		- [German Reading Coach App](#german-reading-coach-app)
		- [Triple-Tap Screenshot-Based Reply Assistant](#triple-tap-screenshot-based-reply-assistant)
		- [MBTI Communication Platform](#mbti-communication-platform)
		- [Additional Member Highlights](#additional-member-highlights)
	- [Group Discussions](#group-discussions)
		- [AI Tools for Building Software](#ai-tools-for-building-software)
		- [AI in Group Chats](#ai-in-group-chats)
		- [Speech Recognition for Language Learning](#speech-recognition-for-language-learning)
		- [Agent Frameworks](#agent-frameworks)
		- [AI Travel Planning Limitations](#ai-travel-planning-limitations)
	- [Side Topics](#side-topics)
		- [AI Digitalization Value Capture](#ai-digitalization-value-capture)
		- [Call Center Automation](#call-center-automation)
		- [Parenting Perspectives on Screen Time](#parenting-perspectives-on-screen-time)
		- [Prior Art Research](#prior-art-research)
	- [Other Resources](#other-resources)

---

## Member Introductions

### [Issue to PR](https://issuetopr.dev) (Voice-Based Website/App Builder)

A member shared their ongoing work on a voice-based website and app builder. After a break, they're pivoting toward a "Lovable V2" version, focusing on iterating websites and apps using voice commands. The vision includes launching multiple features rapidly through voice interaction, potentially enabling collaborative building with friends. The project centers on a voice-based iteration system that enables rapid feature development through voice commands, with plans for improved UI/UX in future versions.

The member also shared their experience using a travel booking platform's AI agent on [Trip.com](https://trip.com) to plan a trip to Japan. The results were "hit or miss" and required significant manual booking on Japanese websites. They encountered issues with incorrect links and bus timetables, spending approximately 8 hours on the traditional booking process. They hope AI could reduce this to 1 hour in the future.

### "BumpSend" Hackathon Project

A member from Australia working on spatial/3D projects and VR interfaces shared their hackathon project "BumpSend" — a platform for sending fist bumps to teammates. Built for a hackathon sponsored by [Convex](https://convex.dev) (backend-as-a-service) and [TanStack Start](https://tanstack.com/start) (framework provider), the project didn't make the deadline but received positive feedback. The platform serves as team greeting cards with personalized messages, featuring brand scraping for logos and colors, a drag-and-drop sticker interface, and mobile-optimized vertical scrolling. The pricing model includes a free tier for 2 recipients and paid tiers for 5 and 10 recipients. The tech stack uses [Convex](https://convex.dev) as the backend, [TanStack Start](https://tanstack.com/start) (a Next.js alternative), and the [Firecrawl](https://firecrawl.dev) API for brand scraping. The hackathon had a prize pool of $150,000 across 106 entries.

The member used Cursor 2.0 Composer for development and found it extremely fast for iteration. Through this experience, they learned that AI agents excel at CLI and backend work but struggle with UI polish. Front-end work requiring "feel" — such as drag-and-drop interactions, rotation, timing, and frame rate — remains challenging for AI. While browser testing tools in Cursor are valuable for simple UIs, the member plans to launch the project for Christmas greetings.

### German Reading Coach App

A member building a go-to-market automation platform shared a side project: a German reading coach app for their 8-year-old child. The app provides pronunciation feedback and scoring for reading practice. The technical implementation uses the [Azure Speech API](https://azure.microsoft.com/en-us/products/cognitive-services/speech-services/), which offers a free tier with approximately 5 hours of usage. The app supports reference text for pronunciation scoring and provides word-level feedback along with overall scores measuring fluency, accuracy, and completeness. Users can replay audio segments for specific words, and the app supports multiple languages including Arabic, Catalan, Cantonese, Danish, Dutch, Taiwanese, and various English accents.

The app enables children to self-check their reading without constant parent supervision. With OCR integration, children can scan book pages directly, enabling independent practice with feedback loops. Similar functionality already exists in Chinese educational platforms such as [Songshu AI](https://www.dingtalk.com) on [DingTalk](https://www.dingtalk.com). Educational publishers have begun adding QR codes to textbooks that link to reading assessment tools. There's also a potential hardware device opportunity for parents who want to avoid screen time while still providing reading practice.

### Triple-Tap Screenshot-Based Reply Assistant

A member demonstrated an iOS shortcut-based tool that generates contextual replies using screenshots. Triple-tapping triggers OCR, sends context to an LLM, and generates suggested responses. The tool works system-wide on iOS using the [Shortcuts](https://support.apple.com/guide/shortcuts/welcome/ios) app, following a workflow where it takes a screenshot, performs OCR, sends the context to an LLM, and generates suggested responses. The service offers a free tier with 10 responses per day and a pro tier with 50 responses per day. The tool is currently iOS-only, as Android doesn't support OS-level macros.

Use cases include restaurant review generation where the tool sees the context and generates an appropriate review, LinkedIn comment generation, and general messaging assistance. The member built a web service for distributing shortcut templates where users can register and download the shortcut. The creator pays for all AI token costs.

### MBTI Communication Platform

A full-stack developer shared their work on an MBTI-based communication platform. The vision includes group chat functionality with AI mediation to help people understand communication styles and improve interactions. Currently, they're building features for profile learning and connection dynamics, using AI agents to populate data and content. They're exploring group chat AI integration similar to [ChatGPT](https://openai.com)'s group chat feature, though they face challenges with AI-generated profile assessments and recognize that comprehensive questionnaires are still needed.

From a technical perspective, group chat AI requires careful context management. There's a need for a dispatcher or classifier before sending full context to the LLM due to cost and context window concerns. The developer is working on balancing AI presence with natural conversation flow.

### Additional Member Highlights

One member is transitioning into sourcing infrastructure parts for data centers. They're using [ChatGPT](https://openai.com) as a study mentor and tutor for reading technical books, quizzing themselves after reading chapters to improve retention. They prefer [ChatGPT](https://openai.com) over [Grok](https://x.ai) for natural conversation flow.

A member with a finance and economics background uses AI to convert abstract consultancy language into mathematical models. They've built real estate valuation models using AI-assisted data scraping and view AI as a productivity tool while acknowledging trade-offs. They use [ChatGPT](https://openai.com) for task breakdown and time management but express ambivalence about "taking orders from a robot."

A teacher and parent member downloaded [Anti Gravity](https://antigravity.dev), Google's new IDE competitor to [Cursor](https://cursor.sh), which features automated browser testing after code completion. They're considering letting their Cursor subscription expire in favor of pay-as-you-go alternatives. They express strong ambivalence about AI, seeing it as an optimization problem that can diminish human experience, and are concerned about AI replacing meaningful parent-child interactions.

A hardware engineer member previously worked at a chip design company and is currently sourcing developers for hardware projects. They have a background in chipset design for AI chips.

A teacher and writer member attended to see product demos and exchange books. They're interested in checking whitepapers before building new projects.

---

## Group Discussions

### AI Tools for Building Software

Members discussed [Cursor 2.0 Composer](https://cursor.com/blog/2-0), noting it enables extremely fast iteration — users can get 4 turns in the time it takes to get 1 with other tools. The new version includes browser testing tools built-in, which previously required MCP. The Composer model is smaller and faster, using their own trained model. However, members expressed frustration that pricing changes frequently. The free tier has limits, with a premium model available.

[Anti Gravity](https://antigravity.dev), Google's IDE competitor to Cursor, features automated browser testing similar to Atlas. It requires VPN access in some regions and is built on core IP from Windsurf, which Google acquired.

Members shared experiences with [Replit Agents](https://replit.com), where a non-developer built a complex CRM system for plumbers. The agent automatically tests features in the browser after creation, which is helpful for catching issues not visible in code.

The group's key insights centered on how AI agents excel at CLI and backend work, enabling fast iteration and easy testing. However, UI and front-end work requiring "feel" remains challenging. Drag-and-drop interactions, rotation, timing, and frame rate are all difficult for AI to handle well. Browser testing tools are valuable but limited to simple UIs. TypeScript end-to-end enables faster iteration through shared types and auto-fix capabilities.

### AI in Group Chats

Members discussed ChatGPT's group chat feature, which can be added to group chats and only responds when contextually relevant, avoiding responses to every message. The feature feels natural and doesn't require explicit @mentions, though it requires server location switching in some regions like Japan.

The conversation revealed several technical challenges. Group chats have continuous context rather than discrete conversations, which creates complexity. Sending full context on every message is expensive, creating a need for a dispatcher or classifier before LLM processing. Determining when AI should respond versus staying silent is a key challenge, and group size limits remain unclear.

Design considerations include making the AI feel human with natural timing rather than walls of text. There may be a delay mechanism that waits for human responses before the AI chimes in. Potential use cases include information retrieval, mediation, and context-aware suggestions.

Privacy and data concerns emerged around questions of data collection, including friend networks and preferences. Members speculated this may be an experimental feature to compete with specialized group chat AI companies.

### Speech Recognition for Language Learning

Members explored the [Azure Speech API](https://azure.microsoft.com/en-us/products/cognitive-services/speech-services/), which offers a free tier with approximately 5 hours of transcription. The API provides pronunciation scoring and supports reference text for accuracy comparison. It includes multiple language support for German, Chinese variants, English accents, and more.

In real-world implementation, Chinese educational platforms like [Songshu AI](https://www.songshuai.com) are already implementing reading assessment features. The technology is used in [DingTalk](https://www.dingtalk.com), an educational platform, for homework assignments. Parents can review pronunciation reports, and teachers may review them as well, though the AI is likely doing the heavy lifting.

The educational context has evolved significantly. Twenty years ago, CD-ROMs provided teacher assessment, while today QR codes on textbooks link directly to AI assessment tools. The key innovation is that automated feedback enables self-service learning. There's also a hardware opportunity for dedicated devices that appeal to parents who want to avoid screen time.

Language support is extensive, covering Arabic, Catalan, Cantonese, Danish, Dutch, Taiwanese, and various English accents. The API is primarily used for transcription, with pronunciation scoring as an additional feature.

### Agent Frameworks

Members compared various agent frameworks and shared their experiences. [LangChain](https://js.langchain.com) is used for observability and AI evals, though it sometimes feels like an unnecessary abstraction layer. It's useful when switching between multiple model providers, but one member ended up building a custom framework after starting with LangChain.

[LangFuse](https://langfuse.com) is used for AI observability, but members found the UI tries to cover too wide a ground. One member ended up building a custom UI on top of it, then stopped using it entirely.

Chinese SaaS platforms like [Diffy](https://diffy.ai) and [FastGPT](https://fastgpt.in) offer node-based visual workflow builders that enable quick iteration — change a prompt, save, and it's deployed. However, updates tend to break things, and configuration isn't as code. One member used both platforms with load balancing for redundancy, noting free tier limitations.

The [Vercel AI SDK](https://ai-sdk.dev) updates very quickly and sits slightly down the stack from a full agent framework. It's good for tools, MCPs, prompts, and sequences, with configuration as code which is better for version control.

[Mastra](https://mastra.ai) is a fully TypeScript framework where strong typing enables faster iteration. Shared types across a monorepo and type checking catch errors early.

Key insights from the discussion included that frameworks are useful for teams where non-engineers can adjust prompts via UI, but for solo developers moving fast, abstractions may not be necessary. TypeScript end-to-end significantly improves iteration speed. Agent frameworks allow decomposition into smaller agents and non-agents. Workflows versus pure agents show that workflows are more constrained and easier to develop, while pure agents are too open-ended for production use. Specialized prompts and dispatchers in frameworks may be optimized.

Cost considerations revealed extreme usage on Cloud Code leaderboards, with one user spending $14,000 in a single day. Running 50 agents simultaneously is possible but expensive, creating a need to balance flexibility with cost control.

### AI Travel Planning Limitations

A member shared their experience using a travel booking platform's AI agent for Japan trip planning. The results were "hit or miss," with several issues encountered including incorrect links, wrong bus timetables, and the need for manual booking on Japanese websites. The process also involved a complex 7-step account creation process.

The time investment was significant, with traditional booking taking approximately 8 hours total. The AI agent didn't significantly reduce this time, though the goal would be to reduce it to around 1 hour with a functional AI agent.

Geographic limitations may be specific to Japan, where complex booking systems and language barriers create additional challenges. The technology could improve quickly but isn't there yet.

The broader implications suggest that while AI agents are promising, they still require human oversight. Complex, multi-step processes remain challenging, and real-world testing reveals limitations that aren't apparent in demos.

---

## Side Topics

### AI Digitalization Value Capture

Members discussed the reality of digitalization, which has been promised for a long time but mostly not realized. The question arose: Are we at the point where the overhead of implementing AI exceeds the benefits? Reports suggest that nobody is making money yet with AI.

Value capture in industries presents challenges. Using real estate in Shanghai as an example, the industry is still based on sales pitches rather than data and math. While AI enables rapid model building, reducing the time from weeks to days, the industry doesn't value quantitative approaches. There's a fundamental disconnect between AI capabilities and industry adoption.

The conversation touched on productivity versus optimization. AI enables rapid information gathering but can be distracting. Members are using AI for task breakdown and time management, but there's a trade-off described as "taking orders from a robot to be a robot." This creates a conflict between productivity gains and human agency.

One member expressed never being more ambivalent about anything, experiencing positive and negative feelings simultaneously. The concern is that AI turns everything into an optimization problem, and a "very optimized life" may not be desirable.

### Call Center Automation

A member shared that their company built a large call center over 5 years, focusing on customer-facing, responsive service. They predict the call center may not last another 2 years, noting the overhead costs of real estate, employees, training, and management.

The AI replacement potential includes hyper-advanced chatbots for initial customer contact, with human escalation only when AI cannot resolve the issue. There's a cost comparison to consider between AI infrastructure and human call centers.

Counterarguments emerged that current AI call centers aren't impressive, and human call centers often don't solve problems due to company policy anyway. Some companies, like certain travel service providers, are valued specifically for their human support. For simple queries, bots can be appreciated, such as e-commerce platform refunds.

The reality check is that "proof will be in the pudding." The technology is close but not quite there yet, and success depends on use case complexity.

### Parenting Perspectives on Screen Time

The German reading coach app enables independent practice, but members questioned whether AI is supposed to give us more time with kids. The concern emerged that instead of freeing time, people work more hours. The question arose: Should kids read to parents or to devices?

Cultural differences create different approaches in different cultures and families. Some want kids to learn faster and meet expected rates, while others want more quality time with children. It depends on goals and values.

The discussion touched on sibling dynamics and whether siblings help offload parenting. Members noted that siblings play together about 50% of the time and fight 50% of the time, which requires more involvement. Boy-girl dynamics may be more stable than same-gender dynamics, and there are differences between oldest and youngest child experiences.

Screen time philosophy varies, with some parents fighting against screens entirely. There's an opportunity for hardware devices for reading practice that don't use screens, which could appeal to parents willing to pay for screen-free solutions.

Educational technology adoption is happening rapidly in some regions. Chinese schools are using AI reading assessment through the Ding Ding platform, where parents can review reports and teachers may review them as well. Parents may not be aware of these implementations until they see their children using them.

### Prior Art Research

Members discussed whether they check whitepapers before building. The challenge is that Google isn't great for finding whitepapers, creating tension between wanting to avoid repeating existing work versus building first.

Anxiety about prior art emerged, with one member noting that "the moment you think of something, someone has probably done it." This can create anxiety that work is worthless. However, a counterpoint suggests that if others are making money, the market is validated. If they're not making money, the idea may not be valuable.

AI product directories include ["There's an AI for That"](https://theresanaiforthat.com) with over 16,000 products listed, and ["AI Graveyard"](https://theresanaiforthat.com), a website tracking failed AI products. One member contributes to the graveyard and estimates that 90% of products listed there are failures.

The implications are that many ideas have already been attempted, but execution and timing matter. Market validation exists if others are making money, and failure doesn't mean the idea was wrong.

---

## Other Resources

- [Cursor](https://cursor.sh) - AI-powered code editor with Composer mode. Member used it for hackathon project and found it extremely fast for iteration (can get 4 turns in time of 1), but pricing changes frequently causing frustration.

- [Anti Gravity](https://antigravity.dev) - Google's IDE competitor to Cursor. Member downloaded it and found it requires VPN access in some regions, considering it as pay-as-you-go alternative to Cursor.

- [Replit Agents](https://replit.com) - AI agents for code generation. Non-developer built complex CRM system with it, and found the automatic browser testing feature helpful for catching issues not visible in code.

- [Convex](https://convex.dev) - Backend-as-a-service platform. Used as backend for hackathon project, member found it excellent for real-time applications with TypeScript types syncing between backend and frontend.

- [TanStack Start](https://tanstack.com/start) - Next.js alternative framework. Required for hackathon project but only in RC stage, member spent time fighting with authentication rather than focusing on polish.

- [Azure Speech Services](https://azure.microsoft.com/en-us/products/cognitive-services/speech-services/) - Speech recognition and pronunciation scoring API. Member built German reading coach app for child using it, found free tier (~5 hours) quite extensive with good pronunciation scoring support for multiple languages.

- [Firecrawl](https://firecrawl.dev) - Web scraping API. Used for brand scraping in hackathon project, member received 10,000 free credits from sponsorship and found API pretty cheap.

- [ChatGPT](https://openai.com) - GPT models and Whisper API. Multiple members use it for study mentoring, task breakdown, and converting consultancy language to models, with one member preferring it over Grok for natural conversation flow.

- [Grok](https://x.ai) - X's AI assistant. Member tried using it as study mentor but found some functionality strange and not as imaginative as ChatGPT.

- [LangChain](https://js.langchain.com) - Framework for building LLM applications. Some members found it too cumbersome to use, 1 member started with it but ended up scrapping it, another ripped it out thinking it was useless abstractions.

- [LangFuse](https://langfuse.com) - AI observability platform. Member used it but found UI tries to cover too wide ground, ended up building custom UI on top then stopped using it entirely.

- [Vercel AI SDK](https://sdk.vercel.ai) - AI SDK for building AI applications. Member uses it for tools, MCPs, prompts, and sequences, found it updates quickly and better than Diffy with configuration as code.

- [Mastra](https://mastra.ai) - TypeScript framework for AI agents. Member evaluated it and appreciates TypeScript end-to-end for iteration speed with shared types across monorepo.

- [Diffy](https://diffy.ai) - Chinese SaaS platform for visual workflow builders. Member used it for quick iteration but found it notoriously bad during updates, ended up using both Diffy and FastGPT with load balancing for redundancy.

- [FastGPT](https://fastgpt.in) - Chinese SaaS platform for AI workflows. Member used it as alternative to Diffy, found similar issues with updates breaking things and free tier limitations.

- [ChatGPT Group Chat](https://openai.com) - Group chat feature. Member tested it and found it only responds when contextually relevant, feels natural without @mentions, but requires server location switching in some regions.

- [Trip.com Travel Agent](https://trip.com) - AI travel planning agent. Member used it for Japan trip planning but found results hit or miss with incorrect links and timetables, didn't significantly reduce booking time from ~8 hours.

- [React Flow](https://reactflow.dev) - Node-based UI library. Member repurposed it in hackathon project for drag-and-drop interface, but AI agents struggled with rotation features requiring "feel."

- [N8N](https://n8n.io) - Workflow automation platform. Mentioned in discussion, member noted it's more for fixed automation and doesn't allow for open-ended agent workflows.

- [There's an AI for That](https://theresanaiforthat.com) - Directory of 16,000+ AI products. Referenced in prior art discussion, member noted you have to pay to list products on there.

- [AI Graveyard](https://aigraveyard.com) - Directory of failed AI products. Member contributes to it and estimates 90% of products listed are failures, useful for understanding what's been tried before.

- [DingTalk](https://www.dingtalk.com) - Educational platform used in Chinese schools. Used for curriculum management and homework, parents can review pronunciation reports, teachers communicate exclusively on it.

- [Songshu AI](https://www.dingtalk.com) - Reading assessment tool on Ding Ding platform. Used by 8-year-old child for Chinese reading homework with pronunciation scoring, member didn't know about it until seeing child use it, implementation happening rapidly in Shanghai schools.

---

*Notes compiled from meeting transcript. Some details may be paraphrased for clarity and brevity.*
