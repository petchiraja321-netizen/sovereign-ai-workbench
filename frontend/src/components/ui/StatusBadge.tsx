import "./status-badge.css";

type Status =
  | "online"
  | "offline"
  | "processing"
  | "success"
  | "warning"
  | "danger";

interface StatusBadgeProps {
  status: Status;
  label: string;
}

export function StatusBadge({
  status,
  label,
}: StatusBadgeProps) {
  return (
    <span className={`status-badge status-badge--${status}`}>
      <span className="status-badge__dot" />
      <span>{label}</span>
    </span>
  );
}