import { useState, type FormEvent, type KeyboardEvent } from 'react'
import { SendHorizontal } from 'lucide-react'
import { Button } from '@/shared/ui/button'
import { Textarea } from '@/shared/ui/textarea'
import { MAX_MESSAGE_LENGTH } from '../model/constants'
import { useSendMessage } from '../model/useSendMessage'

interface SendMessageFormProps {
  chatId: string
}

export function SendMessageForm({ chatId }: SendMessageFormProps) {
  const { sendMessage } = useSendMessage(chatId)
  const [text, setText] = useState('')
  const trimmedText = text.trim()

  const submitMessage = () => {
    if (!trimmedText) return

    sendMessage(trimmedText)
    setText('')
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    submitMessage()
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey && !event.nativeEvent.isComposing) {
      event.preventDefault()
      submitMessage()
    }
  }

  return (
    <form
      className="flex items-end gap-2 bg-background p-3"
      aria-label="Отправка сообщения"
      onSubmit={handleSubmit}
    >
      <Textarea
        value={text}
        rows={1}
        maxLength={MAX_MESSAGE_LENGTH}
        placeholder="Сообщение"
        aria-label="Текст сообщения"
        className="max-h-40 min-h-11 resize-none rounded-2xl border-none bg-secondary px-4 py-3 shadow-none focus-visible:ring-0"
        onChange={(event) => setText(event.target.value)}
        onKeyDown={handleKeyDown}
      />
      <Button
        type="submit"
        size="icon"
        className="size-11 shrink-0 rounded-full"
        aria-label="Отправить"
        disabled={!trimmedText}
      >
        <SendHorizontal />
      </Button>
    </form>
  )
}
