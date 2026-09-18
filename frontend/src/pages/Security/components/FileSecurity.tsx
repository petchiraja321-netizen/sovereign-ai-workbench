import { FileCheck2, FileWarning } from "lucide-react";

import type { FileSecurityItem } from "../../../types/security";

type Props = {
  items: FileSecurityItem[];
};

export default function FileSecurity({ items }: Props) {
  return (
    <section className="security-files">
      <div className="security-files__header">
        <div className="security-section-heading">
          <div>
            <span className="security-section-label">FILE CONTROL</span>
            <h2>File security</h2>
          </div>
        </div>
      </div>

      <div className="security-files__list">
        {items.map((item) => (
          <div className="security-files__item" key={item.id}>
            <div className="security-files__top">
              <div className="security-files__name">
                {item.validation === "passed" ? (
                  <FileCheck2 size={16} />
                ) : (
                  <FileWarning size={16} />
                )}

                <span>{item.name}</span>
              </div>

              <span
                className={`security-badge security-badge--${item.validation}`}
              >
                {item.validation}
              </span>
            </div>

            <div className="security-files__meta">
              <div>
                <span>Type</span>
                <strong>{item.type}</strong>
              </div>

              <div>
                <span>Size</span>
                <strong>{item.size}</strong>
              </div>

              <div>
                <span>Trust</span>
                <strong>{item.trust}</strong>
              </div>
            </div>

            <div className="security-files__meta">
              <div style={{ gridColumn: "1 / -1" }}>
                <span>SHA-256</span>
                <strong title={item.hash}>{item.hash}</strong>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}