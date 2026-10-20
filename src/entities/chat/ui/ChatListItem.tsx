import type { Chat } from '../model/types'
import { ChatAvatar } from './ChatAvatar'
import { Badge } from '@/shared/ui/badge'
import { formatChatTime } from '@/shared/lib/format'
import { cn } from '@/shared/lib/utils'

interface ChatListItemProps {
  chat: Chat
  isActive?: boolean
}

export function ChatListItem({ chat, isActive = false }: ChatListItemProps) {
  return (
    <div
      className={cn(
        'flex items-center gap-3 rounded-xl px-3 py-2 transition-colors',
        isActive ? 'bg-primary text-primary-foreground' : 'hover:bg-accent',
      )}
    >
      <ChatAvatar chatId={chat.id} name={chat.name} />
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-2">
          <span className="truncate font-medium">{chat.name}</span>
          {chat.lastMessageAt && (
            <span
              className={cn(
                'shrink-0 text-xs',
                isActive ? 'text-primary-foreground/80' : 'text-muted-foreground',
              )}
            >
              {formatChatTime(chat.lastMessageAt)}
            </span>
          )}
        </div>
        <div className="flex items-center justify-between gap-2">
          <span
            className={cn(
              'truncate text-sm',
              isActive ? 'text-primary-foreground/80' : 'text-muted-foreground',
            )}
          >
            {chat.lastMessageText ?? 'Нет сообщений'}
          </span>
          {chat.unreadCount > 0 && !isActive && (
            <Badge className="h-5 min-w-5 shrink-0 rounded-full px-1.5">{chat.unreadCount}</Badge>
          )}
        </div>
      </div>
    </div>
  )
}
