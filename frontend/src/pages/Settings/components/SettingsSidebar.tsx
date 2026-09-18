import type { SettingsSection } from "../../../types/settings";

interface SettingsSidebarProps {
  activeSection: SettingsSection;
  onSectionChange: (section: SettingsSection) => void;
}

const sections: Array<{
  id: SettingsSection;
  label: string;
  description: string;
}> = [
  {
    id: "account",
    label: "Account",
    description: "Profile and workspace identity",
  },
  {
    id: "ai",
    label: "AI Configuration",
    description: "Models and execution policy",
  },
  {
    id: "security",
    label: "Security",
    description: "Protection and monitoring",
  },
  {
    id: "notifications",
    label: "Notifications",
    description: "Operational alerts",
  },
  {
    id: "workspace",
    label: "Workspace",
    description: "Workbench preferences",
  },
  {
    id: "privacy",
    label: "Privacy",
    description: "Data and privacy controls",
  },
  {
    id: "system",
    label: "System",
    description: "Runtime information",
  },
];

export function SettingsSidebar({
  activeSection,
  onSectionChange,
}: SettingsSidebarProps) {
  return (
    <aside className="settings-sidebar">
      <div className="settings-sidebar__title">SETTINGS</div>

      <nav className="settings-sidebar__nav">
        {sections.map((section) => {
          const active = activeSection === section.id;

          return (
            <button
              key={section.id}
              type="button"
              className={`settings-nav-item ${
                active ? "settings-nav-item--active" : ""
              }`}
              onClick={() => onSectionChange(section.id)}
            >
              <span className="settings-nav-item__label">
                {section.label}
              </span>

              <span className="settings-nav-item__description">
                {section.description}
              </span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}