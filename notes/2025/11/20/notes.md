# AI Breakfast #17 Notes

Thursday, November 20, 2025

![Group Photo](/images/notes/2025/11/20/group-photo.jpeg)

## 1. Executive Summary

At our AI Breakfast #17, our group of developers, entrepreneurs, teachers, parents, and engineers discussed topics ranging from [AI Tools for Building Software](#31-ai-tools-for-building-software), [AI in Group Chats](#32-ai-in-group-chats--behavior-dispatchers-context-management), [Speech Recognition for Language Learning](#33-speech-recognition-for-language-learning), [Agent Frameworks](#34-agent-frameworks), and [AI Travel Planning Limitations](#35-ai-travel-planning-limitations). The attendees also shared the latest on their work and projects, including [Issue to PR](#21-issue-to-pr-voice-based-websiteapp-builder), [BumpSend](#22-bumpsend-hackathon-project), [German Reading Coach App](#23-german-reading-coach-app), [Triple-Tap Screenshot-Based Reply Assistant](#24-triple-tap-screenshot-based-reply-assistant), and [MBTI Communication Platform](#25-mbti-communication-platform).

---

## Table of Contents

- [AI Breakfast #17 Notes](#ai-breakfast-17-notes)
	- [1. Executive Summary](#1-executive-summary)
	- [Table of Contents](#table-of-contents)
	- [2. Member Introductions](#2-member-introductions)
		- [2.1 Issue to PR (Voice-Based Website/App Builder)](#21-issue-to-pr-voice-based-websiteapp-builder)
		- [2.2 "BumpSend" Hackathon Project](#22-bumpsend-hackathon-project)
		- [2.3 German Reading Coach App](#23-german-reading-coach-app)
		- [2.4 Triple-Tap Screenshot-Based Reply Assistant](#24-triple-tap-screenshot-based-reply-assistant)
		- [2.5 MBTI Communication Platform](#25-mbti-communication-platform)
		- [2.6 Additional Member Highlights](#26-additional-member-highlights)
	- [3. Group Discussions](#3-group-discussions)
		- [3.1 AI Tools for Building Software](#31-ai-tools-for-building-software)
		- [3.2 AI in Group Chats — Behavior, Dispatchers, Context Management](#32-ai-in-group-chats--behavior-dispatchers-context-management)
		- [3.3 Speech Recognition for Language Learning](#33-speech-recognition-for-language-learning)
		- [3.4 Agent Frameworks](#34-agent-frameworks)
		- [3.5 AI Travel Planning Limitations](#35-ai-travel-planning-limitations)
	- [4. Side Topics](#4-side-topics)
		- [4.1 AI Digitalization Value Capture](#41-ai-digitalization-value-capture)
		- [4.2 Call Center Automation](#42-call-center-automation)
		- [4.3 Parenting and Screen Time](#43-parenting-and-screen-time)
		- [4.4 Prior Art Research](#44-prior-art-research)
	- [5. Resources](#5-resources)

---

## 2. Member Introductions

### 2.1 Issue to PR (Voice-Based Website/App Builder)

**App Name:** [Issue to PR](https://issuetopr.dev)

A member shared their ongoing work on a voice-based website and app builder. After a break, they're pivoting toward a "Lovable V2" version, focusing on iterating websites and apps using voice commands. The vision includes launching multiple features rapidly through voice interaction, potentially enabling collaborative building with friends.

**Key Features:**
- Voice-based iteration system
- Rapid feature development through voice commands
- Plans for improved UI/UX

**Travel Planning Experience:**
- Used a travel booking platform's AI agent to plan a trip to Japan
- Results were "hit or miss" — required significant manual booking on Japanese websites
- Encountered issues with incorrect links and bus timetables
- Spent approximately 8 hours on traditional booking process
- Hopes AI could reduce this to 1 hour in the future

### 2.2 "BumpSend" Hackathon Project

A member from Australia working on spatial/3D projects and VR interfaces shared their hackathon project "BumpSend" — a platform for sending fist bumps to teammates. Built for a hackathon sponsored by Convex (backend-as-a-service) and TanStack (framework provider), the project didn't make the deadline but received positive feedback.

**Project Details:**
- **Purpose:** Team greeting cards with personalized messages
- **Features:** Brand scraping for logos/colors, drag-and-drop sticker interface, mobile-optimized vertical scrolling
- **Pricing Model:** Free tier (2 recipients), paid tiers (5 and 10 recipients)
- **Tech Stack:** Convex backend, TanStack Start (Next.js alternative), Firecrawl API for brand scraping
- **Prize Pool:** $150,000 across 106 entries

**Development Insights:**
- Used Cursor 2.0 Composer — found it extremely fast for iteration
- Learned that AI agents excel at CLI/backend work but struggle with UI polish
- Front-end work requiring "feel" (drag-and-drop, rotation, timing) remains challenging for AI
- Browser testing tools in Cursor are valuable for simple UIs
- Plans to launch for Christmas greetings

### 2.3 German Reading Coach App

A member building a go-to-market automation platform shared a side project: a German reading coach app for their 8-year-old child. The app provides pronunciation feedback and scoring for reading practice.

**Technical Implementation:**
- Uses Azure Speech API (free tier available — ~5 hours)
- Supports reference text for pronunciation scoring
- Provides word-level feedback and overall scores (fluency, accuracy, completeness)
- Can replay audio segments for specific words
- Supports multiple languages (Arabic, Catalan, Cantonese, Danish, Dutch, Taiwanese, various English accents)

**Use Cases:**
- Children can self-check reading without constant parent supervision
- OCR integration allows scanning book pages
- Enables independent practice with feedback loops

**Market Context:**
- Similar functionality exists in Chinese educational platforms (e.g., Songshu AI on Ding Ding)
- Educational publishers have QR codes on textbooks linking to reading assessment tools
- Potential hardware device opportunity for parents avoiding screen time

### 2.4 Triple-Tap Screenshot-Based Reply Assistant

A member demonstrated an iOS shortcut-based tool that generates contextual replies using screenshots. Triple-tapping triggers OCR, sends context to an LLM, and generates suggested responses.

**Features:**
- Works system-wide on iOS using Shortcuts app
- Takes screenshot → OCR → LLM → suggested responses
- Free tier: 10 responses/day
- Pro tier: 50 responses/day
- Currently iOS-only (Android OS-level macros not available)

**Use Cases:**
- Restaurant review generation (sees context, generates appropriate review)
- LinkedIn comment generation
- General messaging assistance

**Distribution:**
- Built a web service for distributing shortcut templates
- Users can register and download the shortcut
- Creator pays for AI token costs

### 2.5 MBTI Communication Platform

A full-stack developer shared their work on an MBTI-based communication platform. The vision includes group chat functionality with AI mediation to help people understand communication styles and improve interactions.

**Current Status:**
- Building features for profile learning and connection dynamics
- Using AI agents to populate data/content
- Exploring group chat AI integration (similar to ChatGPT's group chat feature)
- Challenges with AI-generated profile assessments — comprehensive questionnaires still needed

**Technical Considerations:**
- Group chat AI requires careful context management
- Need for dispatcher/classifier before sending full context to LLM (cost/context window concerns)
- Balancing AI presence with natural conversation flow

### 2.6 Additional Member Highlights

**Member Transitioning to Infrastructure/Energy:**
- Moving into sourcing infrastructure parts for data centers
- Using ChatGPT as a study mentor/tutor for reading technical books
- Quizzes self after reading chapters to improve retention
- Prefers ChatGPT over Grok for natural conversation flow

**Member with Finance/Economics Background:**
- Uses AI to convert abstract consultancy language into mathematical models
- Built real estate valuation models using AI-assisted data scraping
- Views AI as productivity tool but acknowledges trade-offs
- Uses ChatGPT for task breakdown and time management
- Expresses ambivalence about "taking orders from a robot"

**Member (Teacher/Parent):**
- Downloaded Anti Gravity (Google's new IDE, competitor to Cursor)
- Features automated browser testing after code completion
- Considering letting Cursor subscription expire in favor of pay-as-you-go alternatives
- Expresses strong ambivalence about AI — sees it as optimization problem that can diminish human experience
- Concerned about AI replacing meaningful parent-child interactions

**Member (Hardware Engineer):**
- Previously worked at chip design company
- Currently sourcing developers for hardware projects
- Background in chipset design for AI chips

**Member (Teacher/Writer):**
- Attended to see product demos and exchange books
- Interested in checking whitepapers before building new projects

---

## 3. Group Discussions

### 3.1 AI Tools for Building Software

**Cursor 2.0 Composer:**
- Extremely fast iteration — can get 4 turns in time of 1 with other tools
- New browser testing tools built-in (previously required MCP)
- Composer model is smaller, faster, their own trained model
- Pricing changes frequently — members express frustration
- Free tier has limits; premium model available

**Anti Gravity (Google's IDE):**
- Competitor to Cursor
- Features automated browser testing (similar to Atlas)
- Requires VPN access in some regions
- Built on core IP from Windsurf (acquired by Google)

**Replit Agents:**
- Non-developer built complex CRM system for plumbers
- Agent automatically tests features in browser after creation
- Helpful for catching issues not visible in code

**Key Insights:**
- AI agents excel at CLI/backend work — fast iteration, easy testing
- UI/front-end work requiring "feel" remains challenging
- Drag-and-drop, rotation, timing, frame rate — all difficult for AI
- Browser testing tools valuable but limited to simple UIs
- TypeScript end-to-end enables faster iteration (shared types, auto-fix)

### 3.2 AI in Group Chats — Behavior, Dispatchers, Context Management

**ChatGPT Group Chat Feature:**
- Can be added to group chats
- Only responds when contextually relevant (doesn't respond to every message)
- Requires server location switching in some regions (Japan mentioned)
- Feels natural — doesn't require explicit @mentions

**Technical Challenges:**
- Context management: Group chats have continuous context vs. discrete conversations
- Cost: Sending full context on every message is expensive
- Need for dispatcher/classifier before LLM processing
- Determining when AI should respond vs. stay silent
- Group size limits unclear

**Design Considerations:**
- Should feel human — natural timing, not walls of text
- May include delay mechanism (wait for human response before AI chimes in)
- Potential use cases: Information retrieval, mediation, context-aware suggestions

**Privacy/Data Concerns:**
- Questions about data collection (friend networks, preferences)
- May be experimental feature to compete with specialized group chat AI companies

### 3.3 Speech Recognition for Language Learning

**Azure Speech API:**
- Free tier: ~5 hours of transcription
- Pronunciation scoring available
- Supports reference text for accuracy comparison
- Multiple language support (German, Chinese variants, English accents, etc.)

**Real-World Implementation:**
- Chinese educational platforms (Songshu AI) already implementing reading assessment
- Used in Ding Ding (educational platform) for homework assignments
- Parents can review pronunciation reports
- Teachers may review (though AI likely doing heavy lifting)

**Educational Context:**
- 20 years ago: CD-ROMs with teacher assessment
- Today: QR codes on textbooks linking to AI assessment
- Key innovation: Automated feedback enables self-service learning
- Hardware opportunity: Dedicated devices for parents avoiding screen time

**Language Support:**
- Extensive: Arabic, Catalan, Cantonese, Danish, Dutch, Taiwanese, various English accents
- Primarily used for transcription, pronunciation scoring is additional feature

### 3.4 Agent Frameworks

**Framework Comparison:**

**LangChain:**
- Used for observability and AI evals
- Sometimes feels like unnecessary abstraction layer
- Useful when switching between multiple model providers
- Member ended up building custom framework after starting with LangChain

**LangFuse:**
- Used for AI observability
- UI tries to cover too wide ground
- Ended up building custom UI on top, then stopped using entirely

**Chinese SaaS Platforms (Diffy/FastGPT):**
- Node-based visual workflow builders
- Quick to iterate — change prompt, save, deployed
- Downsides: Updates break things, configuration not as code
- Used both platforms with load balancing for redundancy
- Free tier limitations

**Vercel AI SDK:**
- Updates very quickly
- Not full agent framework — slightly down the stack
- Good for tools, MCPs, prompts, sequences
- Configuration as code (better for version control)

**Mastra:**
- Fully TypeScript framework
- Strong typing enables faster iteration
- Shared types across monorepo
- Type checking catches errors early

**Key Insights:**
- Frameworks useful for teams (non-engineers can adjust prompts via UI)
- For solo developers going fast, abstractions may not be necessary
- TypeScript end-to-end significantly improves iteration speed
- Agent frameworks allow decomposition into smaller agents/non-agents
- Workflows vs. pure agents: Workflows more constrained, easier to develop
- Pure agents too open-ended for production use
- Specialized prompts/dispatchers in frameworks may be optimized

**Cost Considerations:**
- Cloud Code leaderboard shows extreme usage ($14,000 in one day by one user)
- Running 50 agents simultaneously possible but expensive
- Need to balance flexibility with cost control

### 3.5 AI Travel Planning Limitations

**Experience with Travel Booking Platform's AI Agent:**
- Used for Japan trip planning
- Results: "Hit or miss"
- Issues encountered:
  - Incorrect links
  - Wrong bus timetables
  - Required manual booking on Japanese websites
  - Complex 7-step account creation process

**Time Investment:**
- Traditional booking: ~8 hours total
- AI agent didn't significantly reduce time
- Goal: Reduce to ~1 hour with functional AI agent

**Geographic Limitations:**
- May be specific to Japan (complex booking systems, language barriers)
- Could improve quickly but not there yet

**Broader Implications:**
- AI agents promising but still require human oversight
- Complex, multi-step processes remain challenging
- Real-world testing reveals limitations not apparent in demos

---

## 4. Side Topics

### 4.1 AI Digitalization Value Capture

**Digitalization Reality:**
- Digitalization promised for long time but mostly not realized
- Question: Are we at the point where overhead of implementing AI exceeds benefits?
- Reports suggest: Nobody making money yet with AI

**Value Capture in Industries:**
- Example: Real estate in Shanghai
- Industry still based on sales pitches, not data/math
- AI enables rapid model building (weeks → days)
- But industry doesn't value quantitative approaches
- Fundamental disconnect between AI capabilities and industry adoption

**Productivity vs. Optimization:**
- AI enables rapid information gathering but can be distracting
- Using AI for task breakdown and time management
- Trade-off: "Taking orders from a robot to be a robot"
- Conflict between productivity gains and human agency

**Ambivalence Toward AI:**
- Member expresses never being more ambivalent about anything
- Positive and negative feelings simultaneously
- Concern: AI turns everything into optimization problem
- "Very optimized life" may not be desirable

### 4.2 Call Center Automation

**Current State:**
- Member's company built large call center over 5 years
- Focus on customer-facing, responsive service
- Prediction: Call center may not last another 2 years
- Overhead: Real estate, employees, training, management

**AI Replacement Potential:**
- Hyper-advanced chatbot for initial customer contact
- Human escalation only when AI cannot resolve
- Cost comparison: AI infrastructure vs. human call center

**Counterarguments:**
- Current AI call centers not impressive
- Human call centers often don't solve problems due to company policy
- Some companies (e.g., travel service provider) valued for human support
- Simple queries: Bots can be appreciated (e.g., e-commerce platform refunds)

**Reality Check:**
- "Proof will be in the pudding"
- Close but not quite there yet
- Depends on use case complexity

### 4.3 Parenting and Screen Time

**Reading Apps and Screen Time:**
- German reading coach app enables independent practice
- But: Is AI supposed to give us more time with kids?
- Concern: Instead of freeing time, we work more hours
- Question: Should kids read to parents or to devices?

**Cultural Differences:**
- Different approaches in different cultures/families
- Some want kids to learn faster, meet expected rates
- Others want more quality time with children
- Depends on goals and values

**Sibling Dynamics:**
- Discussion about whether siblings help offload parenting
- 50% play together, 50% fight (requires more involvement)
- Boy-girl dynamics may be more stable than same-gender
- Oldest vs. youngest child experiences

**Screen Time Philosophy:**
- Some parents fight against screens entirely
- Opportunity: Hardware device for reading practice (no screen)
- Could appeal to parents willing to pay for screen-free solutions

**Educational Technology Adoption:**
- Chinese schools using AI reading assessment (Ding Ding platform)
- Parents can review reports, teachers may review
- Implementation happening rapidly in some regions
- Parents may not be aware until seeing children use it

### 4.4 Prior Art Research

**Research Before Building:**
- Question: Do members check whitepapers before building?
- Challenge: Google not great for finding whitepapers
- Tension: Want to avoid repeating existing work vs. building first

**Anxiety About Prior Art:**
- "Moment you think of something, someone has probably done it"
- Can create anxiety that work is worthless
- Counterpoint: If others making money, market validated
- If not making money, may not be valuable

**AI Product Directories:**
- "There's an AI for That" — 16,000+ products listed
- "AI Graveyard" — website tracking failed AI products
- Member contributes to graveyard
- Estimate: 90% of products on graveyard are failures

**Implications:**
- Many ideas already attempted
- But: Execution and timing matter
- Market validation exists if others are making money
- Failure doesn't mean idea was wrong

---

## 5. Resources

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
