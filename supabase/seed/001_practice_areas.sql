insert into public.practice_areas
  (slug, title_en, title_ur, description_en, default_notice_period_days, is_active, requires_manual_review)
values
  ('cheque-bounce', 'Cheque Bounce', 'چیک باؤنس', 'For dishonoured cheque and payment recovery notice.', 15, true, true),
  ('online-fraud', 'Online Shopping Fraud', 'آن لائن فراڈ', 'For online purchase fraud, non-delivery, fake products, and refund disputes.', 15, true, true),
  ('landlord-dispute', 'Landlord / Rent Dispute', 'مالک مکان / کرایہ تنازعہ', 'For rent, possession, deposit, and tenancy disputes.', 30, true, true),
  ('employer-dispute', 'Employer Won''t Pay', 'تنخواہ کا تنازعہ', 'For unpaid salary, dues, and employment payment disputes.', 15, true, true),
  ('defamation', 'Defamation', 'ہتک عزت', 'For false statements harming reputation.', 15, true, true),
  ('custom', 'Something Else', 'کچھ اور', 'Manual review required.', null, true, true)
on conflict (slug) do nothing;

insert into public.notice_templates
  (practice_area_slug, language, title, template_body, required_fields_json, formatting_rules_json, is_active, version)
values
  (
    'cheque-bounce',
    'en',
    'Cheque dishonour payment recovery notice',
    'Legal notice regarding dishonoured cheque {{chequeNumber}} for PKR {{chequeAmount}} issued by {{respondentName}}. Facts and relief must be reviewed by a lawyer before final delivery.',
    '["chequeNumber", "bankName", "chequeAmount", "chequeDate", "dishonourDate", "underlyingTransaction", "desiredRelief"]'::jsonb,
    '{"tone":"formal","deadline_days":15,"paper":"A4"}'::jsonb,
    true,
    1
  )
on conflict do nothing;

insert into public.statutes
  (jurisdiction, title, section, text, summary, category_slugs, is_active)
values
  (
    'Pakistan',
    'Pakistan Penal Code',
    '489-F',
    'Dishonestly issuing a cheque towards repayment of a loan or fulfillment of an obligation which is dishonoured may create criminal liability subject to the statutory requirements and facts.',
    'Cheque dishonour context for lawyer-reviewed notices.',
    array['cheque-bounce'],
    true
  )
on conflict do nothing;
