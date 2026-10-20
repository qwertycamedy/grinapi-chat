import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { markChatAsRead, selectChatById } from '@/entities/chat'
import { SendMessageForm } from '@/features/send-message'
import { ROUTES } from '@/shared/config'
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks'
import { Button } from '@/shared/ui/button'
import { ChatHeader } from './ChatHeader'
import { MessageList } from './MessageList'

interface ChatWindowProps {
  chatId: string
}

export function ChatWindow({ chatId }: ChatWindowProps) {
  const dispatch = useAppDispatch()
  const chat = useAppSelector((state) => selectChatById(state, chatId))
  const unreadCount = chat?.unreadCount ?? 0

  useEffect(() => {
    if (unreadCount > 0) dispatch(markChatAsRead(chatId))
  }, [dispatch, chatId, unreadCount])

  if (!chat) {
    return (
      <section className="flex flex-1 flex-col items-center justify-center gap-3 bg-(image:--chat-ground)">
        <p className="rounded-full bg-black/20 px-3 py-1 text-sm text-white">Чат не найден</p>
        <Button asChild variant="secondary" className="rounded-xl">
          <Link to={ROUTES.chats}>К списку чатов</Link>
        </Button>
      </section>
    )
  }

  return (
    <section className="flex min-w-0 flex-1 flex-col">
      <ChatHeader chat={chat} />
      <div className="flex min-h-0 flex-1 flex-col bg-(image:--chat-ground)">
        <MessageList chatId={chatId} />
      </div>
      <SendMessageForm chatId={chatId} />
    </section>
  )
}
