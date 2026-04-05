'use client'

import { useEffect, useState, useCallback } from 'react'

type Theme = 'system' | 'light' | 'dark'

function getSystemTheme(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'dark'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function applyTheme(theme: Theme) {
  const resolved = theme === 'system' ? getSystemTheme() : theme
  document.documentElement.classList.toggle('dark', resolved === 'dark')
  document.documentElement.classList.toggle('light', resolved === 'light')
}

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>('system')

  useEffect(() => {
    const saved = localStorage.getItem('theme') as Theme | null
    const initial = (saved === 'system' || saved === 'light' || saved === 'dark') ? saved : 'system'
    setThemeState(initial)
    applyTheme(initial)

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = () => {
      if (localStorage.getItem('theme') === 'system' || !localStorage.getItem('theme')) {
        applyTheme('system')
      }
    }
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  const setTheme = useCallback((t: Theme) => {
    setThemeState(t)
    localStorage.setItem('theme', t)
    applyTheme(t)
  }, [])

  const cycleTheme = useCallback(() => {
    const next: Record<Theme, Theme> = { system: 'light', light: 'dark', dark: 'system' }
    setTheme(next[theme])
  }, [theme, setTheme])

  return { theme, setTheme, cycleTheme }
}
