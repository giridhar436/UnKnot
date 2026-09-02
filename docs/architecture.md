# UnKnot — System Architecture

## 1. Purpose

UnKnot is a personal information and decision-support web application.

The core idea is not simply to store files. UnKnot converts scattered personal information from documents and text into structured, connected information that can later be searched, analyzed, and used for context-aware answers and decisions.

Typical inputs include:
- PDFs
- Images/photos of documents
- Plain text entered by the user

Typical information domains include:
- Purchases
- Expenses
- Investments
- Medical records
- Warranties
- Repairs
- Bills/invoices
- Important dates
- Personal documents
- Other useful life information

---

## 2. Final Technology Stack

| Layer | Technology | Responsibility |
|---|---|---|
| Frontend | Next.js 16 + React 19 | Web application |
| Styling | Tailwind CSS v4 | UI and responsive design |
| Backend | Next.js API Routes + Server Actions | Application logic and APIs |
| Database | Supabase PostgreSQL | Structured application data |
| Authentication | Supabase Auth | User accounts and sessions |
| File Storage | Cloudinary | Original PDFs/images |
| AI | Fireworks AI API | Classification, entity extraction, reasoning and analysis |
| PDF Processing | pdf-parse v2 | Extract text from text-based PDFs |
| OCR/Vision | Fireworks AI Vision (abstraction layer) | Read images and scanned PDFs |
| Validation | Zod | Schema validation for AI outputs |
| Deployment | Vercel | Web application deployment |

---

## 3. High-Level Architecture

```text
                         USER
                           |
                           v
                  +------------------+
                  | Next.js Web App  |
                  | React + Tailwind |
                  +--------+---------+
                           |
                +----------+----------+
                |          |          |
                v          v          v
              PDF        IMAGE       TEXT
                |          |
                v          v
          PDF Parsing   OCR/Vision
                |          |
                +-----+----+
                      |
                      v
               Entity Extraction
               (Fireworks AI)
                      |
                      v
              Duplicate Detection
                      |
                      v
              Relationship Engine
                      |
             +--------+--------+
             |                 |
             v                 v
       Cloudinary          Supabase
       Original Files      Structured Data
             |                 |
             +--------+--------+
                      |
                      v
                Context Engine
                      |
                      v
                Fireworks AI
                      |
                      v
             Analysis / Decision
                      |
                      v
                    USER
```

---

## 4. Input Processing

### PDF

Text-based PDF:

```text
PDF
 -> pdf-parse v2
 -> Extracted Text
 -> Entity Extraction (Fireworks AI)
```

Scanned PDF:

```text
PDF
 -> pdf-parse v2 (insufficient text detected)
 -> Fireworks AI Vision OCR
 -> Extracted Text
 -> Entity Extraction (Fireworks AI)
```

### Image

```text
Image
 -> Fireworks AI Vision OCR
 -> Extracted Text + Visual information
 -> Entity Extraction (Fireworks AI)
```

### Text

```text
Text
 -> Entity Extraction (Fireworks AI)
```

The three input paths are intentionally different because PDF, image and text require different preprocessing.

---

## 5. Storage Architecture

### Cloudinary

Stores the original uploaded file.

Examples:
- receipt.jpg
- medical_bill.pdf
- warranty.pdf

The database stores the Cloudinary identifier/URL rather than duplicating the binary file inside PostgreSQL.

### Supabase PostgreSQL

Tables:

```text
profiles         — User profile information
records          — Main structured representation of a user record
files            — Cloudinary file metadata linked to records
extracted_data   — Structured entities extracted from documents
relationships    — Connections between records
reminders        — Important dates linked to records
analyses         — Question/answer history from Ask UnKnot
```

The exact schema is defined in `supabase/migrations/001_initial_schema.sql`.

---

## 6. Entity Extraction

After preprocessing, UnKnot identifies useful entities from the content using Fireworks AI.

The extraction prompt requests structured JSON output with:
- category (Finance, Investments, Medical, Warranty, Purchases, Repairs, Documents, Subscriptions, Other)
- record_type (purchase, warranty, repair, medical, bill, investment, etc.)
- title, merchant, product, amount, currency, document_date
- invoice_number, warranty_expiry, investment_type
- is_investment flag (critical for separating investments from expenses)
- entities array (all extracted data points)
- reminder_dates (important dates to generate reminders)

Output is validated with Zod schemas before storage.

---

