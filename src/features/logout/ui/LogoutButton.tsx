import { LogOut } from 'lucide-react'
import { Button } from '@/shared/ui/button'
import { useLogout } from '../model/useLogout'

export function LogoutButton() {
  const { logoutUser } = useLogout()

  return (
    <Button variant="ghost" size="icon" aria-label="Выйти" title="Выйти" onClick={logoutUser}>
      <LogOut />
    </Button>
  )
}
