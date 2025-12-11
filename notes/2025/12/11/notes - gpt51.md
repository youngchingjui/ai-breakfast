## AI Breakfast #20 – Notes

## Executive Summary

At our AI Breakfast #20, a group of builders, engineers, investors, and educators talked about how they use AI in daily work, from investing and school operations to health research and creative projects. The group shared both excitement and worry about the growth of AI content, and how to keep quality high while avoiding "AI slop" that wastes attention. Members also showed real products in areas like healthcare modeling, AR glasses, internal school tools, and personal cooking and video projects.

## Member Introductions and Everyday AI Use

The morning started with short introductions and simple stories about how people use AI right now. One organizer talked about using AI to think about the current investment bubble, and how it feels similar to past times of market hype. Others described using voice assistants while cooking, asking an AI to talk them through a recipe step by step, suggest ingredient swaps, and handle tasks hands‑free in the kitchen.

Several members shared how AI has become part of almost every part of their work. One person uses AI as a quiet helper across their job, especially where they need to write, summarize, or explore new ideas. Another member is exploring inference optimization and model safety, playing with ways to increase or decrease the chance of certain tokens while also thinking about how red‑teamers can still push models toward unsafe outputs.

## AI in Investing and Personal Finance

A few members focus heavily on using AI for investing. One active trader uses language models and coding copilots to prototype trading scripts that scan technical patterns and suggest possible trades. They also use AI to review screenshots of charts and act as a second opinion on entries and exits.

So far, this workflow has produced strong returns on test days, though everyone agreed that a good result still depends on the human’s market view and risk control. The trader is now trying to turn this into an end‑to‑end personal system that suggests trades, scores them based on context, and keeps risk in check, including when they choose to add leverage.

## Building Internal AI Platforms for Education

One member works in IT at a large international school and is helping roll out an internal AI platform for staff. The early focus is on non‑teaching work such as operations, HR, contracts, and survey analysis, where AI can save staff from slow manual tasks. For example, they use an internal workflow engine to review contracts against rules agreed with legal and purchasing, and an assistant to summarize large batches of survey responses.

There is still strong concern about cheating and data privacy, so the school limits AI use for classroom teaching and student work. The team reminds staff not to upload sensitive personal data and is considering adding automatic anonymization so raw IDs never reach model inputs. A big lesson from this rollout is that top‑down support from leaders makes adoption much easier than trying to push AI tools from the bottom up.

## AI Slop, Content Quality, and the Attention Economy

A long part of the discussion centered on "AI slop"—content that feels padded, generic, or uncaring. Members noticed that many posts online now sound the same, especially on professional networks where AI‑written updates add length but not insight. Some people care less about whether a human or AI wrote something, and more about whether the piece has a clear, fresh idea that respects the reader’s time.

The group worried that as tools make it cheap to generate text, images, and video, social feeds will fill with even more low‑value material. One person raised the energy cost of all this generated media, and questioned whether endless short videos made for a handful of likes are worth the compute and environmental load. Others pointed out that recommendation algorithms and ad‑driven business models reward sheer volume, so people will keep pumping out content as long as someone can make even a small profit.

Several members now use AI on the "other side" as well: they ask models to compress noisy feeds, summarize the best parts of many videos or articles, and pull out only the key points worth reading. This leads to a strange loop where one AI expands ideas into long content, and another AI shrinks it back into a few lines for people who want the signal without the noise.

## Image and Video Generation for Food and Creative Work

The group also talked about image generation, especially for food and advertising. One member has been using AI image models to create food photos that look better than real studio shots, and has even sold this capability to large food brands. A key challenge there is intellectual property: traditional food photos have clear ownership, while it is still unclear in many places who owns purely AI‑generated images.

Members tested different image models and compared realism, how well a model follows prompts, and how flexible it is when asked for unusual details. They found that many highly realistic models struggle when asked to go far outside their training distribution, such as requesting a very unusual color or ingredient in a dish. Newer models seem better at both realism and prompt following at the same time, which makes them useful for product work and creative experiments.

Some attendees also play with AI image tools to help friends in hospitality, such as making menu photos that look more appetizing than what a small restaurant can shoot on its own. The group joked about classic tricks in food photography, like using wax or glue to make dishes look perfect on camera, and how AI now lets small teams reach similar results without full studio setups.

