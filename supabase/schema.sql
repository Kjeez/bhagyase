-- WebAlchemy Invites — run this in the Supabase SQL Editor.
-- Safe to re-run, and also upgrades a database made from the first version of this file.

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------- invites
create table if not exists invites (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  edit_token uuid unique not null default gen_random_uuid(),
  template text not null default 'emerald-noir',
  data jsonb not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- null owner = made as a guest (private edit link only); set when made or claimed while logged in
alter table invites add column if not exists owner_id uuid references auth.users(id) on delete set null;
alter table invites add column if not exists status text not null default 'draft'
  check (status in ('draft', 'published'));
alter table invites add column if not exists plan text check (plan in ('classic', 'plus'));
alter table invites add column if not exists published_at timestamptz;
alter table invites add column if not exists expires_at timestamptz;

create index if not exists invites_owner_idx on invites(owner_id, created_at desc);

-- ---------------------------------------------------------------- rsvps
create table if not exists rsvps (
  id uuid primary key default gen_random_uuid(),
  invite_id uuid not null references invites(id) on delete cascade,
  name text not null,
  email text,
  attending text,
  message text,
  created_at timestamptz not null default now()
);

create index if not exists rsvps_invite_idx on rsvps(invite_id, created_at desc);

-- ---------------------------------------------------------------- payments
create table if not exists payments (
  id uuid primary key default gen_random_uuid(),
  invite_id uuid not null references invites(id) on delete cascade,
  plan text not null check (plan in ('classic', 'plus')),
  amount integer not null,                 -- paise
  currency text not null default 'INR',
  razorpay_order_id text unique not null,
  razorpay_payment_id text,
  status text not null default 'created' check (status in ('created', 'paid')),
  created_at timestamptz not null default now(),
  paid_at timestamptz
);

create index if not exists payments_invite_idx on payments(invite_id);

-- ---------------------------------------------------------------- rate limiting
create table if not exists rate_limits (
  key text primary key,
  window_start timestamptz not null default now(),
  hits integer not null default 0
);

-- true while the caller is within p_limit hits per p_window_seconds
create or replace function hit_rate_limit(p_key text, p_limit int, p_window_seconds int)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  v_hits int;
begin
  insert into rate_limits as r (key, window_start, hits)
  values (p_key, now(), 1)
  on conflict (key) do update set
    hits = case when r.window_start < now() - make_interval(secs => p_window_seconds)
                then 1 else r.hits + 1 end,
    window_start = case when r.window_start < now() - make_interval(secs => p_window_seconds)
                then now() else r.window_start end
  returning hits into v_hits;
  return v_hits <= p_limit;
end;
$$;

revoke execute on function hit_rate_limit(text, int, int) from public, anon, authenticated;
grant execute on function hit_rate_limit(text, int, int) to service_role;

-- ---------------------------------------------------------------- lock down
-- Only the service-role key (server-side API routes) can read/write. No anon
-- policies on purpose. Supabase Auth is used for identity only; ownership is
-- checked in the API routes.
alter table invites enable row level security;
alter table rsvps enable row level security;
alter table payments enable row level security;
alter table rate_limits enable row level security;
