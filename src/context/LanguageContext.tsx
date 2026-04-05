'use client'

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'

type Language = 'id' | 'en'

interface Translations {
  [key: string]: { id: string; en: string }
}

export const translations: Translations = {
  availableFreelance: { id: 'Tersedia untuk freelance', en: 'Available for freelance' },
  hiIm: { id: 'Hai, saya', en: "Hi, I'm" },
  heroSubtitle: {
    id: 'Fullstack Developer yang berspesialisasi dalam membangun aplikasi web modern, integrasi AI, dan otomasi cerdas.',
    en: 'Fullstack Developer specializing in modern web apps, AI integration, and intelligent automation.',
  },
  heroDescription: {
    id: 'Saya membangun aplikasi yang scalable, cepat, dan indah dengan arsitektur bersih — dari web app hingga AI-powered solutions.',
    en: 'I build scalable, fast, and beautiful applications with clean architecture — from web apps to AI-powered solutions.',
  },
  viewProjects: { id: 'Lihat Project', en: 'View Projects' },
  contactMe: { id: 'Hubungi Saya', en: 'Contact Me' },
  aboutMe: { id: 'Tentang Saya', en: 'About Me' },
  aboutDescription: {
    id: 'Developer berpengalaman dengan keahlian di Next.js, React, TypeScript, dan ekosistem modern web development. Saya juga memiliki spesialisasi dalam integrasi AI (OpenRouter/GPT API), AI-powered automation (workflow otomatis, auto analysis, decision support), prompt engineering, pembuatan AI agent, dan pengembangan aplikasi berbasis AI untuk analisis data, trading, dan sistem rekomendasi.',
    en: 'Experienced developer with expertise in Next.js, React, TypeScript, and the modern web development ecosystem. I also specialize in AI integration (OpenRouter/GPT API), AI-powered automation (automated workflows, auto analysis, decision support), prompt engineering, AI agent development, and AI-based applications for data analysis, trading, and recommendation systems.',
  },
  aboutDescription2: {
    id: 'Perjalanan saya di dunia pengembangan software dimulai dari rasa ingin tahu tentang cara kerja website, dan berkembang menjadi karir membangun aplikasi kompleks untuk klien di seluruh dunia. Saya terus belajar dan beradaptasi dengan teknologi baru.',
    en: 'My journey in software development started with curiosity about how websites work, and has evolved into a career building complex applications for clients worldwide. I am constantly learning and adapting to new technologies.',
  },
  whatIDo: { id: 'Apa yang Saya Kerjakan', en: 'What I Do' },
  webAppDev: { id: 'Pengembangan Aplikasi Web', en: 'Web Application Development' },
  apiDesign: { id: 'Desain & Pengembangan API', en: 'API Design & Development' },
  dbArchitecture: { id: 'Arsitektur Database', en: 'Database Architecture' },
  uiuxImpl: { id: 'Implementasi UI/UX', en: 'UI/UX Implementation' },
  perfOpt: { id: 'Optimasi Performa', en: 'Performance Optimization' },
  techConsult: { id: 'Konsultasi Teknis', en: 'Technical Consulting' },
  aiIntegration: { id: 'Integrasi AI & Otomasi', en: 'AI Integration & Automation' },
  skillsTech: { id: 'Skill & Teknologi', en: 'Skills & Technologies' },
  featuredProjects: { id: 'Project Unggulan', en: 'Featured Projects' },
  featuredDesc: {
    id: 'Pilihan project terbaru saya meliputi aplikasi web, project AI, dan aplikasi mobile.',
    en: 'A selection of my recent work spanning web applications, AI projects, and mobile apps.',
  },
  latestArticles: { id: 'Artikel Terbaru', en: 'Latest Articles' },
  articlesDesc: {
    id: 'Pemikiran, tutorial, dan wawasan tentang pengembangan web dan teknologi.',
    en: 'Thoughts, tutorials, and insights about web development and technology.',
  },
  viewAllArticles: { id: 'Lihat Semua Artikel', en: 'View All Articles' },
  getInTouch: { id: 'Hubungi Saya', en: 'Get In Touch' },
  contactDesc: {
    id: 'Punya project yang ingin dikerjakan atau ingin berkolaborasi? Jangan ragu untuk menghubungi saya.',
    en: 'Have a project in mind or want to collaborate? Feel free to reach out.',
  },
  nameLabel: { id: 'Nama', en: 'Name' },
  namePlaceholder: { id: 'Nama Anda', en: 'Your name' },
  emailLabel: { id: 'Email', en: 'Email' },
  emailPlaceholder: { id: 'email@anda.com', en: 'your@email.com' },
  messageLabel: { id: 'Pesan', en: 'Message' },
  messagePlaceholder: { id: 'Ceritakan tentang project Anda...', en: 'Tell me about your project...' },
  sending: { id: 'Mengirim...', en: 'Sending...' },
  sendMessage: { id: 'Kirim Pesan', en: 'Send Message' },
  messageSuccess: { id: 'Pesan berhasil dikirim! Saya akan segera merespons.', en: 'Message sent successfully! I will get back to you soon.' },
  messageError: { id: 'Terjadi kesalahan. Silakan coba lagi.', en: 'Something went wrong. Please try again.' },
  noProjects: { id: 'Tidak ada project di kategori ini.', en: 'No projects found in this category.' },
  noArticles: { id: 'Belum ada artikel.', en: 'No articles published yet.' },
  noMessages: { id: 'Belum ada pesan.', en: 'No messages yet.' },
  backToProjects: { id: '&larr; Kembali ke Project', en: '&larr; Back to Projects' },
  backToBlog: { id: '&larr; Kembali ke Blog', en: '&larr; Back to Blog' },
  views: { id: 'dilihat', en: 'views' },
  likes: { id: 'disukai', en: 'likes' },
  liveDemo: { id: 'Live Demo', en: 'Live Demo' },
  sourceCode: { id: 'Source Code', en: 'Source Code' },
  techStack: { id: 'Tech Stack', en: 'Tech Stack' },
  blog: { id: 'Blog', en: 'Blog' },
  blogPageDesc: {
    id: 'Artikel, tutorial, dan wawasan tentang pengembangan web dan teknologi.',
    en: 'Articles, tutorials, and insights about web development and technology.',
  },
  adminLogin: { id: 'Login Admin', en: 'Admin Login' },
  signInDesc: { id: 'Masuk untuk mengakses dashboard', en: 'Sign in to access the dashboard' },
  passwordLabel: { id: 'Password', en: 'Password' },
  signingIn: { id: 'Masuk...', en: 'Signing in...' },
  signIn: { id: 'Masuk', en: 'Sign In' },
  demoCreds: { id: 'Kredensial demo:', en: 'Demo credentials:' },
  dashboard: { id: 'Dashboard', en: 'Dashboard' },
  viewSite: { id: 'Lihat Situs', en: 'View Site' },
  manageProjects: { id: 'Kelola Project', en: 'Manage Projects' },
  projectsTotal: { id: 'total project', en: 'projects total' },
  addProject: { id: 'Tambah Project', en: 'Add Project' },
  recentProjects: { id: 'Project Terbaru', en: 'Recent Projects' },
  add: { id: 'Tambah', en: 'Add' },
  recentMessages: { id: 'Pesan Terbaru', en: 'Recent Messages' },
  viewAll: { id: 'Lihat semua', en: 'View all' },
  noProjectsYet: { id: 'Belum ada project. Klik "Tambah Project" untuk membuat.', en: 'No projects yet. Click "Add Project" to create one.' },
  manageBlog: { id: 'Kelola Blog', en: 'Manage Blog' },
  articlesTotal: { id: 'total artikel', en: 'articles total' },
  addArticle: { id: 'Tambah Artikel', en: 'Add Article' },
  noArticlesYet: { id: 'Belum ada artikel. Klik "Tambah Artikel" untuk membuat.', en: 'No articles yet. Click "Add Article" to create one.' },
  manageSkills: { id: 'Kelola Skill', en: 'Manage Skills' },
  skillsTotal: { id: 'total skill', en: 'skills total' },
  addNewSkill: { id: 'Tambah Skill Baru', en: 'Add New Skill' },
  messages: { id: 'Pesan', en: 'Messages' },
  messagesTotal: { id: 'total pesan', en: 'messages total' },
  unread: { id: 'belum dibaca', en: 'unread' },
  title: { id: 'Judul', en: 'Title' },
  slug: { id: 'Slug', en: 'Slug' },
  description: { id: 'Deskripsi', en: 'Description' },
  content: { id: 'Konten (Markdown)', en: 'Content (Markdown)' },
  thumbnail: { id: 'URL Thumbnail', en: 'Thumbnail URL' },
  demoUrl: { id: 'URL Demo', en: 'Demo URL' },
  githubUrl: { id: 'URL GitHub', en: 'GitHub URL' },
  category: { id: 'Kategori', en: 'Category' },
  skillName: { id: 'Nama skill', en: 'Skill name' },
  addTech: { id: 'Tambah tech...', en: 'Add tech...' },
  saving: { id: 'Menyimpan...', en: 'Saving...' },
  updateProject: { id: 'Update Project', en: 'Update Project' },
  createProject: { id: 'Buat Project', en: 'Create Project' },
  cancel: { id: 'Batal', en: 'Cancel' },
  addNewProject: { id: 'Tambah Project Baru', en: 'Add New Project' },
  fillDetails: { id: 'Isi detail untuk project baru Anda', en: 'Fill in the details for your new project' },
  editProject: { id: 'Edit Project', en: 'Edit Project' },
  updateDetails: { id: 'Update detail project', en: 'Update project details' },
  addNewArticle: { id: 'Tambah Artikel Baru', en: 'Add New Article' },
  writeBlog: { id: 'Tulis artikel blog baru', en: 'Write a new blog post' },
  editArticle: { id: 'Edit Artikel', en: 'Edit Article' },
  updateBlog: { id: 'Update detail artikel blog', en: 'Update blog post details' },
  publishArticle: { id: 'Publikasi Artikel', en: 'Publish Article' },
  updateArticle: { id: 'Update Artikel', en: 'Update Article' },
  addSkill: { id: 'Tambah Skill', en: 'Add Skill' },
  update: { id: 'Update', en: 'Update' },
  deleteConfirm: { id: 'Hapus skill ini?', en: 'Delete this skill?' },
  confirm: { id: 'Konfirmasi?', en: 'Confirm?' },
  yes: { id: 'Ya', en: 'Yes' },
  no: { id: 'Tidak', en: 'No' },
  adminPanel: { id: 'Panel Admin', en: 'Admin Panel' },
  new: { id: 'baru', en: 'new' },
  date: { id: 'Tanggal', en: 'Date' },
  actions: { id: 'Aksi', en: 'Actions' },
}

interface LanguageContextType {
  lang: Language
  setLang: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>('id')

  const setLang = useCallback((l: Language) => {
    setLangState(l)
    if (typeof window !== 'undefined') {
      localStorage.setItem('lang', l)
    }
  }, [])

  const t = useCallback(
    (key: string) => {
      const translation = translations[key]
      if (!translation) return key
      return translation[lang]
    },
    [lang]
  )

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used inside LanguageProvider')
  return ctx
}
