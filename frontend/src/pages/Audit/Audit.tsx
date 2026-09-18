import { useEffect, useState } from "react";

import AuditHeader from "./components/AuditHeader";
import AuditStats from "./components/AuditStats";
import AuditToolbar from "./components/AuditToolbar";
import AuditTable from "./components/AuditTable";
import AuditDetails from "./components/AuditDetails";

import {
  getAuditEvents,
  getAuditStats,
} from "../../api/audit";

import type {
  AuditEvent,
  AuditStats as AuditStatsType,
} from "../../types/audit";

import "./audit.css";

export default function Audit() {
  const [stats, setStats] = useState<AuditStatsType | null>(null);
  const [events, setEvents] = useState<AuditEvent[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<AuditEvent | null>(
    null,
  );

  useEffect(() => {
    async function loadAuditData() {
      const [statsData, eventsData] = await Promise.all([
        getAuditStats(),
        getAuditEvents(),
      ]);

      setStats(statsData);
      setEvents(eventsData);
    }

    void loadAuditData();
  }, []);

  return (
    <section className="audit-page">
      <AuditHeader />

      <div className="audit-page__content">
        {stats && <AuditStats stats={stats} />}

        <AuditToolbar events={events} />

        <AuditTable
          events={events}
          onSelectEvent={setSelectedEvent}
        />
      </div>

      <AuditDetails
        event={selectedEvent}
        events={events}
        onClose={() => setSelectedEvent(null)}
      />
    </section>
  );
}