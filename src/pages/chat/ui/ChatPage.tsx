import { useParams } from 'react-router-dom'
import { ChatSidebar } from '@/widgets/chat-sidebar'
import { ChatWindow } from '@/widgets/chat-window'
import { useReceiveNotifications } from '@/features/receive-notifications'

export function ChatPage() {
  const { chatId } = useParams()
  useReceiveNotifications()

  return (
    <main className="flex h-svh overflow-hidden">
      <ChatSidebar />
      {chatId ? <ChatWindow key={chatId} chatId={chatId} /> : <EmptyChatWindow />}
    </main>
  )
}

function EmptyChatWindow() {
  return (
    <section className="hidden flex-1 items-center justify-center bg-(image:--chat-ground) md:flex">
      <p className="rounded-full bg-black/20 px-3 py-1 text-sm text-white">
        Выберите чат или создайте новый
      </p>
    </section>
  )
}
