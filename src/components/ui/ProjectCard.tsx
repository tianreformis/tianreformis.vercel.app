'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { FiExternalLink, FiGithub, FiEye, FiHeart } from 'react-icons/fi'
import { Project } from '@/types'

interface ProjectCardProps {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <motion.article
      className="group overflow-hidden rounded-xl border border-border bg-card hover:border-primary/50 transition-colors"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
    >
      <Link href={`/projects/${project.slug}`}>
        <div className="relative overflow-hidden">
          <motion.img
            src={project.thumbnail || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80'}
            alt={project.title}
            className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
          {project.visibility === 'private' && (
            <span className="absolute top-3 right-3 px-2 py-1 bg-yellow-500/90 text-white rounded-full text-xs font-medium">
              Private
            </span>
          )}
        </div>
      </Link>

      <div className="p-5">
        <Link href={`/projects/${project.slug}`}>
          <h3 className="mb-2 text-lg font-semibold text-foreground hover:text-primary transition-colors">
            {project.title}
          </h3>
        </Link>
        <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">
          {project.description}
        </p>

        <div className="mb-4 flex flex-wrap gap-2">
          {project.tech_stack.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground"
            >
              {tech}
            </span>
          ))}
          {project.tech_stack.length > 4 && (
            <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
              +{project.tech_stack.length - 4}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between border-t border-border pt-4">
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <FiEye size={14} />
              {project.views}
            </span>
            <span className="flex items-center gap-1">
              <FiHeart size={14} />
              {project.likes}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {project.github_url && (
              <a
                href={project.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                aria-label="View source code"
              >
                <FiGithub size={16} />
              </a>
            )}
            {project.demo_url && (
              <a
                href={project.demo_url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                aria-label="View live demo"
              >
                <FiExternalLink size={16} />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  )
}
