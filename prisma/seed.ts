import { PrismaClient } from '../src/generated/prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import bcrypt from 'bcryptjs'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log('🌱 Starting seed...')

  // Clear existing data
  await prisma.message.deleteMany()
  await prisma.blog.deleteMany()
  await prisma.project.deleteMany()
  await prisma.skill.deleteMany()
  await prisma.user.deleteMany()

  console.log('🗑️  Cleared existing data')

  // Create Admin User
  const hashedPassword = await bcrypt.hash('admin123', 10)
  const admin = await prisma.user.create({
    data: {
      name: 'Kristian Reformis',
      email: 'admin@portfolio.com',
      password: hashedPassword,
      role: 'ADMIN',
    },
  })
  console.log('👤 Created admin user')

  // Create Skills
  const skills = await Promise.all([
    prisma.skill.create({
      data: { name: 'React', level: 95, category: 'Frontend' },
    }),
    prisma.skill.create({
      data: { name: 'TypeScript', level: 90, category: 'Frontend' },
    }),
    prisma.skill.create({
      data: { name: 'Next.js', level: 92, category: 'Frontend' },
    }),
    prisma.skill.create({
      data: { name: 'Node.js', level: 85, category: 'Backend' },
    }),
    prisma.skill.create({
      data: { name: 'Python', level: 80, category: 'Backend' },
    }),
    prisma.skill.create({
      data: { name: 'PostgreSQL', level: 82, category: 'Database' },
    }),
    prisma.skill.create({
      data: { name: 'MongoDB', level: 78, category: 'Database' },
    }),
    prisma.skill.create({
      data: { name: 'Docker', level: 75, category: 'DevOps' },
    }),
    prisma.skill.create({
      data: { name: 'AWS', level: 70, category: 'DevOps' },
    }),
    prisma.skill.create({
      data: { name: 'Tailwind CSS', level: 93, category: 'Frontend' },
    }),
  ])
  console.log('🛠️  Created 10 skills')

  // Create Projects
  const projects = await Promise.all([
    prisma.project.create({
      data: {
        title: 'E-Commerce Platform',
        slug: 'e-commerce-platform',
        description: 'Full-stack e-commerce platform with payment integration, inventory management, and real-time analytics dashboard.',
        content: `# E-Commerce Platform

A comprehensive e-commerce solution built with modern web technologies.

## Features

- **Product Management**: CRUD operations for products with image upload
- **Shopping Cart**: Persistent cart with local storage
- **Payment Integration**: Stripe payment gateway
- **Order Tracking**: Real-time order status updates
- **Admin Dashboard**: Complete admin panel for managing store
- **Analytics**: Sales reports and customer insights
- **Responsive Design**: Mobile-first approach

## Tech Stack

- Next.js 14 with App Router
- TypeScript for type safety
- PostgreSQL with Prisma ORM
- Stripe for payments
- Tailwind CSS for styling
- Framer Motion for animations

## Architecture

The application follows a clean architecture pattern with separate service layers for business logic, repository pattern for data access, and component-based UI architecture.

## Challenges

- Implementing real-time inventory updates
- Handling payment webhooks securely
- Optimizing image loading for product galleries
- Building a scalable cart system`,
        thumbnail: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80',
        techStack: ['Next.js', 'TypeScript', 'PostgreSQL', 'Stripe', 'Prisma', 'Tailwind CSS'],
        demoUrl: 'https://ecommerce-demo.example.com',
        githubUrl: 'https://github.com/example/ecommerce',
        category: 'Web',
        views: 1250,
        likes: 89,
      },
    }),
    prisma.project.create({
      data: {
        title: 'AI Chat Assistant',
        slug: 'ai-chat-assistant',
        description: 'Intelligent chatbot powered by LLM with context awareness, multi-language support, and custom knowledge base integration.',
        content: `# AI Chat Assistant

An advanced AI chatbot application leveraging large language models for intelligent conversations.

## Features

- **Context Awareness**: Maintains conversation context
- **Multi-language Support**: Communicates in 50+ languages
- **Custom Knowledge Base**: Upload documents for domain-specific answers
- **Streaming Responses**: Real-time token streaming
- **Conversation History**: Save and search past conversations
- **API Integration**: RESTful API for third-party integration

## Tech Stack

- Python with FastAPI
- OpenAI API / LangChain
- React for frontend
- Redis for caching
- PostgreSQL for storage
- Docker for deployment

## Architecture

Microservices architecture with separate services for:
- Chat processing
- Knowledge base management
- User authentication
- Analytics and logging`,
        thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80',
        techStack: ['Python', 'FastAPI', 'React', 'OpenAI', 'LangChain', 'Redis'],
        demoUrl: 'https://ai-chat-demo.example.com',
        githubUrl: 'https://github.com/example/ai-chat',
        category: 'AI',
        views: 2100,
        likes: 156,
      },
    }),
    prisma.project.create({
      data: {
        title: 'Task Management App',
        slug: 'task-management-app',
        description: 'Collaborative project management tool with real-time updates, Kanban boards, and team communication features.',
        content: `# Task Management App

A collaborative project management platform for teams of all sizes.

## Features

- **Kanban Boards**: Drag-and-drop task management
- **Real-time Updates**: WebSocket-based live collaboration
- **Team Chat**: Built-in messaging system
- **Time Tracking**: Track time spent on tasks
- **File Sharing**: Attach files to tasks and projects
- **Notifications**: Email and in-app notifications
- **Reports**: Productivity analytics

## Tech Stack

- Next.js 14
- TypeScript
- Socket.io for real-time
- MongoDB
- Tailwind CSS
- NextAuth for authentication

## Architecture

Server-side rendering for initial load, client-side navigation for smooth UX. Real-time updates via WebSocket connections.`,
        thumbnail: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&q=80',
        techStack: ['Next.js', 'TypeScript', 'Socket.io', 'MongoDB', 'Tailwind CSS'],
        demoUrl: 'https://task-app-demo.example.com',
        githubUrl: 'https://github.com/example/task-app',
        category: 'Web',
        views: 890,
        likes: 67,
      },
    }),
    prisma.project.create({
      data: {
        title: 'Mobile Fitness Tracker',
        slug: 'mobile-fitness-tracker',
        description: 'Cross-platform mobile app for tracking workouts, nutrition, and health metrics with AI-powered recommendations.',
        content: `# Mobile Fitness Tracker

A comprehensive fitness tracking application for health-conscious users.

## Features

- **Workout Tracking**: Log exercises, sets, reps, and weights
- **Nutrition Logging**: Track calories and macronutrients
- **Progress Photos**: Visual progress tracking
- **AI Recommendations**: Personalized workout plans
- **Social Features**: Share achievements with friends
- **Health Metrics**: Heart rate, sleep, steps integration
- **Charts & Analytics**: Visualize your progress

## Tech Stack

- React Native
- TypeScript
- Firebase
- TensorFlow Lite
- Recharts for analytics

## Architecture

Offline-first architecture with local SQLite database, syncing to cloud when online.`,
        thumbnail: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=800&q=80',
        techStack: ['React Native', 'TypeScript', 'Firebase', 'TensorFlow Lite'],
        demoUrl: 'https://fitness-app-demo.example.com',
        githubUrl: 'https://github.com/example/fitness-app',
        category: 'Mobile',
        views: 1560,
        likes: 112,
      },
    }),
    prisma.project.create({
      data: {
        title: 'Weather Dashboard',
        slug: 'weather-dashboard',
        description: 'Real-time weather visualization app with interactive maps, forecasts, and severe weather alerts using multiple API sources.',
        content: `# Weather Dashboard

A beautiful and informative weather visualization platform.

## Features

- **Real-time Weather**: Current conditions from multiple sources
- **Interactive Maps**: Radar, satellite, and temperature overlays
- **7-Day Forecast**: Detailed weather predictions
- **Severe Alerts**: Push notifications for dangerous weather
- **Location Search**: Find weather for any location worldwide
- **Historical Data**: View past weather patterns
- **Widgets**: Customizable home screen widgets

## Tech Stack

- Next.js
- TypeScript
- OpenWeather API
- Mapbox GL
- Tailwind CSS
- Chart.js

## Architecture

Static site generation for location pages, with client-side updates for real-time data.`,
        thumbnail: 'https://images.unsplash.com/photo-1504386106981-270fd1164209?w=800&q=80',
        techStack: ['Next.js', 'TypeScript', 'OpenWeather API', 'Mapbox', 'Chart.js'],
        demoUrl: 'https://weather-demo.example.com',
        githubUrl: 'https://github.com/example/weather',
        category: 'Web',
        views: 720,
        likes: 45,
      },
    }),
  ])
  console.log('📁 Created 5 projects')

  // Create Blog Posts
  const blogs = await Promise.all([
    prisma.blog.create({
      data: {
        title: 'Building Scalable APIs with Next.js 14',
        slug: 'building-scalable-apis-nextjs-14',
        content: `# Building Scalable APIs with Next.js 14

Next.js 14 brings significant improvements to API development with the App Router. In this article, we'll explore best practices for building scalable APIs.

## Why Next.js for APIs?

Next.js provides a full-stack framework that allows you to build both frontend and backend in a single codebase. The App Router introduces Route Handlers, a more flexible way to create API endpoints.

## Project Structure

A well-organized API starts with a clean project structure:

\`\`\`
/app/api
  /users
    route.ts
  /projects
    route.ts
  /[id]
    route.ts
/services
  user.service.ts
  project.service.ts
/lib
  prisma.ts
  utils.ts
\`\`\`

## Service Layer Pattern

The service layer pattern separates business logic from route handlers:

\`\`\`typescript
// services/user.service.ts
export async function getAllUsers() {
  return prisma.user.findMany()
}

export async function createUser(data: UserData) {
  return prisma.user.create({ data })
}
\`\`\`

## Error Handling

Proper error handling is crucial for production APIs:

\`\`\`typescript
export async function GET() {
  try {
    const users = await getAllUsers()
    return NextResponse.json(users)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    )
  }
}
\`\`\`

## Authentication

Protect your API routes with NextAuth:

\`\`\`typescript
const session = await getServerSession(authOptions)
if (!session) {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
}
\`\`\`

## Performance Tips

1. Use caching where appropriate
2. Implement pagination for large datasets
3. Use selective field projection
4. Add rate limiting for public APIs
5. Monitor API response times

## Conclusion

Next.js 14 provides excellent tools for building production-ready APIs. Follow these patterns to ensure your API is scalable and maintainable.`,
        coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80',
        views: 456,
      },
    }),
    prisma.blog.create({
      data: {
        title: 'Mastering TypeScript for React Developers',
        slug: 'mastering-typescript-react-developers',
        content: `# Mastering TypeScript for React Developers

TypeScript has become essential for React development. Here's a comprehensive guide to leveling up your TypeScript skills.

## Getting Started

TypeScript adds static typing to JavaScript, catching errors at compile time rather than runtime.

## Essential Types for React

### Component Props

\`\`\`typescript
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
  onClick?: () => void
  disabled?: boolean
}
\`\`\`

### State Types

\`\`\`typescript
interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'user'
}

const [user, setUser] = useState<User | null>(null)
\`\`\`

## Generic Components

Create reusable components with generics:

\`\`\`typescript
interface SelectProps<T> {
  items: T[]
  onSelect: (item: T) => void
  renderOption: (item: T) => React.ReactNode
}

function Select<T>({ items, onSelect, renderOption }: SelectProps<T>) {
  // implementation
}
\`\`\`

## Best Practices

1. Use interfaces for object shapes
2. Prefer union types over enums
3. Use type guards for runtime checks
4. Leverage utility types (Partial, Pick, Omit)
5. Avoid \`any\` - use \`unknown\` instead

## Common Patterns

### Event Handlers

\`\`\`typescript
const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault()
  // handle submit
}
\`\`\`

### Refs

\`\`\`typescript
const inputRef = useRef<HTMLInputElement>(null)
\`\`\`

## Conclusion

TypeScript makes your React code more robust and maintainable. Start with basic types and gradually adopt more advanced features.`,
        coverImage: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&q=80',
        views: 328,
      },
    }),
    prisma.blog.create({
      data: {
        title: 'The Complete Guide to Prisma ORM',
        slug: 'complete-guide-prisma-orm',
        content: `# The Complete Guide to Prisma ORM

Prisma ORM has revolutionized database access in Node.js applications. This guide covers everything from basics to advanced patterns.

## What is Prisma?

Prisma is a next-generation ORM that provides type-safe database access with an intuitive API.

## Schema Design

\`\`\`prisma
model User {
  id        String   @id @default(cuid())
  name      String
  email     String   @unique
  posts     Post[]
  createdAt DateTime @default(now())
}

model Post {
  id        String   @id @default(cuid())
  title     String
  content   String
  author    User     @relation(fields: [authorId], references: [id])
  authorId  String
}
\`\`\`

## Common Operations

### Create

\`\`\`typescript
const user = await prisma.user.create({
  data: {
    name: 'Kristian',
    email: 'tianreformis.work@gmail.com',
  }
})
\`\`\`

### Read

\`\`\`typescript
const users = await prisma.user.findMany({
  include: { posts: true },
  orderBy: { createdAt: 'desc' },
})
\`\`\`

### Update

\`\`\`typescript
const user = await prisma.user.update({
  where: { id: '123' },
  data: { name: 'Jane' },
})
\`\`\`

### Delete

\`\`\`typescript
await prisma.user.delete({
  where: { id: '123' },
})
\`\`\`

## Advanced Patterns

### Transactions

\`\`\`typescript
await prisma.$transaction(async (tx) => {
  const user = await tx.user.create({ data: { ... } })
  await tx.profile.create({ data: { userId: user.id, ... } })
})
\`\`\`

### Pagination

\`\`\`typescript
const users = await prisma.user.findMany({
  skip: (page - 1) * limit,
  take: limit,
})
\`\`\`

## Performance Tips

1. Use \`select\` to fetch only needed fields
2. Avoid N+1 queries with proper \`include\`
3. Use raw queries for complex operations
4. Add database indexes for frequently queried fields
5. Use connection pooling in production

## Conclusion

Prisma ORM makes database operations type-safe and intuitive. Master these patterns to build robust applications efficiently.`,
        coverImage: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&q=80',
        views: 512,
      },
    }),
  ])
  console.log('📝 Created 3 blog posts')

  console.log('\n✅ Seed completed successfully!')
  console.log('\n📊 Summary:')
  console.log(`   - Users: 1 (admin@portfolio.com / admin123)`)
  console.log(`   - Skills: ${skills.length}`)
  console.log(`   - Projects: ${projects.length}`)
  console.log(`   - Blog Posts: ${blogs.length}`)
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
