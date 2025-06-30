# Events Organization

This folder contains all details for events hosted. Each event gets its own folder with a standardized structure for easy organization and reference.

## Folder Structure

```
events/
├── _templates/                  # Template files for new events
│   ├── event-details.md         # Template for event details
│   └── folder-structure.md      # Guide for folder organization
├── 2024/                       # Events organized by year
│   └── ai-breakfast-june-30/    # Individual event folder
│       ├── README.md            # Main event details
│       ├── images/              # Event images, QR codes, photos
│       ├── assets/              # Additional files (flyers, documents)
│       └── notes/               # Planning notes, follow-ups
└── README.md                   # This file
```

## How to Create a New Event

1. **Copy the template**: Use the template in `_templates/event-details.md`
2. **Create event folder**: Format: `YYYY/event-name-month-day/`
3. **Fill in details**: Complete all sections in README.md
4. **Add images**: Store QR codes, photos, etc. in `images/`
5. **Organize assets**: Put flyers, documents in `assets/`

## Naming Convention

- **Years**: `2024/`, `2025/`, etc.
- **Events**: `event-name-month-day/` (e.g., `ai-breakfast-june-30/`)
- **Images**: Descriptive names (`qr-code-registration.png`, `venue-photo.jpg`)

## Quick Commands

```bash
# Create new event folder
mkdir -p events/2024/new-event-name/images events/2024/new-event-name/assets events/2024/new-event-name/notes

# Copy template
cp events/_templates/event-details.md events/2024/new-event-name/README.md
```
