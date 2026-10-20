import { greenApi } from '@/shared/api'
import type { CheckAccountRequest, CheckAccountResponse } from './types'

export const chatApi = greenApi.injectEndpoints({
  endpoints: (build) => ({
    checkAccount: build.mutation<CheckAccountResponse, CheckAccountRequest>({
      query: (data) => ({ apiMethod: 'checkAccount', httpMethod: 'POST', data }),
    }),
  }),
})

export const { useCheckAccountMutation } = chatApi
