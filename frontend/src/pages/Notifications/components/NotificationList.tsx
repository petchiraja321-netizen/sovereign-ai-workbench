import type { Notification } from "../../../types/notification";

import { NotificationItem } from "./NotificationItem";

interface NotificationListProps {
  notifications: Notification[];
  onSelect: (notification: Notification) => void;
  onMarkRead: (notification: Notification) => void;
}

export function NotificationList({
  notifications,
  onSelect,
  onMarkRead,
}: NotificationListProps) {
  return (
    <section className="notification-list-card">
      <div className="notification-list-card__header">
        <div>
          <h2>Notifications</h2>
          <p>
            User-facing alerts and important workspace updates.
          </p>
        </div>

        <span className="notification-list-count">
          {notifications.length} notification
          {notifications.length === 1 ? "" : "s"}
        </span>
      </div>

      {notifications.length === 0 ? (
        <div className="notification-empty">
          <div className="notification-empty__icon">
            ✓
          </div>

          <h3>No notifications found</h3>

          <p>
            Try changing the search or filter criteria.
          </p>
        </div>
      ) : (
        <div className="notification-items">
          {notifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
              onSelect={onSelect}
              onMarkRead={onMarkRead}
            />
          ))}
        </div>
      )}
    </section>
  );
}