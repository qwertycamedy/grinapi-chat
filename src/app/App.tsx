import './styles/index.css'
import { RouterProvider } from 'react-router-dom'
import { Toaster } from '@/shared/ui/sonner'
import { StoreProvider } from './providers/StoreProvider'
import { ThemeProvider } from './providers/ThemeProvider'
import { router } from './routes/router'

export function App() {
  return (
    <ThemeProvider>
      <StoreProvider>
        <RouterProvider router={router} />
        <Toaster position="top-center" />
      </StoreProvider>
    </ThemeProvider>
  )
}
