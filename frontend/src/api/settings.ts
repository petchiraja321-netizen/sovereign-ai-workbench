import type { SettingsData } from "../types/settings";
import { settingsMock } from "../data/settingsMock";

export async function getSettings(): Promise<SettingsData> {
  return structuredClone(settingsMock);
}

export async function saveSettings(
  settings: SettingsData,
): Promise<SettingsData> {
  return structuredClone(settings);
}