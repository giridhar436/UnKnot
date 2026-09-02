# UnKnot — Development Phases

## Development Strategy

UnKnot was developed in two major tracks:

```text
PHASE 1
FRONTEND (Completed)

        +

PHASE 2
BACKEND (Completed)

        ↓

INTEGRATION (Completed)
```

---

# PHASE 1 — FRONTEND (Completed)

## Objective

Build a complete, polished user interface using realistic mock data before depending on the backend.

## What Was Built

- Next.js 16 + React 19 + Tailwind CSS v4 project
- Complete design system (Deep Evergreen + Warm Ivory palette)
- All application routes: dashboard, documents, categories, ask, finance, investments, reminders, settings
- Authentication UI (login, signup, forgot-password)
- Upload modal with processing states
- Responsive layout (desktop sidebar + mobile bottom nav)
- Reusable UI components (Button, Modal, Badge, Card, etc.)

## Status: Complete

All frontend pages render correctly with the design system.

---

# PHASE 2 — BACKEND (Completed)

## Objective

Build the data, processing and AI infrastructure that powers the frontend.

## What Was Built

### Database (Supabase PostgreSQL)

- 7 tables: profiles, records, files, extracted_data, relationships, reminders, analyses
- Full Row Level Security on all tables
- Auto-profile creation trigger on signup
- Indexed for common query patterns

### Authentication (Supabase Auth)

- Sign up / sign in / sign out / password reset
- Session refresh via proxy (Next.js 16)
- Protected route enforcement
- Redirect logic for authenticated/unauthenticated users

### File Storage (Cloudinary)

- Upload validation (type + size)
- Server-side upload via Cloudinary SDK
- File metadata stored in Supabase
- Original file retrieval via secure URL

### Document Processing Pipeline

- PDF parsing (pdf-parse v2)
- OCR abstraction layer (Fireworks AI Vision, swappable)
- Entity extraction (Fireworks AI with Zod validation)
- Duplicate detection (score-based, document-date-first)
- Relationship creation (rule-based)
- Reminder generation from extracted dates

### Context Engine

- Retrieves relevant records from Supabase
- Gathers related records via relationships
- Builds controlled context package
- Sends to Fireworks AI for grounded answers
- Stores analysis history

### API Routes

- POST /api/upload — File upload + full processing pipeline
- POST /api/ask — Context Engine queries
- GET /api/files/[id] — File URL retrieval
- DELETE /api/records/[id] — Record + file deletion

### Frontend Integration

- All pages connected to real Supabase data
- Upload modal sends real files to /api/upload
- Ask view calls /api/ask for real Context Engine answers
- Dashboard shows real user name and data
- Sidebar shows real user info with working sign-out
- Document detail shows original file from Cloudinary

## Status: Complete

---

# INTEGRATION (Completed)

The full vertical slice works end-to-end:

```text
User signs up / signs in
     ↓
User uploads receipt image / PDF / text
     ↓
File uploaded to Cloudinary
     ↓
Text extracted (PDF parse / OCR)
     ↓
Entities extracted (Fireworks AI)
     ↓
Duplicate detection runs
     ↓
Record stored in Supabase
     ↓
Relationships created
     ↓
Reminders generated
     ↓
Dashboard shows real data
     ↓
User asks question via Ask UnKnot
     ↓
Context Engine retrieves relevant records
     ↓
Fireworks AI answers with source references
     ↓
User can view original file from Cloudinary
```

## Backend Acceptance Criteria

- [x] Authentication works
- [x] User data is isolated (RLS)
- [x] Files upload successfully (Cloudinary)
- [x] PDF/image/text processing works
- [x] Entity extraction works (Fireworks AI)
- [x] Duplicate detection works (document-date-first)
- [x] Structured records are stored
- [x] Context retrieval works
- [x] Fireworks AI produces validated answers
- [x] API errors are handled safely
- [x] TypeScript checks pass
- [x] Production build succeeds

## Configuration Required

To run the full application, configure these services:

1. **Supabase**: Create project, run migration SQL, get URL + keys
2. **Cloudinary**: Create account, get cloud name + API keys
3. **Fireworks AI**: Get API key from fireworks.ai

Then copy `.env.example` to `.env.local` and fill in all values.
