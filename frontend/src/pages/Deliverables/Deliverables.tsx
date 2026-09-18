import { useMemo, useState } from "react";

type Status = "READY" | "PROCESSING" | "FAILED" | "ARCHIVED";

type Deliverable = {
  id: string;
  name: string;
  type: string;
  status: Status;
  task: string;
  taskId: string;
  evidence: number;
  size: string;
  created: string;
};

const deliverables: Deliverable[] = [
  {
    id: "DEL-00218",
    name: "Operational Risk Assessment",
    type: "PDF",
    status: "READY",
    task: "Operational Risk Assessment",
    taskId: "TASK-00482",
    evidence: 8,
    size: "2.4 MB",
    created: "17 Sep 2026 · 10:44",
  },
  {
    id: "DEL-00217",
    name: "Safety Analysis Report",
    type: "DOCX",
    status: "READY",
    task: "Safety Analysis",
    taskId: "TASK-00481",
    evidence: 12,
    size: "1.8 MB",
    created: "17 Sep 2026 · 09:32",
  },
  {
    id: "DEL-00216",
    name: "Evidence Register",
    type: "XLSX",
    status: "PROCESSING",
    task: "Evidence Collection",
    taskId: "TASK-00480",
    evidence: 24,
    size: "846 KB",
    created: "17 Sep 2026 · 08:51",
  },
  {
    id: "DEL-00215",
    name: "Compliance Summary",
    type: "PDF",
    status: "READY",
    task: "Compliance Review",
    taskId: "TASK-00479",
    evidence: 16,
    size: "3.1 MB",
    created: "16 Sep 2026 · 18:24",
  },
  {
    id: "DEL-00214",
    name: "Process Control Matrix",
    type: "XLSX",
    status: "READY",
    task: "Process Control Review",
    taskId: "TASK-00478",
    evidence: 19,
    size: "1.2 MB",
    created: "16 Sep 2026 · 16:10",
  },
  {
    id: "DEL-00213",
    name: "Executive Briefing",
    type: "PPTX",
    status: "PROCESSING",
    task: "Executive Summary",
    taskId: "TASK-00477",
    evidence: 7,
    size: "4.8 MB",
    created: "16 Sep 2026 · 14:46",
  },
  {
    id: "DEL-00212",
    name: "Audit Evidence Package",
    type: "JSON",
    status: "FAILED",
    task: "Audit Preparation",
    taskId: "TASK-00476",
    evidence: 31,
    size: "512 KB",
    created: "16 Sep 2026 · 12:20",
  },
  {
    id: "DEL-00211",
    name: "Historical Risk Archive",
    type: "PDF",
    status: "ARCHIVED",
    task: "Historical Analysis",
    taskId: "TASK-00475",
    evidence: 14,
    size: "5.2 MB",
    created: "15 Sep 2026 · 17:05",
  },
];

const statusColor: Record<Status, string> = {
  READY: "#19d3a2",
  PROCESSING: "#6ca8ff",
  FAILED: "#ff7777",
  ARCHIVED: "#8796aa",
};

