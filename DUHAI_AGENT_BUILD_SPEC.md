# DUHAI.md — Agent Build Specification

**Project:** Duhai  
**Product type:** Consumer legal-notice generator for Pakistan  
**Target domain:** `duhai.pk`  
**Status:** MVP build spec  
**Primary goal:** Build the first working version of Duhai with a polished consumer UI, a lawyer-review backend, PDF delivery, and a safe legal-generation workflow.

---

# 1. What Duhai Is

Duhai is a consumer-facing legal notice generator for Pakistan.

A user who has been wronged opens Duhai, answers a short guided wizard, submits facts, and receives a lawyer-reviewed legal notice as a PDF.

The product must be simple for the public and professional for lawyers.

Duhai is not a lawyer marketplace.  
Duhai is not a legal advice chatbot.  
Duhai does not file court cases.  
Duhai prepares legal notices from user-submitted facts and routes them through lawyer review before final delivery.

## One-liner

> Tell us what happened. Get a lawyer-reviewed legal notice for Pakistan.

## Core MVP promise

> A user submits a dispute through a 4-step wizard. Duhai generates a draft notice using approved templates and legal context. A lawyer reviews it. The final PDF is emailed to the user.

---

# 2. Strategic Product Principle

Duhai must sit between the existing legal workflow, not replace lawyers.

The system should automate:

- Intake
- Fact structuring
- Template-based drafting
- Legal context retrieval
- Draft preparation
- Review queue
- PDF generation
- Delivery
- Follow-up

The lawyer remains responsible for final review.

The user must always understand:

- They are submitting facts.
- The notice is based on those facts.
- A lawyer reviews Pro/MVP notices before final delivery.
- Court filing and legal representation are not included unless separately offered later.

---

# 3. First MVP Scope

Build only this first:

1. Public landing page
2. Practice area/category pages
3. 4-step notice wizard
4. Magic-link user receipt/status page
5. Notice submission backend
6. AI draft generation backend
7. Lawyer review dashboard
8. PDF generation
9. Email delivery
10. Admin/reviewer audit trail
11. Basic analytics events
12. Clean mobile-first UI

## First practice area to implement

Start with:

```txt
cheque-bounce
```

Then add others after the first end-to-end flow works.

## MVP practice areas

Keep these in the database, not hard-coded:

| Slug | User-facing title | Internal note |
|---|---|---|
| `cheque-bounce` | Cheque Bounce | Section 489-F PPC context, lawyer-reviewed template |
| `online-fraud` | Online Shopping Fraud | Consumer/fraud context, province-aware |
| `landlord-dispute` | Landlord / Rent Dispute | Province/territory-aware |
| `employer-dispute` | Employer Won’t Pay | Employment/wage context |
| `defamation` | Defamation | PECA/PPC/defamation context, lawyer-reviewed |
| `custom` | Something Else | Always manual review |

---

# 4. Out of Scope for MVP

Do not build these yet:

- Full chamber management system
- Court diary
- Lawyer marketplace
- Court filing
- Client-lawyer chat
- WhatsApp bot
- SMS gateway
- Full payment automation if manual payment is easier for MVP
- Family law divorce/custody
- Criminal defense beyond cheque-bounce notice use case
- AI legal advice chat
- User password accounts
- Multiple firm onboarding
- Complex accounting
- Full document vault
- Court scraping
- App mobile version

---

# 5. Target Users

## Primary users

Ordinary Pakistanis aged 22–45, smartphone-first, urban/semi-urban, dealing with common disputes:

- Bounced cheque
- Online shopping fraud
- Landlord refusing deposit
- Employer withholding salary
- Freelancer/client non-payment
- Defamation or online harassment
- Small business payment dispute

## MVP user mindset

They are stressed, angry, and unsure what to do.

The UI must feel:

- Calm
- Serious
- Trustworthy
- Simple
- Fast
- Local to Pakistan
- Not like a gimmicky AI tool

---

# 6. Brand and UI Direction

## Brand feel

Duhai should feel like:

> Newspaper meets legal office meets modern fintech checkout.

Avoid:

- AI sparkle visuals
- Toy-like gradients
- Cartoon law icons
- Overly playful language
- Cheap template-site feeling
- Generic SaaS dashboard look

Use:

