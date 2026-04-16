'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { FiX, FiPlus } from 'react-icons/fi'

interface ProjectFormProps {
  initialData?: {
    id?: string
    title: string
    slug: string
    description: string
    content: string
    thumbnail?: string | null
    tech_stack: string[]
    demo_url?: string | null
    github_url?: string | null
    category: string
    visibility?: string
  }
  isEdit?: boolean
  categories: string[]
  techStacks: string[]
}

export default function ProjectForm({ initialData, isEdit = false, categories, techStacks }: ProjectFormProps) {
  const router = useRouter()
  const [allCategories, setAllCategories] = useState<string[]>(categories)
  const [newCategory, setNewCategory] = useState('')
  const [categoryInput, setCategoryInput] = useState(initialData?.category || categories[0] || '')
  const [isCreatingCategory, setIsCreatingCategory] = useState(false)
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    slug: initialData?.slug || '',
    description: initialData?.description || '',
    content: initialData?.content || '',
    thumbnail: initialData?.thumbnail || '',
    tech_stack: initialData?.tech_stack || [] as string[],
    demo_url: initialData?.demo_url || '',
    github_url: initialData?.github_url || '',
    category: initialData?.category || '',
    visibility: initialData?.visibility || 'public',
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [newTech, setNewTech] = useState('')

  useEffect(() => {
    fetch('/api/categories')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setAllCategories(data)
      })
      .catch(() => {})
  }, [])

  const handleCategoryChange = (value: string) => {
    setCategoryInput(value)
    setFormData((prev) => ({ ...prev, category: value }))
  }

  const handleAddCategory = async () => {
    if (!newCategory.trim()) return
    setIsCreatingCategory(true)
    try {
      const res = await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newCategory.trim() }),
      })
      if (res.ok) {
        const created = await res.json()
        if (!allCategories.includes(created.name)) {
          setAllCategories((prev) => [...prev, created.name])
        }
        setCategoryInput(created.name)
        handleCategoryChange(created.name)
        setNewCategory('')
      }
    } catch {}
    setIsCreatingCategory(false)
  }

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

  const addTech = () => {
    if (newTech && !formData.tech_stack.includes(newTech)) {
      setFormData({ ...formData, tech_stack: [...formData.tech_stack, newTech] })
      setNewTech('')
    }
  }

  const removeTech = (tech: string) => {
    setFormData({ ...formData, tech_stack: formData.tech_stack.filter((t) => t !== tech) })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const url = isEdit ? `/api/projects/${initialData?.id}` : '/api/projects'
      const method = isEdit ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        router.push('/admin/projects')
        router.refresh()
      } else {
        const data = await res.json()
        setError(data.error || 'Failed to save project')
      }
    } catch {
      setError('Something went wrong')
    }

    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
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
            className={`w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${isEdit ? 'opacity-50 cursor-not-allowed' : ''}`}
            required
            readOnly={isEdit}
          />
          {isEdit && <p className="text-xs text-muted-foreground mt-1">Slug cannot be changed after creation</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary min-h-[100px]"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Content (Markdown)</label>
        <textarea
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary min-h-[300px] font-mono text-sm"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Thumbnail URL</label>
        <input
          type="url"
          value={formData.thumbnail}
          onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
          className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="https://images.unsplash.com/..."
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">Demo URL</label>
          <input
            type="url"
            value={formData.demo_url}
            onChange={(e) => setFormData({ ...formData, demo_url: e.target.value })}
            className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">GitHub URL</label>
          <input
            type="url"
            value={formData.github_url}
            onChange={(e) => setFormData({ ...formData, github_url: e.target.value })}
            className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Category</label>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={categoryInput}
            onChange={(e) => handleCategoryChange(e.target.value)}
            list="category-list"
            className="flex-1 px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Select or type a category..."
          />
          <datalist id="category-list">
            {allCategories.map((cat) => (
              <option key={cat} value={cat} />
            ))}
          </datalist>
          <button
            type="button"
            onClick={handleAddCategory}
            disabled={!newCategory.trim() || isCreatingCategory}
            className="px-4 py-2 bg-muted rounded-lg hover:bg-muted/80 transition-colors disabled:opacity-50"
          >
            <FiPlus size={16} />
          </button>
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddCategory())}
            className="flex-1 px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
            placeholder="Create new category..."
          />
        </div>
        {allCategories.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {allCategories.filter((c) => c !== categoryInput).map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => handleCategoryChange(cat)}
                className="px-2 py-1 bg-muted/50 rounded-full text-xs hover:bg-muted transition-colors"
              >
                + {cat}
              </button>
            ))}
          </div>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Visibility</label>
        <select
          value={formData.visibility}
          onChange={(e) => setFormData({ ...formData, visibility: e.target.value })}
          className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="public">Public</option>
          <option value="private">Private</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Tech Stack</label>
        <div className="flex flex-wrap gap-2 mb-3">
          {formData.tech_stack.map((tech) => (
            <span key={tech} className="flex items-center gap-1 px-3 py-1.5 bg-muted rounded-full text-sm">
              {tech}
              <button type="button" onClick={() => removeTech(tech)} className="hover:text-destructive">
                <FiX size={14} />
              </button>
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={newTech}
            onChange={(e) => setNewTech(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTech())}
            className="flex-1 px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
            placeholder="Add tech..."
          />
          <button type="button" onClick={addTech} className="px-4 py-2 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
            <FiPlus size={16} />
          </button>
        </div>
        <div className="flex flex-wrap gap-2 mt-3">
          {techStacks.filter((t) => !formData.tech_stack.includes(t)).slice(0, 10).map((tech) => (
            <button
              key={tech}
              type="button"
              onClick={() => setFormData({ ...formData, tech_stack: [...formData.tech_stack, tech] })}
              className="px-2 py-1 bg-muted/50 rounded-full text-xs hover:bg-muted transition-colors"
            >
              + {tech}
            </button>
          ))}
        </div>
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
          {loading ? 'Saving...' : isEdit ? 'Update Project' : 'Create Project'}
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
