import HeroSection from '@/components/sections/HeroSection'
import AboutSection from '@/components/sections/AboutSection'
import ProjectsSection from '@/components/sections/ProjectsSection'
import BlogSection from '@/components/sections/BlogSection'
import ContactSection from '@/components/sections/ContactSection'
import { getAllProjects } from '@/services/project.service'
import { getAllBlogs } from '@/services/blog.service'
import { getAllSkills } from '@/services/skill.service'
import { Project, Blog, Skill } from '@/types'

export const dynamic = 'force-dynamic'

export default async function Home() {
  const projects = await getAllProjects() as Project[]
  const blogs = await getAllBlogs() as Blog[]
  const skills = await getAllSkills() as Skill[]

  return (
    <>
      <HeroSection />
      <AboutSection skills={skills} />
      <ProjectsSection projects={projects} />
      <BlogSection blogs={blogs} />
      <ContactSection />
    </>
  )
}
