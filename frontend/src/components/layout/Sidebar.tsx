import {
  Activity,
  BrainCircuit,
  ClipboardList,
  FileText,
  LayoutDashboard,
  LockKeyhole,
  Settings,
  ShieldCheck,
  UserRound,
} from "lucide-react";

import { NavLink } from "react-router-dom";

import "./sidebar.css";

const mainNavigation = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "AI Studio",
    path: "/ai-studio",
    icon: BrainCircuit,
  },
  {
    label: "Knowledge",
    path: "/knowledge",
    icon: FileText,
  },
  {
    label: "Tasks",
    path: "/tasks",
    icon: ClipboardList,
  },
];

const systemNavigation = [
  {
    label: "Security",
    path: "/security",
    icon: ShieldCheck,
  },
  {
    label: "Audit",
    path: "/audit",
    icon: Activity,
  },
  {
    label: "Deliverables",
    path: "/deliverables",
    icon: FileText,
  },
];

export function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar__brand">
        <div className="sidebar__brand-mark">
          <LockKeyhole
            size={18}
            strokeWidth={2.2}
          />
        </div>

        <div>
          <div className="sidebar__brand-name">
            SOVEREIGN
          </div>

          <div className="sidebar__brand-subtitle">
            AI WORKBENCH
          </div>
        </div>
      </div>

      <div className="sidebar__section">
        <p className="sidebar__section-label">
          Workspace
        </p>

        <nav className="sidebar__nav">
          {mainNavigation.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `sidebar__nav-item ${
                    isActive
                      ? "sidebar__nav-item--active"
                      : ""
                  }`
                }
              >
                <Icon
                  size={17}
                  strokeWidth={1.9}
                />

                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      <div className="sidebar__section">
        <p className="sidebar__section-label">
          System
        </p>

        <nav className="sidebar__nav">
          {systemNavigation.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `sidebar__nav-item ${
                    isActive
                      ? "sidebar__nav-item--active"
                      : ""
                  }`
                }
              >
                <Icon
                  size={17}
                  strokeWidth={1.9}
                />

                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      <div className="sidebar__bottom">
        <div className="sidebar__status">
          <span className="sidebar__status-dot" />

          <div>
            <p className="sidebar__status-title">
              Sovereign Core
            </p>

            <p className="sidebar__status-subtitle">
              Local services operational
            </p>
          </div>
        </div>

        <button
          type="button"
          className="sidebar__user"
        >
          <div className="sidebar__user-avatar">
            <UserRound size={16} />
          </div>

          <div className="sidebar__user-info">
            <p className="sidebar__user-name">
              Petchiraja
            </p>

            <p className="sidebar__user-role">
              Frontend Developer
            </p>
          </div>

          <Settings
            size={15}
            className="sidebar__settings"
          />
        </button>
      </div>
    </aside>
  );
}