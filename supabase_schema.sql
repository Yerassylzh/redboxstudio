-- Create the games table
create table public.games (
  id uuid not null default gen_random_uuid (),
  slug text not null,
  created_at timestamp with time zone not null default now(),
  title text not null,
  image_url text null,
  trailer_url text null,
  platforms jsonb null,
  translations jsonb null,
  release_date date null,
  category text null,
  gallery text[] null,
  constraint games_pkey primary key (id),
  constraint games_slug_key unique (slug)
) tablespace pg_default;

-- Enable Row Level Security
alter table public.games enable row level security;

-- Policy: Allow public read access (Select)
create policy "Allow public read access"
on public.games
for select
to public
using (true);

-- Policy: Allow authenticated users (Admins) to Insert/Update/Delete
-- Since registration is disabled, any authenticated user is an Admin.
create policy "Enable insert for authenticated users only"
on public.games
for insert
to authenticated
with check (true);

create policy "Enable update for authenticated users only"
on public.games
for update
to authenticated
using (true)
with check (true);

create policy "Enable delete for authenticated users only"
on public.games
for delete
to authenticated
using (true);

-- Analytics Table
create table public.analytics (
  id uuid not null default gen_random_uuid (),
  created_at timestamp with time zone not null default now(),
  event_type text not null, -- 'page_view', 'click_android', 'click_web'
  game_slug text not null,
  locale text null,
  meta jsonb null
);

-- Analytics Security
alter table public.analytics enable row level security;

-- Allow ANYONE (public) to insert analytics (for tracking anon users)
create policy "Allow public insert"
on public.analytics
for insert
to public
with check (true);

-- Allow ONLY admins to view analytics
create policy "Allow admin select"
on public.analytics
for select
to authenticated
using (true);
