'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface DeleteButtonProps {
  id: string
  type: 'project' | 'blog' | 'skill' | 'message'
  onDeleted?: () => void
}

export default function DeleteButton({ id, type, onDeleted }: DeleteButtonProps) {
  const router = useRouter()
  const [confirming, setConfirming] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [error, setError] = useState('')

  const handleDelete = async () => {
    if (!confirming) {
      setConfirming(true)
      return
    }

    setDeleting(true)
    setError('')

    try {
      const endpoint = type === 'project'
        ? `/api/projects/${id}`
        : type === 'blog'
          ? `/api/blog/${id}`
          : type === 'skill'
            ? `/api/skills/${id}`
            : `/api/messages?id=${id}`

      const res = await fetch(endpoint, { method: 'DELETE' })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        setError(data.error || 'Failed to delete')
        setConfirming(false)
        return
      }

      router.refresh()
      onDeleted?.()
    } catch {
      setError('Network error. Please try again.')
      setConfirming(false)
    }

    setDeleting(false)
  }

  if (error) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-xs text-destructive">{error}</span>
        <button
          onClick={() => { setError(''); setConfirming(false) }}
          className="px-2 py-1 bg-muted rounded text-xs hover:bg-muted/80"
        >
          Dismiss
        </button>
      </div>
    )
  }

  if (confirming) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-xs text-destructive">Confirm?</span>
        <button
          onClick={handleDelete}
          disabled={deleting}
          className="px-2 py-1 bg-destructive text-destructive-foreground rounded text-xs hover:bg-destructive/90 disabled:opacity-50"
        >
          {deleting ? '...' : 'Yes'}
        </button>
        <button
          onClick={() => setConfirming(false)}
          className="px-2 py-1 bg-muted rounded text-xs hover:bg-muted/80"
        >
          No
        </button>
      </div>
    )
  }

  return (
    <button
      onClick={handleDelete}
      className="p-2 hover:bg-destructive/10 hover:text-destructive rounded-lg transition-colors"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
    </button>
  )
}
