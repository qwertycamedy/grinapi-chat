export interface CheckAccountRequest {
  phoneNumber: number
}

export interface CheckAccountResponse {
  exist: boolean
  chatId: string
  username?: string
}
