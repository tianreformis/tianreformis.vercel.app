export interface User {
  id: string
  name: string
  email: string
  password: string
  role: string
  created_at: string
  updated_at: string
}

export type Visibility = 'public' | 'private'

export interface Project {
  id: string
  title: string
  slug: string
  description: string
  content: string
  thumbnail: string | null
  tech_stack: string[]
  demo_url: string | null
  github_url: string | null
  category: string
  visibility: Visibility
  views: number
  likes: number
  created_at: string
  updated_at: string
}

export interface Skill {
  id: string
  name: string
  level: number
  category: string
  created_at: string
  updated_at: string
}

export interface Message {
  id: string
  name: string
  email: string
  message: string
  is_read: boolean
  created_at: string
}

export interface Blog {
  id: string
  title: string
  slug: string
  content: string
  cover_image: string | null
  views: number
  created_at: string
  updated_at: string
}

export interface SessionUser {
  id: string
  name: string
  email: string
  role: string
}
