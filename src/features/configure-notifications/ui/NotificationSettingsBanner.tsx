import { TriangleAlert } from 'lucide-react'
import { toast } from 'sonner'
import { useGetSettingsQuery, useSetSettingsMutation } from '@/entities/session'
import { getErrorMessage } from '@/shared/api'
import { Button } from '@/shared/ui/button'
import { isReceivingConfigured } from '../model/is-receiving-configured'

export function NotificationSettingsBanner() {
  const { data: settings } = useGetSettingsQuery()
  const [setSettings, { isLoading }] = useSetSettingsMutation()

  if (!settings || isReceivingConfigured(settings)) return null

  const enableReceiving = async () => {
    try {
      await setSettings({ webhookUrl: '', incomingWebhook: 'yes' }).unwrap()
      toast.success('Настройки сохранены. Инстанс перезапустится, это может занять до 5 минут')
    } catch (error) {
      toast.error(getErrorMessage(error))
    }
  }

  return (
    <div role="alert" className="mx-2 mb-2 flex flex-col gap-2 rounded-xl bg-amber-500/15 p-3 text-sm">
      <div className="flex gap-2">
        <TriangleAlert className="size-4 shrink-0 translate-y-0.5 text-amber-600" />
        <p>
          Получение входящих сообщений выключено в настройках инстанса. Без него ответы не появятся в
          чате.
        </p>
      </div>
      <Button size="sm" className="self-end rounded-lg" disabled={isLoading} onClick={enableReceiving}>
        {isLoading ? 'Сохраняем…' : 'Включить'}
      </Button>
    </div>
  )
}
