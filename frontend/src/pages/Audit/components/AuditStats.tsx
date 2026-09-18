import {
  Activity,
  ClipboardCheck,
  FileClock,
  ShieldCheck,
  ListChecks,
} from "lucide-react";

import type { AuditStats as AuditStatsType } from "../../../types/audit";

type Props = {
  stats: AuditStatsType;
};

export default function AuditStats({ stats }: Props) {
  const cards = [
    {
      label: "Total Events",
      value: stats.totalEvents.toLocaleString(),
      description: "Recorded activity",
      icon: FileClock,
    },
    {
      label: "Today's Events",
      value: stats.todayEvents.toString(),
      description: "Activity today",
      icon: Activity,
    },
    {
      label: "Security Events",
      value: stats.securityEvents.toString(),
      description: "Security activity",
      icon: ShieldCheck,
    },
    {
      label: "Task Events",
      value: stats.taskEvents.toString(),
      description: "Task lifecycle",
      icon: ListChecks,
    },
    {
      label: "Approval Events",
      value: stats.approvalEvents.toString(),
      description: "Human approvals",
      icon: ClipboardCheck,
    },
  ];

  return (
    <section className="audit-stats">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div className="audit-stat-card" key={card.label}>
            <div className="audit-stat-card__icon">
              <Icon size={16} />
            </div>

            <span>{card.label}</span>

            <strong>{card.value}</strong>

            <small>{card.description}</small>
          </div>
        );
      })}
    </section>
  );
}