import type { InstanceSettings } from '@/entities/session'

export function isReceivingConfigured({ webhookUrl, incomingWebhook }: InstanceSettings) {
  return !webhookUrl && incomingWebhook === 'yes'
}
