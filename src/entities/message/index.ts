export {
  messageSlice,
  addMessage,
  updateMessageStatus,
  resetMessages,
  selectMessagesByChatId,
} from './model/slice'
export type { Message, MessageDirection, MessageStatus } from './model/types'
export { MessageBubble } from './ui/MessageBubble'
