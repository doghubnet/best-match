create extension if not exists pgcrypto;

create table if not exists profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid,
  email text not null,
  full_name text,
  target_country text,
  target_program text,
  sponsor_details text,
  created_at timestamptz not null default now()
);

create table if not exists program_match_scans (
  id uuid primary key default gen_random_uuid(),
  user_id uuid,
  target_country text,
  institution text,
  intended_program text,
  score int,
  result jsonb,
  created_at timestamptz not null default now()
);

create table if not exists document_scans (
  id uuid primary key default gen_random_uuid(),
  user_id uuid,
  category text,
  file_name text,
  result jsonb,
  created_at timestamptz not null default now()
);

create table if not exists bank_statement_scans (
  id uuid primary key default gen_random_uuid(),
  user_id uuid,
  target_country text,
  funding_gap numeric,
  result jsonb,
  created_at timestamptz not null default now()
);

create table if not exists interview_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid,
  question text,
  answer text,
  score int,
  feedback jsonb,
  created_at timestamptz not null default now()
);

create table if not exists final_reports (
  id uuid primary key default gen_random_uuid(),
  user_id uuid,
  score int,
  report jsonb,
  created_at timestamptz not null default now()
);

create table if not exists bug_reports (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  feature text,
  severity text,
  screenshot text,
  description text not null,
  created_at timestamptz not null default now()
);

alter table profiles enable row level security;
alter table program_match_scans enable row level security;
alter table document_scans enable row level security;
alter table bank_statement_scans enable row level security;
alter table interview_sessions enable row level security;
alter table final_reports enable row level security;
alter table bug_reports enable row level security;

do $$ begin
  create policy "Users manage own profiles" on profiles for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
exception when duplicate_object then null; end $$;
do $$ begin
  create policy "Users manage own scans" on program_match_scans for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
exception when duplicate_object then null; end $$;
do $$ begin
  create policy "Users manage own document scans" on document_scans for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
exception when duplicate_object then null; end $$;
do $$ begin
  create policy "Users manage own bank scans" on bank_statement_scans for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
exception when duplicate_object then null; end $$;
do $$ begin
  create policy "Users manage own interview sessions" on interview_sessions for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
exception when duplicate_object then null; end $$;
do $$ begin
  create policy "Users manage own final reports" on final_reports for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
exception when duplicate_object then null; end $$;
do $$ begin
  create policy "Anyone can submit bug reports" on bug_reports for insert with check (true);
exception when duplicate_object then null; end $$;
