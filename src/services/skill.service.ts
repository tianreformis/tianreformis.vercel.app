import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

async function getAdmin() {
  const cookieStore = await cookies()
  return createClient(cookieStore)
}

export async function getAllSkills() {
  const supabase = await getAdmin()
  const { data, error } = await supabase.from('skills').select('*').order('category', { ascending: true }).order('level', { ascending: false })
  if (error) throw error
  return data || []
}

export async function getSkillById(id: string) {
  const supabase = await getAdmin()
  const { data, error } = await supabase.from('skills').select('*').eq('id', id).single()
  if (error) return null
  return data
}

export async function createSkill(data: any) {
  const supabase = await getAdmin()
  const { data: skill, error } = await supabase.from('skills').insert(data).select().single()
  if (error) throw error
  return skill
}

export async function updateSkill(id: string, data: any) {
  const supabase = await getAdmin()
  const { data: skill, error } = await supabase.from('skills').update(data).eq('id', id).select().single()
  if (error) throw error
  return skill
}

export async function deleteSkill(id: string) {
  const supabase = await getAdmin()
  const { error } = await supabase.from('skills').delete().eq('id', id)
  if (error) throw error
  return { message: 'Skill deleted' }
}
