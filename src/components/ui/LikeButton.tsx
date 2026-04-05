'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiHeart } from 'react-icons/fi'

interface LikeButtonProps {
  projectId: string
  initialLikes: number
}

export default function LikeButton({ projectId, initialLikes }: LikeButtonProps) {
  const [likes, setLikes] = useState(initialLikes)
  const [liked, setLiked] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem(`project_liked_${projectId}`)
    if (saved) setLiked(true)
  }, [projectId])

  const handleLike = async () => {
    if (liked || loading) return
    setLoading(true)
    try {
      const res = await fetch(`/api/projects/${projectId}`, { method: 'POST' })
      if (res.ok) {
        const data = await res.json()
        setLikes(data.likes)
        setLiked(true)
        localStorage.setItem(`project_liked_${projectId}`, 'true')
      }
    } catch {
      console.error('Failed to like project')
    }
    setLoading(false)
  }

  return (
    <motion.button
      onClick={handleLike}
      disabled={liked || loading}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
        liked
          ? 'bg-red-500/10 text-red-500 border border-red-500/20 cursor-not-allowed'
          : 'bg-muted text-muted-foreground hover:bg-red-500/10 hover:text-red-500 border border-transparent hover:border-red-500/20'
      } disabled:opacity-50`}
      whileTap={!liked ? { scale: 0.9 } : {}}
    >
      <FiHeart size={14} className={liked ? 'fill-red-500' : ''} />
      {likes} {liked ? 'Liked' : 'Like'}
    </motion.button>
  )
}
