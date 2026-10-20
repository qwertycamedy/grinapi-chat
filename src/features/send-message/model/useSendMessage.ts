import { toast } from 'sonner'
import { updateChatPreview } from '@/entities/chat'
import { addMessage, updateMessageStatus, useSendMessageMutation } from '@/entities/message'
import { getErrorMessage } from '@/shared/api'
import { useAppDispatch } from '@/shared/lib/hooks'

export function useSendMessage(chatId: string) {
  const dispatch = useAppDispatch()
  const [sendMessageRequest] = useSendMessageMutation()

  const sendMessage = async (text: string) => {
    const messageId = crypto.randomUUID()
    const timestamp = Date.now()

    dispatch(
      addMessage({
        id: messageId,
        chatId,
        text,
        direction: 'outgoing',
        timestamp,
        status: 'pending',
      }),
    )
    dispatch(updateChatPreview({ chatId, text, timestamp, isUnread: false }))

    try {
      const { idMessage } = await sendMessageRequest({ chatId, message: text }).unwrap()
      dispatch(updateMessageStatus({ chatId, messageId, status: 'sent', newMessageId: idMessage }))
    } catch (error) {
      dispatch(updateMessageStatus({ chatId, messageId, status: 'failed' }))
      toast.error(`Сообщение не отправлено: ${getErrorMessage(error)}`)
    }
  }

  return { sendMessage }
}
