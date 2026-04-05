-- Portfolio Database Schema for Supabase
-- Run this in Supabase SQL Editor

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Users table
create table if not exists users (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  email text unique not null,
  password text not null,
  role text not null default 'ADMIN',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Projects table
create table if not exists projects (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  slug text unique not null,
  description text not null,
  content text not null,
  thumbnail text,
  tech_stack text[] not null default '{}',
  demo_url text,
  github_url text,
  category text not null,
  visibility text not null default 'public',
  views int not null default 0,
  likes int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Skills table
create table if not exists skills (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  level int not null,
  category text not null default 'Frontend',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Messages table
create table if not exists messages (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  email text not null,
  message text not null,
  is_read boolean not null default false,
  created_at timestamptz not null default now()
);

-- Blogs table
create table if not exists blogs (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  slug text unique not null,
  content text not null,
  cover_image text,
  views int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Update timestamp trigger
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger update_users_updated_at before update on users
  for each row execute function update_updated_at_column();

create trigger update_projects_updated_at before update on projects
  for each row execute function update_updated_at_column();

create trigger update_skills_updated_at before update on skills
  for each row execute function update_updated_at_column();

create trigger update_blogs_updated_at before update on blogs
  for each row execute function update_updated_at_column();

-- RPC functions for incrementing counters
create or replace function increment_project_views(project_slug text)
returns void as $$
begin
  update projects set views = views + 1 where slug = project_slug;
end;
$$ language plpgsql security definer;

create or replace function increment_project_likes(project_id uuid)
returns json as $$
declare
  result json;
begin
  update projects set likes = likes + 1 where id = project_id
  returning row_to_json(projects) into result;
  return result;
end;
$$ language plpgsql security definer;

create or replace function increment_blog_views(blog_slug text)
returns void as $$
begin
  update blogs set views = views + 1 where slug = blog_slug;
end;
$$ language plpgsql security definer;

-- Row Level Security (disable for now - public access)
alter table users enable row level security;
alter table projects enable row level security;
alter table skills enable row level security;
alter table messages enable row level security;
alter table blogs enable row level security;

-- Public read policies
create policy "Public read access on projects" on projects for select using (true);
create policy "Public read access on skills" on skills for select using (true);
create policy "Public read access on blogs" on blogs for select using (true);

-- Anyone can create messages (contact form)
create policy "Anyone can create messages" on messages for insert with check (true);

-- Admin policies (simplified - allow all for now)
create policy "Admin full access on projects" on projects for all using (true);
create policy "Admin full access on skills" on skills for all using (true);
create policy "Admin full access on messages" on messages for all using (true);
create policy "Admin full access on blogs" on blogs for all using (true);
create policy "Admin full access on users" on users for all using (true);
