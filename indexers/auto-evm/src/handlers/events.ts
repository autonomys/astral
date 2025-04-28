import { CONSENSUS_CHAIN_TYPE } from "../structures/constants.ts";
import { Cache } from "../types/cache.ts";
import { Event } from "../types/chain.ts";
import { createTransfer } from "../utils/cache.ts";

type EventHandler = (params: {
  event: Event;
  cache: Cache;
  height: bigint;
  hash: string;
  date: Date;
  extrinsicId: string;
  eventId: string;
  extrinsic?: any;
  fee: bigint;
  successEvent: boolean;
  extrinsicSigner: string;
  extrinsicArgs: any;
  extrinsicEvents: Event[];
}) => void;

export const EVENT_HANDLERS: Record<string, EventHandler> = {
  "balances.Deposit": ({ event, cache }) => {
    cache.addressToUpdate.add(event.event.data[0].toString());
  },
  "balances.Transfer": ({
    event,
    cache,
    height,
    hash,
    date,
    extrinsicId,
    eventId,
    fee,
    successEvent,
  }) => {
    const from = event.event.data[0].toString();
    const to = event.event.data[1].toString();
    const amount = BigInt(event.event.data[2].toString());

    cache.addressToUpdate.add(from);
    cache.addressToUpdate.add(to);

    cache.totalTransferValue += amount;

    cache.transfers.push(
      createTransfer(
        height,
        hash,
        extrinsicId,
        eventId,
        from,
        CONSENSUS_CHAIN_TYPE,
        to,
        CONSENSUS_CHAIN_TYPE,
        amount,
        fee,
        "balances.Transfer",
        successEvent ? true : false,
        true,
        date
      )
    );
  },
  "balances.Burned": ({ event, cache }) => {
    cache.addressToUpdate.add(event.event.data[0].toString());
  },
};
