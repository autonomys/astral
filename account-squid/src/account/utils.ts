import { StoreWithCache } from "@belopash/typeorm-store";
import * as ss58 from "@subsquid/ss58";
import { In } from "typeorm";
import { Account } from "../model";
import { Call, Event, ProcessorContext } from "../processor";
import { events } from "../types";
import { BALANCE_UPDATE_EVENTS, CONFIG } from "./constants";

export interface TransferEvent {
  id: string;
  blockNumber: number;
  timestamp: Date;
  extrinsicHash?: string;
  from: string;
  to: string;
  amount: bigint;
  fee?: bigint;
}

/**
 *
 * @param id
 * @returns substrate account address properly encoded
 */
export function encodeId(id: Uint8Array | string) {
  return ss58.codec(CONFIG.prefix).encode(id);
}

export function callIsValid(call: Call): boolean {
  return (
    call.parentCall == null &&
    call.origin &&
    call.origin.__kind === "system" &&
    call.origin.value.__kind === "Signed"
  );
}

export function isBalanceUpdateEvent(event: Event): boolean {
  return BALANCE_UPDATE_EVENTS.includes(event.name);
}

export function handleRepatriatedEvent(event: Event) {
  const accountsToUpdate = new Set<string>();

  const rec = events.balances.reserveRepatriated.v0.decode(event);

  accountsToUpdate.add(rec.from);
  accountsToUpdate.add(rec.to);

  return accountsToUpdate.values();
}

export function handleEndowedEvent(event: Event) {
  const accountsToUpdate = new Set<string>();

  const rec = events.balances.endowed.v0.decode(event);

  accountsToUpdate.add(rec.account);

  return accountsToUpdate.values();
}

export async function ensureAccountsExist(
  ctx: ProcessorContext<StoreWithCache>,
  accountIds: string[]
): Promise<Map<string, Account>> {
  const accounts = new Map();

  const existingAccounts = await ctx.store.findBy(Account, {
    id: In(accountIds),
  });
  existingAccounts.forEach((account) => accounts.set(account.id, account));

  accountIds.forEach((id) => {
    if (!accounts.has(id)) accounts.set(id, new Account({ id: encodeId(id) }));
  });

  return accounts;
}
