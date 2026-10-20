import type { BaseQueryFn } from '@reduxjs/toolkit/query/react'
import { isAxiosError } from 'axios'
import { axiosInstance } from './axios-instance'
import { buildGreenApiUrl } from './build-green-api-url'
import type { GreenApiError, GreenApiRequest } from './types'

export const axiosBaseQuery: BaseQueryFn<GreenApiRequest, unknown, GreenApiError> = async (
  { apiMethod, httpMethod = 'GET', pathParam, data, params, credentials },
  { getState, signal },
) => {
  const currentCredentials = credentials ?? (getState() as RootState).session.credentials

  if (!currentCredentials) {
    return { error: { status: 'NO_CREDENTIALS', message: 'Не указаны данные инстанса' } }
  }

  try {
    const response = await axiosInstance.request({
      url: buildGreenApiUrl(currentCredentials, apiMethod, pathParam),
      method: httpMethod,
      data,
      params,
      signal,
    })

    return { data: response.data }
  } catch (error) {
    return { error: toGreenApiError(error) }
  }
}

function toGreenApiError(error: unknown): GreenApiError {
  if (isAxiosError(error) && error.response) {
    return { status: error.response.status, message: error.message }
  }

  return { status: 'NETWORK_ERROR', message: error instanceof Error ? error.message : 'Network error' }
}
