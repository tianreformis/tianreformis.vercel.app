'use client'

import { useState } from 'react'
import { FiMail, FiCheck } from 'react-icons/fi'
import DeleteButton from '@/components/admin/DeleteButton'
import { Message } from '@/types'

export default function MessagesClient({ messages }: { messages: Message[] }) {
  const [localMessages, setLocalMessages] = useState(messages)
  const [markingId, setMarkingId] = useState<string | null>(null)

  const handleMarkRead = async (id: string) => {
    setMarkingId(id)
    try {
      const res = await fetch('/api/messages', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      })

      if (res.ok) {
        setLocalMessages((prev) =>
          prev.map((m) => (m.id === id ? { ...m, is_read: true } : m))
        )
      }
    } catch {
      console.error('Failed to mark as read')
    }
    setMarkingId(null)
  }

  const handleDelete = (id: string) => {
    setLocalMessages((prev) => prev.filter((m) => m.id !== id))
  }

  const unreadCount = localMessages.filter((m) => !m.is_read).length

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="border-b border-border bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">Messages</h1>
            <p className="text-sm text-muted-foreground mt-1">
              {localMessages.length} messages total, {unreadCount} unread
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-4">
        {localMessages.map((message) => (
          <div
            key={message.id}
            className={`bg-card rounded-xl p-6 border transition-colors ${
              !message.is_read ? 'border-primary/50' : 'border-border'
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${!message.is_read ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>
                  <FiMail size={18} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{message.name}</p>
                    {!message.is_read && <span className="w-2 h-2 bg-primary rounded-full" />}
                  </div>
                  <p className="text-sm text-muted-foreground">{message.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleMarkRead(message.id)}
                  disabled={markingId === message.id || message.is_read}
                  className="p-2 hover:bg-muted rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Mark as read"
                >
                  <FiCheck size={16} />
                </button>
                <DeleteButton id={message.id} type="message" onDeleted={() => handleDelete(message.id)} />
              </div>
            </div>
            <p className="text-muted-foreground ml-11">{message.message}</p>
            <p className="text-xs text-muted-foreground mt-3 ml-11">
              {new Date(message.created_at).toLocaleString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>
          </div>
        ))}

        {localMessages.length === 0 && (
          <div className="text-center py-12 text-muted-foreground bg-card rounded-xl border border-border">
            No messages yet.
          </div>
        )}
      </div>
    </div>
  )
}


