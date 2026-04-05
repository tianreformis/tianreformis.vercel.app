'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { FiArrowDown, FiGithub, FiLinkedin, FiMail, FiGlobe } from 'react-icons/fi'
import { useLanguage } from '@/context/LanguageContext'

export default function HeroSection() {
  const { lang, setLang, t } = useLanguage()

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium rounded-full bg-primary/10 text-primary border border-primary/20">
              {t('availableFreelance')}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight"
          >
            {t('hiIm')}{' '}
            <span className="bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Kristian Reformis
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
          >
            {t('heroSubtitle')}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-4 text-base text-muted-foreground/70 max-w-2xl mx-auto"
          >
            {t('heroDescription')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="#projects"
              className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              {t('viewProjects')}
            </Link>
            <Link
              href="#contact"
              className="px-8 py-3 border border-border rounded-lg font-medium hover:bg-muted transition-colors"
            >
              {t('contactMe')}
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-10 flex items-center justify-center gap-4"
          >
            <a
              href="https://github.com/tianreformis"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-lg bg-muted hover:bg-muted/80 transition-colors text-muted-foreground hover:text-foreground"
            >
              <FiGithub size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/kristian-reformis-1148291b2/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-lg bg-muted hover:bg-muted/80 transition-colors text-muted-foreground hover:text-foreground"
            >
              <FiLinkedin size={20} />
            </a>
            <a
              href="mailto:tianreformis.work@gmail.com"
              className="p-3 rounded-lg bg-muted hover:bg-muted/80 transition-colors text-muted-foreground hover:text-foreground"
            >
              <FiMail size={20} />
            </a>
            <button
              onClick={() => setLang(lang === 'id' ? 'en' : 'id')}
              className="p-3 rounded-lg bg-muted hover:bg-muted/80 transition-colors text-muted-foreground hover:text-foreground flex items-center gap-2"
              title={lang === 'id' ? 'Switch to English' : 'Ganti ke Bahasa Indonesia'}
            >
              <FiGlobe size={20} />
              <span className="text-sm font-medium">{lang === 'id' ? 'EN' : 'ID'}</span>
            </button>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <a href="#about" className="animate-bounce text-muted-foreground">
          <FiArrowDown size={24} />
        </a>
      </motion.div>
    </section>
  )
}
