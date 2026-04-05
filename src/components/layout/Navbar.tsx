'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { FiMenu, FiX, FiMoon, FiSun, FiMonitor, FiGlobe } from 'react-icons/fi'
import { useLanguage } from '@/context/LanguageContext'
import { useTheme } from '@/hooks/useTheme'

export default function Navbar() {
  const pathname = usePathname()
  const { lang, setLang } = useLanguage()
  const { theme, cycleTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)

  const isAdminPage = pathname?.startsWith('/admin')
  if (isAdminPage) return null

  const navLinks = [
    { href: '/', label: lang === 'id' ? 'Beranda' : 'Home' },
    { href: '/#about', label: lang === 'id' ? 'Tentang' : 'About' },
    { href: '/#projects', label: lang === 'id' ? 'Project' : 'Projects' },
    { href: '/blog', label: 'Blog' },
    { href: '/#contact', label: lang === 'id' ? 'Kontak' : 'Contact' },
  ]

  const ThemeIcon = theme === 'dark' ? FiSun : theme === 'light' ? FiMoon : FiMonitor

  const themeLabel = theme === 'system' ? 'System' : theme === 'dark' ? 'Dark' : 'Light'

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-bold text-foreground">
            KR
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-muted-foreground hover:text-foreground transition-colors text-sm"
              >
                {link.label}
              </Link>
            ))}

            <button
              onClick={cycleTheme}
              className="p-2 rounded-md hover:bg-muted transition-colors flex items-center gap-1.5 text-muted-foreground hover:text-foreground"
              title={`Theme: ${themeLabel} (click to cycle)`}
            >
              <ThemeIcon size={18} />
            </button>

            <button
              onClick={() => setLang(lang === 'id' ? 'en' : 'id')}
              className="p-2 rounded-md hover:bg-muted transition-colors flex items-center gap-1.5 text-muted-foreground hover:text-foreground"
            >
              <FiGlobe size={18} />
              <span className="text-sm font-medium">{lang === 'id' ? 'EN' : 'ID'}</span>
            </button>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-foreground"
          >
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-background border-t border-border">
          <div className="px-4 py-3 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block py-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="flex items-center gap-3 pt-2 border-t border-border">
              <button
                onClick={() => { cycleTheme(); setIsOpen(false) }}
                className="flex items-center gap-2 py-2 text-muted-foreground hover:text-foreground"
              >
                <ThemeIcon size={16} />
                {themeLabel}
              </button>
              <button
                onClick={() => { setLang(lang === 'id' ? 'en' : 'id'); setIsOpen(false) }}
                className="flex items-center gap-2 py-2 text-muted-foreground hover:text-foreground"
              >
                <FiGlobe size={16} />
                {lang === 'id' ? 'English' : 'Bahasa Indonesia'}
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
