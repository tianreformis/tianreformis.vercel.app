import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getAllBlogs } from '@/services/blog.service'
import Link from 'next/link'
import { FiPlus, FiEdit2, FiEye } from 'react-icons/fi'
import DeleteButton from '@/components/admin/DeleteButton'
import { Blog } from '@/types'

export const dynamic = 'force-dynamic'

export default async function AdminBlogPage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/admin/login')

  const blogs = await getAllBlogs() as Blog[]

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="border-b border-border bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">Manage Blog</h1>
            <p className="text-sm text-muted-foreground mt-1">{blogs.length} articles total</p>
          </div>
          <Link
            href="/admin/blog/new"
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm"
          >
            <FiPlus size={16} /> Add Article
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Title</th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Views</th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Date</th>
                  <th className="text-right px-4 py-3 text-sm font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {blogs.map((blog) => (
                  <tr key={blog.id} className="hover:bg-muted/30">
                    <td className="px-4 py-3">
                      <p className="font-medium text-sm">{blog.title}</p>
                      <p className="text-xs text-muted-foreground truncate max-w-[300px]">{(blog.content || '').slice(0, 80).replace(/[#*`]/g, '')}...</p>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <span className="flex items-center gap-1"><FiEye size={12} /> {blog.views}</span>
                    </td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">
                      {new Date(blog.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/admin/blog/edit/${blog.id}`} className="p-2 hover:bg-muted rounded-lg transition-colors">
                          <FiEdit2 size={16} />
                        </Link>
                        <DeleteButton id={blog.id} type="blog" />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {blogs.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              No articles yet. Click "Add Article" to create one.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
