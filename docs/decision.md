# UnKnot — Decision & AI Logic

## 1. Purpose

UnKnot is a decision-support system, not an autonomous decision maker.

The system should use the user's stored information to help them understand situations and make better decisions.

---

## 2. Decision Pipeline

```text
User Question
      ↓
Intent Detection
      ↓
Relevant Domain
      ↓
Context Retrieval
      ↓
Conflict / Missing Data Check
      ↓
Fireworks AI Analysis
      ↓
Evidence + Reasoning
      ↓
Answer / Recommendation
```

---

## 3. Intent Types

Initial intents:

```text
SEARCH
EXPLAIN
COMPARE
REMIND
ANALYZE
RECOMMEND
SUMMARIZE
TRACK
```

Example:

```text
"What was the warranty period?"
→ SEARCH / EXPLAIN

"Should I repair or replace it?"
→ COMPARE / RECOMMEND

"How much did I spend on this?"
→ ANALYZE

"Remind me before the warranty expires."
→ REMIND
```

---

## 4. Context Retrieval

The Context Engine should retrieve only information relevant to the request.

Example:

```text
Question:
"How much have I spent on my phone?"

Relevant:
- Phone purchase
- Phone repairs
- Phone accessories if clearly linked

Irrelevant:
- Medical documents
- Unrelated investments
- Other purchases
```

This reduces noise, cost and incorrect reasoning.

---

## 5. Missing Information

If required information is missing, UnKnot should say so.

Bad:

> "You should replace your laptop."

Better:

> "Based on the information I have, the repair cost is ₹18,000, but I don't have the laptop's current market value. I can give a more reliable comparison if you add it."

The system must not invent missing facts.

---

## 6. Conflicting Information

If two records conflict:

```text
Warranty document:
Expiry = 12-Aug-2027

User text:
Warranty expires = 12-Aug-2026
```

The system should flag the conflict rather than silently choosing one.

Example:

> "I found two different warranty expiry dates. Please verify which document is current."

---

## 7. Financial Reasoning

Financial data must distinguish:

```text
Existing investment
vs
Recommended investment
```

Example:

User has:

```text
Mutual Fund A
Monthly investment: ₹5,000
```

The AI must not respond:

> "You should start investing in mutual funds."

Instead:

> "You already invest ₹5,000/month in Mutual Fund A. If you're considering increasing your investment, here are the factors to review..."

---

## 8. Recommendation Structure

Where practical, AI responses should follow:

```text
Answer
Why
Evidence
Unknowns
Suggested next step
```

Example:

```text
Recommendation:
Repairing appears reasonable.

Why:
- Device age: 2.5 years
- Repair estimate: ₹18,000
- Warranty: expired
- Previous repair cost: ₹8,000

Unknown:
Current replacement price.

Next step:
Compare the ₹18,000 repair with the price of an equivalent new laptop.
```

---

## 9. High-Stakes Domains

Medical and financial information requires extra caution.

The system should:
- Present information clearly.
- Avoid pretending to be a doctor/financial advisor.
- Identify uncertainty.
- Encourage professional advice where appropriate.
- Never fabricate medical/financial facts.

---

## 10. Reminder Logic

Reminders should be generated from explicit dates/events.

Examples:
- Warranty expiry
- Subscription renewal
- Bill due date
- Document expiry

A reminder should have:

```text
Event
Date
Reason
Source record
Reminder status
```

Do not create reminders solely from vague AI guesses.

---

## 11. Human Confirmation

Actions that modify important user data should generally require confirmation.

Examples:

```text
Delete document       → Confirm
Merge duplicates      → Confirm
Change investment     → Confirm
Create reminder       → Confirm when ambiguous
```

AI can suggest; the user remains in control.
