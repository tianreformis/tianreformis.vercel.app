import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { getProjectBySlug } from '@/services/project.service'
import { Project } from '@/types'
import { FiExternalLink, FiGithub, FiEye, FiCalendar } from 'react-icons/fi'
import Link from 'next/link'
import LikeButton from '@/components/ui/LikeButton'
import TrackView from '@/components/ui/TrackView'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const project = await getProjectBySlug(slug) as Project | null
  if (!project) return { title: 'Project Not Found' }

  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      images: project.thumbnail ? [{ url: project.thumbnail }] : [],
    },
  }
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = await getProjectBySlug(slug) as Project | null
  if (!project) notFound()

  return (
    <div className="py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/#projects" className="text-muted-foreground hover:text-foreground transition-colors mb-8 inline-block">
          &larr; Back to Projects
        </Link>

        <div className="mb-8">
          <img
            src={project.thumbnail || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80'}
            alt={project.title}
            className="w-full h-64 md:h-96 object-cover rounded-xl"
          />
        </div>

        <div className="flex flex-wrap items-center gap-4 mb-6">
          <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
            {project.category}
          </span>
          {project.visibility === 'private' && (
            <span className="px-3 py-1 bg-yellow-500/10 text-yellow-500 rounded-full text-sm font-medium">
              Private Project
            </span>
          )}
          <span className="flex items-center gap-1 text-muted-foreground text-sm">
            <FiEye size={14} /> {project.views} views
          </span>
          <LikeButton projectId={project.id} initialLikes={project.likes} />
          <span className="flex items-center gap-1 text-muted-foreground text-sm">
            <FiCalendar size={14} /> {new Date(project.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </span>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold mb-4">{project.title}</h1>
        <p className="text-lg text-muted-foreground mb-8">{project.description}</p>

        <div className="flex flex-wrap gap-3 mb-8">
          {project.visibility !== 'private' && project.demo_url && (
            <a href={project.demo_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
              <FiExternalLink size={16} /> Live Demo
            </a>
          )}
          {project.visibility !== 'private' && project.github_url && (
            <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 border border-border rounded-lg hover:bg-muted transition-colors">
              <FiGithub size={16} /> Source Code
            </a>
          )}
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-3">Tech Stack</h3>
          <div className="flex flex-wrap gap-2">
            {project.tech_stack.map((tech) => (
              <span key={tech} className="px-3 py-1.5 bg-muted rounded-full text-sm text-muted-foreground">
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="prose prose-invert max-w-none border-t border-border pt-8">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {project.content}
          </ReactMarkdown>
        </div>
      </div>

      <TrackView slug={slug} />
    </div>
  )
}
