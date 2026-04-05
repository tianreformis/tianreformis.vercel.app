import { getServerSession } from 'next-auth'
import { redirect, notFound } from 'next/navigation'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getProjectById, getCategories, getAllTechStacks } from '@/services/project.service'
import ProjectForm from '@/components/admin/ProjectForm'
import { Project } from '@/types'

export const dynamic = 'force-dynamic'

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/admin/login')

  const { id } = await params
  const project = await getProjectById(id) as Project | null
  if (!project) notFound()

  const categories = await getCategories()
  const techStacks = await getAllTechStacks()

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="border-b border-border bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-xl font-bold">Edit Project</h1>
          <p className="text-sm text-muted-foreground mt-1">Update project details</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-card rounded-xl p-6 border border-border">
          <ProjectForm
            initialData={project}
            isEdit
            categories={categories}
            techStacks={techStacks}
          />
        </div>
      </div>
    </div>
  )
}
