import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions)

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="border-b border-border bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <a href="/admin" className="text-lg font-bold hover:text-primary transition-colors">
            Admin Panel
          </a>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">{session?.user?.name}</span>
            <a href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              View Site &rarr;
            </a>
          </div>
        </div>
      </div>
      {children}
    </div>
  )
}
