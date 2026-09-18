import { useEffect, useMemo, useState } from "react";

import type { AuditEvent } from "../../../types/audit";
import AuditEventRow from "./AuditEventRow";

type Props = {
  events: AuditEvent[];
  onSelectEvent: (event: AuditEvent) => void;
};

type AuditFilterDetail = {
  search: string;
  eventType: string;
  status: string;
};

export default function AuditTable({
  events,
  onSelectEvent,
}: Props) {
  const [filters, setFilters] = useState<AuditFilterDetail>({
    search: "",
    eventType: "All",
    status: "All",
  });

  useEffect(() => {
    function handleFilter(event: Event) {
      const customEvent =
        event as CustomEvent<AuditFilterDetail>;

      setFilters(customEvent.detail);
    }

    window.addEventListener(
      "audit-filter-change",
      handleFilter,
    );

    return () => {
      window.removeEventListener(
        "audit-filter-change",
        handleFilter,
      );
    };
  }, []);

  const filteredEvents = useMemo(() => {
    const query = filters.search.trim().toLowerCase();

    return events.filter((event) => {
      const matchesSearch =
        !query ||
        event.id.toLowerCase().includes(query) ||
        event.action.toLowerCase().includes(query) ||
        event.actor.toLowerCase().includes(query) ||
        event.resourceId.toLowerCase().includes(query) ||
        event.description.toLowerCase().includes(query);

      const matchesType =
        filters.eventType === "All" ||
        event.eventType === filters.eventType;

      const matchesStatus =
        filters.status === "All" ||
        event.status === filters.status;

      return matchesSearch && matchesType && matchesStatus;
    });
  }, [events, filters]);

  return (
    <section className="audit-table-panel">
      <div className="audit-table-panel__header">
        <div>
          <span className="audit-section-label">
            EVENT STREAM
          </span>

          <h2>Audit events</h2>
        </div>

        <span className="audit-live-indicator">
          <i />
          Recording Active
        </span>
      </div>

      <div className="audit-table-wrap">
        <table className="audit-table">
          <thead>
            <tr>
              <th>Time</th>
              <th>Event</th>
              <th>Actor</th>
              <th>Resource</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {filteredEvents.map((event) => (
              <AuditEventRow
                key={event.id}
                event={event}
                onClick={() => onSelectEvent(event)}
              />
            ))}

            {filteredEvents.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="audit-table__empty"
                >
                  No audit events match the selected filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}