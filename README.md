# Portfolio Website

Fullstack portfolio website built with Next.js, TypeScript, and Supabase.

## Features

- **Landing Page** - Hero section with smooth animations
- **About Me** - Bio, skills with progress bars, tech stack
- **Project Portfolio** - Filterable project cards with detail pages
- **Blog** - Articles with markdown support
- **Contact Form** - Save messages to database
- **Admin Dashboard** - Full CRUD for projects, blog, skills, messages
- **Dark Mode** - Default dark theme with light mode toggle
- **SEO Optimized** - Meta tags, Open Graph, dynamic routing
- **Responsive** - Mobile-first design
- **View/Like Counter** - Track project engagement

## Tech Stack

- **Frontend**: Next.js (App Router), TypeScript, Tailwind CSS, Framer Motion
- **Backend**: Next.js API Routes, Supabase Client
- **Auth**: NextAuth.js (Credentials)
- **Database**: Supabase (PostgreSQL)

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Supabase

Set your Supabase credentials in `.env`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=your-anon-key
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"
```

### 3. Setup Database Tables

1. Go to your **Supabase Dashboard** → **SQL Editor**
2. Copy the contents of `supabase/schema.sql` and run it
3. Copy the contents of `supabase/seed.sql` and run it

This creates:
- 5 tables: `users`, `projects`, `skills`, `messages`, `blogs`
- RPC functions for view/like counters
- Row Level Security policies
- Seed data: 1 admin user, 5 projects, 10 skills, 3 blog posts

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Deployment

### Vercel + Supabase

1. Push code to GitHub
2. Set environment variables on Vercel:
   - `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
   - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY` - Your Supabase anon key
   - `NEXTAUTH_SECRET` - Random string (use `openssl rand -base64 32`)
   - `NEXTAUTH_URL` - Your production URL
3. Deploy to Vercel

## Project Structure

```
/app
  /api              # API routes
    /auth           # NextAuth
    /projects       # Project CRUD
    /blog           # Blog CRUD
    /contact        # Contact form
    /messages       # Message management
    /skills         # Skill CRUD
  /projects/[slug]  # Project detail page
  /blog/[slug]      # Blog detail page
  /admin            # Admin dashboard
/components
  /layout           # Navbar, Footer, Providers
  /sections         # Hero, About, Projects, Blog, Contact
  /ui               # Reusable UI components
  /admin            # Admin-specific components
/services           # Business logic layer (Supabase client)
/utils/supabase     # Supabase client helpers (server, client, middleware)
/types              # TypeScript interfaces
/supabase           # SQL schema & seed files
```

## Admin Access

- Login: `/login`
- Default credentials:
  - Email: `admin@portfolio.com`
  - Password: `admin123`

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/projects` | List all projects (with filters) |
| POST | `/api/projects` | Create project (admin) |
| PUT | `/api/projects/[id]` | Update project (admin) |
| DELETE | `/api/projects/[id]` | Delete project (admin) |
| GET | `/api/blog` | List all blog posts |
| POST | `/api/blog` | Create blog (admin) |
| PUT | `/api/blog/[id]` | Update blog (admin) |
| DELETE | `/api/blog/[id]` | Delete blog (admin) |
| POST | `/api/contact` | Send contact message |
| GET | `/api/messages` | List messages (admin) |
| PUT | `/api/messages` | Mark message as read (admin) |
| DELETE | `/api/messages` | Delete message (admin) |
| GET | `/api/skills` | List all skills |
| POST | `/api/skills` | Create skill (admin) |
| PUT | `/api/skills/[id]` | Update skill (admin) |
| DELETE | `/api/skills/[id]` | Delete skill (admin) |
