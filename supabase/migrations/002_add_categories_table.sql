-- Categories table for project categories
create table if not exists categories (
  id uuid primary key default uuid_generate_v4(),
  name text unique not null,
  created_at timestamptz not null default now()
);

-- Insert default categories
insert into categories (name) values 
  ('Web'),
  ('Mobile'),
  ('Desktop'),
  ('AI'),
  ('Game')
on conflict (name) do nothing;

-- Enable RLS
alter table categories enable row level security;

-- Public read policy
create policy "Public read access on categories" on categories for select using (true);

-- Admin full access
create policy "Admin full access on categories" on categories for all using (true);