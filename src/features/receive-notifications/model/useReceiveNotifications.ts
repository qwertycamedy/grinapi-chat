import { useEffect, useEffectEvent } from 'react'
import { messageApi } from '@/entities/message'
import { isUnauthorizedError } from '@/shared/api'
import { RECEIVE_RETRY_DELAY_MS } from '@/shared/config'
import { useAppDispatch } from '@/shared/lib/hooks'
import { handleNotification } from './handle-notification'

interface ReceiveNotificationsOptions {
  onUnauthorized: () => void
}

function wait(milliseconds: number) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds))
}

export function useReceiveNotifications({ onUnauthorized }: ReceiveNotificationsOptions) {
  const dispatch = useAppDispatch()
  const handleUnauthorized = useEffectEvent(onUnauthorized)

  useEffect(() => {
    let isActive = true
    let currentRequest: { abort: () => void } | null = null

    const receiveNotifications = async () => {
      while (isActive) {
        try {
          const request = dispatch(
            messageApi.endpoints.receiveNotification.initiate(undefined, { track: false }),
          )
          currentRequest = request
          const notification = await request.unwrap()
          if (!notification) continue

          dispatch(handleNotification(notification.body))
          await dispatch(
            messageApi.endpoints.deleteNotification.initiate(notification.receiptId, { track: false }),
          ).unwrap()
        } catch (error) {
          if (!isActive) return
          if (isUnauthorizedError(error)) {
            handleUnauthorized()
            return
          }

          await wait(RECEIVE_RETRY_DELAY_MS)
        }
      }
    }

    receiveNotifications()

    return () => {
      isActive = false
      currentRequest?.abort()
    }
  }, [dispatch])
}
