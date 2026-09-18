import {
  FileJson,
  FileSpreadsheet,
  FileText,
  Presentation,
} from "lucide-react";

import type { Deliverable } from "../../../types/deliverables";

import DeliverableStatus from "./DeliverableStatus";

type Props = {
  items: Deliverable[];
  onSelect: (item: Deliverable) => void;
};

function FileIcon({ type }: { type: Deliverable["type"] }) {
  if (type === "XLSX") {
    return <FileSpreadsheet size={18} />;
  }

  if (type === "PPTX") {
    return <Presentation size={18} />;
  }

  if (type === "JSON") {
    return <FileJson size={18} />;
  }

  return <FileText size={18} />;
}

export default function DeliverablesTable({
  items,
  onSelect,
}: Props) {
  return (
    <section className="deliverables-table-panel">
      <div className="deliverables-table-panel__header">
        <div>
          <span>DELIVERABLE STREAM</span>
          <h2>Generated outputs</h2>
        </div>
      </div>

      <div className="deliverables-table-wrap">
        <table className="deliverables-table">
          <thead>
            <tr>
              <th>Deliverable</th>
              <th>Type</th>
              <th>Task</th>
              <th>Evidence</th>
              <th>Created</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {items.map((item) => (
              <tr
                key={item.id}
                onClick={() => onSelect(item)}
              >
                <td>
                  <div className="deliverable-name">
                    <div className="deliverable-file-icon">
                      <FileIcon type={item.type} />
                    </div>

                    <div>
                      <strong>{item.name}</strong>
                      <span>{item.id}</span>
                    </div>
                  </div>
                </td>

                <td>
                  <span className="deliverable-type">
                    {item.type}
                  </span>
                </td>

                <td>
                  <div className="deliverable-task">
                    <strong>{item.taskId}</strong>
                    <span>{item.taskName}</span>
                  </div>
                </td>

                <td>
                  <span className="deliverable-evidence">
                    {item.evidenceCount} sources
                  </span>
                </td>

                <td>
                  <span className="deliverable-created">
                    {item.createdAt}
                  </span>
                </td>

                <td>
                  <DeliverableStatus status={item.status} />
                </td>
              </tr>
            ))}

            {items.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="deliverables-empty"
                >
                  No deliverables match the selected filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}