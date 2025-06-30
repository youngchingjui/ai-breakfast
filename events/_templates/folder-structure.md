# Event Folder Organization Guide

This guide explains how to organize files within each individual event folder.

## Standard Folder Structure

```
your-event-name/
├── README.md              # Main event details (copy from template)
├── images/                # All visual assets
│   ├── qr-codes/         # QR codes for registration, info, etc.
│   ├── photos/           # Venue photos, speaker headshots
│   ├── graphics/         # Flyers, social media graphics
│   └── logos/            # Sponsor logos, event logos
├── assets/               # Documents and files
│   ├── presentations/    # Speaker slides, materials
│   ├── handouts/        # Printed materials, guides
│   └── forms/           # Registration forms, feedback forms
└── notes/               # Planning and follow-up notes
    ├── planning.md      # Pre-event planning notes
    ├── day-of.md        # Notes from the event day
    └── follow-up.md     # Post-event notes and actions
```

## File Naming Conventions

### Images

- **QR Codes**: `qr-[purpose].png` (e.g., `qr-registration.png`, `qr-feedback.png`)
- **Photos**: `photo-[description]-[date].jpg` (e.g., `photo-venue-main-room.jpg`)
- **Graphics**: `graphic-[type]-[version].png` (e.g., `graphic-flyer-v2.png`)
- **Logos**: `logo-[company-name].png` (e.g., `logo-acme-corp.png`)

### Assets

- **Presentations**: `presentation-[speaker-name].pdf` (e.g., `presentation-john-doe.pdf`)
- **Handouts**: `handout-[topic].pdf` (e.g., `handout-ai-basics.pdf`)
- **Forms**: `form-[type]-[version].pdf` (e.g., `form-feedback-v1.pdf`)

### Notes

- Use markdown format (`.md`) for all notes
- Keep consistent structure across all note files

## Image Organization Tips

1. **Keep originals**: Always store original high-resolution files
2. **Create web versions**: Make smaller versions for online use
3. **Organize by type**: Group similar items together
4. **Use descriptive names**: Make it easy to find files later

## Best Practices

1. **Update README.md first**: This is your single source of truth
2. **Link to local files**: Reference local images/assets in your README
3. **Regular backups**: Commit changes to git frequently
4. **Consistent structure**: Use the same organization for every event
5. **Clean up after**: Remove outdated files, archive completed events

## Quick Setup Commands

```bash
# Create new event with full structure
EVENT_NAME="your-event-name"
mkdir -p "events/2024/$EVENT_NAME"/{images/{qr-codes,photos,graphics,logos},assets/{presentations,handouts,forms},notes}

# Copy template
cp events/_templates/event-details.md "events/2024/$EVENT_NAME/README.md"

# Create note templates
touch "events/2024/$EVENT_NAME/notes"/{planning.md,day-of.md,follow-up.md}
```
