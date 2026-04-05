import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getAllBlogs, createBlog } from '@/services/blog.service'

export async function GET() {
  try {
    const blogs = await getAllBlogs()
    return NextResponse.json(blogs)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch blogs' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const blog = await createBlog(body)
    return NextResponse.json(blog, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create blog' }, { status: 500 })
  }
}
