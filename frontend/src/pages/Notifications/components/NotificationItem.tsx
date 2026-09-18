import type { Notification } from "../../../types/notification";

interface NotificationItemProps {
  notification: Notification;
  onSelect: (notification: Notification) => void;
  onMarkRead: (notification: Notification) => void;
}

function formatType(type: Notification["type"]) {
  return type.charAt(0) + type.slice(1).toLowerCase();
}

export function NotificationItem({
  notification,
  onSelect,
  onMarkRead,
}: NotificationItemProps) {
  return (
    <article
      className={`notification-item ${
        notification.read
          ? "notification-item--read"
          : "notification-item--unread"
      }`}
      onClick={() => onSelect(notification)}
    >
      <div
        className={`notification-item__indicator notification-item__indicator--${notification.severity.toLowerCase()}`}
        aria-hidden="true"
      />

      <div className="notification-item__icon">
        {notification.type === "APPROVAL" && "!"}
        {notification.type === "SECURITY" && "⚠"}
        {notification.type === "DELIVERABLE" && "✓"}
        {notification.type === "TASK" && "▣"}
        {notification.type === "AGENT" && "◆"}
        {notification.type === "SYSTEM" && "⚙"}
      </div>

      <div className="notification-item__content">
        <div className="notification-item__top">
          <div className="notification-item__title-row">
            <span
              className={`notification-unread-dot ${
                notification.read
                  ? "notification-unread-dot--hidden"
                  : ""
              }`}
            />

            <h3>{notification.title}</h3>

            <span className="notification-item__type">
              {formatType(notification.type)}
            </span>
          </div>

          <time>{notification.timestamp}</time>
        </div>

        <p>{notification.message}</p>

        <div className="notification-item__bottom">
          {notification.resourceId && (
            <span className="notification-resource">
              {notification.resourceId}
            </span>
          )}

          <div className="notification-item__actions">
            {notification.actionLabel && (
              <button
                type="button"
                className="notification-action-button"
                onClick={(event) => {
                  event.stopPropagation();
                  onSelect(notification);
                }}
              >
                {notification.actionLabel}
              </button>
            )}

            {!notification.read && (
              <button
                type="button"
                className="notification-mark-read"
                onClick={(event) => {
                  event.stopPropagation();
                  onMarkRead(notification);
                }}
              >
                Mark as read
              </button>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}