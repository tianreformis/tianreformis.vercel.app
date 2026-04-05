import { getAllBlogs } from '@/services/blog.service'
import BlogCard from '@/components/ui/BlogCard'
import { Metadata } from 'next'
import { Blog } from '@/types'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Articles, tutorials, and insights about web development and technology.',
}

export default async function BlogPage() {
  const blogs = await getAllBlogs() as Blog[]

  return (
    <div className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-bold">Blog</h1>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Articles, tutorials, and insights about web development and technology.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>

        {blogs.length === 0 && (
          <p className="text-center text-muted-foreground mt-8">
            No articles published yet.
          </p>
        )}
      </div>
    </div>
  )
}
