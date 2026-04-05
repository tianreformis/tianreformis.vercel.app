import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { getBlogBySlug } from '@/services/blog.service'
import { FiCalendar, FiEye } from 'react-icons/fi'
import Link from 'next/link'
import { Blog } from '@/types'
import TrackView from '@/components/ui/TrackView'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const blog = await getBlogBySlug(slug) as Blog | null
  if (!blog) return { title: 'Blog Not Found' }

  return {
    title: blog.title,
    description: blog.content.slice(0, 160).replace(/[#*`]/g, ''),
    openGraph: {
      title: blog.title,
      description: blog.content.slice(0, 160).replace(/[#*`]/g, ''),
      images: blog.cover_image ? [{ url: blog.cover_image }] : [],
    },
  }
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const blog = await getBlogBySlug(slug) as Blog | null
  if (!blog) notFound()

  const renderContent = (content: string) => {
    const lines = content.split('\n')
    const elements: React.ReactNode[] = []
    let inCodeBlock = false
    let codeContent = ''
    let codeLang = ''

    lines.forEach((line, i) => {
      if (line.startsWith('```')) {
        if (inCodeBlock) {
          elements.push(
            <pre key={`code-${i}`} className="bg-muted p-4 rounded-lg overflow-x-auto my-4 text-sm">
              <code>{codeContent.trim()}</code>
            </pre>
          )
          codeContent = ''
          inCodeBlock = false
        } else {
          inCodeBlock = true
          codeLang = line.replace('```', '')
        }
        return
      }

      if (inCodeBlock) {
        codeContent += line + '\n'
        return
      }

      if (line.startsWith('# ')) {
        elements.push(<h1 key={i} className="text-3xl font-bold mt-8 mb-4">{line.replace('# ', '')}</h1>)
      } else if (line.startsWith('## ')) {
        elements.push(<h2 key={i} className="text-2xl font-semibold mt-6 mb-3">{line.replace('## ', '')}</h2>)
      } else if (line.startsWith('### ')) {
        elements.push(<h3 key={i} className="text-xl font-semibold mt-4 mb-2">{line.replace('### ', '')}</h3>)
      } else if (line.startsWith('- **')) {
        const match = line.match(/- \*\*(.+?)\*\*: (.+)/)
        if (match) {
          elements.push(
            <li key={i} className="ml-4 text-muted-foreground">
              <strong className="text-foreground">{match[1]}</strong>: {match[2]}
            </li>
          )
        } else {
          elements.push(<li key={i} className="ml-4 text-muted-foreground">{line.replace(/- \*\*|\*\*/g, '')}</li>)
        }
      } else if (line.startsWith('- ')) {
        elements.push(<li key={i} className="ml-4 text-muted-foreground">{line.replace('- ', '')}</li>)
      } else if (line.startsWith('1. ') || line.startsWith('2. ') || line.startsWith('3. ') || line.startsWith('4. ') || line.startsWith('5. ')) {
        const numMatch = line.match(/^\d+\.\s(.+)/)
        if (numMatch) {
          elements.push(<li key={i} className="ml-4 text-muted-foreground list-decimal">{numMatch[1]}</li>)
        }
      } else if (line.trim() === '') {
        elements.push(<br key={i} />)
      } else if (line.startsWith('**') && line.endsWith('**')) {
        elements.push(<p key={i} className="font-semibold text-foreground my-2">{line.replace(/\*\*/g, '')}</p>)
      } else {
        const processedLine = line.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/`(.+?)`/g, '<code class="bg-muted px-1 py-0.5 rounded text-sm">$1</code>')
        elements.push(
          <p key={i} className="text-muted-foreground leading-relaxed" dangerouslySetInnerHTML={{ __html: processedLine }} />
        )
      }
    })

    return elements
  }

  return (
    <div className="py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/blog" className="text-muted-foreground hover:text-foreground transition-colors mb-8 inline-block">
          &larr; Back to Blog
        </Link>

        {blog.cover_image && (
          <div className="mb-8">
            <img src={blog.cover_image} alt={blog.title} className="w-full h-64 md:h-80 object-cover rounded-xl" />
          </div>
        )}

        <div className="flex items-center gap-4 mb-6 text-muted-foreground text-sm">
          <span className="flex items-center gap-1">
            <FiCalendar size={14} />
            {new Date(blog.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </span>
          <span className="flex items-center gap-1">
            <FiEye size={14} /> {blog.views} views
          </span>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold mb-8">{blog.title}</h1>

        <div className="prose prose-invert max-w-none">
          {renderContent(blog.content)}
        </div>
      </div>

      <TrackView slug={slug} type="blog" />
    </div>
  )
}
