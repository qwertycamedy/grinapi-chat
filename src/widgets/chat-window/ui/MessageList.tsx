import { useEffect, useRef } from 'react'
import { MessageBubble, selectMessagesByChatId } from '@/entities/message'
import { useAppSelector } from '@/shared/lib/hooks'

interface MessageListProps {
  chatId: string
}

export function MessageList({ chatId }: MessageListProps) {
  const messages = useAppSelector((state) => selectMessagesByChatId(state, chatId))
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ block: 'end' })
  }, [messages.length])

  if (messages.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center p-4">
        <p className="rounded-full bg-black/20 px-3 py-1 text-sm text-white">Сообщений пока нет</p>
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-y-auto px-3 py-4 md:px-6" role="log" aria-label="Сообщения">
      <div className="mx-auto flex max-w-3xl flex-col gap-1.5">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        <div ref={bottomRef} />
      </div>
    </div>
  )
}
