import {
  Bell,
  ChevronRight,
  Command,
  HelpCircle,
  Search,
} from "lucide-react";
import { StatusBadge } from "../ui/StatusBadge";
import "./topbar.css";

export function Topbar() {
  return (
    <header className="topbar">
      <div className="topbar__left">
        <div className="topbar__breadcrumb">
          <span className="topbar__breadcrumb-muted">
            Workbench
          </span>

          <ChevronRight size={13} />

          <span className="topbar__breadcrumb-current">
            Dashboard
          </span>
        </div>
      </div>

      <div className="topbar__right">
        <button className="topbar__search">
          <Search size={15} />

          <span>Search</span>

          <kbd>
            <Command size={10} />
            K
          </kbd>
        </button>

        <StatusBadge
          status="online"
          label="System Online"
        />

        <button
          className="topbar__icon-button"
          aria-label="Help"
        >
          <HelpCircle size={17} />
        </button>

        <button
          className="topbar__icon-button topbar__notification"
          aria-label="Notifications"
        >
          <Bell size={17} />
          <span />
        </button>
      </div>
    </header>
  );
}