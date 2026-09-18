import { useEffect, useState } from "react";
import { ShieldCheck } from "lucide-react";

import SecurityHeader from "./components/SecurityHeader";
import SecurityOverview from "./components/SecurityOverview";
import SecurityEvents from "./components/SecurityEvents";
import NetworkActivity from "./components/NetworkActivity";
import FileSecurity from "./components/FileSecurity";
import TrustBoundary from "./components/TrustBoundary";
import SecurityDetails from "./components/SecurityDetails";

import {
  getSecurityEvents,
  getSecurityOverview,
  getNetworkActivity,
  getFileSecurity,
} from "../../api/security";

import type {
  SecurityEvent,
  SecurityOverview as SecurityOverviewType,
  NetworkActivityItem,
  FileSecurityItem,
} from "../../types/security";

import "./security.css";

export default function Security() {
  const [overview, setOverview] = useState<SecurityOverviewType | null>(null);
  const [events, setEvents] = useState<SecurityEvent[]>([]);
  const [network, setNetwork] = useState<NetworkActivityItem[]>([]);
  const [files, setFiles] = useState<FileSecurityItem[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<SecurityEvent | null>(
    null,
  );

  useEffect(() => {
    async function loadSecurityData() {
      const [overviewData, eventsData, networkData, filesData] =
        await Promise.all([
          getSecurityOverview(),
          getSecurityEvents(),
          getNetworkActivity(),
          getFileSecurity(),
        ]);

      setOverview(overviewData);
      setEvents(eventsData);
      setNetwork(networkData);
      setFiles(filesData);
    }

    void loadSecurityData();
  }, []);

  return (
    <section className="security-page">
      <SecurityHeader />

      <div className="security-page__content">
        <div className="security-page__intro">
          <div>
            <div className="security-page__eyebrow">
              <ShieldCheck size={16} />
              Security Control Center
            </div>

            <h1>Security & Control</h1>

            <p>
              Monitor security posture, file validation, agent execution,
              network activity, and policy enforcement across the workbench.
            </p>
          </div>
        </div>

        {overview && <SecurityOverview overview={overview} />}

        <div className="security-grid security-grid--top">
          <TrustBoundary />
          {overview && (
            <div className="security-posture">
              <div className="security-section-heading">
                <div>
                  <span className="security-section-label">POSTURE</span>
                  <h2>Security posture</h2>
                </div>
              </div>

              <div className="security-posture__status">
                <span className="security-status-dot security-status-dot--secure" />
                <div>
                  <strong>
                    {overview.systemStatus === "secure"
                      ? "System Secure"
                      : overview.systemStatus === "warning"
                        ? "Security Warning"
                        : "Critical Security State"}
                  </strong>

                  <span>
                    Active policies are protecting files, agents, tools and
                    network boundaries.
                  </span>
                </div>
              </div>

              <div className="security-posture__checks">
                <div>
                  <span>Policy enforcement</span>
                  <strong>{overview.policyStatus.toUpperCase()}</strong>
                </div>

                <div>
                  <span>File validation</span>
                  <strong>
                    {overview.fileValidation ? "ENABLED" : "DISABLED"}
                  </strong>
                </div>

                <div>
                  <span>Network monitoring</span>
                  <strong>
                    {overview.networkMonitoring ? "ENABLED" : "DISABLED"}
                  </strong>
                </div>

                <div>
                  <span>Audit logging</span>
                  <strong>
                    {overview.auditLogging ? "ENABLED" : "DISABLED"}
                  </strong>
                </div>
              </div>
            </div>
          )}
        </div>

        <SecurityEvents
          events={events}
          onSelectEvent={setSelectedEvent}
        />

        <div className="security-grid security-grid--bottom">
          <NetworkActivity items={network} />
          <FileSecurity items={files} />
        </div>
      </div>

      <SecurityDetails
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
      />
    </section>
  );
}