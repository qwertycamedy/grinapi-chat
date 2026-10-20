const timeFormatter = new Intl.DateTimeFormat('ru-RU', { hour: '2-digit', minute: '2-digit' })
const dateFormatter = new Intl.DateTimeFormat('ru-RU', { day: 'numeric', month: 'short' })

export function formatMessageTime(timestamp: number) {
  return timeFormatter.format(timestamp)
}

export function formatChatTime(timestamp: number, now = Date.now()) {
  const isToday = new Date(timestamp).toDateString() === new Date(now).toDateString()

  return isToday ? timeFormatter.format(timestamp) : dateFormatter.format(timestamp)
}
