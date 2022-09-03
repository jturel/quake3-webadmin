import { useState } from 'react';

export default function useNotifications(Component) {
  const [notifications, setNotifications] = useState([]);

  const addNotification = (notification) => {
    setNotifications((prev) => {
      return [ notification, ...prev ];
    });

    setTimeout(() => {
      setNotifications((prev) => {
        const withoutLast = [ ...prev ];
        withoutLast.pop();
        return withoutLast;
      });
    }, 5000);
  };

  return [notifications, addNotification];
};
