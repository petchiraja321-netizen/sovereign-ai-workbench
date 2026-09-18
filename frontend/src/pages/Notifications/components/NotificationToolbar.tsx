import type { NotificationFilters as NotificationFiltersType } from "../../../types/notification";

import { NotificationFilters } from "./NotificationFilters";

interface NotificationToolbarProps {
  filters: NotificationFiltersType;
  onChange: (
    filters: NotificationFiltersType,
  ) => void;
}

export function NotificationToolbar({
  filters,
  onChange,
}: NotificationToolbarProps) {
  return (
    <section className="notification-toolbar">
      <div className="notification-search">
        <span
          className="notification-search__icon"
          aria-hidden="true"
        >
          ⌕
        </span>

        <input
          type="search"
          value={filters.search}
          onChange={(event) =>
            onChange({
              ...filters,
              search: event.target.value,
            })
          }
          placeholder="Search notifications..."
          aria-label="Search notifications"
        />
      </div>

      <div className="notification-filter-group">
        <NotificationFilters
          filters={filters}
          onChange={onChange}
        />
      </div>
    </section>
  );
}