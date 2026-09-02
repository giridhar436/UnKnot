# UnKnot — API Specification

## 1. API Principles

The API is responsible for:
- Authentication-aware requests
- Upload processing orchestration
- Entity extraction
- Duplicate detection
- Database operations
- Context retrieval
- Fireworks AI calls
- Analysis generation

All API routes are in `app/api/`. Server actions are in `lib/actions/`.
Frontend code must not directly contain secret API keys.

---

## 2. API Structure

```text
app/
  api/
    upload/
      route.ts          — POST: File upload + processing
    ask/
      route.ts          — POST: Ask UnKnot (Context Engine)
    files/
      [id]/
        route.ts        — GET: File URL retrieval
    records/
      [id]/
        route.ts        — DELETE: Record deletion
```

Server Actions:

```text
lib/actions/
  auth.ts               — signUpAction, signInAction, signOutAction, resetPasswordAction
```

---

## 3. Authentication

Authentication is handled by Supabase Auth.

The proxy (`proxy.ts`) refreshes sessions on every request and protects application routes.

Every protected API request resolves the current user via:

```typescript
const supabase = await createClient();
const { data: { user } } = await supabase.auth.getUser();
```

The backend derives the user ID from the authenticated session.
It does not accept an arbitrary `userId` from the frontend.

---

# 4. Upload API

## POST /api/upload

Purpose:
Upload a PDF/image or submit text and run the full processing pipeline.

Input (FormData):
- `file` — File (PDF or image, max 10MB)
- OR `text` — string (plain text input)
- `title` — optional string

Processing:

```text
Validate auth
  → Validate file type/size
  → Upload to Cloudinary
  → Create record + file in Supabase
  → Extract text (PDF parse / OCR / direct)
  → Entity extraction (Fireworks AI)
  → Validate output (Zod)
  → Duplicate detection
  → Store extracted_data
  → Create relationships
  → Generate reminders
  → Update record status
```

Response (success):

```json
{
  "success": true,
  "recordId": "uuid",
  "status": "completed",
  "extracted": {
    "title": "...",
    "category": "Purchases",
    "amount": 79999,
    "currency": "INR",
    "document_date": "2026-08-12",
    "merchant": "Croma Electronics",
    "product": "Samsung Galaxy S25",
    "warranty_expiry": "2027-08-12"
  }
}
```

Response (error):

```json
{
  "success": false,
  "error": {
    "code": "INVALID_TYPE",
    "message": "File type not supported"
  }
}
```

---

# 5. Ask UnKnot API

## POST /api/ask

Purpose:
Process a natural language question through the Context Engine.

Input (JSON):

```json
{
  "question": "How much did I spend on medicines this month?"
}
```

Processing:

```text
Authenticate user
  → Retrieve relevant records from Supabase
  → Gather related records via relationships
  → Build controlled context
  → Send context + question to Fireworks AI
  → Validate response
  → Store analysis
  → Return answer + source references
```

Response:

```json
{
  "success": true,
  "analysis": {
    "id": "analysis-...",
    "question": "How much did I spend on medicines this month?",
    "answer": "You spent ₹3,240 on medicines in August 2026.",
    "evidence": [
      {
        "id": "...",
        "type": "medical",
        "title": "Apollo Pharmacy Bill",
        "documentId": "...",
        "detail": "Amount: INR 1240, Date: 2026-08-05"
      }
    ],
    "suggestedAction": "View related documents"
  }
}
```

---

# 6. File API

## GET /api/files/[id]

Purpose:
Return the Cloudinary secure URL for a file.

The backend verifies ownership before returning the URL.

Response:

```json
{
  "success": true,
  "url": "https://res.cloudinary.com/..."
}
```

---

# 7. Record Deletion

## DELETE /api/records/[id]

Purpose:
Delete a record and its associated files.

Processing:

```text
Verify ownership
  → Delete from Cloudinary
  → Delete record (cascades to files, extracted_data, relationships, reminders)
```

Response:

```json
{
  "success": true
}
```

---

# 8. Server Actions

## Auth Actions (lib/actions/auth.ts)

### signUpAction(email, password, fullName)

Creates a new Supabase Auth user and profile.

### signInAction(email, password)

Authenticates user with Supabase Auth.

### signOutAction()

Signs out the user and redirects to home.

### resetPasswordAction(email)

Sends password reset email via Supabase Auth.

---

# 9. Service Layer

The service layer (`lib/services/`) provides data access functions used by server components:

```text
lib/services/
  documents.ts      — getDocuments, getDocument, getRelatedDocuments, getCategories
  finance.ts        — getExpenses, getInvestments, getFinanceSummary, getUpcomingPayments
  reminders.ts      — getReminders, getUpcomingReminders
  ask.ts            — askQuestion (calls /api/ask), getSuggestedQuestions, getActivityItems
  processing.ts     — processRecord (orchestrates full pipeline)
  extraction.ts     — extractEntities (Fireworks AI)
  duplicates.ts     — checkDuplicates
  relationships.ts  — createRelationships
  context-engine.ts — askContextEngine
  pdf-parser.ts     — parsePdf
  ocr.ts            — extractTextFromImage (OCR abstraction)
```

All service functions query Supabase with user-scoped RLS.

---

# 10. Error Format

Consistent error response:

```json
{
  "success": false,
  "error": {
    "code": "DOCUMENT_PROCESSING_FAILED",
    "message": "Unable to process the document."
  }
}
```

Error codes:
- `UNAUTHORIZED` — No authenticated session
- `NO_FILE` — No file provided
- `INVALID_TYPE` — Unsupported file type
- `FILE_TOO_LARGE` — File exceeds 10MB
- `DB_ERROR` — Database operation failed
- `PROCESSING_FAILED` — Pipeline error
- `NOT_FOUND` — Record/file not found
- `INTERNAL_ERROR` — Unexpected error

Do not expose internal stack traces to users.

---

# 11. Fireworks AI Rules

Fireworks API calls happen server-side only.

```text
Browser
  ↓
UnKnot Backend (API Route / Server Action)
  ↓
Fireworks API
```

Models used:
- `accounts/fireworks/models/llama-v3p1-8b-instruct` — Entity extraction, Context Engine answers
- `accounts/fireworks/models/llama-v3p2-11b-vision-instruct` — OCR/Vision

Structured output is requested and validated with Zod before storage.
