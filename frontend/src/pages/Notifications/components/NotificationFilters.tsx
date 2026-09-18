import type {
  NotificationFilters as NotificationFiltersType,
  NotificationSeverity,
  NotificationType,
} from "../../../types/notification";

interface NotificationFiltersProps {
  filters: NotificationFiltersType;
  onChange: (
    filters: NotificationFiltersType,
  ) => void;
}

export function NotificationFilters({
  filters,
  onChange,
}: NotificationFiltersProps) {
  const updateFilter = <
    K extends keyof NotificationFiltersType,
  >(
    key: K,
    value: NotificationFiltersType[K],
  ) => {
    onChange({
      ...filters,
      [key]: value,
    });
  };

  return (
    <>
      <select
        value={filters.type}
        onChange={(event) =>
          updateFilter(
            "type",
            event.target
              .value as NotificationType | "ALL",
          )
        }
        aria-label="Notification type"
      >
        <option value="ALL">All Types</option>
        <option value="TASK">Task</option>
        <option value="APPROVAL">Approval</option>
        <option value="SECURITY">Security</option>
        <option value="DELIVERABLE">
          Deliverable
        </option>
        <option value="AGENT">Agent</option>
        <option value="SYSTEM">System</option>
      </select>

      <select
        value={filters.severity}
        onChange={(event) =>
          updateFilter(
            "severity",
            event.target
              .value as NotificationSeverity | "ALL",
          )
        }
        aria-label="Notification severity"
      >
        <option value="ALL">All Severity</option>
        <option value="INFO">Info</option>
        <option value="SUCCESS">Success</option>
        <option value="WARNING">Warning</option>
        <option value="ERROR">Error</option>
      </select>

      <select
        value={filters.status}
        onChange={(event) =>
          updateFilter(
            "status",
            event.target.value as
              | "ALL"
              | "READ"
              | "UNREAD",
          )
        }
        aria-label="Notification status"
      >
        <option value="ALL">All Status</option>
        <option value="UNREAD">Unread</option>
        <option value="READ">Read</option>
      </select>
    </>
  );
}