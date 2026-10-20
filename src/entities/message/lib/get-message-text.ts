import type { MessageData } from '../api/types'

export function getMessageText(messageData: MessageData) {
  if (messageData.typeMessage === 'textMessage') return messageData.textMessageData?.textMessage ?? null
  if (messageData.typeMessage === 'extendedTextMessage') return messageData.extendedTextMessageData?.text ?? null

  return null
}
