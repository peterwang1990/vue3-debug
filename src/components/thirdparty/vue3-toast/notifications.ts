import { ref } from 'vue'

function createUUID(): string {
  let dt = new Date().getTime()
  const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (dt + Math.random() * 16) % 16 | 0
    dt = Math.floor(dt / 16)
    return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16)
  })
  return uuid
}

export interface Notification {
  id: string
  type: string
  title: string
  message: string
  autoClose: boolean
  duration: number
  canClose: boolean
}

export type CreateNotification = {
  (options: {
    type?: string
    title?: string
    message?: string
    autoClose?: boolean
    duration?: number
    canClose?: boolean
  }): string
}

const defaultNotificationOptions = {
  type: 'info',
  title: '',
  message: 'Ooops! A message was not provided',
  autoClose: true,
  duration: 5,
  canClose: true
}

export default function useNotifications() {
  const notifications = ref<Notification[]>([])

  const createNotification: CreateNotification = (options) => {
    const _options = { ...defaultNotificationOptions, ...options }
    const uuid = createUUID()
    notifications.value.push(
      ...[
        {
          id: uuid,
          ..._options
        }
      ]
    )
    return uuid
  }

  const createErrorNotification: CreateNotification = (options) => {
    return createNotification({
      type: 'error',
      title: 'Yikes. Something went wrong.',
      duration: 8,
      ...options
    })
  }

  const createSuccessNotification: CreateNotification = (options) => {
    return createNotification({ type: 'success', title: 'Success!', ...options })
  }

  const createWarningNotification: CreateNotification = (options) => {
    return createNotification({
      type: 'warning',
      title: 'Something to lookout for.',
      duration: 8,
      ...options
    })
  }

  const removeNotifications = (id: string) => {
    const index = notifications.value.findIndex((item) => item.id === id)
    if (index !== -1) notifications.value.splice(index, 1)
  }

  const stopBodyOverflow = () => {
    document && document.body.classList.add(...['hide-overflow'])
  }

  const allowBodyOverflow = () => {
    document && document.body.classList.remove(...['hide-overflow'])
  }

  return {
    notifications,
    createNotification,
    createSuccessNotification,
    createErrorNotification,
    createWarningNotification,
    removeNotifications,
    stopBodyOverflow,
    allowBodyOverflow
  }
}
