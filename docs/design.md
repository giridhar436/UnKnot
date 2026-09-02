# UnKnot — Design System

## 1. Design Direction

UnKnot uses an **editorial, calm, intelligent visual design system** pairing Deep Evergreen with Warm Ivory, Charcoal, and a single restrained Terracotta accent.

The product feels like a serious, trustworthy everyday decision utility — not a generic AI dashboard.

Core visual idea:

```text
DEEP EVERGREEN + WARM IVORY + DEEP CHARCOAL + MUTED TERRACOTTA
Geist Sans + Geist Mono typography
ChanhDai-inspired component micro-interactions (Line Nav, Status Button, Icon Swap)
Crisp 1px borders (#DFDBD1)
Information first
Tabular figures for amounts and dates
```

The same design language is used across:

- Desktop web
- Tablet web
- Mobile web
- Mobile PWA
- Landing page (`/`)
- Authentication (`/login`, `/signup`, `/forgot-password`)
- Dashboard (`/dashboard`)
- File/document views (`/documents`, `/documents/[id]`)
- Categories (`/categories`)
- Search & Decision Query (`/ask`)
- Finance & Investments (`/finance`, `/investments`)
- Reminders (`/reminders`)
- Profile & Settings (`/settings`)
- Empty/loading/error states

---

## 2. Palette Tokens

### Core palette

```text
Deep Evergreen (Primary):
#064038

Evergreen Dark (Hover/Active):
#032B25

Evergreen Soft (Surface/Badge):
#E3ECE8

Warm Ivory (App Background):
#FAF8F5

Warm Ivory Light:
#FDFCFA

Warm Bone (Secondary Surface / Sidebar):
#F2EFEB

Deep Charcoal (Text / Dark Surface):
#111414

Neutral Slate (Secondary Text):
#5C615E

Muted Charcoal (Subtle/Icons):
#888E8A

Borders:
#DFDBD1 / #CCC7BB

Muted Terracotta (Restrained Warm Accent):
#B85D3B (Alerts, deadlines, urgent dues)
#FDF1EC (Soft background)
```

### Semantic colors

Semantic colors communicate actual state without decorative noise:

```text
Success: #1D7A58 / Soft: #EBF7F1
Warning / Urgency: #B85D3B / Soft: #FDF1EC
Danger: #BA2D25 / Soft: #FDF0EE
Info: #23587B / Soft: #EDF5FA
```

Do not use semantic colors as decorative accents.

---

## 3. Color Usage Rules

### Light mode

Primary application background:

```text
Sand / Sand Light
```

Primary brand surfaces:

```text
Cyprus
```

Primary text:

```text
Near Black
```

Secondary text:

```text
#5F625F
```

Borders:

```text
#D8D5CC
```

### Dark mode

Primary application background:

```text
Near Black #080B10
```

Cards/surfaces:

```text
Dark Gray #171717
```

Primary accent:

```text
Cyprus #004643
```

Highlighted accent elements may use a lighter Cyprus-derived tone only when required for accessibility.

Text:

```text
#F5F3ED
```

Muted text:

```text
#A7AAA6
```

Borders:

```text
#30322F
```

### Important

Do NOT turn every component Cyprus green.

Use Cyprus strategically for:

- Primary buttons
- Active navigation
- Selected states
- Important labels
- Key metrics
- Focus states
- Brand elements

Use Sand/near-black for the majority of the interface.

---

## 4. Typography

Use a clean modern sans-serif.

Recommended:

```text
Inter
```

Fallback:

```text
system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif
```

### Typography hierarchy

```text
Display / Hero:
36–48px

Page title:
28–36px

Section title:
20–24px

Card title:
16–18px

Body:
14–16px

Secondary:
13–14px

Caption:
11–12px
```

Use **medium/semi-bold typography** for hierarchy rather than heavy shadows, gradients, or decorative elements.

### Editorial accent

Large category names or important document types may use a bold/condensed visual treatment inspired by the reference image.

Do not overuse this treatment.

It should identify important sections, not become the default font everywhere.

---

## 5. Shape Language

The reference UI uses rounded rectangles, but UnKnot should keep rounding restrained.

```text
Small controls:
8px

Inputs:
10px

Cards:
14–18px

Large feature sections:
20–24px

Pills:
999px
```

Avoid putting every piece of information inside a rounded card.

Use spacing and typography to create hierarchy.

---

## 6. Borders and Dividers

Prefer thin borders over shadows.

Default:

```text
1px solid #D8D5CC
```

Dark mode:

```text
1px solid #30322F
```

Use borders to separate:

- File metadata
- Categories
- Table rows
- Sections
- Settings groups
- Analysis results

Avoid heavy outlines.

---

## 7. Shadows

Shadows should be subtle and functional.

Preferred:

```text
0 2px 8px rgba(0,0,0,0.06)
```

For dark mode, shadows should be minimal.

