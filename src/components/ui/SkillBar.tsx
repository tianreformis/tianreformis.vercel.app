'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  SiNextdotjs, SiReact, SiTypescript, SiTailwindcss, SiShadcnui, SiFramer,
  SiNodedotjs, SiExpress, SiPython, SiFastapi,
  SiPostgresql, SiSqlite, SiMongodb, SiPrisma, SiSupabase,
  SiDocker, SiNetlify, SiVercel, SiCloudinary,
  SiOpenai, SiGoogle,
  SiJavascript, SiHtml5, SiCss,
  SiGit, SiGithubactions,
  SiRedis, SiFirebase,
} from 'react-icons/si'
import { BsCpu } from 'react-icons/bs'

const iconMap: Record<string, React.ElementType> = {
  'Next.js': SiNextdotjs,
  'React': SiReact,
  'TypeScript': SiTypescript,
  'JavaScript': SiJavascript,
  'Tailwind CSS': SiTailwindcss,
  'Shadcn UI': SiShadcnui,
  'Framer Motion': SiFramer,
  'Node.js': SiNodedotjs,
  'Express': SiExpress,
  'Python': SiPython,
  'FastAPI': SiFastapi,
  'PostgreSQL': SiPostgresql,
  'SQLite': SiSqlite,
  'MongoDB': SiMongodb,
  'Prisma': SiPrisma,
  'Supabase': SiSupabase,
  'Docker': SiDocker,
  'Netlify': SiNetlify,
  'Vercel': SiVercel,
  'Cloudinary': SiCloudinary,
  'OpenAI': SiOpenai,
  'OpenRouter': BsCpu,
  'AI Integration': BsCpu,
  'AI Automation': BsCpu,
  'Prompt Engineering': BsCpu,
  'Google AI': SiGoogle,
  'NextAuth': SiNextdotjs,
  'JWT': SiJavascript,
  'HTML/CSS': SiHtml5,
  'Git': SiGit,
  'CI/CD': SiGithubactions,
  'Redis': SiRedis,
  'Firebase': SiFirebase,
}

const colorMap: Record<string, string> = {
  'Frontend': 'from-blue-500 to-cyan-400',
  'Backend': 'from-green-500 to-emerald-400',
  'Database': 'from-yellow-500 to-orange-400',
  'DevOps': 'from-purple-500 to-pink-400',
  'AI & Automation': 'from-rose-500 to-fuchsia-400',
  'AI': 'from-rose-500 to-fuchsia-400',
}

interface SkillBarProps {
  name: string
  level: number
  delay?: number
}

export default function SkillBar({ name, level, delay = 0 }: SkillBarProps) {
  const [animated, setAnimated] = useState(false)
  const Icon = iconMap[name]

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(true), 200 + delay)
    return () => clearTimeout(timer)
  }, [delay])

  const getLevelColor = () => {
    if (level >= 90) return 'from-emerald-500 to-green-400'
    if (level >= 80) return 'from-blue-500 to-cyan-400'
    if (level >= 70) return 'from-yellow-500 to-amber-400'
    return 'from-orange-500 to-red-400'
  }

  return (
    <motion.div
      className="group p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center gap-3 mb-3">
        {Icon && (
          <div className="p-2 rounded-lg bg-muted group-hover:bg-primary/10 transition-colors">
            <Icon size={20} className="text-muted-foreground group-hover:text-primary transition-colors" />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-foreground truncate">{name}</span>
            <span className="text-xs font-mono text-muted-foreground ml-2">{level}%</span>
          </div>
        </div>
      </div>

      <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
        <motion.div
          className={`h-full rounded-full bg-gradient-to-r ${getLevelColor()}`}
          initial={{ width: 0 }}
          animate={animated ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1, ease: 'easeOut', delay: delay * 0.05 }}
        />
      </div>
    </motion.div>
  )
}

export { colorMap }
