import type { ApprovalStats as ApprovalStatsType } from "../../../types/approval";

interface ApprovalStatsProps {
  stats: ApprovalStatsType;
}

export function ApprovalStats({
  stats,
}: ApprovalStatsProps) {
  const cards = [
    {
      label: "Pending",
      value: stats.pending,
      description: "Awaiting human decision",
    },
    {
      label: "Approved",
      value: stats.approved,
      description: "Authorized requests",
    },
    {
      label: "Rejected",
      value: stats.rejected,
      description: "Stopped requests",
    },
    {
      label: "Today's Requests",
      value: stats.today,
      description: "Requests received today",
    },
  ];

  return (
    <section className="approval-stats">
      {cards.map((card) => (
        <article
          key={card.label}
          className="approval-stat-card"
        >
          <div className="approval-stat-card__label">
            {card.label}
          </div>

          <div className="approval-stat-card__value">
            {card.value}
          </div>

          <div className="approval-stat-card__description">
            {card.description}
          </div>
        </article>
      ))}
    </section>
  );
}