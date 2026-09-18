import {
  fileSecurityItems,
  networkActivity,
  securityEvents,
  securityOverview,
} from "../data/securityMock";

import type {
  FileSecurityItem,
  NetworkActivityItem,
  SecurityEvent,
  SecurityOverview,
} from "../types/security";

/*
 * Mock API layer.
 *
 * Later these functions can be replaced with
 * Spring Boot API calls without changing the
 * Security Center UI components.
 */

export async function getSecurityOverview(): Promise<SecurityOverview> {
  return Promise.resolve(securityOverview);
}

export async function getSecurityEvents(): Promise<SecurityEvent[]> {
  return Promise.resolve(securityEvents);
}

export async function getNetworkActivity(): Promise<
  NetworkActivityItem[]
> {
  return Promise.resolve(networkActivity);
}

export async function getFileSecurity(): Promise<
  FileSecurityItem[]
> {
  return Promise.resolve(fileSecurityItems);
}

export async function getSecurityEvent(
  eventId: string,
): Promise<SecurityEvent | null> {
  const event = securityEvents.find(
    (item) => item.id === eventId,
  );

  return Promise.resolve(event ?? null);
}