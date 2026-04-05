import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getAllSkills } from '@/services/skill.service'
import SkillForm from '@/components/admin/SkillForm'
import { Skill } from '@/types'

export const dynamic = 'force-dynamic'

export default async function AdminSkillsPage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/admin/login')

  const skills = await getAllSkills() as Skill[]

  const groupedSkills = skills.reduce<Record<string, typeof skills>>((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = []
    acc[skill.category].push(skill)
    return acc
  }, {})

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="border-b border-border bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">Manage Skills</h1>
            <p className="text-sm text-muted-foreground mt-1">{skills.length} skills total</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="md:col-span-1">
            <div className="bg-card rounded-xl p-6 border border-border sticky top-24">
              <h2 className="text-lg font-semibold mb-4">Add New Skill</h2>
              <SkillForm />
            </div>
          </div>

          <div className="md:col-span-2 space-y-6">
            {Object.entries(groupedSkills).map(([category, categorySkills]) => (
              <div key={category} className="bg-card rounded-xl p-6 border border-border">
                <h3 className="text-lg font-semibold mb-4">{category}</h3>
                <div className="space-y-3">
                  {categorySkills.map((skill) => (
                    <div key={skill.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium text-sm">{skill.name}</span>
                          <span className="text-sm text-muted-foreground">{skill.level}%</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${skill.level >= 90 ? 'bg-green-500' : skill.level >= 70 ? 'bg-blue-500' : 'bg-yellow-500'}`}
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        <SkillForm initialData={skill} isEdit />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
