import { Navigate, Outlet } from 'react-router-dom'
import { selectIsAuthorized } from '@/entities/session'
import { ROUTES } from '@/shared/config'
import { useAppSelector } from '@/shared/lib/hooks'

export function GuestRoute() {
  const isAuthorized = useAppSelector(selectIsAuthorized)

  return isAuthorized ? <Navigate to={ROUTES.chats} replace /> : <Outlet />
}
