import { useNavigate } from 'react-router-dom'
import { addChat, selectChats } from '@/entities/chat'
import { getChatRoute } from '@/shared/config'
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks'
import { formatPhone, normalizePhone } from '@/shared/lib/phone'

export function useCreateChat() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const chats = useAppSelector(selectChats)

  const createChat = (phoneInput: string, nameInput: string) => {
    const phone = normalizePhone(phoneInput)
    const existingChat = chats.find((chat) => chat.phone === phone)

    if (existingChat) {
      navigate(getChatRoute(existingChat.id))
      return
    }

    dispatch(
      addChat({
        id: phone,
        phone,
        name: nameInput.trim() || formatPhone(phone),
        unreadCount: 0,
      }),
    )
    navigate(getChatRoute(phone))
  }

  return { createChat }
}
