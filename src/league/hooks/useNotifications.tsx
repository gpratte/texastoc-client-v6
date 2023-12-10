import {useEffect, useState} from "react";
import {NotificationData, NotificationDataBuilder, NotificationType} from "../model/NotificationDataBuilder";

function useNotifications(delay = 2500) {
  const [isGlobalLoading, setIsGlobalLoading] = useState<boolean>(false);
  const [notification, setNotification] = useState<NotificationData | undefined>(undefined);
  const [notifications, setNotifications] = useState<Array<NotificationData>>([]);
  const [showNotifications, setShowNotifications] = useState<boolean>(false);

  const newNotification = (notify: NotificationData) : void => {
    const newNotifications = [...notifications];
    newNotifications.push(notify);
    setNotifications(newNotifications)
    if (!showNotifications) {
      setNotification(notify);
      // Auto close after x seconds
    }
  }

  const deleteNotification = (id: number): void => {
    const notificationToDelete = notifications.map((notification) => notification.id === id);
    if (notificationToDelete) {
      const newNotifications = notifications.filter(notification => notification.id !== id)
      setNotification(undefined);
      setNotifications(newNotifications);
    }
  }

  const closeNotification = (id: number): void => {
    const notificationToClose = notifications.map((notification) => notification.id === id);
    if (notificationToClose) {
      setNotification(undefined);
    }
  }

  const deleteAllNotifications = (): void => {
    setNotification(undefined);
    setNotifications([]);
  }

  const showNotificationsPanel = (): void => {
    setNotification(undefined);
    setShowNotifications(true);
  }
  const hideNotificationsPanel = (): void => {
    setShowNotifications(false);
  }

  const showLoadGlobal = (show: boolean): void => {
    setIsGlobalLoading(show);
  }

  // toggle the toast
  useEffect(() => {
    let interval = setInterval(() => {
      newNotification(new NotificationDataBuilder()
        .withMessage("tick " + Date.now())
        .withType(NotificationType.INFO)
        .build());
    }, delay);
    return () => clearInterval(interval);
  })

  return {
    newNotification,
    notification,
    notifications,
    showNotifications,
    closeNotification,
    deleteNotification,
    deleteAllNotifications,
    showNotificationsPanel,
    hideNotificationsPanel,
    isGlobalLoading,
    showLoadGlobal
  };
}

export default useNotifications;