## 7. Classification

UnKnot classifies information into practical categories:

```text
Finance
  - Expense
  - Investment
  - Income
  - Payment

Investments
Purchases
Warranty
Repair
Medical
Documents
  - Insurance
  - Legal
  - Personal
Subscriptions
Other
```

Classification is performed by Fireworks AI during entity extraction.

---

## 8. Duplicate Detection

Duplicate detection does NOT rely on upload timestamp.

The system compares extracted information and document-level signals:

```text
Document date (strongest signal)
Invoice/receipt number (very strong)
Merchant/provider
Product/service
Amount
```

Scoring:
- Document date match: +40
- Invoice number match: +50
- Merchant match: +20
- Product match: +15
- Amount match: +15

Thresholds:
- Score < 30: No duplicate
- Score 30-69: Possible duplicate
- Score >= 70: High confidence duplicate

Possible duplicates are flagged for user review, never auto-deleted.

---

## 9. Context Engine

The Context Engine is the layer between stored information and Fireworks AI.

It:

1. Receives the user's question/request.
2. Retrieves relevant structured records from Supabase (limited to 50 most recent).
3. Retrieves related records via the relationships table.
4. Builds a controlled context package.
5. Sends context + question to Fireworks AI.
6. Returns the model's answer with source references.

The AI is instructed to:
- Never fabricate information
- Distinguish Known/Unknown/Inferred
- Treat investments as assets, not expenses
- Cite which records the answer is based on
- Flag conflicts between records

---

## 10. Relationship Engine

Relationships are created rule-based after entity extraction:

```text
Purchase + Warranty (same product) → purchase_warranty
Purchase + Repair (same product) → purchase_repair
Bill + Payment → bill_payment
Investment + Investment Statement → investment_statement
Same product (no specific rule) → related
```

Relationships are stored in the `relationships` table and used for:
- Document detail page (showing related records)
- Context Engine (gathering related context)

---

## 11. Security Principles

- **Row Level Security**: Every table has RLS policies scoped to `auth.uid() = user_id`
- **Service-role client**: Only used server-side for admin operations (bypasses RLS)
- **Session management**: Supabase Auth with HTTP-only cookies, refreshed via proxy on every request
- **Secrets**: Fireworks API key, Cloudinary secrets, and Supabase service-role key are server-only
- **File validation**: Type and size checks before upload
- **AI data minimization**: Only relevant context is sent to Fireworks AI
- **No cross-user access**: RLS ensures users can only access their own data

---

## 12. Processing Pipeline

```text
Upload
  → Validate (auth, file type, file size)
  → Upload to Cloudinary
  → Create record (status: uploaded)
  → Create file record
  → Extract text (PDF parse / OCR / direct text)
  → Entity extraction (Fireworks AI)
  → Validate output (Zod)
  → Duplicate detection
  → Store extracted_data
  → Update record (status: completed)
  → Create relationships
  → Generate reminders from extracted dates
```

Processing states: `uploaded` → `processing` → `extracting` → `completed` / `failed` / `needs_review`

---

## 13. Authentication Flow

1. User submits login/signup form
2. Server action calls Supabase Auth
3. On success, redirect to dashboard
4. Proxy (middleware) checks session on protected routes
5. Unauthenticated users redirected to /login
6. Authenticated users redirected away from /login, /signup

---

## 14. Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

FIREWORKS_API_KEY=

OCR_PROVIDER=fireworks_vision
```

---

## 15. API Routes

```text
POST /api/upload     — File upload + processing pipeline
POST /api/ask        — Ask UnKnot (Context Engine)
GET  /api/files/[id] — Get file URL (auth-protected)
DELETE /api/records/[id] — Delete record + Cloudinary file
```

Server Actions:
```text
lib/actions/auth.ts    — signUp, signIn, signOut, resetPassword
```

---

## 16. Frontend Integration

All pages now use real Supabase data:

- `/dashboard` — Real user data, real documents, real finance summary, real reminders
- `/documents` — Real records from Supabase with category filters and search
- `/documents/[id]` — Real record detail with extracted entities, related documents, original file preview
- `/categories` — Real category counts from database
- `/finance` — Real expenses and investments (properly separated)
- `/investments` — Real investment records
- `/reminders` — Real reminders from database
- `/ask` — Real Context Engine queries via /api/ask
- `/settings` — Real user profile data

Upload modal connects to `/api/upload` for real file processing.
