import { LogOut } from 'lucide-react'
import { resetChats } from '@/entities/chat'
import { resetMessages } from '@/entities/message'
import { logout } from '@/entities/session'
import { useAppDispatch } from '@/shared/lib/hooks'
import { Button } from '@/shared/ui/button'

export function LogoutButton() {
  const dispatch = useAppDispatch()

  const handleLogout = () => {
    dispatch(resetMessages())
    dispatch(resetChats())
    dispatch(logout())
  }

  return (
    <Button variant="ghost" size="icon" aria-label="Выйти" title="Выйти" onClick={handleLogout}>
      <LogOut />
    </Button>
  )
}
