var __assign =
  (this && this.__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i]
          for (const p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p]
        }
        return t
      }
    return __assign.apply(this, arguments)
  }
exports.__esModule = true
const vue_1 = require('vue')

function createUUID() {
  let dt = new Date().getTime()
  const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (dt + Math.random() * 16) % 16 | 0
    dt = Math.floor(dt / 16)
    return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16)
  })
  return uuid
}
const defaultNotificationOptions = {
  type: 'info',
  title: '',
  message: 'Ooops! A message was not provided',
  autoClose: true,
  duration: 5,
  canClose: true
}
function useNotifications() {
  const notifications = vue_1.ref([])
  const createNotification = function (options) {
    let _a
    const _options = { ...defaultNotificationOptions, ...options }
    const uuid = createUUID()
    ;(_a = notifications.value).push.apply(_a, [{ id: uuid, ..._options }])
    return uuid
  }
  const createErrorNotification = function (options) {
    return createNotification({
      type: 'error',
      title: 'Yikes. Something went wrong.',
      duration: 8,
      ...options
    })
  }
  const createSuccessNotification = function (options) {
    return createNotification({ type: 'success', title: 'Success!', ...options })
  }
  const createWarningNotification = function (options) {
    return createNotification({
      type: 'warning',
      title: 'Something to lookout for.',
      duration: 8,
      ...options
    })
  }
  const removeNotifications = function (id) {
    const index = notifications.value.findIndex(function (item) {
      return item.id === id
    })
    if (index !== -1) notifications.value.splice(index, 1)
  }
  const stopBodyOverflow = function () {
    let _a
    document && (_a = document.body.classList).add.apply(_a, ['hide-overflow'])
  }
  const allowBodyOverflow = function () {
    let _a
    document && (_a = document.body.classList).remove.apply(_a, ['hide-overflow'])
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
exports.default = useNotifications
