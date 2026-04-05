import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

async function getAdmin() {
  const cookieStore = await cookies()
  return createClient(cookieStore)
}

export async function getUserByEmail(email: string) {
  const supabase = await getAdmin()
  const { data, error } = await supabase.from('users').select('*').eq('email', email).single()
  if (error) return null
  return data
}

export async function getUserById(id: string) {
  const supabase = await getAdmin()
  const { data, error } = await supabase.from('users').select('*').eq('id', id).single()
  if (error) return null
  return data
}

export async function createUser(data: { name: string; email: string; password: string; role?: string }) {
  const supabase = await getAdmin()
  const { data: user, error } = await supabase.from('users').insert(data).select().single()
  if (error) throw error
  return user
}
