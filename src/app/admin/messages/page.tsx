import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getAllMessages } from '@/services/message.service'
import { Message } from '@/types'
import MessagesClient from '@/components/admin/MessagesClient'

export const dynamic = 'force-dynamic'

export default async function AdminMessagesPage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/admin/login')

  const messages = await getAllMessages() as Message[]

  return <MessagesClient messages={messages} />
}
