import { useEffect, useState } from "react";

import { getSettings, saveSettings } from "../../api/settings";
import { settingsMock } from "../../data/settingsMock";

import type {
  SettingsData,
  SettingsSection,
} from "../../types/settings";

import { SettingsHeader } from "./components/SettingsHeader";
import { SettingsSidebar } from "./components/SettingsSidebar";
import { AccountSettings } from "./components/AccountSettings";
import { AISettings } from "./components/AISettings";
import { SecuritySettings } from "./components/SecuritySettings";
import { NotificationSettings } from "./components/NotificationSettings";
import { WorkspaceSettings } from "./components/WorkspaceSettings";
import { PrivacySettings } from "./components/PrivacySettings";
import { SystemInfo } from "./components/SystemInfo";
import "./settings.css";

export default function Settings() {
  const [settings, setSettings] =
    useState<SettingsData>(settingsMock);

  const [savedSettings, setSavedSettings] =
    useState<SettingsData>(settingsMock);

  const [activeSection, setActiveSection] =
    useState<SettingsSection>("account");

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let mounted = true;

    getSettings().then((data) => {
      if (!mounted) return;

      setSettings(data);
      setSavedSettings(data);
    });

    return () => {
      mounted = false;
    };
  }, []);

  const hasUnsavedChanges =
    JSON.stringify(settings) !==
    JSON.stringify(savedSettings);

  const updateSettings = (
    nextSettings: SettingsData,
  ) => {
    setSettings(nextSettings);
  };

  const handleSave = async () => {
    setSaving(true);

    try {
      const saved = await saveSettings(settings);

      setSettings(saved);
      setSavedSettings(saved);
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    setSettings(
      structuredClone(savedSettings),
    );
  };

  const renderSection = () => {
    switch (activeSection) {
      case "account":
        return (
          <AccountSettings
            settings={settings.account}
            onChange={(account) =>
              updateSettings({
                ...settings,
                account,
              })
            }
          />
        );

      case "ai":
        return (
          <AISettings
            settings={settings.ai}
            onChange={(ai) =>
              updateSettings({
                ...settings,
                ai,
              })
            }
          />
        );

      case "security":
  return (
    <section className="settings-section">
      <div className="settings-placeholder">
        <span>SECURITY</span>

        <h2>Security Settings</h2>

        <p>
          Security and monitoring preferences
          will be configured here.
        </p>
      </div>
    </section>
  );
  case "security":
  return (
    <SecuritySettings
      settings={settings.security}
      onChange={(security) =>
        updateSettings({
          ...settings,
          security,
        })
      }
    />
  );

      case "notifications":
  return (
    <NotificationSettings
      settings={settings.notifications}
      onChange={(notifications) =>
        updateSettings({
          ...settings,
          notifications,
        })
      }
    />
  );

      case "workspace":
  return (
    <WorkspaceSettings
      settings={settings.workspace}
      onChange={(workspace) =>
        updateSettings({
          ...settings,
          workspace,
        })
      }
    />
  );

      case "privacy":
  return (
    <PrivacySettings
      settings={settings.privacy}
      onChange={(privacy) =>
        updateSettings({
          ...settings,
          privacy,
        })
      }
    />
  );

      case "system":
  return (
    <SystemInfo
      settings={settings.system}
    />
  );

      default:
        return null;
    }
  };

  return (
    <div className="settings-page">
      <SettingsHeader
        hasUnsavedChanges={hasUnsavedChanges}
        saving={saving}
        onSave={handleSave}
        onReset={handleReset}
      />

      <div className="settings-layout">
        <SettingsSidebar
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />

        <main className="settings-content">
          {renderSection()}
        </main>
      </div>
    </div>
  );
}