Do not use:

- Large floating shadows
- Neon shadows
- Glow effects
- Colored shadows

---

## 8. Gradients

Gradients are **not part of the default UnKnot visual language**.

Avoid:

```text
AI gradient backgrounds
Rainbow gradients
Neon gradients
Glow gradients
Glass gradients
```

If a gradient is ever required for a special marketing/hero element, it must be extremely restrained and approved before implementation.

The core product UI remains flat.

---

# 9. Layout System

## Desktop

Recommended maximum content width:

```text
1200–1400px
```

Use a persistent left sidebar for the primary application navigation.

Suggested structure:

```text
┌──────────────────────────────────────────────────────────────┐
│ Top bar                                                      │
├───────────────┬──────────────────────────────────────────────┤
│               │                                              │
│ Sidebar       │ Main content                                 │
│               │                                              │
│               │                                              │
│               │                                              │
└───────────────┴──────────────────────────────────────────────┘
```

The content area should not feel cramped.

---

## Tablet

Reduce sidebar width or convert it to a compact navigation rail.

Prioritize:

- Search
- Upload
- Categories
- Ask
- Important items

---

## Mobile / PWA

Mobile should be designed around thumb reach and quick actions.

Suggested structure:

```text
┌───────────────────────┐
│ Header                │
├───────────────────────┤
│                       │
│ Main content          │
│                       │
│                       │
├───────────────────────┤
│ Home Files Ask Finance│
└───────────────────────┘
```

Use a bottom navigation bar for the most important destinations.

Do not simply shrink the desktop sidebar.

---

# 10. Mobile PWA Rules

UnKnot is a PWA, so mobile UX is a first-class requirement.

### Minimum expectations

- Responsive from ~320px width upward
- Touch-friendly controls
- No hover-only functionality
- Bottom navigation
- Sticky primary actions where useful
- Safe-area support for modern phones
- Large enough tap targets
- Fast page transitions
- No horizontal scrolling
- Upload from camera/gallery/files
- Mobile-friendly document preview
- Mobile-friendly search
- Mobile-friendly AI answers

### Touch targets

Interactive controls should generally be at least:

```text
44 × 44px
```

Do not place tiny icon buttons next to each other.

---

# 11. Navigation

## Primary navigation

Desktop:

```text
Home
Files
Categories
Ask UnKnot
Finance
Reminders
Settings
```

Mobile:

```text
Home
Files
Ask
Finance
More
```

The exact navigation can evolve with the prototype, but the hierarchy must remain simple.

---

# 12. Dashboard

The dashboard should answer:

> "What do I need to know or act on right now?"

Avoid making it a statistics-heavy analytics dashboard.

Suggested sections:

```text
Good morning / greeting

Important today
↓
Recent documents
↓
Upcoming dates
↓
Financial snapshot
↓
Recently added information
```

AI-generated insights should be clearly distinguishable from raw user data.

---

# 13. File / Document UI

Documents are central to UnKnot.

A file card can show:

```text
Document title
Category
Document date
Uploaded date
Source/type
Important extracted information
Status
```

### Important distinction

Always store and display:

```text
Document date
```

separately from:

```text
Upload timestamp
```

For example:

```text
Medical Bill
Document date: 25 Aug 2026
Uploaded: 31 Aug 2026
```

Duplicate detection must use extracted document information and content similarity/metadata — **not merely the upload timestamp**.

---

# 14. Category Visual Language

UnKnot automatically classifies information.

Example categories:

```text
Medical
Finance
Investments
Bills
Insurance
Warranty
Education
Travel
Shopping
Documents
Subscriptions
Legal
Personal
Other
```

Categories should use the same visual system.

Do not assign a rainbow of unrelated colors to every category.

Instead use:

- Cyprus for active/selected
- Neutral surfaces for normal states
- Semantic colors only for status

---

# 15. Finance UI

Finance must be clear and serious.

Example:

```text
Total finances

Cash
Investments
Bills
Upcoming payments
```

### Investments

Investment records must contain explicit structured information.

Example:

```text
Type:
Mutual Fund

Amount:
₹5,000

Frequency:
Monthly

Date:
25 Aug 2026
```

Do not let AI infer that an investment exists without showing the underlying evidence or asking the user to confirm it.

---

# 16. AI / Ask UnKnot UI

The AI interface should NOT look like a generic ChatGPT clone.

Instead:

```text
User question
      ↓
Relevant information
      ↓
Answer
      ↓
Supporting records
      ↓
Suggested action (if applicable)
```

Example:

```text
"How much did I spend on medicines this month?"

Answer:
₹3,240

Based on:
• Apollo Pharmacy — ₹1,240
• Pharmacy Bill — ₹2,000

View documents →
```

The UI should make it clear **where the answer came from**.

---

# 17. Analysis / Decision UI

When UnKnot provides an analysis or recommendation, show:

