import { SendMessageForm } from '@/features/send-message'

interface ChatWindowProps {
  chatId: string
}

export function ChatWindow({ chatId }: ChatWindowProps) {
  return (
    <section className="flex flex-1 flex-col" data-chat-id={chatId}>
      <SendMessageForm />
    </section>
  )
}
