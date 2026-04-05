import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getProjectById, updateProject, deleteProject, getProjectBySlug, incrementViews, incrementLikes } from '@/services/project.service'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const searchParams = request.nextUrl.searchParams
  const trackView = searchParams.get('track') === 'true'
  const slug = searchParams.get('slug')

  if (trackView && slug) {
    await incrementViews(slug)
    const project = await getProjectBySlug(slug)
    return NextResponse.json(project)
  }

  const project = await getProjectById(id)
  if (!project) {
    return NextResponse.json({ error: 'Project not found' }, { status: 404 })
  }
  return NextResponse.json(project)
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const project = await getProjectById(id)
  if (!project) {
    return NextResponse.json({ error: 'Project not found' }, { status: 404 })
  }

  const updated = await incrementLikes(id)
  return NextResponse.json(updated)
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
    // Remove slug from update to prevent unique constraint conflicts
    const { slug, ...updateData } = body
    const project = await updateProject(id, updateData)
    return NextResponse.json(project)
  } catch (error: any) {
    console.error('Failed to update project:', error)
    return NextResponse.json({ error: error.message || 'Failed to update project' }, { status: 500 })
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

    await deleteProject(id)
    return NextResponse.json({ message: 'Project deleted successfully' })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 })
  }
}