- Ivory/off-white backgrounds
- Deep green / black / oxblood accents
- Serif headings
- Clean sans-serif body text
- Strong spacing
- High readability
- Professional cards
- Mobile-first forms
- Legal-paper inspired PDF previews
- Trust badges
- Clear progress indicators

## Suggested design tokens

```txt
ivory: #F8F4EA
paper: #FFFDF7
ink: #111111
mutedInk: #555555
forest: #12372A
oxblood: #5A1A1A
gold: #B08D57
border: #DED6C8
danger: #B42318
success: #166534
warning: #B45309
```

## Typography

Recommended:

- Headings: serif font such as Playfair Display, Libre Baskerville, or Georgia fallback
- Body: Inter, system sans-serif
- Legal/PDF preview: Georgia or Times-style serif

## UI quality bar

The UI must look production-ready from day one.

Every screen should include:

- Loading states
- Empty states
- Error states
- Mobile layout
- Accessible labels
- Clear primary action
- No clutter
- No unnecessary animation

---

# 7. App Structure

Use a monorepo-ready layout. If starting with one app, still keep structure clean.

```txt
/apps
  /duhai-web
    /app
      /(marketing)
        /page.tsx
        /how-it-works/page.tsx
        /faq/page.tsx
        /pricing/page.tsx
        /category/[slug]/page.tsx
      /(wizard)
        /start/page.tsx
        /wizard/[sessionId]/page.tsx
      /(user)
        /notice/[referenceNumber]/page.tsx
      /(lawyer)
        /reviews/page.tsx
        /reviews/[reviewId]/page.tsx
      /api
        /webhooks
        /pdf
    /components
      /ui
      /marketing
      /wizard
      /lawyer
      /pdf
    /lib
      /ai
      /db
      /legal
      /pdf
      /email
      /wizard
      /security
      /utils

/packages
  /legal-core
  /notice-generator
  /pdf
  /email
  /security
  /ui

/supabase
  /migrations
  /seed
```

If the repo is not monorepo yet, place shared package logic under `/lib` first, but keep boundaries clear.

---

# 8. Recommended Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 15 App Router |
| Language | TypeScript strict mode |
| Styling | Tailwind CSS |
| UI primitives | Custom components or shadcn/ui if already installed |
| Database | Supabase Postgres |
| Storage | Supabase Storage |
| Auth | Supabase magic-link only |
| AI | Anthropic via central server-only client |
| PDF | `@react-pdf/renderer` server-side |
| Email | Resend |
| Payments | Manual JazzCash/Easypaisa first, Safepay later |
| Validation | Zod |
| Analytics | PostHog or simple event table first |
| Error tracking | Sentry later if not already configured |
| Tests | Vitest + Playwright |

Do not add unnecessary dependencies.

Do not add Redux, Prisma, tRPC, Zustand, or styled-components unless explicitly approved.

---

# 9. Pages to Build

## 9.1 Landing Page `/`

Goal: Convert visitors into wizard starts.

Sections:

1. Hero
2. Category cards
3. How it works
4. Lawyer-reviewed trust section
5. Pricing/free launch section
6. Common use cases
7. FAQ
8. Final CTA

Hero copy direction:

```txt
A legal notice for Pakistan, without waiting a week.

Tell us what happened in a few minutes. Duhai prepares a structured legal notice and routes it for lawyer review before delivery.
```

Primary CTA:

```txt
Start your notice
```

Secondary CTA:

```txt
See how it works
```

Trust indicators:

- Lawyer-reviewed before final delivery
- Built for Pakistani disputes
- Clear pricing
- Private submission
- PDF delivered by email

Do not overpromise “guaranteed result.”

## 9.2 How It Works `/how-it-works`

Explain:

1. Choose your issue
2. Answer guided questions
3. Confirm truth declaration
4. Draft generated
5. Lawyer reviews
6. PDF delivered
7. Optional next steps later

## 9.3 Category Page `/category/[slug]`

Each category page should be SEO-friendly and explain:

- What this notice is for
- What documents/information user needs
- Expected process
- What Duhai can and cannot do
- CTA to start wizard

## 9.4 Wizard Start `/start`

Shows categories:

- Cheque Bounce
- Online Shopping Fraud
- Landlord Dispute
- Employer Won’t Pay
- Defamation
- Something Else

## 9.5 Wizard `/wizard/[sessionId]`

4 steps:

