import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getAllProjects, getCategories, getAllTechStacks } from '@/services/project.service'
import Link from 'next/link'
import { FiPlus, FiEdit2, FiTrash2, FiEye, FiHeart } from 'react-icons/fi'
import DeleteButton from '@/components/admin/DeleteButton'
import { Project } from '@/types'

export const dynamic = 'force-dynamic'

export default async function AdminProjectsPage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/admin/login')

  const projects = await getAllProjects(undefined, undefined, true) as Project[]
  const categories = await getCategories()
  const techStacks = await getAllTechStacks()

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="border-b border-border bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">Manage Projects</h1>
            <p className="text-sm text-muted-foreground mt-1">{projects.length} projects total</p>
          </div>
          <Link
            href="/admin/projects/new"
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm"
          >
            <FiPlus size={16} /> Add Project
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Project</th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Category</th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Visibility</th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Views</th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Likes</th>
                  <th className="text-right px-4 py-3 text-sm font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {projects.map((project) => (
                  <tr key={project.id} className="hover:bg-muted/30">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <img src={project.thumbnail || 'https://via.placeholder.com/40'} alt="" className="w-10 h-10 rounded object-cover" />
                        <div>
                          <p className="font-medium text-sm">{project.title}</p>
                          <p className="text-xs text-muted-foreground truncate max-w-[200px]">{project.description}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 bg-muted rounded-full text-xs">{project.category}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        project.visibility === 'private'
                          ? 'bg-yellow-500/10 text-yellow-500'
                          : 'bg-green-500/10 text-green-500'
                      }`}>
                        {project.visibility === 'private' ? 'Private' : 'Public'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <span className="flex items-center gap-1"><FiEye size={12} /> {project.views}</span>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <span className="flex items-center gap-1"><FiHeart size={12} /> {project.likes}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/admin/projects/edit/${project.id}`} className="p-2 hover:bg-muted rounded-lg transition-colors">
                          <FiEdit2 size={16} />
                        </Link>
                        <DeleteButton id={project.id} type="project" />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {projects.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              No projects yet. Click "Add Project" to create one.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