```text
Insight
Why this matters
Evidence
Recommended action
```

Example:

```text
⚠ Investment detected

You already have a monthly mutual fund investment
of ₹5,000.

This was considered in your financial overview.

[View investment]
```

Avoid presenting AI suggestions as unquestionable facts.

---

# 18. Upload Flow

The upload experience should be extremely simple.

Primary action:

```text
+ Add
```

Options:

```text
Upload PDF
Upload Image
Take Photo
Add Text
```

After upload:

```text
Uploading
↓
Processing
↓
Extracting information
↓
Classifying
↓
Saved
```

The user should not need to understand OCR, parsing, entity extraction, or AI processing.

Those are implementation details.

---

# 19. Processing States

Use clear status indicators.

```text
Processing...
Extracting information...
Categorizing...
Checking for duplicates...
Ready
```

Do not show technical errors such as:

```text
OCR_EXCEPTION_403
ENTITY_PIPELINE_FAILED
```

Translate technical errors into human-readable messages.

---

# 20. Empty States

Empty states should teach the user what to do next.

Bad:

```text
No data.
```

Better:

```text
Nothing here yet.

Add a bill, receipt, document, or note
and UnKnot will organize it for you.

[Add something]
```

---

# 21. Error States

Errors must be:

- Clear
- Human-readable
- Actionable
- Non-technical

Example:

```text
We couldn't read this document.

Try uploading a clearer image or PDF.

[Try again]
```

---

# 22. Loading States

Prefer skeletons or simple progress indicators.

Avoid:

- Spinning decorative animations
- AI-branded loading screens
- Excessive motion

Loading should feel fast and quiet.

---

# 23. Motion

Animation is functional only.

Allowed:

- Page transitions
- Expand/collapse
- Upload progress
- Toasts
- Modal transitions
- Skeleton loading

Avoid:

- Constant floating elements
- Parallax
- Glowing animations
- Excessive bouncing
- Decorative particle effects

Default transition:

```text
150–250ms
ease-out
```

---

# 24. Icons

Use one consistent icon library.

Recommended:

```text
Lucide
```

Icons should normally be:

```text
16–24px
```

Avoid mixing multiple icon styles.

---

# 25. Buttons

Primary button:

```text
Background: Cyprus
Text: White
```

Secondary button:

```text
Background: transparent / Sand
Border: Cyprus or neutral border
Text: Cyprus / Near Black
```

Danger:

```text
Use semantic danger color only for destructive actions.
```

Buttons should have clear text whenever an icon alone could be ambiguous.

---

# 26. Forms

Inputs should have:

```text
Label
Input
Optional helper text
Validation message
```

Example:

```text
Investment type
[ Mutual Fund              ]

Amount
[ ₹ 5,000                  ]
```

Do not rely only on placeholders as labels.

---

# 27. Privacy / Trust UI

Because UnKnot handles personal documents and financial information, trust must be visible without becoming visually heavy.

Useful indicators:

```text
Your data
Secure storage
Document source
AI-generated insight
Based on your records
```

Do not make unsupported claims such as "100% secure".

---

# 28. Responsive Breakpoints

Use a simple responsive system.

```text
Mobile:
< 640px

Tablet:
640–1024px

Desktop:
> 1024px

Large desktop:
> 1440px
```

The exact CSS breakpoints can follow Tailwind defaults when convenient.

---

# 29. Component Consistency

Build reusable components instead of styling every screen independently.

Core components:

```text
Button
Input
Modal
Toast
Badge
Card
FileCard
CategoryBadge
SearchBar
UploadDropzone
DocumentViewer
InsightCard
EvidenceList
FinanceCard
InvestmentCard
ReminderCard
BottomNavigation
Sidebar
TopBar
EmptyState
ErrorState
LoadingState
```

One component should have one visual language across the application.

---

# 30. Accessibility

Minimum requirements:

- Sufficient text contrast
- Keyboard navigation on web
- Visible focus states
- Alt text for meaningful images
- Labels for form controls
- Touch targets ≥ 44px
- Do not communicate status using color alone

Cyprus + Sand must always maintain readable contrast.

---

# 31. Do Not Do This

Never introduce these just because an AI coding assistant suggests them:

```text
❌ Glassmorphism
❌ Neumorphism
❌ Purple AI gradients
❌ Neon glowing cards
❌ Excessive blur
❌ Huge rounded containers everywhere
❌ Rainbow category colors
❌ Generic ChatGPT clone UI
❌ Excessive dashboard charts
❌ Decorative 3D illustrations
❌ Unnecessary animations
❌ Dark mode with random accent colors
```

---

# 32. Design Principle

The most important rule:

> **UnKnot should make messy personal information feel simple — not make a simple task feel complicated.**

Every screen should answer:

```text
What is important?
What can I do?
Why should I care?
```

The design must remain calm, practical, and consistent across desktop web and mobile PWA.