1. Category + location/language
2. Your details + respondent details
3. Incident details
4. Review + truth declaration

## 9.6 Notice Status `/notice/[referenceNumber]`

Magic-link protected.

Shows:

- Reference number
- Status
- Submitted date
- Category
- Current stage
- Expected next step
- Final PDF download when ready
- Support contact

Statuses:

```txt
submitted
draft_generating
draft_ready
lawyer_review_pending
lawyer_review_in_progress
changes_requested
approved
pdf_generated
sent
rejected_out_of_scope
needs_more_information
```

## 9.7 Lawyer Reviews `/reviews`

Lawyer-only.

Shows review queue.

Columns:

- Reference number
- Category
- Submitted at
- Language
- Status
- Assigned lawyer
- SLA indicator
- Action

## 9.8 Lawyer Review Detail `/reviews/[reviewId]`

Shows:

- User facts
- Structured facts
- Evidence files
- AI draft
- Retrieved statutes/citations
- Template used
- Prompt version
- Review notes
- Edit draft editor
- Approve / request info / reject buttons
- PDF preview after approval

---

# 10. Wizard UX

## Wizard principles

- Mobile-first
- One clear question per section
- Save progress
- No legal jargon where avoidable
- Explain why sensitive info is needed
- Avoid long forms on one screen
- Use progress indicator
- Show reassurance: “A lawyer will review before final PDF.”

## Step 1 — Category + Location

Fields:

- practice area
- province
- city
- language: English / Urdu

Important: province matters because some legal context varies by province.

## Step 2 — Parties

Fields:

- claimant name
- claimant phone
- claimant email
- claimant address
- respondent name
- respondent type
- respondent address
- respondent phone/email if available

## Step 3 — Incident Details

Category-specific.

### Cheque Bounce fields

- cheque number
- bank name
- cheque amount
- cheque date
- dishonour date
- reason for dishonour if available
- underlying transaction
- what user wants
- evidence files

### Online Fraud fields

- platform
- seller/page name
- amount paid
- payment method
- order date
- delivery/refund status
- screenshots/evidence
- what user wants

### Landlord Dispute fields

- property address
- tenancy start date
- security deposit amount
- monthly rent
- dispute type
- agreement available
- what user wants

### Employer Dispute fields

- employer name
- job title
- employment period
- salary
- unpaid amount/months
- termination/resignation status
- proof available
- what user wants

### Defamation fields

- statement made
- where it was made
- date
- audience/platform
- proof available
- harm caused
- what user wants

## Step 4 — Review + Declaration

Show summary.

Required checkbox:

```txt
I confirm that the information I provided is true to the best of my knowledge. I understand that Duhai prepares a legal notice based on my submitted facts and that false information may harm my claim and create legal consequences for me.
```

Submit button:

```txt
Submit for lawyer review
```

---

# 11. Database Schema

Create migration:

```txt
/supabase/migrations/0001_duhai_mvp.sql
```

## Required tables

1. users
2. wizard_sessions
3. practice_areas
4. notices
5. notice_drafts
6. notice_templates
7. statutes
8. case_citations
9. lawyer_reviews
10. deliveries
11. orders
12. payments
13. evidence_files
14. audit_log
15. analytics_events

## SQL schema

