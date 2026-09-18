import type { SystemEvent } from "../../../types/notification";

interface SystemEventPanelProps {
  events: SystemEvent[];
}

export function SystemEventPanel({
  events,
}: SystemEventPanelProps) {
  return (
    <aside className="system-event-panel">
      <div className="system-event-panel__header">
        <div>
          <span className="system-event-panel__eyebrow">
            OPERATIONS
          </span>

          <h2>System Events</h2>

          <p>
            Operational activity from the
            workbench runtime.
          </p>
        </div>

        <span className="system-event-panel__count">
          {events.length}
        </span>
      </div>

      <div className="system-event-list">
        {events.map((event) => (
          <article
            key={event.id}
            className="system-event"
          >
            <time>{event.timestamp}</time>

            <div
              className={`system-event__indicator system-event__indicator--${event.severity.toLowerCase()}`}
            />

            <div className="system-event__content">
              <strong>
                {event.source}
              </strong>

              <span>
                {event.message}
              </span>

              {event.resourceId && (
                <small>
                  {event.resourceId}
                </small>
              )}
            </div>
          </article>
        ))}
      </div>

      <div className="system-event-panel__footer">
        System events are operational records.
        Historical traceability remains available
        in the Audit Trail.
      </div>
    </aside>
  );
}