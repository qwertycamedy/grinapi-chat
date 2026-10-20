import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ChatAvatar, type Chat } from '@/entities/chat'
import { ROUTES } from '@/shared/config'
import { formatPhone } from '@/shared/lib/phone'
import { Button } from '@/shared/ui/button'

interface ChatHeaderProps {
  chat: Chat
}

export function ChatHeader({ chat }: ChatHeaderProps) {
  const phone = formatPhone(chat.phone)

  return (
    <header className="flex h-14 shrink-0 items-center gap-3 border-b bg-background px-3">
      <Button variant="ghost" size="icon" className="md:hidden" aria-label="Назад к чатам" asChild>
        <Link to={ROUTES.chats}>
          <ArrowLeft />
        </Link>
      </Button>
      <ChatAvatar chatId={chat.id} name={chat.name} className="size-10" />
      <div className="min-w-0">
        <h2 className="truncate font-semibold">{chat.name}</h2>
        {phone !== chat.name && <p className="truncate text-sm text-muted-foreground">{phone}</p>}
      </div>
    </header>
  )
}
