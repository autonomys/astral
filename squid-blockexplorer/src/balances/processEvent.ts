import {
  BalancesBalanceSetEvent,
  BalancesDepositEvent,
  BalancesEndowedEvent,
  BalancesReservedEvent,
  BalancesReserveRepatriatedEvent,
  BalancesSlashedEvent,
  BalancesTransferEvent,
  BalancesUnreservedEvent,
  BalancesWithdrawEvent,
} from '../types/events';
import { toHex } from '@subsquid/substrate-processor';
import { Event } from '../types/support';
import { Context, EventItem } from '../processor';
import { BALANCE_EVENTS } from './constants';

export class BalanceEventHandler {
  private readonly ctx: Context;

  constructor(ctx: Context) {
    this.ctx = ctx;
  }

  getTransferAccounts(event: Event) {
    const data = new BalancesTransferEvent(this.ctx, event);

    if (data.isV1) {
      return [toHex(data.asV1.from), toHex(data.asV1.to)];
    } else {
      throw new UnknownVersionError(data.constructor.name);
    }
  }

  getEndowedAccount(event: Event) {
    const data = new BalancesEndowedEvent(this.ctx, event);

    if (data.isV1) {
      return toHex(data.asV1.account);
    } else {
      throw new UnknownVersionError(data.constructor.name);
    }
  }

  getReserveRepatriatedAccounts(event: Event) {
    const data = new BalancesReserveRepatriatedEvent(this.ctx, event);

    if (data.isV1) {
      return [toHex(data.asV1.from), toHex(data.asV1.to)];
    } else {
      throw new UnknownVersionError(data.constructor.name);
    }
  }

  // handles most of the events
  getAccountFromEvent(event: Event) {
    const EventType = eventTypes[event.name];
    const data = new EventType(this.ctx, event);

    if (data.isV1) {
      return toHex(data.asV1.who);
    } else {
      throw new UnknownVersionError(data.constructor.name);
    }
  }
}

class UnknownVersionError extends Error {
  constructor(name: string) {
    super(`There is no relevant version for ${name}`);
  }
}

const eventTypes = {
  [BALANCE_EVENTS.BalanceSet]: BalancesBalanceSetEvent,
  [BALANCE_EVENTS.Deposit]: BalancesDepositEvent,
  [BALANCE_EVENTS.Reserved]: BalancesReservedEvent,
  [BALANCE_EVENTS.Unreserved]: BalancesUnreservedEvent,
  [BALANCE_EVENTS.Withdraw]: BalancesWithdrawEvent,
  [BALANCE_EVENTS.Slashed]: BalancesSlashedEvent,
};

export function processEventFactory(balanceEventHandler: BalanceEventHandler) {
  return function processEvent(item: EventItem, accountIdsHex: Set<string>) {
    switch (item.name) {
      case BALANCE_EVENTS.BalanceSet:
      case BALANCE_EVENTS.Deposit:
      case BALANCE_EVENTS.Reserved:
      case BALANCE_EVENTS.Unreserved:
      case BALANCE_EVENTS.Withdraw:
      case BALANCE_EVENTS.Slashed: {
        const account = balanceEventHandler.getAccountFromEvent(item.event as unknown as Event);
        accountIdsHex.add(account);
        break;
      }
      case BALANCE_EVENTS.Endowed: {
        const account = balanceEventHandler.getEndowedAccount(item.event as unknown as Event);
        accountIdsHex.add(account);
        break;
      }
      case BALANCE_EVENTS.Transfer: {
        const accounts = balanceEventHandler.getTransferAccounts(item.event as unknown as Event);
        accountIdsHex.add(accounts[0]);
        accountIdsHex.add(accounts[1]);
        break;
      }
      case BALANCE_EVENTS.ReserveRepatriated: {
        const accounts = balanceEventHandler.getReserveRepatriatedAccounts(item.event as unknown as Event);
        accountIdsHex.add(accounts[0]);
        accountIdsHex.add(accounts[1]);
        break;
      }
    }
  };
}
