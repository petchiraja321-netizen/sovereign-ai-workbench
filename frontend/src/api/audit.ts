import {
  auditEvents,
  auditStats,
} from "../data/auditMock";

import type {
  AuditEvent,
  AuditStats,
} from "../types/audit";

export async function getAuditStats(): Promise<AuditStats> {
  return Promise.resolve(auditStats);
}

export async function getAuditEvents(): Promise<AuditEvent[]> {
  return Promise.resolve(auditEvents);
}

export async function getAuditEvent(
  eventId: string,
): Promise<AuditEvent | null> {
  const event = auditEvents.find(
    (item) => item.id === eventId,
  );

  return Promise.resolve(event ?? null);
}