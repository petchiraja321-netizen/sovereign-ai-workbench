import type { NotificationStats as NotificationStatsType } from "../../../types/notification";

interface NotificationStatsProps {
  stats: NotificationStatsType;
}

export function NotificationStats({
  stats,
}: NotificationStatsProps) {
  const items = [
    {
      label: "Total",
      value: stats.total,
    },
    {
      label: "Unread",
      value: stats.unread,
    },
    {
      label: "Alerts",
      value: stats.alerts,
    },
    {
      label: "System Events",
      value: stats.systemEvents,
    },
  ];

  return (
    <section className="notification-stats">
      {items.map((item) => (
        <article
          key={item.label}
          className="notification-stat-card"
        >
          <span>{item.label}</span>
          <strong>{item.value}</strong>
        </article>
      ))}
    </section>
  );
}