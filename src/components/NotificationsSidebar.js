import React from 'react';

export default function NotificationsSidebar({notifications}) {
  const notificationItems = notifications.map((n, index) => {
    return <div key={index}>{n}</div>;
  });

  return (
    <>
      { notificationItems }
    </>
  );
};
