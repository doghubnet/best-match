create table if not exists profiles (
  id uuid primary key,
  email text not null,
  role text not null default 'user',
  created_at timestamptz not null default now()
);

create table if not exists scans (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  scan_type text not null,
  input_text text,
  score int,
  output jsonb,
  created_at timestamptz not null default now()
);
