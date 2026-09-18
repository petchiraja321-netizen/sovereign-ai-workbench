import { Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import type {
  AuditEvent,
  AuditEventType,
  AuditStatus,
} from "../../../types/audit";

type Props = {
  events: AuditEvent[];
};

export default function AuditToolbar({ events }: Props) {
  const [search, setSearch] = useState("");
  const [eventType, setEventType] = useState<"All" | AuditEventType>(
    "All",
  );
  const [status, setStatus] = useState<"All" | AuditStatus>("All");

  const eventTypes = useMemo(
    () =>
      Array.from(
        new Set(events.map((event) => event.eventType)),
      ),
    [events],
  );

  const filteredCount = useMemo(() => {
    const query = search.trim().toLowerCase();

    return events.filter((event) => {
      const matchesSearch =
        !query ||
        event.id.toLowerCase().includes(query) ||
        event.action.toLowerCase().includes(query) ||
        event.actor.toLowerCase().includes(query) ||
        event.resourceId.toLowerCase().includes(query) ||
        event.description.toLowerCase().includes(query);

      const matchesType =
        eventType === "All" || event.eventType === eventType;

      const matchesStatus =
        status === "All" || event.status === status;

      return matchesSearch && matchesType && matchesStatus;
    }).length;
  }, [events, search, eventType, status]);

  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent("audit-filter-change", {
        detail: {
          search,
          eventType,
          status,
        },
      }),
    );
  }, [search, eventType, status]);

  return (
    <section className="audit-toolbar">
      <div className="audit-toolbar__heading">
        <div>
          <span>AUDIT SEARCH</span>
          <h2>Search and filter events</h2>
        </div>

        <strong>{filteredCount} events</strong>
      </div>

      <div className="audit-toolbar__controls">
        <div className="audit-toolbar__search">
          <Search size={15} />

          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by event, task, user, file..."
          />
        </div>

        <select
          value={eventType}
          onChange={(event) =>
            setEventType(
              event.target.value as "All" | AuditEventType,
            )
          }
        >
          <option value="All">All Types</option>

          {eventTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>

        <select
          value={status}
          onChange={(event) =>
            setStatus(
              event.target.value as "All" | AuditStatus,
            )
          }
        >
          <option value="All">All Status</option>
          <option value="SUCCESS">Success</option>
          <option value="WARNING">Warning</option>
          <option value="FAILED">Failed</option>
          <option value="PENDING">Pending</option>
        </select>

        <select defaultValue="all-time">
          <option value="all-time">All Time</option>
          <option value="today">Today</option>
          <option value="7-days">Last 7 Days</option>
          <option value="30-days">Last 30 Days</option>
        </select>
      </div>
    </section>
  );
}