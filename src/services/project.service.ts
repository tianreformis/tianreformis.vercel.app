import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

async function getAdmin() {
  const cookieStore = await cookies()
  return createClient(cookieStore)
}

export async function getAllProjects(category?: string, techStack?: string, includePrivate?: boolean) {
  const supabase = await getAdmin()
  let query = supabase.from('projects').select('*').order('created_at', { ascending: false })

  if (!includePrivate) query = query.eq('visibility', 'public')
  if (category) query = query.eq('category', category)
  if (techStack) query = query.contains('tech_stack', [techStack])

  const { data, error } = await query
  if (error) throw error
  return data || []
}

export async function getProjectBySlug(slug: string) {
  const supabase = await getAdmin()
  const { data, error } = await supabase.from('projects').select('*').eq('slug', slug).single()
  if (error) return null
  return data
}

export async function getProjectById(id: string) {
  const supabase = await getAdmin()
  const { data, error } = await supabase.from('projects').select('*').eq('id', id).single()
  if (error) return null
  return data
}

export async function createProject(data: any) {
  const supabase = await getAdmin()
  const { data: project, error } = await supabase.from('projects').insert(data).select().single()
  if (error) throw error
  return project
}

export async function updateProject(id: string, data: any) {
  const supabase = await getAdmin()
  const { data: project, error } = await supabase.from('projects').update(data).eq('id', id).select().single()
  if (error) throw error
  return project
}

export async function deleteProject(id: string) {
  const supabase = await getAdmin()
  const { error } = await supabase.from('projects').delete().eq('id', id)
  if (error) throw error
  return { message: 'Project deleted' }
}

export async function incrementViews(slug: string) {
  const supabase = await getAdmin()
  await supabase.rpc('increment_project_views', { project_slug: slug })
}

export async function incrementLikes(id: string) {
  const supabase = await getAdmin()
  const { data, error } = await supabase.rpc('increment_project_likes', { project_id: id })
  if (error) throw error
  return data
}

export async function getCategories() {
  return getAllCategories()
}

export async function getAllTechStacks() {
  const projects = await getAllProjects()
  const stacks = projects.flatMap((p: any) => p.tech_stack || [])
  return [...new Set(stacks)]
}

export async function getAllCategories() {
  const supabase = await getAdmin()
  const { data, error } = await supabase.from('categories').select('name').order('name')
  if (error) throw error
  return data?.map((c) => c.name) || []
}

export async function createCategory(name: string) {
  const supabase = await getAdmin()
  const { data, error } = await supabase.from('categories').upsert({ name }, { onConflict: 'name' }).select().single()
  if (error) throw error
  return data
}
