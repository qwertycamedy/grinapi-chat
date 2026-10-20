import { MessageCircle } from 'lucide-react'
import { LoginForm } from '@/features/login'
import { ThemeToggle } from '@/features/toggle-theme'

export function LoginPage() {
  return (
    <main className="relative flex min-h-svh items-center justify-center px-4 py-10">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <div className="flex w-full max-w-sm flex-col items-center gap-6">
        <div className="flex size-16 items-center justify-center rounded-2xl bg-linear-to-br from-[#08d7f3] via-[#526eff] to-[#a500c6] text-white shadow-lg">
          <MessageCircle className="size-8" />
        </div>
        <div className="text-center">
          <h1 className="text-2xl font-semibold">GREEN-API - Chat</h1>
          <p className="mt-2 text-muted-foreground">
            Введите данные инстанса из{' '}
            <a
              href="https://console.green-api.com"
              target="_blank"
              rel="noreferrer"
              className="text-primary hover:underline"
            >
              личного кабинета GREEN-API
            </a>
          </p>
        </div>
        <div className="w-full rounded-2xl bg-background p-6 shadow-sm">
          <LoginForm />
        </div>
      </div>
    </main>
  )
}
