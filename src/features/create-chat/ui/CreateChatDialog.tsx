import { useState, type FormEvent } from 'react'
import { SquarePen } from 'lucide-react'
import { isValidPhone } from '@/shared/lib/phone'
import { Button } from '@/shared/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/ui/dialog'
import { Input } from '@/shared/ui/input'
import { Label } from '@/shared/ui/label'
import { useCreateChat } from '../model/useCreateChat'

export function CreateChatDialog() {
  const { createChat } = useCreateChat()
  const [isOpen, setIsOpen] = useState(false)
  const [phone, setPhone] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState('')

  const changeOpen = (open: boolean) => {
    setIsOpen(open)
    if (!open) resetForm()
  }

  const resetForm = () => {
    setPhone('')
    setName('')
    setError('')
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!isValidPhone(phone)) {
      setError('Введите номер РФ (+7) или РБ (+375)')
      return
    }

    createChat(phone, name)
    changeOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={changeOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Новый чат" title="Новый чат">
          <SquarePen />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
          <DialogHeader>
            <DialogTitle>Новый чат</DialogTitle>
            <DialogDescription>Введите номер телефона получателя</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="phone">Номер телефона</Label>
            <Input
              id="phone"
              type="tel"
              value={phone}
              placeholder="+7 999 123-45-67"
              autoComplete="off"
              aria-invalid={Boolean(error)}
              aria-describedby={error ? 'phone-error' : undefined}
              className="h-11 rounded-xl"
              onChange={(event) => {
                setPhone(event.target.value)
                setError('')
              }}
            />
            {error && (
              <p id="phone-error" className="text-sm text-destructive">
                {error}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="chat-name">Имя (необязательно)</Label>
            <Input
              id="chat-name"
              value={name}
              placeholder="Иван Иванов"
              autoComplete="off"
              className="h-11 rounded-xl"
              onChange={(event) => setName(event.target.value)}
            />
          </div>
          <DialogFooter>
            <Button type="submit" className="h-11 w-full rounded-xl">
              Создать чат
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
