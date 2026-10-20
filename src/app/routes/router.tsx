import { createBrowserRouter, Navigate } from 'react-router-dom'
import { ChatPage } from '@/pages/chat'
import { LoginPage } from '@/pages/login'
import { ROUTES } from '@/shared/config'
import { GuestRoute } from './GuestRoute'
import { ProtectedRoute } from './ProtectedRoute'

export const routes = [
  {
    element: <GuestRoute />,
    children: [{ path: ROUTES.login, element: <LoginPage /> }],
  },
  {
    element: <ProtectedRoute />,
    children: [
      { path: ROUTES.chats, element: <ChatPage /> },
      { path: ROUTES.chat, element: <ChatPage /> },
    ],
  },
  { path: '*', element: <Navigate to={ROUTES.chats} replace /> },
]

export const router = createBrowserRouter(routes)
