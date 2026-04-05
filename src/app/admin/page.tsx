import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getAllProjects } from '@/services/project.service'
import { getAllBlogs } from '@/services/blog.service'
import { getAllSkills } from '@/services/skill.service'
import { getAllMessages } from '@/services/message.service'
import Link from 'next/link'
import { FiFolder, FiFileText, FiTool, FiMail, FiPlus, FiEdit2, FiEye, FiHeart } from 'react-icons/fi'
import { Project, Blog, Skill, Message } from '@/types'

export const dynamic = 'force-dynamic'

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/admin/login')

  const projects = await getAllProjects(undefined, undefined, true) as Project[]
  const blogs = await getAllBlogs() as Blog[]
  const skills = await getAllSkills() as Skill[]
  const messages = await getAllMessages() as Message[]
  const unreadMessages = messages.filter((m) => !m.is_read).length

  const stats = [
    { label: 'Projects', value: projects.length, icon: FiFolder, color: 'text-blue-500', href: '/admin/projects', badge: projects.filter(p => p.visibility === 'public').length },
    { label: 'Blog Posts', value: blogs.length, icon: FiFileText, color: 'text-green-500', href: '/admin/blog' },
    { label: 'Skills', value: skills.length, icon: FiTool, color: 'text-yellow-500', href: '/admin/skills' },
    { label: 'Messages', value: messages.length, icon: FiMail, color: 'text-purple-500', href: '/admin/messages', badge: unreadMessages },
  ]

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="border-b border-border bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold">Dashboard</h1>
          <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            View Site &rarr;
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <Link key={stat.label} href={stat.href} className="bg-card rounded-xl p-6 border border-border hover:border-primary/50 transition-colors block">
              <div className="flex items-center justify-between mb-4">
                <stat.icon className={stat.color} size={24} />
                {stat.badge !== undefined && stat.badge > 0 && (
                  <span className="bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full">
                    {stat.badge} {stat.label === 'Projects' ? 'public' : stat.label === 'Messages' ? 'unread' : 'new'}
                  </span>
                )}
              </div>
              <p className="text-3xl font-bold">{stat.value}</p>
              <p className="text-muted-foreground text-sm mt-1">{stat.label}</p>
            </Link>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Link href="/admin/projects/new" className="flex items-center gap-3 p-4 bg-card rounded-xl border border-border hover:border-primary/50 transition-colors group">
            <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500 group-hover:bg-blue-500/20 transition-colors">
              <FiPlus size={20} />
            </div>
            <div>
              <p className="text-sm font-medium">Add Project</p>
              <p className="text-xs text-muted-foreground">Create new project</p>
            </div>
          </Link>
          <Link href="/admin/blog/new" className="flex items-center gap-3 p-4 bg-card rounded-xl border border-border hover:border-primary/50 transition-colors group">
            <div className="p-2 rounded-lg bg-green-500/10 text-green-500 group-hover:bg-green-500/20 transition-colors">
              <FiPlus size={20} />
            </div>
            <div>
              <p className="text-sm font-medium">Add Article</p>
              <p className="text-xs text-muted-foreground">Write new blog post</p>
            </div>
          </Link>
          <Link href="/admin/skills" className="flex items-center gap-3 p-4 bg-card rounded-xl border border-border hover:border-primary/50 transition-colors group">
            <div className="p-2 rounded-lg bg-yellow-500/10 text-yellow-500 group-hover:bg-yellow-500/20 transition-colors">
              <FiTool size={20} />
            </div>
            <div>
              <p className="text-sm font-medium">Manage Skills</p>
              <p className="text-xs text-muted-foreground">Add or edit skills</p>
            </div>
          </Link>
          <Link href="/admin/messages" className="flex items-center gap-3 p-4 bg-card rounded-xl border border-border hover:border-primary/50 transition-colors group">
            <div className="p-2 rounded-lg bg-purple-500/10 text-purple-500 group-hover:bg-purple-500/20 transition-colors">
              <FiMail size={20} />
            </div>
            <div>
              <p className="text-sm font-medium">View Messages</p>
              <p className="text-xs text-muted-foreground">{unreadMessages > 0 ? `${unreadMessages} unread` : 'No new messages'}</p>
            </div>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Recent Projects with CRUD */}
          <div className="bg-card rounded-xl p-6 border border-border">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Recent Projects</h2>
              <Link href="/admin/projects" className="text-sm text-primary hover:underline">
                View all
              </Link>
            </div>
            <div className="space-y-3">
              {projects.slice(0, 5).map((project) => (
                <div key={project.id} className="flex items-center justify-between py-2 border-b border-border last:border-0 group">
                  <div className="flex items-center gap-3 min-w-0">
                    <img src={project.thumbnail || 'https://via.placeholder.com/40'} alt="" className="w-8 h-8 rounded object-cover flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="font-medium text-sm truncate">{project.title}</p>
                      <div className="flex items-center gap-2">
                        <span className={`px-1.5 py-0.5 rounded text-xs ${project.visibility === 'private' ? 'bg-yellow-500/10 text-yellow-500' : 'bg-green-500/10 text-green-500'}`}>
                          {project.visibility}
                        </span>
                        <span className="text-xs text-muted-foreground">{project.category}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-xs text-muted-foreground flex items-center gap-1"><FiEye size={10} /> {project.views}</span>
                    <span className="text-xs text-muted-foreground flex items-center gap-1"><FiHeart size={10} /> {project.likes}</span>
                    <Link href={`/admin/projects/edit/${project.id}`} className="p-1.5 hover:bg-muted rounded opacity-0 group-hover:opacity-100 transition-all">
                      <FiEdit2 size={14} />
                    </Link>
                  </div>
                </div>
              ))}
              {projects.length === 0 && <p className="text-muted-foreground text-sm">No projects yet</p>}
            </div>
          </div>

          {/* Recent Blog Posts with CRUD */}
          <div className="bg-card rounded-xl p-6 border border-border">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Recent Articles</h2>
              <Link href="/admin/blog" className="text-sm text-primary hover:underline">
                View all
              </Link>
            </div>
            <div className="space-y-3">
              {blogs.slice(0, 5).map((blog) => (
                <div key={blog.id} className="flex items-center justify-between py-2 border-b border-border last:border-0 group">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-sm truncate">{blog.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(blog.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-xs text-muted-foreground flex items-center gap-1"><FiEye size={10} /> {blog.views}</span>
                    <Link href={`/admin/blog/edit/${blog.id}`} className="p-1.5 hover:bg-muted rounded opacity-0 group-hover:opacity-100 transition-all">
                      <FiEdit2 size={14} />
                    </Link>
                  </div>
                </div>
              ))}
              {blogs.length === 0 && <p className="text-muted-foreground text-sm">No articles yet</p>}
            </div>
          </div>

          {/* Skills List */}
          <div className="bg-card rounded-xl p-6 border border-border">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Skills</h2>
              <Link href="/admin/skills" className="text-sm text-primary hover:underline">
                Manage
              </Link>
            </div>
            <div className="space-y-3">
              {skills.slice(0, 8).map((skill) => (
                <div key={skill.id} className="flex items-center justify-between py-1.5">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium truncate">{skill.name}</span>
                      <span className="text-xs text-muted-foreground ml-2">{skill.level}%</span>
                    </div>
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${skill.level >= 90 ? 'bg-emerald-500' : skill.level >= 80 ? 'bg-blue-500' : skill.level >= 70 ? 'bg-yellow-500' : 'bg-orange-500'}`}
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
              {skills.length === 0 && <p className="text-muted-foreground text-sm">No skills yet</p>}
            </div>
          </div>

          {/* Recent Messages */}
          <div className="bg-card rounded-xl p-6 border border-border">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Recent Messages</h2>
              <Link href="/admin/messages" className="text-sm text-primary hover:underline">
                View all
              </Link>
            </div>
            <div className="space-y-3">
              {messages.slice(0, 5).map((message) => (
                <div key={message.id} className="py-2 border-b border-border last:border-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 min-w-0">
                      <p className="font-medium text-sm truncate">{message.name}</p>
                      {!message.is_read && <span className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />}
                    </div>
                    <span className="text-xs text-muted-foreground flex-shrink-0 ml-2">
                      {new Date(message.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground truncate mt-0.5">{message.message}</p>
                </div>
              ))}
              {messages.length === 0 && <p className="text-muted-foreground text-sm">No messages yet</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
