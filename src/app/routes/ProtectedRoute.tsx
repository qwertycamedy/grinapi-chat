import { Navigate, Outlet } from 'react-router-dom'
import { selectIsAuthorized } from '@/entities/session'
import { ROUTES } from '@/shared/config'
import { useAppSelector } from '@/shared/lib/hooks'

export function ProtectedRoute() {
  const isAuthorized = useAppSelector(selectIsAuthorized)

  return isAuthorized ? <Outlet /> : <Navigate to={ROUTES.login} replace />
}
