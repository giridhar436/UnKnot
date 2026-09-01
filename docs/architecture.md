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
| Frontend | Next.js + React | Web application |
| Styling | Tailwind CSS | UI and responsive design |
| Backend | Next.js API Routes / Server Actions | Application logic and APIs |
| Database | Supabase PostgreSQL | Structured application data |
| Authentication | Supabase Auth | User accounts and sessions |
| File Storage | Cloudinary | Original PDFs/images |
| AI | Fireworks AI API | Classification, entity extraction, reasoning and analysis |
| PDF Processing | PDF parser | Extract text from text-based PDFs |
| OCR/Vision | Selected OCR/Vision service | Read images and scanned PDFs |
| Deployment | Vercel | Web application deployment |

### Important principle

Do not add another technology just because it is popular.

Every technology must solve a real requirement.

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
               Classification
                      |
                      v
              Duplicate Detection
                      |
                      v
              Entity Extraction
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
 -> PDF Parser
 -> Extracted Text
 -> Classification
 -> Entity Extraction
```

Scanned PDF:

```text
PDF
 -> Page/Image Processing
 -> OCR/Vision
 -> Extracted Text
 -> Classification
 -> Entity Extraction
```

### Image

```text
Image
 -> OCR/Vision
 -> Extracted Text + Visual information
 -> Classification
 -> Entity Extraction
```

### Text

```text
Text
 -> Classification
 -> Entity Extraction
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

The database should store the Cloudinary identifier/URL rather than duplicating the binary file inside PostgreSQL.

### Supabase PostgreSQL

Stores structured information such as:

```text
User
Document
DocumentMetadata
Category
Entity
Purchase
Expense
Investment
Warranty
MedicalRecord
Repair
ImportantDate
Analysis
```

The exact schema should evolve during implementation.

---

## 6. Entity Extraction

After preprocessing, UnKnot identifies useful entities from the content.

Example:

```text
"Bought Samsung Galaxy S25 for ₹79,999
on 12 August 2026. Warranty until
12 August 2027."
```

Possible extracted entities:

```text
Product: Samsung Galaxy S25
Amount: ₹79,999
Purchase Date: 12-Aug-2026
Warranty End: 12-Aug-2027
Category: Purchase
```

The extracted information is stored as structured data so that it can be searched and connected later.

---

## 7. Classification

UnKnot should classify information into practical categories.

Initial categories:

```text
Finance
  - Expense
  - Investment
  - Income
  - Payment

Purchase
Warranty
Repair
Medical
Documents
Important Dates
Subscriptions
Other
```

Classification should be extensible.

Do not hard-code the application around only the initial categories.

---

## 8. Duplicate Detection

Duplicate detection must NOT rely on upload timestamp.

For documents, UnKnot should compare extracted information and document-level signals such as:

```text
Document type
Document date
Merchant/provider
Invoice/receipt number
Amount
Product/service
Extracted text similarity
File hash where applicable
```

For example, two photos of the same receipt uploaded on different days should still be recognized as possible duplicates.

The original file upload time is only metadata about the upload event, not the actual document date.

---

## 9. Context Engine

The Context Engine is the layer between stored information and Fireworks AI.

It should:

1. Receive the user's question/request.
2. Understand what information is relevant.
3. Retrieve relevant structured records from Supabase.
4. Retrieve relevant document metadata and, where necessary, document text.
5. Build a limited context package.
6. Send that context to Fireworks AI.
7. Return the model's structured result to the application.

Example:

```text
User:
"Should I repair this laptop or replace it?"

Context Engine retrieves:
- Purchase price
- Purchase date
- Warranty status
- Previous repair records
- Previous repair costs
- Current repair estimate
- Relevant documents

Fireworks AI:
Analyzes the supplied context.

UnKnot:
Displays the analysis and supporting information.
```

The AI should not be treated as the database.

---

## 10. Core Design Principle

```text
Raw information
      ↓
Structured information
      ↓
Connected information
      ↓
Relevant context
      ↓
AI reasoning
      ↓
Useful answer/decision
```

This separation makes the system easier to debug, explain and scale.

---

## 11. Security Principles

- Never expose Fireworks API keys in frontend code.
- Never expose Supabase service-role credentials in the browser.
- Use authenticated server-side operations for sensitive data.
- Apply database access controls such as Supabase Row Level Security.
- Users must only access their own records/files.
- Validate uploaded file type and size.
- Do not send unrelated user data to the AI model.
- Do not treat AI output as authoritative for high-stakes medical or financial decisions.
