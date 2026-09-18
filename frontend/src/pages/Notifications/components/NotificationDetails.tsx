import { useNavigate } from "react-router-dom";

import type { Notification } from "../../../types/notification";

interface NotificationDetailsProps {
  notification: Notification;
  onClose: () => void;
  onMarkRead: (notification: Notification) => void;
}

export function NotificationDetails({
  notification,
  onClose,
  onMarkRead,
}: NotificationDetailsProps) {
  const navigate = useNavigate();

  const handleNavigation = () => {
    switch (notification.resourceType) {
      case "TASK":
        navigate("/tasks");
        break;

      case "APPROVAL":
        navigate("/approvals");
        break;

      case "SECURITY":
        navigate("/security");
        break;

      case "DELIVERABLE":
        navigate("/deliverables");
        break;

      case "SETTINGS":
        navigate("/settings");
        break;

      default:
        break;
    }

    onClose();
  };

  const handleMarkRead = () => {
    if (!notification.read) {
      onMarkRead(notification);
    }
  };

  return (
    <div className="notification-details-backdrop">
      <aside
        className="notification-details"
        aria-label="Notification details"
      >
        <header className="notification-details__header">
          <div>
            <span className="notification-details__eyebrow">
              NOTIFICATION
            </span>

            <h2>{notification.title}</h2>

            <span className="notification-details__id">
              {notification.id}
            </span>
          </div>

          <button
            type="button"
            className="notification-details__close"
            onClick={onClose}
            aria-label="Close notification details"
          >
            ×
          </button>
        </header>

        <div className="notification-details__content">
          <div className="notification-details__message">
            <p>{notification.message}</p>
          </div>

          <div className="notification-details__grid">
            <div>
              <span>Type</span>
              <strong>{notification.type}</strong>
            </div>

            <div>
              <span>Severity</span>
              <strong>
                {notification.severity}
              </strong>
            </div>

            <div>
              <span>Time</span>
              <strong>
                {notification.timestamp}
              </strong>
            </div>

            <div>
              <span>Status</span>
              <strong>
                {notification.read
                  ? "Read"
                  : "Unread"}
              </strong>
            </div>
          </div>

          {notification.resourceId && (
            <section className="notification-details__block">
              <span>Resource</span>
              <strong>
                {notification.resourceId}
              </strong>
            </section>
          )}
        </div>

        <footer className="notification-details__actions">
          {!notification.read && (
            <button
              type="button"
              className="notification-details-button notification-details-button--secondary"
              onClick={handleMarkRead}
            >
              Mark as read
            </button>
          )}

          {notification.actionLabel && (
            <button
              type="button"
              className="notification-details-button notification-details-button--primary"
              onClick={handleNavigation}
            >
              {notification.actionLabel}
            </button>
          )}
        </footer>
      </aside>
    </div>
  );
}