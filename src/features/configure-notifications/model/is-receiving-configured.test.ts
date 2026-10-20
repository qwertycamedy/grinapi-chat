import { isReceivingConfigured } from './is-receiving-configured'

const settings = { wid: '1', webhookUrl: '', incomingWebhook: 'yes', outgoingWebhook: 'no' } as const

describe('isReceivingConfigured', () => {
  it('is true when incoming webhook is enabled and webhook url is empty', () => {
    expect(isReceivingConfigured(settings)).toBe(true)
  })

  it('is false when incoming webhook is disabled', () => {
    expect(isReceivingConfigured({ ...settings, incomingWebhook: 'no' })).toBe(false)
  })

  it('is false when webhook url is set', () => {
    expect(isReceivingConfigured({ ...settings, webhookUrl: 'https://example.com' })).toBe(false)
  })
})
