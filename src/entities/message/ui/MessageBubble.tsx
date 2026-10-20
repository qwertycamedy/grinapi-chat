import { AlertCircle, Check, CheckCheck, Clock } from 'lucide-react'
import type { Message, MessageStatus } from '../model/types'
import { formatMessageTime } from '@/shared/lib/format'
import { cn } from '@/shared/lib/utils'

interface MessageBubbleProps {
  message: Message
}

const STATUS_LABELS: Record<MessageStatus, string> = {
  pending: 'Отправляется',
  sent: 'Отправлено',
  delivered: 'Доставлено',
  read: 'Прочитано',
  failed: 'Не отправлено',
}

function MessageStatusIcon({ status }: { status: MessageStatus }) {
  const iconProps = { className: 'size-3.5', 'aria-label': STATUS_LABELS[status] }

  if (status === 'pending') return <Clock {...iconProps} />
  if (status === 'failed') return <AlertCircle {...iconProps} className="size-3.5 text-destructive" />
  if (status === 'sent') return <Check {...iconProps} />

  return <CheckCheck {...iconProps} className={cn('size-3.5', status === 'read' && 'text-primary')} />
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isOutgoing = message.direction === 'outgoing'

  return (
    <div className={cn('flex', isOutgoing ? 'justify-end' : 'justify-start')}>
      <div
        className={cn(
          'max-w-[75%] rounded-2xl px-3 py-1.5 shadow-sm',
          isOutgoing ? 'rounded-br-md bg-bubble-outgoing' : 'rounded-bl-md bg-bubble-incoming',
        )}
      >
        <p className="text-[15px] leading-snug break-words whitespace-pre-wrap">{message.text}</p>
        <div className="mt-0.5 flex items-center justify-end gap-1 text-[11px] text-muted-foreground">
          <time dateTime={new Date(message.timestamp).toISOString()}>
            {formatMessageTime(message.timestamp)}
          </time>
          {isOutgoing && message.status && <MessageStatusIcon status={message.status} />}
        </div>
      </div>
    </div>
  )
}
