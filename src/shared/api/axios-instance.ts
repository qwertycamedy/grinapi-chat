import axios from 'axios'
import { REQUEST_TIMEOUT_MS } from '@/shared/config'

export const axiosInstance = axios.create({
  timeout: REQUEST_TIMEOUT_MS,
  headers: { 'Content-Type': 'application/json' },
})
