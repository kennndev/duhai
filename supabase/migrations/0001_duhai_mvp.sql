create extension if not exists "pgcrypto";

create table if not exists public.users (
  id uuid primary key default gen_random_uuid(),
  auth_user_id uuid null,
  full_name text null,
  email text null,
  phone text null,
  role text not null default 'user' check (role in ('user', 'lawyer', 'admin')),
  bar_enrollment_number text null,
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
      'changes_requested',
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
  decision text not null default 'pending' check (decision in ('pending', 'in_review', 'approved', 'changes_requested', 'rejected')),
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
