import {
  Archive,
  CheckCircle2,
  Clock3,
  FileStack,
  XCircle,
} from "lucide-react";

import type { DeliverableStats } from "../../../types/deliverables";

type Props = {
  stats: DeliverableStats;
};

export default function DeliverablesStats({ stats }: Props) {
  const cards = [
    {
      label: "Total",
      value: stats.total,
      description: "Generated outputs",
      icon: FileStack,
    },
    {
      label: "Ready",
      value: stats.ready,
      description: "Available results",
      icon: CheckCircle2,
    },
    {
      label: "Processing",
      value: stats.processing,
      description: "Currently generating",
      icon: Clock3,
    },
    {
      label: "Failed",
      value: stats.failed,
      description: "Generation issues",
      icon: XCircle,
    },
    {
      label: "Archived",
      value: stats.archived,
      description: "Retained outputs",
      icon: Archive,
    },
  ];

  return (
    <section className="deliverables-stats">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            className="deliverable-stat-card"
            key={card.label}
          >
            <div className="deliverable-stat-card__icon">
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