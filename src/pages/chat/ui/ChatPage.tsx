import { useParams } from 'react-router-dom'
import { ChatSidebar } from '@/widgets/chat-sidebar'
import { ChatWindow } from '@/widgets/chat-window'
import { useReceiveNotifications } from '@/features/receive-notifications'

export function ChatPage() {
  const { chatId } = useParams()
  useReceiveNotifications()

  return (
    <main className="flex h-svh">
      <ChatSidebar />
      {chatId && <ChatWindow chatId={chatId} />}
    </main>
  )
}
