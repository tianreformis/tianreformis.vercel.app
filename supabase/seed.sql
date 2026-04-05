-- Portfolio Seed Data for Supabase
-- Run this AFTER running schema.sql in Supabase SQL Editor

-- Insert Admin User (password: admin123, hashed with bcrypt)
insert into users (name, email, password, role) values
  ('Kristian Reformis', 'admin@portfolio.com', '$2b$10$bFPtk/gtpEsvesO8IcQmquAKNzEEAnl70QGyAKPyZEKlmivUkG632', 'ADMIN')
on conflict (email) do nothing;

-- Insert Skills
insert into skills (name, level, category) values
  ('Next.js', 95, 'Frontend'),
  ('React', 92, 'Frontend'),
  ('TypeScript', 90, 'Frontend'),
  ('Tailwind CSS', 93, 'Frontend'),
  ('Shadcn UI', 88, 'Frontend'),
  ('Framer Motion', 85, 'Frontend'),
  ('Node.js', 88, 'Backend'),
  ('Python', 85, 'Backend'),
  ('FastAPI', 80, 'Backend'),
  ('PostgreSQL', 90, 'Database'),
  ('SQLite', 82, 'Database'),
  ('MongoDB', 78, 'Database'),
  ('Prisma', 88, 'Database'),
  ('Supabase', 85, 'Database'),
  ('Docker', 78, 'DevOps'),
  ('Vercel', 90, 'DevOps'),
  ('Netlify', 82, 'DevOps'),
  ('Cloudinary', 75, 'DevOps'),
  ('OpenAI', 88, 'AI & Automation'),
  ('OpenRouter', 85, 'AI & Automation'),
  ('AI Integration', 90, 'AI & Automation'),
  ('AI Automation', 87, 'AI & Automation'),
  ('Prompt Engineering', 92, 'AI & Automation')
on conflict do nothing;

-- Insert Projects
insert into projects (title, slug, description, content, thumbnail, tech_stack, demo_url, github_url, category, visibility, views, likes) values
  (
    'E-Commerce Platform',
    'e-commerce-platform',
    'Full-stack e-commerce platform with payment integration, inventory management, and real-time analytics dashboard.',
    '# E-Commerce Platform

A comprehensive e-commerce solution built with modern web technologies.

## Features

- **Product Management**: CRUD operations for products with image upload
- **Shopping Cart**: Persistent cart with local storage
- **Payment Integration**: Stripe payment gateway
- **Order Tracking**: Real-time order status updates
- **Admin Dashboard**: Complete admin panel for managing store
- **Analytics**: Sales reports and customer insights

## Tech Stack

- Next.js 14 with App Router
- TypeScript for type safety
- PostgreSQL with Prisma ORM
- Stripe for payments
- Tailwind CSS for styling',
    'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80',
    ARRAY['Next.js', 'TypeScript', 'PostgreSQL', 'Stripe', 'Prisma', 'Tailwind CSS'],
    'https://ecommerce-demo.example.com',
    'https://github.com/example/ecommerce',
    'Web',
    'public',
    1250,
    89
  ),
  (
    'AI Chat Assistant',
    'ai-chat-assistant',
    'Intelligent chatbot powered by LLM with context awareness, multi-language support, and custom knowledge base integration.',
    '# AI Chat Assistant

An advanced AI chatbot application leveraging large language models for intelligent conversations.

## Features

- **Context Awareness**: Maintains conversation context
- **Multi-language Support**: Communicates in 50+ languages
- **Custom Knowledge Base**: Upload documents for domain-specific answers
- **Streaming Responses**: Real-time token streaming
- **Conversation History**: Save and search past conversations

## Tech Stack

- Python with FastAPI
- OpenAI API / LangChain
- React for frontend
- Redis for caching
- PostgreSQL for storage',
    'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80',
    ARRAY['Python', 'FastAPI', 'React', 'OpenAI', 'LangChain', 'Redis'],
    'https://ai-chat-demo.example.com',
    'https://github.com/example/ai-chat',
    'AI',
    'public',
    2100,
    156
  ),
  (
    'Task Management App',
    'task-management-app',
    'Collaborative project management tool with real-time updates, Kanban boards, and team communication features.',
    '# Task Management App

A collaborative project management platform for teams of all sizes.

## Features

- **Kanban Boards**: Drag-and-drop task management
- **Real-time Updates**: WebSocket-based live collaboration
- **Team Chat**: Built-in messaging system
- **Time Tracking**: Track time spent on tasks
- **File Sharing**: Attach files to tasks and projects

## Tech Stack

- Next.js 14
- TypeScript
- Socket.io for real-time
- MongoDB
- Tailwind CSS',
    'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&q=80',
    ARRAY['Next.js', 'TypeScript', 'Socket.io', 'MongoDB', 'Tailwind CSS'],
    'https://task-app-demo.example.com',
    'https://github.com/example/task-app',
    'Web',
    'private',
    890,
    67
  ),
  (
    'Mobile Fitness Tracker',
    'mobile-fitness-tracker',
    'Cross-platform mobile app for tracking workouts, nutrition, and health metrics with AI-powered recommendations.',
    '# Mobile Fitness Tracker

A comprehensive fitness tracking application for health-conscious users.

## Features

- **Workout Tracking**: Log exercises, sets, reps, and weights
- **Nutrition Logging**: Track calories and macronutrients
- **Progress Photos**: Visual progress tracking
- **AI Recommendations**: Personalized workout plans
- **Social Features**: Share achievements with friends

## Tech Stack

- React Native
- TypeScript
- Firebase
- TensorFlow Lite
- Recharts for analytics',
    'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=800&q=80',
    ARRAY['React Native', 'TypeScript', 'Firebase', 'TensorFlow Lite'],
    'https://fitness-app-demo.example.com',
    'https://github.com/example/fitness-app',
    'Mobile',
    'public',
    1560,
    112
  ),
  (
    'Weather Dashboard',
    'weather-dashboard',
    'Real-time weather visualization app with interactive maps, forecasts, and severe weather alerts using multiple API sources.',
    '# Weather Dashboard

A beautiful and informative weather visualization platform.

## Features

- **Real-time Weather**: Current conditions from multiple sources
- **Interactive Maps**: Radar, satellite, and temperature overlays
- **7-Day Forecast**: Detailed weather predictions
- **Severe Alerts**: Push notifications for dangerous weather
- **Location Search**: Find weather for any location worldwide

## Tech Stack

- Next.js
- TypeScript
- OpenWeather API
- Mapbox GL
- Tailwind CSS
- Chart.js',
    'https://images.unsplash.com/photo-1504386106981-270fd1164209?w=800&q=80',
    ARRAY['Next.js', 'TypeScript', 'OpenWeather API', 'Mapbox', 'Chart.js'],
    'https://weather-demo.example.com',
    'https://github.com/example/weather',
    'Web',
    'private',
    720,
    45
  )
