interface NotificationHeaderProps {
  unreadCount: number;
  onMarkAllRead: () => void;
}

export function NotificationHeader({
  unreadCount,
  onMarkAllRead,
}: NotificationHeaderProps) {
  return (
    <header className="notification-header">
      <div>
        <span className="notification-header__eyebrow">
          NOTIFICATION CENTER
        </span>

        <h1>Notifications</h1>

        <p>
          Alerts, task updates and system events.
        </p>
      </div>

      <button
        type="button"
        className="notification-header__action"
        onClick={onMarkAllRead}
        disabled={unreadCount === 0}
      >
        Mark all as read
      </button>
    </header>
  );
}