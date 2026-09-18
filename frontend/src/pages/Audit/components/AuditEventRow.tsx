import type { AuditEvent } from "../../../types/audit";
import AuditEventType from "./AuditEventType";

type Props = {
  event: AuditEvent;
  onClick: () => void;
};

export default function AuditEventRow({
  event,
  onClick,
}: Props) {
  return (
    <tr
      className="audit-table__row"
      onClick={onClick}
    >
      <td>
        <span className="audit-time">
          {event.timestamp.split(" • ")[1]}
        </span>

        <span className="audit-date">
          {event.timestamp.split(" • ")[0]}
        </span>
      </td>

      <td>
        <div className="audit-event-cell">
          <AuditEventType type={event.eventType} />

          <div>
            <strong>{event.action}</strong>

            <span>{event.description}</span>

            <small>{event.id}</small>
          </div>
        </div>
      </td>

      <td>
        <div className="audit-actor">
          <strong>{event.actor}</strong>
          <span>{event.actorType}</span>
        </div>
      </td>

      <td>
        <div className="audit-resource">
          <strong>{event.resourceId}</strong>
          <span>{event.resourceType}</span>
        </div>
      </td>

      <td>
        <span
          className={`audit-status audit-status--${event.status.toLowerCase()}`}
        >
          {event.status}
        </span>
      </td>
    </tr>
  );
}