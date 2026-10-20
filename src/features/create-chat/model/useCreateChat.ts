import { useNavigate } from 'react-router-dom'
import { addChat, selectChats, useCheckAccountMutation } from '@/entities/chat'
import { getErrorMessage } from '@/shared/api'
import { getChatRoute } from '@/shared/config'
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks'
import { formatPhone, normalizePhone } from '@/shared/lib/phone'

const ACCOUNT_NOT_FOUND_ERROR =
  'Аккаунт Telegram с этим номером не найден или скрыт настройками приватности'

export function useCreateChat() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const chats = useAppSelector(selectChats)
  const [checkAccount, { isLoading }] = useCheckAccountMutation()

  const openChat = (chatId: string) => navigate(getChatRoute(chatId))

  const createChat = async (phoneInput: string, nameInput: string) => {
    const phone = normalizePhone(phoneInput)
    const chatWithSamePhone = chats.find((chat) => chat.phone === phone)

    if (chatWithSamePhone) {
      openChat(chatWithSamePhone.id)
      return null
    }

    try {
      const account = await checkAccount({ phoneNumber: Number(phone) }).unwrap()
      if (!account.exist || !account.chatId) return ACCOUNT_NOT_FOUND_ERROR

      if (!chats.some((chat) => chat.id === account.chatId)) {
        dispatch(
          addChat({
            id: account.chatId,
            phone,
            name: nameInput.trim() || account.username || formatPhone(phone),
            unreadCount: 0,
          }),
        )
      }

      openChat(account.chatId)
      return null
    } catch (error) {
      return getErrorMessage(error)
    }
  }

  return { createChat, isLoading }
}
