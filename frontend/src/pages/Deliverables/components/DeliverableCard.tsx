import {
  ArrowUpRight,
  Download,
  FileJson,
  FileSpreadsheet,
  FileText,
  Presentation,
} from "lucide-react";

import type { Deliverable } from "../../../types/deliverables";

import DeliverableStatus from "./DeliverableStatus";

type Props = {
  item: Deliverable;
  onSelect: () => void;
};

function FileIcon({ type }: { type: Deliverable["type"] }) {
  if (type === "XLSX") {
    return <FileSpreadsheet size={20} />;
  }

  if (type === "PPTX") {
    return <Presentation size={20} />;
  }

  if (type === "JSON") {
    return <FileJson size={20} />;
  }

  return <FileText size={20} />;
}

export default function DeliverableCard({
  item,
  onSelect,
}: Props) {
  function handleDownload(
    event: React.MouseEvent<HTMLButtonElement>,
  ) {
    event.stopPropagation();

    window.alert(
      `Mock download: ${item.name}.${item.type.toLowerCase()}`,
    );
  }

  return (
    <article
      className="deliverable-card"
      onClick={onSelect}
    >
      <div className="deliverable-card__top">
        <div className="deliverable-card__file">
          <FileIcon type={item.type} />
        </div>

        <DeliverableStatus status={item.status} />
      </div>

      <span className="deliverable-card__type">
        {item.type} • {item.version}
      </span>

      <h3>{item.name}</h3>

      <p>{item.description}</p>

      <div className="deliverable-card__meta">
        <div>
          <span>Task</span>
          <strong>{item.taskId}</strong>
        </div>

        <div>
          <span>Evidence</span>
          <strong>{item.evidenceCount}</strong>
        </div>
      </div>

      <div className="deliverable-card__footer">
        <span>{item.createdAt}</span>

        <div>
          <button
            type="button"
            onClick={handleDownload}
            aria-label="Download"
          >
            <Download size={14} />
          </button>

          <button
            type="button"
            onClick={onSelect}
            aria-label="View details"
          >
            <ArrowUpRight size={14} />
          </button>
        </div>
      </div>
    </article>
  );
}