import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getCategories, getAllTechStacks } from '@/services/project.service'
import ProjectForm from '@/components/admin/ProjectForm'

export const dynamic = 'force-dynamic'

export default async function NewProjectPage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/admin/login')

  const categories = await getCategories()
  const techStacks = await getAllTechStacks()

  const defaultCategories = categories.length > 0 ? categories : ['Web', 'Mobile', 'AI']
  const defaultTechStacks = techStacks.length > 0 ? techStacks : ['Next.js', 'TypeScript', 'React', 'Node.js', 'PostgreSQL']

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="border-b border-border bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-xl font-bold">Add New Project</h1>
          <p className="text-sm text-muted-foreground mt-1">Fill in the details for your new project</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-card rounded-xl p-6 border border-border">
          <ProjectForm categories={defaultCategories} techStacks={defaultTechStacks} />
        </div>
      </div>
    </div>
  )
}