```sql
create extension if not exists "pgcrypto";

create table if not exists public.users (
  id uuid primary key default gen_random_uuid(),
  auth_user_id uuid null,
  full_name text null,
  email text null,
  phone text null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.practice_areas (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title_en text not null,
  title_ur text null,
  description_en text null,
  description_ur text null,
  default_notice_period_days int null,
  is_active boolean not null default true,
  requires_manual_review boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.wizard_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid null references public.users(id) on delete set null,
  session_token text not null unique,
  practice_area_slug text null references public.practice_areas(slug),
  current_step int not null default 1,
  source text null,
  utm_source text null,
  utm_medium text null,
  utm_campaign text null,
  status text not null default 'started' check (status in ('started', 'completed', 'abandoned')),
  started_at timestamptz not null default now(),
  completed_at timestamptz null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.notices (
  id uuid primary key default gen_random_uuid(),
  reference_number text not null unique,
  user_id uuid null references public.users(id) on delete set null,
  wizard_session_id uuid null references public.wizard_sessions(id) on delete set null,
  practice_area_slug text not null references public.practice_areas(slug),

  language text not null default 'en' check (language in ('en', 'ur')),
  province text null,
  city text null,

  claimant_name text not null,
  claimant_phone text null,
  claimant_email text not null,
  claimant_address text null,

  respondent_name text not null,
  respondent_type text null,
  respondent_address text null,
  respondent_contact text null,

  facts_narrative text not null,
  structured_facts_json jsonb not null default '{}'::jsonb,
  desired_relief text null,

  declaration_accepted boolean not null default false,

  status text not null default 'submitted' check (
    status in (
      'submitted',
      'draft_generating',
      'draft_ready',
      'lawyer_review_pending',
      'lawyer_review_in_progress',
      'needs_more_information',
      'approved',
      'pdf_generated',
      'sent',
      'rejected_out_of_scope',
      'cancelled'
    )
  ),

  submitted_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.notice_templates (
  id uuid primary key default gen_random_uuid(),
  practice_area_slug text not null references public.practice_areas(slug),
  language text not null default 'en',
  province text null,
  title text not null,
  template_body text not null,
  required_fields_json jsonb not null default '[]'::jsonb,
  formatting_rules_json jsonb not null default '{}'::jsonb,
  is_active boolean not null default true,
  lawyer_approved_by uuid null references public.users(id) on delete set null,
  approved_at timestamptz null,
  version int not null default 1,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.statutes (
  id uuid primary key default gen_random_uuid(),
  jurisdiction text not null default 'Pakistan',
  province text null,
  title text not null,
  section text null,
  text text not null,
  summary text null,
  category_slugs text[] not null default '{}',
  is_active boolean not null default true,
  verified_by uuid null references public.users(id) on delete set null,
  verified_at timestamptz null,
  created_at timestamptz not null default now()
);

create table if not exists public.case_citations (
  id uuid primary key default gen_random_uuid(),
  citation text not null,
  case_title text not null,
  court text null,
  year int null,
  legal_principle text not null,
  category_slugs text[] not null default '{}',
  is_verified boolean not null default false,
  verified_by uuid null references public.users(id) on delete set null,
  verified_at timestamptz null,
  created_at timestamptz not null default now()
);

create table if not exists public.notice_drafts (
  id uuid primary key default gen_random_uuid(),
  notice_id uuid not null references public.notices(id) on delete cascade,
  version int not null,
  source text not null check (source in ('ai', 'lawyer', 'user', 'system')),
  prompt_version text null,
  model_name text null,
  retrieved_context_json jsonb not null default '{}'::jsonb,
  content text not null,
  tokens_input int null,
  tokens_output int null,
  generation_cost_pkr numeric null,
  pdf_url text null,
  status text not null default 'draft' check (status in ('draft', 'submitted_for_review', 'approved', 'rejected', 'superseded')),
  created_by uuid null references public.users(id) on delete set null,
  created_at timestamptz not null default now(),
  unique (notice_id, version)
);

create table if not exists public.evidence_files (
  id uuid primary key default gen_random_uuid(),
  notice_id uuid not null references public.notices(id) on delete cascade,
  uploaded_by uuid null references public.users(id) on delete set null,
  file_name text not null,
  file_path text not null,
  mime_type text null,
  size_bytes bigint null,
  evidence_type text null,
  created_at timestamptz not null default now()
);

create table if not exists public.lawyer_reviews (
  id uuid primary key default gen_random_uuid(),
  notice_id uuid not null references public.notices(id) on delete cascade,
  draft_id uuid null references public.notice_drafts(id) on delete set null,
  assigned_lawyer_id uuid null references public.users(id) on delete set null,
  decision text not null default 'pending' check (
    decision in ('pending', 'in_review', 'approved', 'changes_requested', 'rejected')
  ),
  review_notes text null,
  reviewed_at timestamptz null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.deliveries (
  id uuid primary key default gen_random_uuid(),
  notice_id uuid not null references public.notices(id) on delete cascade,
  delivery_type text not null check (delivery_type in ('email', 'registered_post', 'manual')),
  recipient_email text null,
  pdf_url text null,
  tracking_number text null,
  status text not null default 'pending' check (status in ('pending', 'sent', 'failed', 'delivered')),
  sent_at timestamptz null,
  created_at timestamptz not null default now()
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid null references public.users(id) on delete set null,
  notice_id uuid null references public.notices(id) on delete set null,
  plan text not null default 'free',
  amount_pkr numeric not null default 0,
  status text not null default 'created' check (status in ('created', 'pending_payment', 'paid', 'failed', 'refunded', 'free')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.payments (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  provider text not null,
  provider_reference text null,
  amount_pkr numeric not null,
  status text not null default 'pending' check (status in ('pending', 'paid', 'failed', 'refunded')),
  paid_at timestamptz null,
  raw_payload_json jsonb null,
  created_at timestamptz not null default now()
);

create table if not exists public.audit_log (
  id uuid primary key default gen_random_uuid(),
  actor_user_id uuid null references public.users(id) on delete set null,
  action text not null,
  entity_type text not null,
  entity_id uuid not null,
  metadata_json jsonb null,
  ip_hash text null,
  user_agent_hash text null,
  created_at timestamptz not null default now()
);

create table if not exists public.analytics_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid null references public.users(id) on delete set null,
  session_id uuid null references public.wizard_sessions(id) on delete set null,
  event_name text not null,
  properties_json jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists idx_notices_reference_number on public.notices(reference_number);
create index if not exists idx_notices_status on public.notices(status);
create index if not exists idx_notices_user on public.notices(user_id);
create index if not exists idx_reviews_lawyer_status on public.lawyer_reviews(assigned_lawyer_id, decision);
create index if not exists idx_drafts_notice_version on public.notice_drafts(notice_id, version);
create index if not exists idx_evidence_notice on public.evidence_files(notice_id);

alter table public.users enable row level security;
alter table public.practice_areas enable row level security;
alter table public.wizard_sessions enable row level security;
alter table public.notices enable row level security;
alter table public.notice_templates enable row level security;
alter table public.statutes enable row level security;
alter table public.case_citations enable row level security;
alter table public.notice_drafts enable row level security;
alter table public.evidence_files enable row level security;
alter table public.lawyer_reviews enable row level security;
alter table public.deliveries enable row level security;
alter table public.orders enable row level security;
alter table public.payments enable row level security;
alter table public.audit_log enable row level security;
alter table public.analytics_events enable row level security;
```

