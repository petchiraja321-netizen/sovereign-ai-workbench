import {
  Bot,
  CheckCircle2,
  FileText,
  LockKeyhole,
  Network,
  Settings2,
  ShieldCheck,
  Sparkles,
  Target,
  UserCheck,
} from "lucide-react";

import type { AuditEventType as AuditEventTypeValue } from "../../../types/audit";

type Props = {
  type: AuditEventTypeValue;
};

export default function AuditEventType({ type }: Props) {
  const icons = {
    Task: Target,
    File: FileText,
    Security: ShieldCheck,
    Agent: Bot,
    Model: Sparkles,
    RAG: Network,
    Evidence: CheckCircle2,
    Approval: UserCheck,
    Deliverable: FileText,
    System: Settings2,
  };

  const Icon =
    icons[type] ?? LockKeyhole;

  return (
    <div className={`audit-event-type audit-event-type--${type.toLowerCase()}`}>
      <Icon size={14} />
    </div>
  );
}