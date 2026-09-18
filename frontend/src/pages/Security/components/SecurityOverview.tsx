import {
  Activity,
  FileCheck2,
  LockKeyhole,
  Network,
} from "lucide-react";

import type { SecurityOverview as SecurityOverviewType } from "../../../types/security";
import SecurityScore from "./SecurityScore";

type Props = {
  overview: SecurityOverviewType;
};

export default function SecurityOverview({ overview }: Props) {
  return (
    <section className="security-overview">
      <div className="security-overview__cards">
        <div className="security-overview__card">
          <div className="security-overview__card-icon">
            <LockKeyhole size={18} />
          </div>
          <span>Policy enforcement</span>
          <strong>{overview.policyStatus.toUpperCase()}</strong>
          <small>Security policies are active</small>
        </div>

        <div className="security-overview__card">
          <div className="security-overview__card-icon">
            <FileCheck2 size={18} />
          </div>
          <span>File validation</span>
          <strong>{overview.fileValidation ? "ACTIVE" : "OFF"}</strong>
          <small>Type, size and hash validation</small>
        </div>

        <div className="security-overview__card">
          <div className="security-overview__card-icon">
            <Network size={18} />
          </div>
          <span>Network monitoring</span>
          <strong>{overview.networkMonitoring ? "ACTIVE" : "OFF"}</strong>
          <small>External calls are monitored</small>
        </div>

        <div className="security-overview__card">
          <div className="security-overview__card-icon">
            <Activity size={18} />
          </div>
          <span>Audit logging</span>
          <strong>{overview.auditLogging ? "ACTIVE" : "OFF"}</strong>
          <small>Security events are recorded</small>
        </div>
      </div>

      <SecurityScore score={overview.securityScore} />
    </section>
  );
}