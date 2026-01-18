# Members Showcase

Purpose
- Highlight the talented professionals who regularly join AI Breakfast so potential collaborators, employers, and community members can discover and contact them.
- Offer a simple, public directory that points to members’ external profiles (e.g., LinkedIn, portfolio, website) and briefly summarizes what they do.

Page URL
- Route: /members

What the page shows
- Member name and professional headline (role/specialty)
- Short bio (1–3 sentences)
- Core skills / specialties as tags
- Location and availability (e.g., open to freelance, full-time, consulting, speaking)
- Quick links: LinkedIn, personal site/portfolio, email

Content guidelines
- Keep bios concise and concrete (what you do and who you help).
- Skills should be recognizable keywords (to help scanning and search).
- Only include links you are comfortable sharing publicly.
- Avoid sensitive information (e.g., personal phone numbers). Use email or LinkedIn for first contact.

How to add or edit members
- For now, the page uses a static list of profiles in `app/members/page.tsx`.
- To add someone new, duplicate one of the sample objects in the `sampleMembers` array and update the fields.
- If we later move to a data file or CMS, we can swap the data source with minimal changes to the UI.

Suggested fields (MemberProfile)
- id: string (unique)
- name: string
- headline: string (role/title + focus area)
- bio: string (1–3 sentences)
- location: string (city/region)
- availability: string (short label)
- skills: string[] (keywords)
- links: { linkedin?: string; website?: string; email?: string }

Design principles
- Lightweight and fast, no images required.
- Skimmable cards with consistent structure.
- Clear calls-to-action via recognizable icons for LinkedIn, website, and email.

Future enhancements (optional)
- Search and filter by skills, location, or availability.
- Member-submitted form with review/moderation.
- Profile detail pages (e.g., /members/[id]).

Maintenance
- Keep sample profiles realistic but clearly fictional if used as placeholders.
- When adding real profiles, obtain consent and confirm the information and links are accurate.

