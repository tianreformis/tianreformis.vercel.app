'use client'

import { useEffect } from 'react'

export default function TrackView({ slug, type = 'project', projectId }: { slug: string; type?: 'project' | 'blog'; projectId?: string }) {
  useEffect(() => {
    const key = `viewed_${type}_${slug}`
    const lastViewed = sessionStorage.getItem(key)
    
    if (!lastViewed) {
      const endpoint = type === 'project'
        ? `/api/projects/${projectId || slug}?track=true&slug=${slug}`
        : `/api/blog/${projectId || slug}?track=true&slug=${slug}`
      
      fetch(endpoint, { method: 'GET' })
        .catch(() => {})
      sessionStorage.setItem(key, 'true')
    }
  }, [slug, type, projectId])

  return null
}
