import type { QuickAction } from "../../types/search";

interface QuickActionsProps {
  actions: QuickAction[];
  onSelect: (
    action: QuickAction,
  ) => void;
}

export function QuickActions({
  actions,
  onSelect,
}: QuickActionsProps) {
  return (
    <section className="global-search-quick-actions">
      <div className="global-search-section-label">
        Quick Actions
      </div>

      <div className="global-search-action-list">
        {actions.map((action) => (
          <button
            type="button"
            key={action.id}
            onClick={() =>
              onSelect(action)
            }
          >
            <span className="global-search-action__icon">
              {action.icon}
            </span>

            <span>
              <strong>
                {action.title}
              </strong>

              <small>
                {action.description}
              </small>
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}