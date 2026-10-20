import type { InstanceState } from '@/entities/session'

const INSTANCE_STATE_ERRORS: Record<Exclude<InstanceState, 'authorized'>, string> = {
  notAuthorized: 'Инстанс не авторизован. Отсканируйте QR-код в личном кабинете GREEN-API',
  blocked: 'Инстанс заблокирован',
  sleepMode: 'Инстанс в спящем режиме',
  starting: 'Инстанс запускается, попробуйте через пару минут',
  yellowCard: 'Отправка сообщений с инстанса временно ограничена',
}

export function getInstanceStateError(state: InstanceState) {
  return state === 'authorized' ? null : (INSTANCE_STATE_ERRORS[state] ?? `Статус инстанса: ${state}`)
}
