'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Blog } from '@/types'
import BlogCard from '@/components/ui/BlogCard'
import { useLanguage } from '@/context/LanguageContext'

export default function BlogSection({ blogs }: { blogs: Blog[] }) {
  const { t } = useLanguage()

  return (
    <section id="blog" className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold">{t('latestArticles')}</h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            {t('articlesDesc')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.slice(0, 3).map((blog, index) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <BlogCard blog={blog} />
            </motion.div>
          ))}
        </div>

        {blogs.length === 0 && (
          <p className="text-center text-muted-foreground mt-8">
            {t('noArticles')}
          </p>
        )}

        {blogs.length > 3 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-6 py-3 border border-border rounded-lg font-medium hover:bg-muted transition-colors"
            >
              {t('viewAllArticles')}
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  )
}