export default function Deliverables() {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("ALL");
  const [status, setStatus] = useState("ALL");
  const [selected, setSelected] = useState<Deliverable | null>(null);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();

    return deliverables.filter((item) => {
      const matchesSearch =
        !query ||
        item.name.toLowerCase().includes(query) ||
        item.id.toLowerCase().includes(query) ||
        item.task.toLowerCase().includes(query) ||
        item.taskId.toLowerCase().includes(query);

      const matchesType = type === "ALL" || item.type === type;
      const matchesStatus = status === "ALL" || item.status === status;

      return matchesSearch && matchesType && matchesStatus;
    });
  }, [search, type, status]);

  return (
    <div
      style={{
        minHeight: "100%",
        padding: "32px",
        boxSizing: "border-box",
        background: "#05090f",
        color: "#f8fafc",
      }}
    >
      {/* HEADER */}
      <div style={{ marginBottom: 28 }}>
        <div
          style={{
            color: "#19d3a2",
            fontSize: 9,
            fontWeight: 800,
            letterSpacing: "0.14em",
          }}
        >
          OUTPUTS
        </div>

        <h1
          style={{
            margin: "7px 0 5px",
            fontSize: 28,
            lineHeight: 1.2,
          }}
        >
          Deliverables
        </h1>

        <p
          style={{
            margin: 0,
            color: "#718198",
            fontSize: 11,
          }}
        >
          Manage generated outputs, evidence packages and reports.
        </p>
      </div>

      {/* STATS */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
          gap: 12,
          marginBottom: 16,
        }}
      >
        {[
          ["TOTAL", "18"],
          ["READY", "12"],
          ["PROCESSING", "3"],
          ["FAILED", "1"],
          ["ARCHIVED", "2"],
        ].map(([label, value]) => (
          <div
            key={label}
            style={{
              padding: 17,
              minHeight: 105,
              boxSizing: "border-box",
              border: "1px solid #182332",
              borderRadius: 10,
              background: "#0a111a",
            }}
          >
            <div
              style={{
                color: "#617289",
                fontSize: 8,
                fontWeight: 800,
                letterSpacing: "0.1em",
              }}
            >
              {label}
            </div>

            <div
              style={{
                marginTop: 9,
                fontSize: 25,
                fontWeight: 700,
                color:
                  label === "READY"
                    ? "#19d3a2"
                    : label === "FAILED"
                      ? "#ff7777"
                      : "#f1f5f8",
              }}
            >
              {value}
            </div>
          </div>
        ))}
      </div>

      {/* TOOLBAR */}
      <div
        style={{
          display: "flex",
          gap: 8,
          padding: 14,
          marginBottom: 16,
          border: "1px solid #182332",
          borderRadius: 10,
          background: "#0a111a",
        }}
      >
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search deliverables..."
          style={{
            flex: 1,
            height: 36,
            padding: "0 11px",
            boxSizing: "border-box",
            border: "1px solid #243246",
            borderRadius: 7,
            background: "#080e16",
            color: "#dce4ec",
            outline: "none",
            fontSize: 10,
          }}
        />

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          style={{
            width: 140,
            height: 36,
            border: "1px solid #243246",
            borderRadius: 7,
            background: "#080e16",
            color: "#aeb9c6",
            padding: "0 8px",
          }}
        >
          <option value="ALL">All Types</option>
          <option value="PDF">PDF</option>
          <option value="DOCX">DOCX</option>
          <option value="XLSX">XLSX</option>
          <option value="PPTX">PPTX</option>
          <option value="JSON">JSON</option>
        </select>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          style={{
            width: 150,
            height: 36,
            border: "1px solid #243246",
            borderRadius: 7,
            background: "#080e16",
            color: "#aeb9c6",
            padding: "0 8px",
          }}
        >
          <option value="ALL">All Status</option>
          <option value="READY">Ready</option>
          <option value="PROCESSING">Processing</option>
          <option value="FAILED">Failed</option>
          <option value="ARCHIVED">Archived</option>
        </select>
      </div>

      {/* TABLE */}
      <div
        style={{
          overflowX: "auto",
          border: "1px solid #182332",
          borderRadius: 10,
          background: "#0a111a",
        }}
      >
        <table
          style={{
            width: "100%",
            minWidth: 850,
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr>
              {[
                "DELIVERABLE",
                "TYPE",
                "STATUS",
                "TASK",
                "EVIDENCE",
                "SIZE",
                "CREATED",
              ].map((heading) => (
                <th
                  key={heading}
                  style={{
                    padding: "12px 16px",
                    textAlign: "left",
                    borderBottom: "1px solid #182332",
                    color: "#56677c",
                    fontSize: 8,
                    letterSpacing: "0.08em",
                  }}
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {filtered.map((item) => (
              <tr
                key={item.id}
                onClick={() => setSelected(item)}
                style={{ cursor: "pointer" }}
              >
                <td
                  style={{
                    padding: "14px 16px",
                    borderBottom: "1px solid #121c29",
                  }}
                >
                  <div
                    style={{
                      color: "#dce4ec",
                      fontSize: 10,
                      fontWeight: 700,
                    }}
                  >
                    {item.name}
                  </div>

                  <div
                    style={{
                      marginTop: 4,
                      color: "#4f6074",
                      fontFamily: "monospace",
                      fontSize: 7,
                    }}
                  >
                    {item.id}
                  </div>
                </td>

                <td
                  style={{
                    padding: "14px 16px",
                    borderBottom: "1px solid #121c29",
                    color: "#aeb9c6",
                    fontFamily: "monospace",
                    fontSize: 9,
                  }}
                >
                  {item.type}
                </td>

                <td
                  style={{
                    padding: "14px 16px",
                    borderBottom: "1px solid #121c29",
                  }}
                >
                  <span
                    style={{
                      color: statusColor[item.status],
                      fontSize: 8,
                      fontWeight: 800,
                    }}
                  >
                    ● {item.status}
                  </span>
                </td>

                <td
                  style={{
                    padding: "14px 16px",
                    borderBottom: "1px solid #121c29",
                    color: "#aeb9c6",
                    fontSize: 9,
                  }}
                >
                  {item.task}
                  <div
                    style={{
                      marginTop: 3,
                      color: "#4f6074",
                      fontFamily: "monospace",
                      fontSize: 7,
                    }}
                  >
                    {item.taskId}
                  </div>
                </td>

                <td
                  style={{
                    padding: "14px 16px",
                    borderBottom: "1px solid #121c29",
                    color: "#718198",
                    fontSize: 9,
                  }}
                >
                  {item.evidence}
                </td>

                <td
                  style={{
                    padding: "14px 16px",
                    borderBottom: "1px solid #121c29",
                    color: "#718198",
                    fontSize: 9,
                  }}
                >
                  {item.size}
                </td>

                <td
                  style={{
                    padding: "14px 16px",
                    borderBottom: "1px solid #121c29",
                    color: "#718198",
                    fontSize: 8,
                    whiteSpace: "nowrap",
                  }}
                >
                  {item.created}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* DETAILS DRAWER */}
      {selected && (
        <div
          onClick={() => setSelected(null)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "rgba(0,0,0,.55)",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "absolute",
              right: 0,
              top: 0,
              width: 420,
              maxWidth: "90vw",
              height: "100%",
              boxSizing: "border-box",
              padding: 24,
              overflowY: "auto",
              background: "#080e16",
              borderLeft: "1px solid #263548",
            }}
          >
            <button
              type="button"
              onClick={() => setSelected(null)}
              style={{
                float: "right",
                width: 32,
                height: 32,
                border: "1px solid #263548",
                borderRadius: 7,
                background: "#0b131d",
                color: "#aeb9c6",
                cursor: "pointer",
              }}
            >
              ×
            </button>

            <div
              style={{
                color: "#19d3a2",
                fontSize: 8,
                fontWeight: 800,
                letterSpacing: "0.12em",
              }}
            >
              DELIVERABLE DETAILS
            </div>

            <h2
              style={{
                marginTop: 10,
                color: "#f8fafc",
                fontSize: 20,
              }}
            >
              {selected.name}
            </h2>

            <div
              style={{
                marginTop: 20,
                display: "grid",
                gap: 14,
              }}
            >
              {[
                ["ID", selected.id],
                ["TYPE", selected.type],
                ["STATUS", selected.status],
                ["TASK", selected.task],
                ["TASK ID", selected.taskId],
                ["EVIDENCE", `${selected.evidence} sources`],
                ["SIZE", selected.size],
                ["CREATED", selected.created],
              ].map(([label, value]) => (
                <div
                  key={label}
                  style={{
                    paddingBottom: 12,
                    borderBottom: "1px solid #182332",
                  }}
                >
                  <div
                    style={{
                      color: "#56677c",
                      fontSize: 8,
                      fontWeight: 800,
                    }}
                  >
                    {label}
                  </div>

                  <div
                    style={{
                      marginTop: 5,
                      color: "#cbd5df",
                      fontSize: 10,
                    }}
                  >
                    {value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}