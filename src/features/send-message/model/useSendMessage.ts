import { updateChatPreview } from '@/entities/chat'
import { addMessage } from '@/entities/message'
import { useAppDispatch } from '@/shared/lib/hooks'

export function useSendMessage(chatId: string) {
  const dispatch = useAppDispatch()

  const sendMessage = (text: string) => {
    const timestamp = Date.now()

    dispatch(
      addMessage({
        id: crypto.randomUUID(),
        chatId,
        text,
        direction: 'outgoing',
        timestamp,
        status: 'pending',
      }),
    )
    dispatch(updateChatPreview({ chatId, text, timestamp, isUnread: false }))
  }

  return { sendMessage }
}
