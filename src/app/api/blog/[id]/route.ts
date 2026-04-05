import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getBlogById, updateBlog, deleteBlog, getBlogBySlug, incrementBlogViews } from '@/services/blog.service'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const searchParams = request.nextUrl.searchParams
  const trackView = searchParams.get('track') === 'true'
  const slug = searchParams.get('slug')

  if (trackView && slug) {
    await incrementBlogViews(slug)
    const blog = await getBlogBySlug(slug)
    return NextResponse.json(blog)
  }

  const blog = await getBlogById(id)
  if (!blog) {
    return NextResponse.json({ error: 'Blog not found' }, { status: 404 })
  }
  return NextResponse.json(blog)
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const blog = await updateBlog(id, body)
    return NextResponse.json(blog)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update blog' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await deleteBlog(id)
    return NextResponse.json({ message: 'Blog deleted successfully' })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete blog' }, { status: 500 })
  }
}
