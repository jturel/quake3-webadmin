import { useState } from 'react'

export default function useNotifications() {
  const [notifications, setNotifications] = useState([])

  const addNotification = (notification) => {
    setNotifications((prev) => [notification, ...prev])

    setTimeout(() => {
      setNotifications((prev) => {
        const withoutLast = [...prev]
        withoutLast.pop()
        return withoutLast
      })
    }, 5000)
  }

  return [notifications, addNotification]
}
