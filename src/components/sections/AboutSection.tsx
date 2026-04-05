'use client'

import { motion } from 'framer-motion'
import { Skill } from '@/types'
import SkillBar, { colorMap } from '@/components/ui/SkillBar'
import { FiCode, FiServer, FiDatabase, FiTool, FiCpu, FiAward, FiTrendingUp } from 'react-icons/fi'
import { BsRobot } from 'react-icons/bs'
import { useLanguage } from '@/context/LanguageContext'

const categoryIcons: Record<string, React.ElementType> = {
  Frontend: FiCode,
  Backend: FiServer,
  Database: FiDatabase,
  DevOps: FiTool,
  AI: BsRobot,
  'AI & Automation': FiCpu,
}

const categoryLabels: Record<string, { id: string; en: string }> = {
  Frontend: { id: 'Frontend Development', en: 'Frontend Development' },
  Backend: { id: 'Backend Development', en: 'Backend Development' },
  Database: { id: 'Database & ORM', en: 'Database & ORM' },
  DevOps: { id: 'DevOps & Deployment', en: 'DevOps & Deployment' },
  AI: { id: 'AI & Machine Learning', en: 'AI & Machine Learning' },
  'AI & Automation': { id: 'AI & Automation', en: 'AI & Automation' },
}

export default function AboutSection({ skills }: { skills: Skill[] }) {
  const { t, lang } = useLanguage()

  const groupedSkills = skills.reduce<Record<string, Skill[]>>((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = []
    acc[skill.category].push(skill)
    return acc
  }, {})

  const avgLevel = (catSkills: Skill[]) =>
    Math.round(catSkills.reduce((sum, s) => sum + s.level, 0) / catSkills.length)

  const whatIDoItems = [
    t('webAppDev'),
    t('apiDesign'),
    t('dbArchitecture'),
    t('uiuxImpl'),
    t('perfOpt'),
    t('techConsult'),
    t('aiIntegration'),
  ]

  return (
    <section id="about" className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold">{t('aboutMe')}</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-card rounded-xl p-6 border border-border"
          >
            <p className="text-muted-foreground leading-relaxed">
              {t('aboutDescription')}
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              {t('aboutDescription2')}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-card rounded-xl p-6 border border-border"
          >
            <h3 className="text-xl font-semibold mb-4">{t('whatIDo')}</h3>
            <ul className="space-y-3">
              {whatIDoItems.map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-muted-foreground">
                  <span className="w-2 h-2 bg-primary rounded-full" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* My Skills Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <FiAward size={16} />
              {lang === 'id' ? 'Keahlian' : 'Expertise'}
            </div>
            <h3 className="text-3xl md:text-4xl font-bold mb-3">{lang === 'id' ? 'Skill & Teknologi' : 'My Skills'}</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {lang === 'id'
                ? 'Teknologi dan tools yang saya gunakan sehari-hari untuk membangun aplikasi modern.'
                : 'Technologies and tools I use daily to build modern applications.'}
            </p>
          </div>

          {/* Category Stats */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-12">
            {Object.entries(groupedSkills).map(([category, catSkills]) => {
              const Icon = categoryIcons[category] || FiCode
              const avg = avgLevel(catSkills)
              const label = categoryLabels[category] || { id: category, en: category }
              return (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="bg-card rounded-xl p-4 border border-border text-center hover:border-primary/30 transition-colors"
                >
                  <div className="flex justify-center mb-2">
                    <div className="p-3 rounded-full bg-primary/10">
                      <Icon size={24} className="text-primary" />
                    </div>
                  </div>
                  <p className="text-sm font-semibold text-foreground">{lang === 'id' ? label.id : label.en}</p>
                  <div className="mt-2 flex items-center justify-center gap-1 text-xs text-muted-foreground">
                    <FiTrendingUp size={12} />
                    <span>{avg}% avg</span>
                  </div>
                  <div className="mt-2 h-1.5 w-full bg-muted rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full rounded-full bg-gradient-to-r ${colorMap[category] || 'from-primary to-blue-400'}`}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${avg}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                    />
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Detailed Skill Bars */}
          {Object.entries(groupedSkills).map(([category, catSkills]) => {
            const Icon = categoryIcons[category] || FiCode
            const label = categoryLabels[category] || { id: category, en: category }
            return (
              <div key={category} className="mb-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Icon size={20} className="text-primary" />
                  </div>
                  <h4 className="text-xl font-bold">{lang === 'id' ? label.id : label.en}</h4>
                  <span className="text-sm text-muted-foreground ml-auto">{catSkills.length} {lang === 'id' ? 'tools' : 'tools'}</span>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {catSkills.map((skill, i) => (
                    <SkillBar
                      key={skill.id}
                      name={skill.name}
                      level={skill.level}
                      delay={i}
                    />
                  ))}
                </div>
              </div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
