import {
  Archive,
  Database,
  HardDrive,
  LoaderCircle,
} from "lucide-react";

import type { KnowledgeStats as KnowledgeStatsData } from "../../../types/knowledge";

interface KnowledgeStatsProps {
  stats: KnowledgeStatsData;
}

export function KnowledgeStats({
  stats,
}: KnowledgeStatsProps) {
  const statItems = [
    {
      id: "documents",
      label: "DOCUMENTS",
      value: stats.documents.toLocaleString(),
      description: "Total knowledge sources",
      icon: Archive,
      tone: "neutral",
    },
    {
      id: "indexed",
      label: "INDEXED",
      value: stats.indexed.toLocaleString(),
      description: "Available for RAG retrieval",
      icon: Database,
      tone: "success",
    },
    {
      id: "processing",
      label: "PROCESSING",
      value: stats.processing.toLocaleString(),
      description: "Documents in pipeline",
      icon: LoaderCircle,
      tone: "warning",
    },
    {
      id: "storage",
      label: "STORAGE",
      value: stats.storage,
      description: "Knowledge layer usage",
      icon: HardDrive,
      tone: "info",
    },
  ];

  return (
    <section
      className="knowledge-stats"
      aria-label="Knowledge Base statistics"
    >
      {statItems.map((item) => {
        const Icon = item.icon;

        return (
          <article
            key={item.id}
            className={`knowledge-stat knowledge-stat--${item.tone}`}
          >
            <div className="knowledge-stat__top">
              <span className="knowledge-stat__label">
                {item.label}
              </span>

              <div className="knowledge-stat__icon">
                <Icon size={15} />
              </div>
            </div>

            <strong className="knowledge-stat__value">
              {item.value}
            </strong>

            <span className="knowledge-stat__description">
              {item.description}
            </span>
          </article>
        );
      })}
    </section>
  );
}