import {
  CheckCircle2,
  Clock3,
  Archive,
  XCircle,
} from "lucide-react";

import type { DeliverableStatus as Status } from "../../../types/deliverables";

type Props = {
  status: Status;
};

export default function DeliverableStatus({
  status,
}: Props) {
  const config = {
    READY: {
      icon: CheckCircle2,
      label: "READY",
    },
    PROCESSING: {
      icon: Clock3,
      label: "PROCESSING",
    },
    FAILED: {
      icon: XCircle,
      label: "FAILED",
    },
    ARCHIVED: {
      icon: Archive,
      label: "ARCHIVED",
    },
  };

  const item = config[status];
  const Icon = item.icon;

  return (
    <span
      className={`deliverable-status deliverable-status--${status.toLowerCase()}`}
    >
      <Icon size={11} />
      {item.label}
    </span>
  );
}