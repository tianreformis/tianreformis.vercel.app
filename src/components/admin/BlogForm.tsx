'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface BlogFormProps {
  initialData?: {
    id?: string
    title: string
    slug: string
    content: string
    cover_image?: string | null
  }
  isEdit?: boolean
}

export default function BlogForm({ initialData, isEdit = false }: BlogFormProps) {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    slug: initialData?.slug || '',
    content: initialData?.content || '',
    cover_image: initialData?.cover_image || '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const generateSlug = (title: string) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
  }

  const handleTitleChange = (title: string) => {
    if (!isEdit) {
      setFormData({ ...formData, title, slug: generateSlug(title) })
    } else {
      setFormData({ ...formData, title })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const url = isEdit ? `/api/blog/${initialData?.id}` : '/api/blog'
      const method = isEdit ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        router.push('/admin/blog')
        router.refresh()
      } else {
        const data = await res.json()
        setError(data.error || 'Failed to save article')
      }
    } catch {
      setError('Something went wrong')
    }

    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-2">Title</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => handleTitleChange(e.target.value)}
          className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Slug</label>
        <input
          type="text"
          value={formData.slug}
          onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
          className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Cover Image URL</label>
        <input
          type="url"
          value={formData.cover_image}
          onChange={(e) => setFormData({ ...formData, cover_image: e.target.value })}
          className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="https://images.unsplash.com/..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Content (Markdown)</label>
        <textarea
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary min-h-[400px] font-mono text-sm"
          required
        />
      </div>

      {error && (
        <p className="text-red-500 text-sm bg-red-500/10 p-3 rounded-lg border border-red-500/20">{error}</p>
      )}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
        >
          {loading ? 'Saving...' : isEdit ? 'Update Article' : 'Publish Article'}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-3 border border-border rounded-lg font-medium hover:bg-muted transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}
