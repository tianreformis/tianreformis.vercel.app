'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Project } from '@/types'
import ProjectCard from '@/components/ui/ProjectCard'
import { useLanguage } from '@/context/LanguageContext'

export default function ProjectsSection({ projects }: { projects: Project[] }) {
  const { t, lang } = useLanguage()
  const [activeCategory, setActiveCategory] = useState('All')

  const categories = ['All', ...Array.from(new Set(projects.map((p) => p.category)))]
  const filteredProjects = activeCategory === 'All' ? projects : projects.filter((p) => p.category === activeCategory)

  return (
    <section id="projects" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold">{t('featuredProjects')}</h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            {t('featuredDesc')}
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === category
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              {category === 'All' ? (lang === 'id' ? 'Semua' : 'All') : category}
            </button>
          ))}
        </div>

        <motion.div
          layout
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>

        {filteredProjects.length === 0 && (
          <p className="text-center text-muted-foreground mt-8">
            {t('noProjects')}
          </p>
        )}
      </div>
    </section>
  )
}
