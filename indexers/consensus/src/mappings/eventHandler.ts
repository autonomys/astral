import { EventRecord } from "@autonomys/auto-utils";
import { CONSENSUS_CHAIN_TYPE } from "./constants";
import { Cache, createReward, createTransfer } from "./db";

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
  "rewards.VoteReward": ({
    event,
    cache,
    height,
    blockHash,
    blockTimestamp,
    extrinsicId,
    eventId,
  }) => {
    const voter = event.event.data[0].toString();
    const reward = BigInt(event.event.data[1].toString());

    cache.addressToUpdate.add(voter);

    cache.totalVoteRewardsCount++;
    cache.totalRewardValue += reward;
    cache.totalVoteRewardValue += reward;

    cache.rewards.push(
      createReward(
        height,
        blockHash,
        extrinsicId,
        eventId,
        voter,
        "rewards.VoteReward",
        reward,
        blockTimestamp
      )
    );
  },
  "rewards.BlockReward": ({
    event,
    cache,
    height,
    blockHash,
    blockTimestamp,
    extrinsicId,
    eventId,
  }) => {
    const blockAuthor = event.event.data[0].toString();
    const reward = BigInt(event.event.data[1].toString());

    cache.addressToUpdate.add(blockAuthor);

    cache.totalBlockRewardsCount++;
    cache.totalRewardValue += reward;
    cache.totalBlockRewardValue += reward;

    cache.rewards.push(
      createReward(
        height,
        blockHash,
        extrinsicId,
        eventId,
        blockAuthor,
        "rewards.BlockReward",
        reward,
        blockTimestamp
      )
    );
  },
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

    const newTransfer = createTransfer(
      height,
      blockHash,
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
      blockTimestamp
    );
    cache.transfers.push(newTransfer);
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
    if (chainType === CONSENSUS_CHAIN_TYPE) cache.addressToUpdate.add(to);

    cache.totalTransferValue += amount;

    const newTransfer = createTransfer(
      height,
      blockHash,
      extrinsicId,
      eventId,
      extrinsicSigner,
      CONSENSUS_CHAIN_TYPE,
      to,
      chainType + ":" + domainId,
      amount,
      fee,
      "transporter.Transfer",
      successEvent ? true : false,
      blockTimestamp
    );
    cache.transfers.push(newTransfer);
  },
  "balances.Burned": ({ event, cache }) => {
    cache.addressToUpdate.add(event.event.data[0].toString());
  },
};