on conflict (slug) do nothing;

-- Insert Blog Posts
insert into blogs (title, slug, content, cover_image, views) values
  (
    'Building Scalable APIs with Next.js 14',
    'building-scalable-apis-nextjs-14',
    '# Building Scalable APIs with Next.js 14

Next.js 14 brings significant improvements to API development with the App Router.

## Why Next.js for APIs?

Next.js provides a full-stack framework that allows you to build both frontend and backend in a single codebase.

## Project Structure

A well-organized API starts with a clean project structure:

```
/app/api
  /users
    route.ts
  /projects
    route.ts
/services
  user.service.ts
  project.service.ts
/lib
  prisma.ts
```

## Service Layer Pattern

The service layer pattern separates business logic from route handlers:

```typescript
export async function getAllUsers() {
  return prisma.user.findMany()
}
```

## Error Handling

Proper error handling is crucial for production APIs.

## Conclusion

Next.js 14 provides excellent tools for building production-ready APIs.',
    'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80',
    456
  ),
  (
    'Mastering TypeScript for React Developers',
    'mastering-typescript-react-developers',
    '# Mastering TypeScript for React Developers

TypeScript has become essential for React development.

## Essential Types for React

### Component Props

```typescript
interface ButtonProps {
  variant: ''primary'' | ''secondary'' | ''outline''
  size?: ''sm'' | ''md'' | ''lg''
  children: React.ReactNode
}
```

### State Types

```typescript
interface User {
  id: string
  name: string
  email: string
}
```

## Best Practices

1. Use interfaces for object shapes
2. Prefer union types over enums
3. Use type guards for runtime checks
4. Leverage utility types (Partial, Pick, Omit)
5. Avoid `any` - use `unknown` instead

## Conclusion

TypeScript makes your React code more robust and maintainable.',
    'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&q=80',
    328
  ),
  (
    'The Complete Guide to Supabase',
    'complete-guide-supabase',
    '# The Complete Guide to Supabase

Supabase is an open-source Firebase alternative providing a full backend suite.

## What is Supabase?

Supabase provides PostgreSQL database, Authentication, instant APIs, Realtime subscriptions, Storage, and Edge Functions.

## Database

PostgreSQL is the worlds most advanced open source database.

## Authentication

Supabase Auth handles user management and authentication with:

- **Email/Password**: Standard email and password sign in
- **OAuth**: Google, GitHub, GitLab, Bitbucket, and more
- **Magic Links**: Passwordless sign in via email
- **Phone Auth**: SMS-based authentication

## Realtime

Listen to database changes in real-time using websockets.

## Storage

Store and serve files, images, and videos with Supabase Storage.

## Conclusion

Supabase makes building a full-stack application incredibly fast.',
    'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&q=80',
    512
  )
on conflict (slug) do nothing;
