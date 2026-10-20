import { resetChats } from '@/entities/chat'
import { resetMessages } from '@/entities/message'
import { logout } from '@/entities/session'
import { greenApi } from '@/shared/api'
import { useAppDispatch } from '@/shared/lib/hooks'

export function useLogout() {
  const dispatch = useAppDispatch()

  const logoutUser = () => {
    dispatch(resetMessages())
    dispatch(resetChats())
    dispatch(logout())
    dispatch(greenApi.util.resetApiState())
  }

  return { logoutUser }
}
