'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { FiEdit2, FiTrash2 } from 'react-icons/fi'

interface SkillFormProps {
  initialData?: {
    id: string
    name: string
    level: number
    category: string
  }
  isEdit?: boolean
}

export default function SkillForm({ initialData, isEdit = false }: SkillFormProps) {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    level: initialData?.level || 50,
    category: initialData?.category || 'Frontend',
  })
  const [loading, setLoading] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [showForm, setShowForm] = useState(!isEdit)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const url = isEdit ? `/api/skills/${initialData?.id}` : '/api/skills'
      const method = isEdit ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        router.refresh()
        if (!isEdit) {
          setFormData({ name: '', level: 50, category: 'Frontend' })
        } else {
          setShowForm(false)
        }
      } else {
        const data = await res.json().catch(() => ({}))
        setError(data.error || 'Failed to save skill')
      }
    } catch {
      setError('Network error. Please try again.')
    }

    setLoading(false)
  }

  const handleDelete = async () => {
    if (!initialData) return
    if (!confirm('Delete this skill?')) return

    setDeleting(true)
    setError('')

    try {
      const res = await fetch(`/api/skills/${initialData.id}`, { method: 'DELETE' })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        setError(data.error || 'Failed to delete skill')
        setDeleting(false)
        return
      }

      router.refresh()
    } catch {
      setError('Network error. Please try again.')
    }

    setDeleting(false)
  }

  if (isEdit && !showForm) {
    return (
      <div className="flex items-center gap-1">
        <button onClick={() => setShowForm(true)} className="p-1.5 hover:bg-muted rounded transition-colors">
          <FiEdit2 size={14} />
        </button>
        <button
          onClick={handleDelete}
          disabled={deleting}
          className="p-1.5 hover:bg-destructive/10 text-destructive rounded transition-colors disabled:opacity-50"
        >
          <FiTrash2 size={14} />
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className={`space-y-3 ${isEdit ? 'bg-muted/30 p-3 rounded-lg' : ''}`}>
      <input
        type="text"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        placeholder="Skill name"
        className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
        required
      />

      <div className="flex items-center gap-3">
        <input
          type="range"
          min="1"
          max="100"
          value={formData.level}
          onChange={(e) => setFormData({ ...formData, level: parseInt(e.target.value) })}
          className="flex-1"
        />
        <span className="text-sm font-medium w-10 text-right">{formData.level}%</span>
      </div>

      <select
        value={formData.category}
        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
        className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
      >
        <option value="Frontend">Frontend</option>
        <option value="Backend">Backend</option>
        <option value="Database">Database</option>
        <option value="DevOps">DevOps</option>
        <option value="AI & Automation">AI & Automation</option>
        <option value="Other">Other</option>
      </select>

      {error && (
        <p className="text-red-500 text-xs bg-red-500/10 p-2 rounded border border-red-500/20">{error}</p>
      )}

      <div className="flex gap-2">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 px-3 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
        >
          {loading ? 'Saving...' : isEdit ? 'Update' : 'Add Skill'}
        </button>
        {isEdit && (
          <button
            type="button"
            onClick={() => { setShowForm(false); setError('') }}
            className="px-3 py-2 border border-border rounded-lg text-sm hover:bg-muted transition-colors"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  )
}
