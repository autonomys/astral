import { events } from "../types";

export const CONFIG = {
  prefix: 2254,
};

export const PREFIX = 2254;

export const BALANCE_UPDATE_EVENTS = [
  events.balances.balanceSet.v0.name,
  events.balances.deposit.v0.name,
  events.balances.reserved.v0.name,
  events.balances.slashed.v0.name,
  events.balances.withdraw.v0.name,
  events.balances.unreserved.v0.name,
  events.balances.burned.v0.name,
  events.balances.restored.v0.name,
];