---

# 12. Seed Data

Create:

```txt
/supabase/seed/001_practice_areas.sql
```

```sql
insert into public.practice_areas
  (slug, title_en, title_ur, description_en, default_notice_period_days, is_active, requires_manual_review)
values
  ('cheque-bounce', 'Cheque Bounce', 'چیک باؤنس', 'For dishonoured cheque and payment recovery notice.', 15, true, true),
  ('online-fraud', 'Online Shopping Fraud', 'آن لائن فراڈ', 'For online purchase fraud, non-delivery, fake products, and refund disputes.', 15, true, true),
  ('landlord-dispute', 'Landlord / Rent Dispute', 'مالک مکان / کرایہ تنازعہ', 'For rent, possession, deposit, and tenancy disputes.', 30, true, true),
  ('employer-dispute', 'Employer Won’t Pay', 'تنخواہ کا تنازعہ', 'For unpaid salary, dues, and employment payment disputes.', 15, true, true),
  ('defamation', 'Defamation', 'ہتک عزت', 'For false statements harming reputation.', 15, true, true),
  ('custom', 'Something Else', 'کچھ اور', 'Manual review required.', null, true, true)
on conflict (slug) do nothing;
```

---

# 13. Legal Generation Rules

## Hard rules

1. Never invent citations.
2. Never invent statutes.
3. Never invent facts.
4. Never generate final PDF without lawyer approval.
5. Never send final notice before user declaration is accepted.
6. Never include unverified case law.
7. Never mutate submitted facts.
8. Never log PII.

## Prompt rule

Every prompt must include:

```txt
Use only the legal references, templates, and facts provided below.
Do not invent statutes, sections, case names, citations, court names, facts, dates, addresses, or payment amounts.
If the supplied legal context is insufficient, mark the draft as requiring manual lawyer drafting.
```

## Draft output format

AI should return structured JSON:

```json
{
  "title": "",
  "subject": "",
  "notice_body": "",
  "relief_demanded": "",
  "deadline_days": 15,
  "legal_references_used": [],
  "missing_information": [],
  "manual_review_flags": []
}
```

Validate this with Zod before saving.

---

