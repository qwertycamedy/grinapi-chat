import { addChat, selectChatById, updateChatPreview } from '@/entities/chat'
import {
  addMessage,
  getMessageText,
  type IncomingMessageNotification,
  type NotificationBody,
} from '@/entities/message'
import { formatPhone } from '@/shared/lib/phone'

function isIncomingMessage(body: NotificationBody): body is IncomingMessageNotification {
  return body.typeWebhook === 'incomingMessageReceived'
}

function getSenderName({ senderData }: IncomingMessageNotification) {
  const phone = senderData.senderPhoneNumber ? formatPhone(String(senderData.senderPhoneNumber)) : ''

  return (
    senderData.senderContactName ||
    senderData.chatName ||
    senderData.senderName ||
    phone ||
    senderData.chatId
  )
}

export const handleNotification =
  (body: NotificationBody): AppThunk =>
  (dispatch, getState) => {
    if (!isIncomingMessage(body)) return
    if (body.senderData.chatType && body.senderData.chatType !== 'user') return

    const text = getMessageText(body.messageData)
    if (text === null) return

    const { chatId, senderPhoneNumber } = body.senderData
    const timestamp = body.timestamp * 1000

    if (!selectChatById(getState(), chatId)) {
      dispatch(
        addChat({
          id: chatId,
          phone: senderPhoneNumber ? String(senderPhoneNumber) : '',
          name: getSenderName(body),
          unreadCount: 0,
        }),
      )
    }

    dispatch(addMessage({ id: body.idMessage, chatId, text, direction: 'incoming', timestamp }))
    dispatch(updateChatPreview({ chatId, text, timestamp, isUnread: true }))
  }
