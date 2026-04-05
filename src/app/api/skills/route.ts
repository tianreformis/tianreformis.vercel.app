import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getAllSkills, createSkill } from '@/services/skill.service'

export async function GET() {
  try {
    const skills = await getAllSkills()
    return NextResponse.json(skills)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch skills' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const skill = await createSkill(body)
    return NextResponse.json(skill, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create skill' }, { status: 500 })
  }
}
