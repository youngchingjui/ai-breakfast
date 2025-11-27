---
Title: AI Breakfast #16
Date: November 13, 2025
---

# AI Breakfast #16

Thu, 13 Nov 25

### Overview

In today’s breakfast, we covered topics such as advanced OCR solutions for complex document processing, automated video editing with AI transcription tools, building spatial UI for AR glasses, competitive trading with AI assistance, and the democratization of app development through AI coding platforms. Participants shared practical workflows ranging from using Descript to automatically remove filler words from videos to building entire applications without traditional coding knowledge.

An interesting finding was that despite AI’s advancement in creative tasks, participants still value human expertise and teaching, with one educator noting that students continue seeking human instructors even when AI alternatives are available because teachers “dramatize what expertise looks like” and inspire students to develop their own capabilities.

### Document Processing and OCR Challenges

- A software developer working on test materials struggled with finding comprehensive OCR solutions
  - Needed to preserve text formatting (underlines, bold, italics) during PDF-to-text conversion
  - Required math equation recognition alongside standard text extraction
  - Sought ability to identify and separate images from text within documents
- Discovered Xiaohongshu’s “[Dots OCR](https://huggingface.co/rednote-hilab/dots.ocr)” model on Hugging Face as potential solution
  - Open source but requires expensive GPU infrastructure ($0.88/hour minimum)
  - Would cost approximately $7,000 annually for 24/7 operation
  - Google Cloud GPU waitlists prevented immediate testing due to high AI infrastructure demand

### AI-Powered Video Production Tools

- Startup founder used [Descript](https://www.descript.com) to shorten demo video from 1 minute 3 seconds to exactly 1 minute
  - Tool automatically transcribes video content and [removes filler words](https://www.descript.com/tools/remove-filler-from-video) (ums, ahs)
  - Users can select text segments to delete corresponding video portions
  - Saves hours of manual video editing work that traditionally requires professional editors
- University professor explored creating 25-30 minute lecture videos to replace in-person teaching
  - Attempted multi-step workflow: ChatGPT for lesson plans → DeepSeek for professional scripts → video generation
  - Found current AI video tools produce content suitable for children rather than university-level instruction
  - Identified need for higher production values and academic-appropriate presentation styles

### Spatial Computing and AR Development

- Entrepreneur building spatial UI applications for AR glasses participated in [Convex's two-week hackathon](https://www.convex.dev/hackathons/tanstack)
  - Created “DeepSend” app for business gratitude campaigns (Thanksgiving, Christmas, New Year cards)
  - Integrated multiple APIs: Tanstack (frontend), Convex (backend), Firecrawl (web scraping)
  - Planned 3D medal customization feature using company logos and color schemes from scraped websites
  - Used Blender for 3D modeling and animation components

### AI in Financial Trading and Analysis

- Finance professional uses ChatGPT as trading partner for options strategies and risk evaluation
  - Serves as tutor for complex financial concepts and investment thesis validation
  - Replaces traditional Python coding workflows with natural language queries
  - Questions future relevance of data science roles given AI’s capability to handle analytical tasks
  - Notes disconnect between AI’s potential and actual implementation in Shanghai business community

### Teaching and Human Expertise in AI Era

- Educator maintains that teachers provide irreplaceable value beyond pure instruction
  - Students continue paying same rates despite access to AI tutoring tools
  - Teachers “dramatize what expertise looks like” and inspire students to pursue mastery
  - Human experts demonstrate achievable pathways to knowledge that AI cannot replicate
  - Students need to see years of human development to believe they can achieve similar expertise

### AI-Generated Content and Authenticity Concerns

- Participants debated consumption of AI-generated entertainment content
  - Most attendees prefer human-created content for emotional connection and cultural value
  - AI-generated music [reaching country music charts](https://www.newsweek.com/breaking-rust-ai-music-country-digital-sales-11022040) demonstrates mainstream acceptance
  - Aerial gymnastics coach successfully used AI-generated Icelandic song for student performance
  - Concerns about losing human creativity and effort appreciation in entertainment industry

### Development Tools and Democratization Risks

- Security vulnerabilities emerged from no-code AI development platforms
  - Brazilian lesbian dating app launched with [exposed user database](https://x.com/Reeshasx/status/1965140901661196499) due to missing security protocols
  - Developers using AI coding tools lack traditional security training and awareness
  - Need for professional certification systems similar to civil engineering standards
  - Balance between democratizing development access and maintaining safety standards
  - Tea “dating safety” app breach leaked 70,000+ verification images; maps with 33,000 pins exposed users’ locations; harassment and lawsuits followed; Google removed the maps ([BBC](https://www.bbc.com/news/articles/ce87rer52k3o))

### Practical AI Workflow Applications

- Consultant planned automated research system for mental health startup
  - Weekly news monitoring for company layoffs and mergers (potential clients)
  - Mental health industry trend analysis via automated web research
  - Integration with Zapier for automated email report distribution
  - Sleep data analysis combining Apple Health exports with ChatGPT pattern recognition

### International Business and Technology Gaps

- Japan’s booking systems remain isolated from modern travel platforms
  - Hotel reservations require Japanese names, addresses, and phone numbers
  - Payment systems frequently reject foreign cards
  - Websites maintain early 2000s design patterns despite technological advancement
  - Cultural preference for direct communication over automated booking systems

### Additional resources

- [fal.ai](https://fal.ai): Hosted inference and real-time APIs for building generative apps (images, video, audio, 3D) without managing GPUs.
- [Replicate](https://replicate.com): Run open-source AI models via a simple HTTP API and deploy fine-tuned versions in the cloud.

