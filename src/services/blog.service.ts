import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

async function getAdmin() {
  const cookieStore = await cookies()
  return createClient(cookieStore)
}

export async function getAllBlogs() {
  const supabase = await getAdmin()
  const { data, error } = await supabase.from('blogs').select('*').order('created_at', { ascending: false })
  if (error) throw error
  return data || []
}

export async function getBlogBySlug(slug: string) {
  const supabase = await getAdmin()
  const { data, error } = await supabase.from('blogs').select('*').eq('slug', slug).single()
  if (error) return null
  return data
}

export async function getBlogById(id: string) {
  const supabase = await getAdmin()
  const { data, error } = await supabase.from('blogs').select('*').eq('id', id).single()
  if (error) return null
  return data
}

export async function createBlog(data: any) {
  const supabase = await getAdmin()
  const { data: blog, error } = await supabase.from('blogs').insert(data).select().single()
  if (error) throw error
  return blog
}

export async function updateBlog(id: string, data: any) {
  const supabase = await getAdmin()
  const { data: blog, error } = await supabase.from('blogs').update(data).eq('id', id).select().single()
  if (error) throw error
  return blog
}

export async function deleteBlog(id: string) {
  const supabase = await getAdmin()
  const { error } = await supabase.from('blogs').delete().eq('id', id)
  if (error) throw error
  return { message: 'Blog deleted' }
}

export async function incrementBlogViews(slug: string) {
  const supabase = await getAdmin()
  await supabase.rpc('increment_blog_views', { blog_slug: slug })
}
