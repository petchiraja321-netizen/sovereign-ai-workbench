import { X } from "lucide-react";

import type { SecurityEvent } from "../../../types/security";

type Props = {
  event: SecurityEvent | null;
  onClose: () => void;
};

export default function SecurityDetails({ event, onClose }: Props) {
  if (!event) {
    return null;
  }

  return (
    <>
      <div className="security-details-overlay" onClick={onClose} />

      <aside className="security-details">
        <div className="security-details__header">
          <div>
            <span className="security-section-label">SECURITY EVENT</span>
            <h2>{event.title}</h2>
          </div>

          <button
            className="security-details__close"
            type="button"
            onClick={onClose}
            aria-label="Close security details"
          >
            <X size={17} />
          </button>
        </div>

        <div style={{ marginTop: 12 }}>
          <span className={`security-badge security-badge--${event.status}`}>
            {event.status}
          </span>
        </div>

        <div className="security-details__summary">
          <p>{event.description}</p>
        </div>

        <div className="security-details__grid">
          <div className="security-details__field">
            <span>Event ID</span>
            <strong>{event.id}</strong>
          </div>

          <div className="security-details__field">
            <span>Severity</span>
            <strong>{event.severity}</strong>
          </div>

          <div className="security-details__field">
            <span>Source</span>
            <strong>{event.source}</strong>
          </div>

          <div className="security-details__field">
            <span>Timestamp</span>
            <strong>{event.timestamp}</strong>
          </div>
        </div>

        <ul className="security-details__list">
          {event.details.map((detail, index) => (
            <li key={`${event.id}-${index}`}>{detail}</li>
          ))}
        </ul>
      </aside>
    </>
  );
}