# 14. AI Implementation

## Files

```txt
/lib/ai/client.ts
/lib/ai/prompts/generate-notice.ts
/lib/ai/retrieve-legal-context.ts
/lib/ai/generate-notice-draft.ts
/lib/ai/parse-notice-output.ts
```

## `client.ts`

- Server-only
- Reads env vars
- Exports one function to call Anthropic
- No direct model calls elsewhere

## Env vars

```env
ANTHROPIC_API_KEY=
ANTHROPIC_PRIMARY_MODEL=
ANTHROPIC_FALLBACK_MODEL=
```

Do not hard-code model names.

## Retrieval

Retrieve:

- active template matching practice area + language + province if available
- statute sections matching category
- verified citations matching category
- formatting rules

If no template exists, route to manual review.

---

# 15. Lawyer Review Rules

Every notice must go through lawyer review in MVP.

## Review statuses

```txt
pending
in_review
approved
changes_requested
rejected
```

## Lawyer actions

- Start review
- Edit draft
- Approve
- Request more information
- Reject as out of scope
- Generate final PDF

## Approval requirements

Before approval:

- Draft has no unresolved placeholders
- Notice facts are visible
- Legal references used are from DB
- Reviewer identity exists
- User declaration accepted
- PDF preview looks correct

---

# 16. PDF Requirements

PDF must look like a real legal notice.

Include:

- Chamber/lawyer header
- Date
- Recipient/respondent details
- Subject
- Body
- Demand/relief
- Deadline
- Signature block
- Reviewing lawyer name
- Bar/enrollment number if available
- Page numbers
- Reference number

## PDF visual style

- A4
- Clean margins
- Serif text
- Strong subject line
- Legal-office look
- No colorful UI styling
- Print-ready

## PDF file

Store in Supabase Storage.

Bucket:

```txt
duhai-notices
```

Path:

```txt
notices/{noticeId}/final-v{version}.pdf
```

Bucket must be private.

---

# 17. Email Requirements

Use Resend.

Emails:

1. Submission received
2. More information needed
3. Final PDF ready
4. Follow-up after notice period
5. Rejected/out-of-scope

## Final PDF email

Subject:

```txt
Your Duhai legal notice is ready — {referenceNumber}
```

Body:

```txt
Your lawyer-reviewed legal notice is ready.

Reference: {referenceNumber}
Category: {category}
Download: {signedUrl}

This link expires for your privacy.
```

---

# 18. Security Requirements

## PII

Sensitive:

- CNIC if collected later
- Phone
- Address
- Facts narrative
- Respondent details
- Evidence files
- Payment proof

Do not log sensitive fields.

## RLS

Enable RLS on all tables.

For MVP server actions may use service role only in server-only functions, but user-facing reads must be scoped.

## Storage

All evidence and PDF buckets private.

Use signed URLs.

## Audit log actions

Log:

```txt
wizard.started
notice.submitted
draft.generated
review.started
review.approved
review.rejected
pdf.generated
email.sent
payment.created
payment.confirmed
evidence.uploaded
```

Never put full facts or PII in audit metadata.

---

# 19. Required Server Actions

Create these:

```txt
startWizardSession()
saveWizardStep()
submitNotice()
generateNoticeDraft()
assignLawyerReview()
startLawyerReview()
approveNoticeDraft()
requestMoreInformation()
rejectNotice()
generateFinalPdf()
sendFinalNoticeEmail()
getNoticeStatus()
```

All server actions must validate input with Zod.

---

# 20. Validation Schemas

Create:

```txt
/lib/wizard/schema.ts
```

Schemas:

- StartWizardSchema
- PartiesStepSchema
- ChequeBounceDetailsSchema
- OnlineFraudDetailsSchema
- LandlordDisputeDetailsSchema
- EmployerDisputeDetailsSchema
- DefamationDetailsSchema
- DeclarationSchema
- SubmitNoticeSchema

---

# 21. UI Components

## Shared UI

```txt
Button
Input
Textarea
Select
RadioCard
Checkbox
ProgressSteps
TrustBadge
StatusBadge
LegalPaperPreview
FileUploader
ErrorBox
InfoBox
```

## Marketing

```txt
HeroSection
CategoryCards
HowItWorks
TrustSection
PricingSection
FAQSection
FinalCTA
```

## Wizard

