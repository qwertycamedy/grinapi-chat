export type InstanceState =
  | 'authorized'
  | 'notAuthorized'
  | 'blocked'
  | 'sleepMode'
  | 'starting'
  | 'yellowCard'

export interface StateInstanceResponse {
  stateInstance: InstanceState
}

type SettingFlag = 'yes' | 'no'

export interface InstanceSettings {
  wid: string
  typeInstance?: string
  webhookUrl: string
  incomingWebhook: SettingFlag
  outgoingWebhook: SettingFlag
}

export interface SaveSettingsResponse {
  saveSettings: boolean
}
