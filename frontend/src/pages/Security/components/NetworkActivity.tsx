import { Globe2, Lock, Server } from "lucide-react";

import type { NetworkActivityItem } from "../../../types/security";

type Props = {
  items: NetworkActivityItem[];
};

export default function NetworkActivity({ items }: Props) {
  return (
    <section className="security-network">
      <div className="security-network__header">
        <div className="security-section-heading">
          <div>
            <span className="security-section-label">NETWORK</span>
            <h2>Network activity</h2>
          </div>
        </div>
      </div>

      <div className="security-network__list">
        {items.map((item) => {
          const isExternal = item.category === "external";

          return (
            <div className="security-network__item" key={item.id}>
              <div className="security-network__main">
                <div className="security-network__icon">
                  {isExternal ? (
                    <Globe2 size={16} />
                  ) : (
                    <Server size={16} />
                  )}
                </div>

                <div>
                  <div className="security-network__name">{item.name}</div>
                  <div className="security-network__description">
                    {item.description}
                  </div>
                </div>
              </div>

              <div style={{ textAlign: "right" }}>
                <span className="security-network__category">
                  {item.category}
                </span>

                <div style={{ marginTop: 5 }}>
                  <span
                    className={`security-badge security-badge--${
                      item.status === "active"
                        ? "allowed"
                        : item.status === "blocked"
                          ? "blocked"
                          : "monitored"
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ padding: "8px 20px 0", color: "#98a2b3", fontSize: 10 }}>
        <Lock size={12} style={{ verticalAlign: "middle", marginRight: 5 }} />
        External communication is subject to policy monitoring.
      </div>
    </section>
  );
}