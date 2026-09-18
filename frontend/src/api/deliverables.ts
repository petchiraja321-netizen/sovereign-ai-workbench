import {
  deliverableStats,
  deliverables,
} from "../data/deliverablesMock";

import type {
  Deliverable,
  DeliverableStats,
} from "../types/deliverables";

export async function getDeliverableStats(): Promise<DeliverableStats> {
  return Promise.resolve(deliverableStats);
}

export async function getDeliverables(): Promise<Deliverable[]> {
  return Promise.resolve(deliverables);
}

export async function getDeliverable(
  id: string,
): Promise<Deliverable | null> {
  const item = deliverables.find(
    (deliverable) => deliverable.id === id,
  );

  return Promise.resolve(item ?? null);
}