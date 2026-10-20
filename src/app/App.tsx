import './styles/index.css'
import { RouterProvider } from 'react-router-dom'
import { StoreProvider } from './providers/StoreProvider'
import { router } from './routes/router'

export function App() {
  return (
    <StoreProvider>
      <RouterProvider router={router} />
    </StoreProvider>
  )
}
