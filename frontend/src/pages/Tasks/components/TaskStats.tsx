import {
  Activity,
  CheckCircle2,
  ClipboardList,
  ShieldAlert,
} from "lucide-react";

import type { TaskStats as TaskStatsType } from "../../../types/task";

interface TaskStatsProps {
  stats: TaskStatsType;
}

export function TaskStats({
  stats,
}: TaskStatsProps) {
  const cards = [
    {
      label: "TOTAL TASKS",
      value: stats.total,
      icon: ClipboardList,
      modifier: "",
    },
    {
      label: "RUNNING",
      value: stats.running,
      icon: Activity,
      modifier: "task-stat--running",
    },
    {
      label: "COMPLETED",
      value: stats.completed,
      icon: CheckCircle2,
      modifier: "task-stat--completed",
    },
    {
      label: "APPROVAL",
      value: stats.pendingApproval,
      icon: ShieldAlert,
      modifier: "task-stat--approval",
    },
  ];

  return (
    <section className="task-stats">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.label}
            className={`task-stat ${card.modifier}`}
          >
            <div className="task-stat__top">
              <span>{card.label}</span>

              <Icon size={15} />
            </div>

            <strong>{card.value}</strong>
          </div>
        );
      })}
    </section>
  );
}