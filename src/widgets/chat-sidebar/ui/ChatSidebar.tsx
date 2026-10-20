import { NavLink, useParams } from 'react-router-dom'
import { ChatListItem, selectChats } from '@/entities/chat'
import { NotificationSettingsBanner } from '@/features/configure-notifications'
import { CreateChatDialog } from '@/features/create-chat'
import { LogoutButton } from '@/features/logout'
import { ThemeToggle } from '@/features/toggle-theme'
import { getChatRoute } from '@/shared/config'
import { useAppSelector } from '@/shared/lib/hooks'
import { cn } from '@/shared/lib/utils'

export function ChatSidebar() {
  const { chatId } = useParams()
  const chats = useAppSelector(selectChats)

  return (
    <aside
      className={cn(
        'w-full flex-col bg-background md:flex md:w-80 md:shrink-0 md:border-r lg:w-96',
        chatId ? 'hidden' : 'flex',
      )}
    >
      <header className="flex h-14 items-center gap-1 px-4">
        <h1 className="flex-1 text-xl font-semibold">Чаты</h1>
        <CreateChatDialog />
        <ThemeToggle />
        <LogoutButton />
      </header>
      <NotificationSettingsBanner />
      {chats.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-2 px-8 text-center text-muted-foreground">
          <p className="font-medium text-foreground">Пока нет чатов</p>
          <p className="text-sm">Нажмите на карандаш, чтобы начать переписку по номеру телефона</p>
        </div>
      ) : (
        <nav className="flex-1 overflow-y-auto px-2 pb-2" aria-label="Список чатов">
          <ul className="flex flex-col gap-0.5">
            {chats.map((chat) => (
              <li key={chat.id}>
                <NavLink to={getChatRoute(chat.id)} className="block rounded-xl">
                  {({ isActive }) => <ChatListItem chat={chat} isActive={isActive} />}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </aside>
  )
}
