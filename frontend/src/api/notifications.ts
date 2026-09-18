import {
  notificationStatsMock,
  notificationsMock,
  systemEventsMock,
} from "../data/notificationsMock";

import type {
  Notification,
  NotificationStats,
  SystemEvent,
} from "../types/notification";

export async function getNotifications(): Promise<
  Notification[]
> {
  return structuredClone(notificationsMock);
}

export async function getNotificationStats(): Promise<
  NotificationStats
> {
  return structuredClone(notificationStatsMock);
}

export async function getNotificationById(
  id: string,
): Promise<Notification | undefined> {
  const notification = notificationsMock.find(
    (item) => item.id === id,
  );

  return notification
    ? structuredClone(notification)
    : undefined;
}

export async function getSystemEvents(): Promise<
  SystemEvent[]
> {
  return structuredClone(systemEventsMock);
}

export async function markNotificationAsRead(
  id: string,
): Promise<Notification | undefined> {
  const notification = notificationsMock.find(
    (item) => item.id === id,
  );

  if (!notification) {
    return undefined;
  }

  return {
    ...structuredClone(notification),
    read: true,
  };
}

export async function markAllNotificationsAsRead(): Promise<
  Notification[]
> {
  return notificationsMock.map((notification) => ({
    ...structuredClone(notification),
    read: true,
  }));
}