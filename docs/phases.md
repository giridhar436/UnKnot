# UnKnot — Development Phases

## Development Strategy

UnKnot will be developed in two major tracks:

```text
PHASE 1
FRONTEND

        +

PHASE 2
BACKEND

        ↓

INTEGRATION
```

The two phases can be developed in parallel by different team members, but both teams must agree on contracts before implementation.

---

# PHASE 1 — FRONTEND

## Objective

Build a complete, polished user interface using realistic mock data before depending on the backend.

The frontend team should be able to demonstrate the product flow even while backend APIs are being developed.

---

## Step 1 — Foundation

Build:

```text
Next.js
React
Tailwind CSS
```

Create:

```text
app/
components/
lib/
public/
```

Establish:
- Typography
- Colors
- Spacing
- Buttons
- Inputs
- Cards
- Tables
- Modal
- Toast
- Loading states
- Error states

---

## Step 2 — Application Shell

Build:

```text
Sidebar / Navigation
Header
Search
User menu
Responsive mobile navigation
```

Routes:

```text
/dashboard
/documents
/documents/[id]
/finance
/investments
/reminders
/ask
/settings
```

---

## Step 3 — Dashboard

The dashboard should communicate:

```text
What is important?
What changed?
What needs attention?
```

Use mock data initially.

---

## Step 4 — Upload Experience

Build the full UX:

```text
Select file
    ↓
Validate
    ↓
Uploading
    ↓
Processing
    ↓
Analyzing
    ↓
Completed
```

The frontend should not assume that processing is instant.

---

## Step 5 — Document Experience

Create:

```text
Document list
Document detail
Category
Extracted entities
Important dates
Related records
Duplicate warning
Original document preview
```

---

## Step 6 — Ask UnKnot

Build:

```text
Question input
Suggested questions
Answer
Evidence/supporting records
```

Use mocked answers until the backend API exists.

---

## Step 7 — Finance & Reminders

Build:

```text
Expenses
Investments
Investment type
Investment amount
Important dates
Reminders
```

---

## Frontend Acceptance Criteria

The frontend phase is complete when:

- Every core route exists.
- Main user journey can be completed using mock data.
- Responsive design works.
- Loading/error/empty states exist.
- Components are reusable.
- No backend secrets exist in frontend code.
- UI matches the UnKnot design system.

---

# PHASE 2 — BACKEND

## Objective

Build the data, processing and AI infrastructure that powers the frontend.

---

## Step 1 — Supabase

Configure:

```text
PostgreSQL
Supabase Auth
Row Level Security
```

Create initial schema for:

```text
profiles
documents
entities
purchases
expenses
investments
warranties
repairs
important_dates
reminders
analyses
```

---

## Step 2 — Cloudinary

Configure:

```text
Upload
Storage
Retrieval
Deletion
```

Store the Cloudinary reference in Supabase.

---

## Step 3 — Document Processing

### PDF

```text
PDF
 ↓
Detect text/scanned document
 ↓
Parser or OCR
 ↓
Extracted text
```

### Image

```text
Image
 ↓
OCR/Vision
 ↓
Extracted text
```

### Text

```text
Text
 ↓
Direct processing
```

---

## Step 4 — Classification

Fireworks AI receives the processed content and returns structured classification.

Example:

```json
{
  "category": "Purchase",
  "subcategory": "Electronics",
  "confidence": 0.94
}
```

Do not store unsupported categories without validation.

---

## Step 5 — Entity Extraction

Extract:

```text
People
Organizations
Products
Amounts
Dates
Invoice numbers
Locations
Warranty periods
Investment types
Payment information
```

Only extract fields that are actually present or reliably inferable.

---

## Step 6 — Duplicate Detection

Compare:

```text
File hash
Document identifiers
Dates
Amounts
Merchant/provider
Extracted text
Product/service
```

Return:

```text
No duplicate
Possible duplicate
High-confidence duplicate
```

Do not automatically delete a document.

---

## Step 7 — Context Engine

Implement:

```text
Question
 ↓
Intent
 ↓
Relevant entities
 ↓
Relevant records
 ↓
Related documents
 ↓
Context package
```

Then:

```text
Context
 ↓
Fireworks AI
 ↓
Structured answer
```

---

## Step 8 — Analysis

The backend should store useful analysis metadata:

```text
Question
Context references
AI response
Created time
```

Do not store unnecessary copies of sensitive data.

---

## Backend Acceptance Criteria

The backend phase is complete when:

- Authentication works.
- User data is isolated.
- Files upload successfully.
- PDF/image/text processing works.
- Classification works.
- Entity extraction works.
- Duplicate detection works.
- Structured records are stored.
- Context retrieval works.
- Fireworks AI produces validated answers.
- API errors are handled safely.

---

# INTEGRATION PHASE

Although development is organized into two major phases, the final system must be integrated end-to-end.

```text
Frontend
   ↓
Backend API
   ↓
Processing
   ↓
Supabase / Cloudinary
   ↓
Context Engine
   ↓
Fireworks AI
   ↓
Frontend
```

---

## First End-to-End Milestone

Do NOT attempt every feature first.

The first working vertical slice should be:

```text
User logs in
     ↓
Uploads receipt image
     ↓
Image processed
     ↓
Text extracted
     ↓
Category identified
     ↓
Entities extracted
     ↓
Data stored
     ↓
User asks:
"How much did I spend on this?"
     ↓
Context Engine retrieves record
     ↓
Fireworks AI answers
```

Once this works reliably, expand to:

```text
PDF
Investments
Warranties
Repairs
Duplicates
Reminders
Cross-document relationships
```

This is the recommended path for the SIH prototype because it proves the core product instead of spreading effort across dozens of incomplete features.
