import { remote } from 'electron'

if (Notification.permission !== 'granted' && Notification.permission !== 'denied') {
  Notification.requestPermission(permission => {
    if (!('permission' in Notification)) {
      Notification.permission = permission
    }
  })
}

export function notify (title, options) {
  if (Notification.permission === 'granted') {
    if (!remote.getCurrentWindow().isFocused()) {
      return new Notification(title, options)
    }
  }

  return null
}
