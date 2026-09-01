# UnKnot — Development Rules

These rules apply to all development and especially AI/vibe coding.

## 1. Product Rules

1. UnKnot is an information understanding and decision-support product.
2. Do not turn it into a generic chatbot.
3. Do not claim features that have not been implemented.
4. Every feature must connect to a genuine user problem.
5. Prefer simple, reliable functionality over flashy AI demos.

---

## 2. Architecture Rules

1. Keep frontend, backend, storage and AI responsibilities separate.
2. Fireworks API keys must remain server-side.
3. Supabase service-role keys must never be exposed to the browser.
4. Cloudinary stores original files; Supabase stores structured metadata/data.
5. The Context Engine retrieves information; Fireworks AI reasons over the retrieved context.
6. Do not use the AI model as the primary database.
7. Do not introduce a new framework/library without a clear reason.

---

## 3. AI Rules

1. Never fabricate user information.
2. Never assume an absent field is true.
3. Explicit user data has priority over generic assumptions.
4. Distinguish existing facts from recommendations.
5. Preserve important entities such as amount, date, product, provider and investment type.
6. Prefer structured AI outputs for classification and extraction.
7. Validate AI-generated JSON before storing it.
8. Keep prompts versioned when they affect stored data.
9. Do not send irrelevant personal information to the model.
10. AI output should be explainable using the retrieved context.

---

## 4. Document Rules

1. PDFs and images have different preprocessing paths.
2. Text-based PDFs should use PDF parsing where possible.
3. Scanned PDFs/images require OCR/Vision processing.
4. Original files must be retained in Cloudinary according to the product's storage policy.
5. Document dates must come from extracted document content when available.
6. Upload timestamp is NOT the document date.
7. Duplicate detection must not rely only on upload timestamp.

---

## 5. Data Rules

Use normalized structured data where relationships matter.

Example:

```text
Purchase
 ├── Product
 ├── Warranty
 ├── Repair
 └── Documents
```

Do not store everything as one huge JSON blob.

At the same time, don't over-normalize the database before the MVP proves the need.

---

## 6. Finance Rules

Investment records must explicitly contain investment type and amount.

Example:

```text
Investment
- Name
- Type
- Amount
- Date
- Frequency (optional)
```

Never recommend that the user "start investing" if their stored data already shows that they invest.

---

## 7. Duplicate Rules

Potential duplicate signals:

```text
File hash
Invoice/receipt number
Document date
Merchant/provider
Amount
Extracted text similarity
Product/service
```

A duplicate match should initially be treated as:

```text
Possible duplicate
```

rather than automatically deleting anything.

---

## 8. Security Rules

- Validate authentication on every protected backend operation.
- Verify resource ownership.
- Validate uploaded files.
- Limit file size.
- Sanitize user-controlled values.
- Keep secrets in environment variables.
- Never commit `.env` files containing real secrets.
- Use Row Level Security in Supabase.

---

## 9. UX Rules

1. Every loading state must communicate what is happening.
2. Every failure must provide a useful recovery path.
3. Never show fake AI processing.
4. Never block the user unnecessarily.
5. Important actions require confirmation.
6. Avoid unnecessary popups.
7. Keep the main flow understandable without documentation.

---

## 10. Vibe Coding Rules

When using AI coding assistants:

### Before generating code

Always specify:

```text
Goal
Current architecture
Files involved
Expected behavior
Constraints
Acceptance criteria
```

### While coding

1. Make one logical change at a time.
2. Do not ask AI to rewrite the entire application unless necessary.
3. Read generated code before accepting it.
4. Keep components small.
5. Reuse existing utilities/components.
6. Do not duplicate business logic.
7. Ask AI to explain unfamiliar code.
8. Run the application after meaningful changes.

### After coding

Check:

```text
Does it work?
Does it match the architecture?
Does it break existing features?
Are errors handled?
Are secrets protected?
Is the UI responsive?
```

---

## 11. Git Rules

Use Git from the first day.

Branch examples:

```text
main
frontend
backend
feature/upload
feature/dashboard
feature/auth
feature/processing
```

Commit examples:

```text
feat: add document upload UI
feat: add document processing API
fix: handle duplicate document detection
refactor: separate context retrieval logic
```

Never use vague commits such as:

```text
update
changes
final
working
```

---

## 12. Definition of Done

A feature is not done just because the page renders.

A feature is done when:

```text
UI works
+
API works
+
Database works
+
Error handling works
+
Authentication works
+
Responsive behavior works
+
Existing features still work
```
