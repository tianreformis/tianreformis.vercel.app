'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { FiCalendar, FiEye } from 'react-icons/fi'
import { Blog } from '@/types'

interface BlogCardProps {
  blog: Blog
}

export default function BlogCard({ blog }: BlogCardProps) {
  return (
    <motion.article
      className="group overflow-hidden rounded-xl border border-border bg-card hover:border-primary/50 transition-colors"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
    >
      <Link href={`/blog/${blog.slug}`} className="block">
        <div className="relative overflow-hidden">
          <motion.img
            src={blog.cover_image || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80'}
            alt={blog.title}
            className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
        </div>

        <div className="p-5">
          <h3 className="mb-2 text-lg font-semibold text-foreground transition-colors group-hover:text-primary">
            {blog.title}
          </h3>
          <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">
            {blog.content.slice(0, 150).replace(/[#*`]/g, '')}...
          </p>

          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <FiCalendar size={14} />
              {new Date(blog.created_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </span>
            <span className="flex items-center gap-1.5">
              <FiEye size={14} />
              {blog.views}
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  )
}
