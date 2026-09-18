import type { SecurityEvent } from "../../../types/security";

type Props = {
  event: SecurityEvent;
  onClick: () => void;
};

export default function SecurityEventRow({ event, onClick }: Props) {
  return (
    <tr className="security-events__row" onClick={onClick}>
      <td>
        <div className="security-event-title">{event.title}</div>
        <div className="security-event-description">
          {event.description}
        </div>
        <div className="security-event-id">{event.id}</div>
      </td>

      <td>{event.source}</td>

      <td>
        <span
          className={`security-badge security-badge--${event.status}`}
        >
          {event.status}
        </span>
      </td>

      <td>
        <span
          className={`security-severity security-severity--${event.severity}`}
        >
          {event.severity}
        </span>
      </td>

      <td>{event.timestamp}</td>
    </tr>
  );
}