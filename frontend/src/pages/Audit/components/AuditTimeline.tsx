import type { AuditEvent } from "../../../types/audit";
import AuditEventType from "./AuditEventType";

type Props = {
  events: AuditEvent[];
  taskId?: string;
};

export default function AuditTimeline({
  events,
  taskId,
}: Props) {
  const timelineEvents = events
    .filter((event) => !taskId || event.taskId === taskId)
    .slice()
    .reverse();

  return (
    <div className="audit-timeline">
      {timelineEvents.map((event, index) => (
        <div
          className="audit-timeline__item"
          key={event.id}
        >
          <div className="audit-timeline__rail">
            <div className="audit-timeline__dot">
              <AuditEventType type={event.eventType} />
            </div>

            {index < timelineEvents.length - 1 && (
              <div className="audit-timeline__line" />
            )}
          </div>

          <div className="audit-timeline__content">
            <span>{event.timestamp.split(" • ")[1]}</span>

            <strong>{event.action}</strong>

            <p>{event.description}</p>
          </div>
        </div>
      ))}

      {timelineEvents.length === 0 && (
        <div className="audit-timeline__empty">
          No related timeline events available.
        </div>
      )}
    </div>
  );
}