## Niche Tools and a Healthcare Research Platform

One of the deeper demos was a healthcare research platform focused on cost‑effectiveness modeling for new treatments. The builder comes from a health economics background and is trying to give researchers, industry teams, and investors a way to move from long, unstructured papers into structured models. Users upload a study, have key data automatically extracted into tables, and then run simulations to see how survival, costs, and outcomes change over time.

The tool supports different model templates, survival curves, and Monte Carlo simulations to explore uncertainty and payer willingness‑to‑pay thresholds. Instead of hiding behind opaque "AI magic," it keeps each assumption visible and editable so experts can inspect what the model is doing. The group liked this as an example of a non‑flashy, niche use of AI that still has real impact and a clear, focused audience.

## Spatial Interfaces, AR Glasses, and Digital Twins

Another member is working on spatial user interfaces for AR glasses, trying to pull information out of phones and screens and into the space around the user. They described years of work on digital twins of buildings and cities, where 3D models, live data streams, and simulations all come together in an interactive scene. The current focus is on making the UI layer usable, so that non‑experts can actually work with spatial data when light, comfortable glasses become common.

This sparked conversation about how fast hardware and AI are moving, including new glasses from several major vendors. Members imagined scenarios like cooking with AR instructions floating in the air, or monitoring complex systems through overlays instead of dashboards on a laptop. The presenter also framed spatial work as a way for some developers to move into a corner of the field where text‑in / text‑out tasks are less likely to be fully automated by language models.

## Operating Complex Systems with AI Assistants

A software architect from a 3D printing company described how their team leans on AI to manage complex cloud systems. They connect agent‑style tools to observability stacks so that, when there is an incident, an assistant can quickly pull metrics, trace issues, and suggest likely fixes instead of forcing humans to dig through raw logs. This speeds up root‑cause analysis and lets people focus more on design and prevention rather than firefighting.

Others shared ideas about "chat‑ops" patterns where alerts, human actions, and AI analysis all flow through a shared chat channel. In that setup, new team members and future agents can scroll back to see exactly what happened during an incident and which steps worked. The group agreed that complexity is where AI can shine, because it is often better than humans at juggling many signals at once and keeping full context in mind.

## Side Projects, Creative Work, and Recipes

There were also lighter personal projects. One member is a video creator who uses AI to brainstorm concepts and rough scripts, but still feels that many AI‑written pieces sound pretty and empty. They now treat models as idea generators, then rewrite in their own voice to add real insight or emotion.

Another attendee is thinking about a cooking channel built around handwritten family recipes. They have scanned a large box of old cards and would like AI to help with handwriting recognition, cleaning up ingredients, and checking each recipe against modern versions so measurements still make sense. The group brainstormed workflows where a small custom app or agent could handle bulk OCR, cross‑check amounts, and keep image and text side by side for quick review.

## Other Resources

- **Context optimization talk and coding‑agent workflow repository**: Used as a mental model for thinking about where AI should handle routine work and where humans should keep control of hard, high‑level design.
- **Healthcare cost‑effectiveness modeling templates and survival‑curve tools**: Power the research platform demo, helping users project outcomes beyond limited clinical trial windows.
- **Large language models focused on efficiency and "thinking" steps**: Praised for low per‑token cost and strong reasoning, but noted to run many extra tokens in the background, which can increase total cost.
- **Voice and video modes in modern assistant apps**: Used for cooking, experimenting with regional accents, and pointing out objects in a room, with surprisingly natural speech and visual grounding.
- **Image generation models tuned for food and product photos**: Used to create realistic dishes and advertising shots, often beating small studio setups on quality and speed.
- **Voice‑cloning and TTS tools for custom assistants**: Considered for future cooking or teaching agents so that guidance can arrive in friendly, familiar voices.
- **Interactive storytelling and game‑style AI tools for kids**: Cited as inspiration for language‑learning and writing apps that keep children engaged without leaning too hard on screens.
- **Observability and incident‑response stacks with AI agents on top**: Help teams query metrics and events across many services, turning complex outages into clear steps and recommended fixes.
