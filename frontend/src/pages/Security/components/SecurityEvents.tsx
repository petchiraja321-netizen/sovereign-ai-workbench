import { Search } from "lucide-react";
import { useMemo, useState } from "react";

import type { SecurityEvent, SecurityEventStatus } from "../../../types/security";
import SecurityEventRow from "./SecurityEventRow";

type Props = {
  events: SecurityEvent[];
  onSelectEvent: (event: SecurityEvent) => void;
};

export default function SecurityEvents({
  events,
  onSelectEvent,
}: Props) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<"all" | SecurityEventStatus>("all");

  const filteredEvents = useMemo(() => {
    const query = search.trim().toLowerCase();

    return events.filter((event) => {
      const matchesSearch =
        !query ||
        event.id.toLowerCase().includes(query) ||
        event.title.toLowerCase().includes(query) ||
        event.description.toLowerCase().includes(query) ||
        event.source.toLowerCase().includes(query);

      const matchesStatus = status === "all" || event.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [events, search, status]);

  return (
    <section className="security-events">
      <div className="security-events__header">
        <div className="security-section-heading">
          <div>
            <span className="security-section-label">AUDIT STREAM</span>
            <h2>Recent security events</h2>
          </div>
        </div>

        <div className="security-events__controls">
          <div style={{ position: "relative", flex: 1 }}>
            <Search
              size={15}
              style={{
                position: "absolute",
                left: 12,
                top: 11,
                color: "#98a2b3",
              }}
            />

            <input
              className="security-events__search"
              style={{ paddingLeft: 36, width: "100%" }}
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search security events..."
            />
          </div>

          <select
            className="security-events__filter"
            value={status}
            onChange={(event) =>
              setStatus(event.target.value as "all" | SecurityEventStatus)
            }
          >
            <option value="all">All statuses</option>
            <option value="allowed">Allowed</option>
            <option value="blocked">Blocked</option>
            <option value="monitored">Monitored</option>
            <option value="warning">Warning</option>
          </select>
        </div>
      </div>

      <table className="security-events__table">
        <thead>
          <tr>
            <th>Event</th>
            <th>Source</th>
            <th>Status</th>
            <th>Severity</th>
            <th>Time</th>
          </tr>
        </thead>

        <tbody>
          {filteredEvents.map((event) => (
            <SecurityEventRow
              key={event.id}
              event={event}
              onClick={() => onSelectEvent(event)}
            />
          ))}

          {filteredEvents.length === 0 && (
            <tr>
              <td colSpan={5} style={{ textAlign: "center", color: "#667085" }}>
                No security events found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </section>
  );
}