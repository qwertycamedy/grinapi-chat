import { Avatar, AvatarFallback } from '@/shared/ui/avatar'
import { getInitials } from '@/shared/lib/format'
import { cn } from '@/shared/lib/utils'

const AVATAR_GRADIENTS = [
  'from-[#ff48b6] to-[#ff8a35]',
  'from-[#ffc93d] to-[#ff832a]',
  'from-[#14e1d5] to-[#03c722]',
  'from-[#08d7f3] to-[#5398ff]',
  'from-[#bf97ff] to-[#526eff]',
]

interface ChatAvatarProps {
  chatId: string
  name: string
  className?: string
}

function getGradientByChatId(chatId: string) {
  const hash = [...chatId].reduce((sum, char) => sum + char.charCodeAt(0), 0)

  return AVATAR_GRADIENTS[hash % AVATAR_GRADIENTS.length]
}

export function ChatAvatar({ chatId, name, className }: ChatAvatarProps) {
  return (
    <Avatar className={cn('size-12 after:hidden', className)}>
      <AvatarFallback
        className={cn('bg-linear-to-br font-semibold text-white', getGradientByChatId(chatId))}
      >
        {getInitials(name)}
      </AvatarFallback>
    </Avatar>
  )
}
