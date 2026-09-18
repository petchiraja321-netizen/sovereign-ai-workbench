import {
  ArrowUpRight,
  Clock3,
  X,
} from "lucide-react";

import type { AuditEvent } from "../../../types/audit";
import AuditTimeline from "./AuditTimeline";

type Props = {
  event: AuditEvent | null;
  events: AuditEvent[];
  onClose: () => void;
};

export default function AuditDetails({
  event,
  events,
  onClose,
}: Props) {
  if (!event) {
    return null;
  }

  return (
    <>
      <div
        className="audit-details-overlay"
        onClick={onClose}
      />

      <aside className="audit-details">
        <div className="audit-details__header">
          <div>
            <span className="audit-section-label">
              AUDIT EVENT
            </span>

            <h2>{event.action}</h2>

            <code>{event.id}</code>
          </div>

          <button
            type="button"
            className="audit-details__close"
            onClick={onClose}
          >
            <X size={16} />
          </button>
        </div>

        <div className="audit-details__status-row">
          <span
            className={`audit-status audit-status--${event.status.toLowerCase()}`}
          >
            {event.status}
          </span>

          <span className="audit-details__event-type">
            {event.eventType}
          </span>
        </div>

        <div className="audit-details__description">
          <span>DESCRIPTION</span>

          <p>{event.description}</p>
        </div>

        <div className="audit-details__fields">
          <div>
            <span>
              <Clock3 size={11} />
              Timestamp
            </span>

            <strong>{event.timestamp}</strong>
          </div>

          <div>
            <span>Actor</span>
            <strong>{event.actor}</strong>
            <small>{event.actorType}</small>
          </div>

          <div>
            <span>Resource</span>
            <strong>{event.resourceId}</strong>
            <small>{event.resourceType}</small>
          </div>

          {event.taskId && (
            <div>
              <span>Task Reference</span>

              <strong>
                {event.taskId}
                <ArrowUpRight size={12} />
              </strong>
            </div>
          )}
        </div>

        {event.metadata && (
          <div className="audit-details__metadata">
            <span className="audit-section-label">
              METADATA
            </span>

            <div>
              {Object.entries(event.metadata).map(
                ([key, value]) => (
                  <div key={key}>
                    <span>{key}</span>
                    <strong>{value}</strong>
                  </div>
                ),
              )}
            </div>
          </div>
        )}

        <div className="audit-details__timeline">
          <span className="audit-section-label">
            EXECUTION TIMELINE
          </span>

          <h3>Related activity</h3>

          <AuditTimeline
            events={events}
            taskId={event.taskId}
          />
        </div>
      </aside>
    </>
  );
}