#!/bin/bash

# Helper script to create a new event folder with proper structure
# Usage: ./create-event.sh "event-name" "2024"

set -e

if [ $# -eq 0 ]; then
    echo "Usage: $0 <event-name> [year]"
    echo "Example: $0 \"ai-breakfast-july-15\" \"2024\""
    exit 1
fi

EVENT_NAME="$1"
YEAR="${2:-$(date +%Y)}"
EVENT_DIR="events/$YEAR/$EVENT_NAME"

# Check if event already exists
if [ -d "$EVENT_DIR" ]; then
    echo "Error: Event '$EVENT_NAME' already exists in $YEAR"
    exit 1
fi

echo "Creating event: $EVENT_NAME ($YEAR)"

# Create directory structure
mkdir -p "$EVENT_DIR"/{images/{qr-codes,photos,graphics,logos},assets/{presentations,handouts,forms},notes}

# Copy template
cp events/_templates/event-details.md "$EVENT_DIR/README.md"

# Create note files
touch "$EVENT_DIR/notes"/{planning.md,day-of.md,follow-up.md}

# Add basic content to note files
cat > "$EVENT_DIR/notes/planning.md" << EOF
# Planning Notes for $EVENT_NAME

## Initial Ideas
- 

## Tasks
- [ ] 

## Timeline
- 

---
*Created: $(date +%Y-%m-%d)*
EOF

cat > "$EVENT_DIR/notes/day-of.md" << EOF
# Day-of Event Notes for $EVENT_NAME

## Setup
- 

## During Event
- 

## Issues/Fixes
- 

---
*Event Date: [Fill in]*
EOF

cat > "$EVENT_DIR/notes/follow-up.md" << EOF
# Follow-up Notes for $EVENT_NAME

## Immediate Actions
- [ ] 

## Feedback Summary
- 

## Next Event Ideas
- 

---
*Completed: [Fill in]*
EOF

echo "✅ Event created at: $EVENT_DIR"
echo ""
echo "Next steps:"
echo "1. Edit $EVENT_DIR/README.md with event details"
echo "2. Add images to $EVENT_DIR/images/"
echo "3. Add documents to $EVENT_DIR/assets/"
echo "4. Update planning notes in $EVENT_DIR/notes/"
echo ""
echo "Quick edit command:"
echo "code $EVENT_DIR/README.md" 