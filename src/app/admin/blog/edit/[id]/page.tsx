import { getServerSession } from 'next-auth'
import { redirect, notFound } from 'next/navigation'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getBlogById } from '@/services/blog.service'
import BlogForm from '@/components/admin/BlogForm'
import { Blog } from '@/types'

export const dynamic = 'force-dynamic'

export default async function EditBlogPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/admin/login')

  const { id } = await params
  const blog = await getBlogById(id) as Blog | null
  if (!blog) notFound()

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="border-b border-border bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-xl font-bold">Edit Article</h1>
          <p className="text-sm text-muted-foreground mt-1">Update blog post details</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-card rounded-xl p-6 border border-border">
          <BlogForm initialData={blog} isEdit />
        </div>
      </div>
    </div>
  )
}
