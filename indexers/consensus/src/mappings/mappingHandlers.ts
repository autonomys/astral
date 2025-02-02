global.TextEncoder = require("util").TextEncoder;
global.TextDecoder = require("util").TextDecoder;
global.Buffer = require("buffer/").Buffer;

import {
  account,
  blockchainSize,
  spacePledge,
} from "@autonomys/auto-consensus";
import type { ApiAtBlockHash } from "@autonomys/auto-utils";
import { stringify } from "@autonomys/auto-utils";
import { SubstrateBlock } from "@subql/types";
import { Entity } from "@subql/types-core";
import {
  createAccountHistory,
  createBlock,
  createEvent,
  createExtrinsic,
  createLog,
  createReward,
  createTransfer,
} from "./db";
import { getBlockAuthor, parseDataToCid } from "./helper";
import { ExtrinsicPrimitive, LogValue } from "./types";

const CONSENSUS_CHAIN_TYPE = "consensus";

export async function handleBlock(_block: SubstrateBlock): Promise<void> {
  const {
    block: {
      header: { number, parentHash, stateRoot, extrinsicsRoot, digest },
      hash,
      extrinsics,
    },
    timestamp,
    specVersion,
    events,
  } = _block;
  const height = BigInt(number.toString());
  const blockHash = hash.toString();
  const blockTimestamp = timestamp ? timestamp : new Date(0);
  const authorId = getBlockAuthor(_block);
  const eventsCount = events.length;
  const extrinsicsCount = extrinsics.length;

  const newExtrinsics = new Array<Entity>(extrinsics.length);
  const newEvents = new Array<Entity>(events.length);
  const newTransfers: Entity[] = [];
  const newRewards: Entity[] = [];
  const addressToUpdate = new Set<string>();

  let eventIndex = 0;
  let totalBlockRewardsCount = 0;
  let totalVoteRewardsCount = 0;
  let totalTransferValue = BigInt(0);
  let totalRewardValue = BigInt(0);
  let totalBlockRewardValue = BigInt(0);
  let totalVoteRewardValue = BigInt(0);

  // Calculate space pledged and blockchain size concurrently
  const [_spacePledged, _blockchainSize] = await Promise.all([
    spacePledge(api as unknown as ApiAtBlockHash),
    blockchainSize(api as unknown as ApiAtBlockHash),
  ]);

  const [eventsByExtrinsic, finalizationEvents] = events.reduce<
    [Record<number, typeof events>, typeof events]
  >(
    (acc, event) => {
      if (event.phase.isApplyExtrinsic) {
        const idx = event.phase.asApplyExtrinsic.toNumber();
        if (!acc[0][idx]) acc[0][idx] = [];
        acc[0][idx].push(event);
      } else if (event.phase.isFinalization) {
        acc[1].push(event);
      }
      return acc;
    },
    [{}, []]
  );

  // Process extrinsics
  extrinsics.forEach((extrinsic, extrinsicIdx) => {
    const extrinsicHash = extrinsic.hash.toString();
    const extrinsicMethodToPrimitive =
      extrinsic.method.toPrimitive() as ExtrinsicPrimitive;
    const extrinsicEvents = eventsByExtrinsic[extrinsicIdx] || [];

    const { feeEvent, errorEvent, successEvent } = extrinsicEvents.reduce(
      (
        acc: {
          feeEvent?: (typeof events)[number];
          errorEvent?: (typeof events)[number];
          successEvent?: (typeof events)[number];
        },
        event
      ) => {
        // Check for fee event
        if (
          !acc.feeEvent &&
          event.event.section === "balances" &&
          event.event.method === "Withdraw"
        ) {
          acc.feeEvent = event;
        }
        // Check for error event
        else if (
          !acc.errorEvent &&
          event.event.section === "system" &&
          event.event.method === "ExtrinsicFailed"
        ) {
          acc.errorEvent = event;
        }
        // Check for success event
        else if (
          !acc.successEvent &&
          event.event.section === "system" &&
          event.event.method === "ExtrinsicSuccess"
        ) {
          acc.successEvent = event;
        }
        return acc;
      },
      {}
    );

    // Calculate fee
    const fee = feeEvent?.event?.data[1]
      ? BigInt(feeEvent.event.data[1].toString())
      : BigInt(0);
    const error = errorEvent ? stringify(errorEvent.event.data) : "";

    const pos = extrinsicEvents ? extrinsicIdx : 0;
    const extrinsicSigner = extrinsic.signer.toString();

    // Detect data storage extrinsics and parse args to cid
    let cid: string | undefined = "";
    let extrinsicArgs: string = stringify(extrinsicMethodToPrimitive.args);
    if (
      (extrinsic.method.section === "historySeeding" &&
        extrinsic.method.method === "seedHistory") ||
      (extrinsic.method.section === "system" &&
        (extrinsic.method.method === "remarkWithEvent" ||
          extrinsic.method.method === "remark"))
    ) {
      const parsedArgs = parseDataToCid(extrinsicMethodToPrimitive.args.remark);
      cid = parsedArgs.cid;
      // The args parameter will be replaced by `{ "cid": "bafkr6i..." }` to minimize the size of the db
      extrinsicArgs = parsedArgs.modifiedArgs ?? extrinsicArgs;
    }

    newExtrinsics.push(
      createExtrinsic(
        extrinsicHash,
        height,
        blockHash,
        extrinsicIdx,
        extrinsic.method.section,
        extrinsic.method.method,
        successEvent ? true : false,
        blockTimestamp,
        BigInt(extrinsic.nonce.toString()),
        extrinsicSigner,
        extrinsic.signature.toString(),
        extrinsicEvents.length,
        extrinsicArgs,
        error,
        BigInt(extrinsic.tip.toString()),
        fee,
        pos,
        cid
      )
    );
    addressToUpdate.add(extrinsicSigner);

    // Process extrinsic events
    extrinsicEvents.forEach((event) => {
      const extrinsicId = extrinsic
        ? height + "-" + extrinsicIdx.toString()
        : "";

      // Detect data storage extrinsics and parse args to cid
      let cid: string | undefined = "";
      let eventsArgs: string = stringify(event.event.data);
      if (
        event.event.section === "system" &&
        event.event.method === "Remarked"
      ) {
        const parsedArgs = parseDataToCid(event.event.data[1].toString());
        cid = parsedArgs.cid;
        // The args parameter will be replaced by `{ "cid": "bafkr6i..." }` to minimize the size of the db
        eventsArgs = parsedArgs.modifiedArgs ?? eventsArgs;
      }

      newEvents.push(
        createEvent(
          height,
          blockHash,
          BigInt(eventIndex),
          extrinsicId,
          extrinsicHash,
          event.event.section,
          event.event.method,
          blockTimestamp,
          event.phase.type,
          pos,
          eventsArgs,
          cid
        )
      );

      // Process specific events
      switch (event.event.section + "." + event.event.method) {
        case "balances.Transfer": {
          const from = event.event.data[0].toString();
          const to = event.event.data[1].toString();
          const amount = BigInt(event.event.data[2].toString());

          addressToUpdate.add(from);
          addressToUpdate.add(to);

          totalTransferValue += amount;

          const newTransfer = createTransfer(
            height,
            blockHash,
            extrinsicId,
            height + "-" + eventIndex,
            from,
            CONSENSUS_CHAIN_TYPE,
            to,
            CONSENSUS_CHAIN_TYPE,
            amount,
            fee,
            successEvent ? true : false,
            blockTimestamp
          );
          newTransfers.push(newTransfer);

          break;
        }
        case "transporter.OutgoingTransferInitiated": {
          const [chainType, domainId] = Object.entries(
            extrinsicMethodToPrimitive.args.dst_location.chainId
          )[0] as [string, string | undefined];
          const [_, to] = Object.entries(
            extrinsicMethodToPrimitive.args.dst_location.accountId
          )[0] as [string, string];
          const amount = BigInt(
            extrinsicMethodToPrimitive.args.amount.toString()
          );

          addressToUpdate.add(extrinsicSigner);
          if (chainType === CONSENSUS_CHAIN_TYPE) addressToUpdate.add(to);

          totalTransferValue += amount;

          const newTransfer = createTransfer(
            height,
            blockHash,
            extrinsicId,
            height + "-" + eventIndex,
            extrinsicSigner,
            CONSENSUS_CHAIN_TYPE,
            to,
            chainType + ":" + domainId,
            amount,
            fee,
            successEvent ? true : false,
            blockTimestamp
          );
          newTransfers.push(newTransfer);

          break;
        }
        case "balances.Burned": {
          addressToUpdate.add(event.event.data[0].toString());
          break;
        }
        default:
          break;
      }

      // Increment event index
      eventIndex++;
    });
  });

  // Process finalization events
  finalizationEvents.forEach(async (event) => {
    newEvents.push(
      createEvent(
        height,
        blockHash,
        BigInt(eventIndex),
        "",
        "",
        event.event.section,
        event.event.method,
        blockTimestamp,
        event.phase.type,
        0,
        stringify(event.event.data),
        ""
      )
    );

    // Process specific events
    switch (event.event.section + "." + event.event.method) {
      case "rewards.VoteReward": {
        const voter = event.event.data[0].toString();
        const reward = BigInt(event.event.data[1].toString());

        addressToUpdate.add(voter);

        totalVoteRewardsCount++;
        totalRewardValue += reward;
        totalVoteRewardValue += reward;

        newRewards.push(
          createReward(
            height,
            blockHash,
            height + "-" + event.phase.type,
            height + "-" + eventIndex,
            voter,
            "rewards.VoteReward",
            reward,
            blockTimestamp
          )
        );

        break;
      }
      case "rewards.BlockReward": {
        const blockAuthor = event.event.data[0].toString();
        const reward = BigInt(event.event.data[1].toString());

        addressToUpdate.add(blockAuthor);

        totalBlockRewardsCount++;
        totalRewardValue += reward;
        totalBlockRewardValue += reward;

        newRewards.push(
          createReward(
            height,
            blockHash,
            height + "-" + event.phase.type,
            height + "-" + eventIndex,
            blockAuthor,
            "rewards.BlockReward",
            reward,
            blockTimestamp
          )
        );

        break;
      }
      case "balances.Deposit": {
        addressToUpdate.add(event.event.data[0].toString());
        break;
      }
      default:
        break;
    }

    // Increment event index
    eventIndex++;
  });

  // Create block logs
  const newLogs = digest.logs.map((log, i) => {
    const logData = log.toHuman();
    const logJson = log.toPrimitive();
    const kind = logData ? Object.keys(logData)[0] : "";
    const rawKind = logJson ? Object.keys(logJson)[0] : "";
    const _value = logJson ? logJson[rawKind as keyof typeof logJson] : "";
    const value: LogValue =
      Array.isArray(_value) && _value.length === 2
        ? { data: _value[1], engine: _value[0] }
        : { data: _value };

    return createLog(
      height,
      blockHash,
      i,
      kind,
      stringify(value),
      blockTimestamp
    );
  });

  // Update accounts
  const uniqueAddresses = Array.from(addressToUpdate);
  const accounts = await Promise.all(
    uniqueAddresses.map((address) => account(api as any, address))
  );

  // Create and save accounts
  const accountHistories = accounts.map((account, i) =>
    createAccountHistory(
      uniqueAddresses[i],
      height,
      BigInt(account.nonce.toString()),
      account.data.free,
      account.data.reserved,
      account.data.free + account.data.reserved
    )
  );

  // Save many entities in parallel
  await Promise.all([
    // Save extrinsic, events and logs
    store.bulkCreate(`Extrinsic`, newExtrinsics),
    store.bulkCreate(`Event`, newEvents),
    store.bulkCreate(`Log`, newLogs),

    // Save transfers and rewards
    store.bulkCreate(`Transfer`, newTransfers),
    store.bulkCreate(`Reward`, newRewards),

    // Save account
    store.bulkCreate(`AccountHistory`, accountHistories),

    // Create and save block
    store.bulkCreate(`Block`, [
      createBlock(
        blockHash,
        height,
        blockTimestamp,
        parentHash.toString(),
        specVersion.toString(),
        stateRoot.toString(),
        extrinsicsRoot.toString(),
        _spacePledged,
        _blockchainSize,
        extrinsicsCount,
        eventsCount,
        newLogs.length,
        newTransfers.length,
        newRewards.length,
        totalBlockRewardsCount,
        totalVoteRewardsCount,
        totalTransferValue,
        totalRewardValue,
        totalBlockRewardValue,
        totalVoteRewardValue,
        authorId
      ),
    ]),
  ]);
}
