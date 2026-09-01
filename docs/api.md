# UnKnot — API Specification

## 1. API Principles

The API is responsible for:
- Authentication-aware requests
- Upload processing orchestration
- Classification
- Entity extraction
- Duplicate detection
- Database operations
- Context retrieval
- Fireworks AI calls
- Analysis generation

Frontend code must not directly contain secret API keys.

---

## 2. API Structure

Recommended structure:

```text
app/
  api/
    documents/
    analysis/
    search/
    entities/
    investments/
    expenses/
```

Use REST-style endpoints where practical.

---

## 3. Authentication

Authentication is handled by Supabase Auth.

Every protected API request should resolve the current authenticated user.

Conceptually:

```http
Authorization: authenticated-session
```

The backend must derive the user ID from the authenticated session.

Do not accept an arbitrary `userId` from the frontend and trust it.

---

# 4. Document APIs

## POST /api/documents/upload

Purpose:
Upload a PDF/image and start processing.

Input:
- File
- Optional user-provided title/notes

Processing:

```text
Upload
 -> Validate
 -> Cloudinary
 -> Determine PDF/Image
 -> Parse/OCR
 -> Classification
 -> Entity Extraction
 -> Duplicate Check
 -> Supabase
```

Response should include:

```json
{
  "success": true,
  "documentId": "document-id",
  "status": "processed"
}
```

For longer processing, the endpoint may return:

```json
{
  "success": true,
  "documentId": "document-id",
  "status": "processing"
}
```

---

## GET /api/documents

Purpose:
Return the authenticated user's documents.

Optional filters:

```text
category
date
search
sort
```

Example:

```http
GET /api/documents?category=Warranty
```

---

## GET /api/documents/:id

Purpose:
Return one document and its extracted information.

Should include:
- Document metadata
- Category
- Entities
- Important dates
- Duplicate status
- Cloudinary file reference
- Related records

---

## DELETE /api/documents/:id

Delete a document according to the application's retention rules.

The backend must verify ownership before deletion.

---

# 5. Search API

## GET /api/search

Purpose:
Search across the user's structured information.

Example:

```http
GET /api/search?q=laptop
```

Search can return:
- Documents
- Purchases
- Expenses
- Investments
- Warranties
- Repairs
- Other entities

The first MVP can use PostgreSQL text search/filters.

Semantic/vector search can be added later if genuinely required.

---

# 6. Analysis API

## POST /api/analysis

Input:

```json
{
  "question": "Should I repair my laptop or replace it?"
}
```

Processing:

```text
Question
  ↓
Context Engine
  ↓
Retrieve relevant records
  ↓
Build context
  ↓
Fireworks AI
  ↓
Validate response
  ↓
Return answer
```

Example response:

```json
{
  "answer": "...",
  "supportingData": [
    {
      "type": "repair",
      "id": "..."
    }
  ]
}
```

The UI should be able to show which stored records contributed to the answer.

---

# 7. Entity API

## GET /api/entities

Retrieve extracted entities for the authenticated user.

Possible filters:

```text
type
category
documentId
dateRange
```

---

# 8. Finance APIs

## POST /api/expenses

Create or confirm an expense.

```json
{
  "title": "Laptop repair",
  "amount": 18000,
  "date": "2026-08-20",
  "category": "Repair"
}
```

## POST /api/investments

Investments must be explicitly represented.

```json
{
  "name": "Mutual Fund XYZ",
  "type": "Mutual Fund",
  "amount": 5000,
  "date": "2026-08-01"
}
```

Important:
If a user has an investment, the system should not incorrectly conclude that the user needs to "start investing".

The distinction between:
- recommendation to invest
- existing investment
- additional investment opportunity

must be preserved.

---

# 9. Error Format

Use a consistent response:

```json
{
  "success": false,
  "error": {
    "code": "DOCUMENT_PROCESSING_FAILED",
    "message": "Unable to process the document."
  }
}
```

Do not expose internal stack traces to users.

---

# 10. Fireworks AI Rules

Fireworks API calls must happen server-side.

Never:

```text
Browser -> Fireworks API using secret key
```

Instead:

```text
Browser
  ↓
UnKnot Backend
  ↓
Fireworks API
```

Use structured output wherever supported.

The application should validate model responses before storing them.

