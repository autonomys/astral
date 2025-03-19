import { EventRecord } from "@autonomys/auto-utils";
import { DOMAIN_AUTO_EVM_CHAIN_TYPE } from "./constants";
import { Cache, createTransfer } from "./db";

type EventHandler = (params: {
  event: EventRecord;
  cache: Cache;
  height: bigint;
  blockHash: string;
  blockTimestamp: Date;
  extrinsicId: string;
  eventId: string;
  extrinsic?: any;
  fee: bigint;
  successEvent: boolean;
  extrinsicSigner: string;
  extrinsicMethodToPrimitive: any;
}) => void;

export const EVENT_HANDLERS: Record<string, EventHandler> = {
  "balances.Deposit": ({ event, cache }) => {
    cache.addressToUpdate.add(event.event.data[0].toString());
  },
  "balances.Transfer": ({
    event,
    cache,
    height,
    blockHash,
    blockTimestamp,
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
        blockHash,
        extrinsicId,
        eventId,
        from,
        DOMAIN_AUTO_EVM_CHAIN_TYPE,
        to,
        DOMAIN_AUTO_EVM_CHAIN_TYPE,
        amount,
        fee,
        successEvent ? true : false,
        blockTimestamp
      )
    );
  },
  "transporter.OutgoingTransferInitiated": ({
    event,
    cache,
    height,
    blockHash,
    blockTimestamp,
    extrinsicId,
    eventId,
    extrinsicSigner,
    fee,
    successEvent,
    extrinsicMethodToPrimitive,
  }) => {
    const [chainType, domainId] = Object.entries(
      extrinsicMethodToPrimitive.args.dst_location.chainId
    )[0] as [string, string | undefined];
    const [_, to] = Object.entries(
      extrinsicMethodToPrimitive.args.dst_location.accountId
    )[0] as [string, string];
    const amount = BigInt(extrinsicMethodToPrimitive.args.amount.toString());

    cache.addressToUpdate.add(extrinsicSigner);
    if (chainType === DOMAIN_AUTO_EVM_CHAIN_TYPE) cache.addressToUpdate.add(to);

    cache.totalTransferValue += amount;
    cache.transfers.push(
      createTransfer(
        height,
        blockHash,
        extrinsicId,
        eventId,
        extrinsicSigner,
        DOMAIN_AUTO_EVM_CHAIN_TYPE,
        to,
        chainType + ":" + domainId,
        amount,
        fee,
        successEvent ? true : false,
        blockTimestamp
      )
    );
  },
  "balances.Burned": ({ event, cache }) => {
    cache.addressToUpdate.add(event.event.data[0].toString());
  },
};