```txt
WizardShell
WizardProgress
CategoryStep
PartiesStep
IncidentDetailsStep
ReviewDeclarationStep
EvidenceUploader
SaveContinueBar
```

## Lawyer

```txt
ReviewQueueTable
ReviewStatusBadge
NoticeFactsPanel
LegalContextPanel
DraftEditor
ReviewActionBar
PdfPreviewPanel
```

---

# 22. Best UI Details

## Landing page

- Big confident headline
- One primary CTA above fold
- Category cards with plain-language problems
- Trust strip under hero
- “Lawyer reviewed before delivery” section
- No fake testimonials until real ones exist
- Show first-100-free launch offer if active

## Wizard

- Use cards, not dense forms
- Show progress: Step 1 of 4
- Keep inputs large for mobile
- Use helper text
- Autosave each step
- Show “Why we need this” for address/respondent fields
- Upload evidence optional but encouraged
- Final review summary must be easy to scan

## Lawyer dashboard

- Dense but clean
- No consumer fluff
- Fast approve/edit flow
- Split screen: facts left, draft right
- Legal context collapsible
- Strong warning if citation is not verified
- Approve button disabled until checks pass

---

# 23. Analytics Events

Track:

```txt
landing_viewed
wizard_started
category_selected
wizard_step_completed
notice_submitted
draft_generated
review_started
review_approved
pdf_generated
email_sent
followup_clicked
testimonial_submitted
```

Do not store PII in analytics properties.

---

# 24. MVP Build Order

## Phase 1 — Foundation

1. Create Next.js app structure
2. Add Tailwind theme
3. Add Supabase admin/server/browser clients
4. Add migration
5. Add seed data
6. Add basic UI components

## Phase 2 — Public UI

1. Landing page
2. How it works page
3. Category cards
4. Wizard start page

## Phase 3 — Wizard

1. Wizard session creation
2. 4-step wizard shell
3. Cheque bounce fields
4. Evidence upload
5. Declaration step
6. Submit notice

## Phase 4 — Draft Generation

1. Legal context retrieval
2. Prompt builder
3. AI draft generation
4. JSON parser
5. Save `notice_drafts`
6. Create `lawyer_reviews` row

## Phase 5 — Lawyer Review

1. Review queue
2. Review detail page
3. Draft editor
4. Approve/reject/request info
5. Audit logs

## Phase 6 — PDF + Email

1. PDF template
2. Generate PDF after approval
3. Store in private bucket
4. Send email with signed URL
5. Status page shows PDF ready

## Phase 7 — Polish

1. Loading/error states
2. Mobile polish
3. Empty states
4. Analytics
5. End-to-end test
6. Security review

---

# 25. First MVP Definition of Done

The MVP is done when:

1. User opens landing page.
2. User starts cheque-bounce wizard.
3. User submits claimant/respondent/facts.
4. User accepts declaration.
5. Notice gets a reference number.
6. Draft is generated from approved template/legal context.
7. Draft enters lawyer review queue.
8. Lawyer can edit and approve.
9. Final PDF is generated.
10. PDF is emailed to user.
11. User can view status page.
12. Audit log records workflow.
13. No final notice is sent without lawyer approval.
14. No fake citation can appear.
15. UI works smoothly on mobile.

---

# 26. Things That Are Wrong

Do not do these:

- Build a chat-first product
- Build lawyer marketplace first
- Add all categories before cheque-bounce works
- Skip lawyer review
- Make the UI look like a generic AI app
- Put legal logic inside React components
- Store PDFs in Postgres
- Make storage public
- Log user facts
- Hard-code legal citations in prompts
- Let AI invent laws
- Use passwords for users
- Add a complex dashboard for consumers
- Overpromise guaranteed legal outcome

---

# 27. Final Instruction to Coding Agent

Build Duhai as a premium, serious, consumer-first legal notice product for Pakistan.

Start narrow.

The first successful workflow is:

```txt
User submits cheque-bounce dispute
        ↓
System generates structured draft
        ↓
Lawyer reviews and approves
        ↓
PDF is generated
        ↓
User receives final notice by email
```

The UI should feel trustworthy enough that a Pakistani user is comfortable entering sensitive dispute facts.

The lawyer review interface should feel efficient enough that a real lawyer can process notices quickly.

Do not build extra features until this end-to-end flow works.
