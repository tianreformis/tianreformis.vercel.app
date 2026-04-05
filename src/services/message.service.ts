import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

async function getAdmin() {
  const cookieStore = await cookies()
  return createClient(cookieStore)
}

export async function createMessage(data: { name: string; email: string; message: string }) {
  const supabase = await getAdmin()
  const { data: message, error } = await supabase.from('messages').insert(data).select().single()
  if (error) throw error
  return message
}

export async function getAllMessages() {
  const supabase = await getAdmin()
  const { data, error } = await supabase.from('messages').select('*').order('created_at', { ascending: false })
  if (error) throw error
  return data || []
}

export async function markAsRead(id: string) {
  const supabase = await getAdmin()
  const { data, error } = await supabase.from('messages').update({ is_read: true }).eq('id', id).select().single()
  if (error) throw error
  return data
}

export async function deleteMessage(id: string) {
  const supabase = await getAdmin()
  const { error } = await supabase.from('messages').delete().eq('id', id)
  if (error) throw error
  return { message: 'Message deleted' }
}
