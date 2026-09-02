# UnKnot — Development Progress

## Status

Project stage:

```text
Phase 2 — Backend & Full Application Integration Completed
```

Current goal:

> Phase 2 is complete. The application is now a functional backend-connected system.

---

## Legend

```text
[ ] Not started
[~] In progress
[x] Completed
```

---

# Product Foundation

- [x] Core product concept defined
- [x] Target problem discussed
- [x] Core architecture defined
- [x] Initial technology stack selected
- [x] Final database schema
- [x] Final API contract
- [x] Final UI wireframes

---

# PHASE 1 — FRONTEND

## Project Setup

- [x] Initialize Next.js project
- [x] Configure Tailwind CSS
- [x] Configure global typography
- [x] Create design tokens
- [x] Create layout
- [x] Create navigation
- [x] Create responsive structure

## Authentication UI

- [x] Login (Demo session scaffolded)
- [x] Signup (Demo session scaffolded)
- [x] Logout
- [x] Protected application routes
- [x] Session persistence

## Dashboard

- [x] Dashboard layout
- [x] Recent documents
- [x] Important items
- [x] Upcoming dates
- [x] Financial summary
- [x] Needs attention section

## Upload

- [x] PDF upload UI
- [x] Image upload UI
- [x] Text input UI
- [x] Drag and drop
- [x] File validation UI
- [x] Processing state
- [x] Success state
- [x] Error state

## Documents

- [x] Document list
- [x] Category filters
- [x] Search
- [x] Document detail
- [x] Extracted entities
- [x] Important dates
- [x] Duplicate warning
- [x] Original file viewer

## Ask UnKnot

- [x] Question input
- [x] Suggested questions
- [x] Answer view
- [x] Supporting records
- [x] Loading state
- [x] Error state

## Finance

- [x] Expense list
- [x] Investment list
- [x] Investment type
- [x] Investment amount
- [x] Finance detail views

## Reminders

- [x] Important date list
- [x] Reminder status
- [x] Reminder UI

---

# PHASE 2 — BACKEND

## Setup

- [x] Supabase project configuration
- [x] Database connection (3 client types: browser, server, service-role)
- [x] Environment variables (.env.example + Zod validation)
- [x] Supabase Auth integration
- [x] Row Level Security (all tables)
- [x] Proxy (middleware) for session refresh + route protection

## Database

- [x] profiles table + auto-create trigger
- [x] records table (main entity)
- [x] files table (Cloudinary metadata)
- [x] extracted_data table (structured entities)
- [x] relationships table (record connections)
- [x] reminders table (important dates)
- [x] analyses table (question/answer history)
- [x] Full RLS policies on all tables

## File Processing

- [x] Cloudinary configuration + SDK
- [x] Image upload (JPG, PNG, WEBP, GIF)
- [x] PDF upload
- [x] PDF parsing (pdf-parse v2)
- [x] OCR/Vision integration (Fireworks AI Vision, abstraction layer)
- [x] Extracted text storage
- [x] File size validation (10MB max)
- [x] File type validation

## AI Processing

- [x] Fireworks API integration
- [x] Entity extraction prompt
- [x] Structured output validation (Zod schemas)
- [x] AI error handling
- [x] Investment vs expense distinction
- [x] Reminder date extraction

## Duplicate Detection

- [x] Document date comparison (primary signal)
- [x] Invoice/receipt number matching
- [x] Merchant comparison
- [x] Product comparison
- [x] Amount comparison
- [x] Score-based matching
- [x] Possible duplicate flagging (no auto-delete)

## Context Engine

- [x] Record retrieval for context
- [x] Related-record retrieval via relationships
- [x] Context construction
- [x] Fireworks AI analysis
- [x] Source evidence tracking
- [x] Analysis storage

## Relationship Engine

- [x] Purchase → Warranty relationships
- [x] Purchase → Repair relationships
- [x] Bill → Payment relationships
- [x] Investment → Investment Statement relationships
- [x] Generic related (same product)

## API

- [x] Upload API (POST /api/upload)
- [x] Ask API (POST /api/ask)
- [x] File retrieval API (GET /api/files/[id])
- [x] Record deletion API (DELETE /api/records/[id])
- [x] Auth server actions (signUp, signIn, signOut, resetPassword)

---

# Integration

- [x] Connect frontend to Supabase Auth
- [x] Connect upload UI to backend (/api/upload)
- [x] Connect documents UI to database
- [x] Connect processing status (real pipeline)
- [x] Connect Ask UnKnot to Context Engine
- [x] Connect finance views (real expenses/investments)
- [x] Connect reminders (real database)
- [x] Connect dashboard (real user data)
- [x] Connect settings (real user profile)
- [x] Connect sidebar (real user info + sign out)
- [x] Connect document detail (real file preview)
- [x] Test complete user flow

---

## Current Blockers

```text
None. Phase 2 Backend is fully implemented.
External services (Supabase, Cloudinary, Fireworks AI) require credentials in .env.local.
```

## What Requires Configuration

To run the full application:

1. Create a Supabase project and run `supabase/migrations/001_initial_schema.sql`
2. Create a Cloudinary account
3. Get a Fireworks AI API key
4. Copy `.env.example` to `.env.local` and fill in all values
5. Run `npm run dev`

## Last Updated

2026-09-02
