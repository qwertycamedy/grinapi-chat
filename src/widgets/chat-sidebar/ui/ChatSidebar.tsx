import { CreateChatForm } from '@/features/create-chat'
import { LogoutButton } from '@/features/logout'

export function ChatSidebar() {
  return (
    <aside className="flex w-80 flex-col border-r">
      <CreateChatForm />
      <LogoutButton />
    </aside>
  )
}
