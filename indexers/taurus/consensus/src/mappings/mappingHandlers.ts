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
import { Event, Extrinsic, Reward, Transfer } from "../types";
import {
  createAndSaveAccountHistory,
  createAndSaveBlock,
  createAndSaveLog,
  createEvent,
  createEventModule,
  createExtrinsic,
  createExtrinsicModule,
  createLogKind,
  createReward,
  createSection,
  createTransfer,
  saveEventModules,
  saveEvents,
  saveExtrinsicModules,
  saveExtrinsics,
  saveLogKinds,
  saveRewards,
  saveSections,
  saveTransfers,
} from "./db";
import { getBlockAuthor, parseDataToCid } from "./helper";
import { ExtrinsicPrimitive, LogValue } from "./types";

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

  const newExtrinsics: Extrinsic[] = [];
  const newEvents: Event[] = [];
  const newTransfers: Transfer[] = [];
  const newRewards: Reward[] = [];

  const extrinsicMethodsToUpdate: [string, string][] = [];
  const eventMethodsToUpdate: [string, string][] = [];
  const logKindsToUpdate: string[] = [];
  const addressToUpdate: string[] = [];

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

  // Process extrinsics
  extrinsics.forEach((extrinsic, extrinsicIdx) => {
    const extrinsicMethodToPrimitive =
      extrinsic.method.toPrimitive() as ExtrinsicPrimitive;

    const extrinsicEvents = events.filter(
      (e) =>
        e.phase.isApplyExtrinsic &&
        e.phase.asApplyExtrinsic.toNumber() === extrinsicIdx
    );

    const feeEvent = events.find(
      (e) =>
        e.phase.isApplyExtrinsic &&
        e.event.section === "balances" &&
        e.event.method === "Withdraw"
    );
    const fee =
      feeEvent && feeEvent.event && feeEvent.event.data[1]
        ? BigInt(feeEvent.event.data[1].toString())
        : BigInt(0);

    const errorEvent = events.find(
      (e) =>
        e.event.section === "system" && e.event.method === "ExtrinsicFailed"
    );
    const successEvent = events.find(
      (e) =>
        e.event.section === "system" && e.event.method === "ExtrinsicSuccess"
    );
    const error = errorEvent ? stringify(errorEvent.event.data) : "";

    const pos = extrinsicEvents ? extrinsicIdx : 0;
    const extrinsicSigner = extrinsic.signer.toString();

    // Detect data storage extrinsics and parse args to cid
    let cid: string | undefined = undefined;
    let args: string = stringify(extrinsicMethodToPrimitive.args);
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
      args = parsedArgs.modifiedArgs ?? args;
    }

    newExtrinsics.push(
      createExtrinsic(
        extrinsic.hash.toString(),
        height,
        blockHash,
        extrinsicIdx,
        extrinsic.method.section,
        extrinsic.method.method,
        successEvent ? true : false,
        timestamp ? timestamp : new Date(0),
        BigInt(extrinsic.nonce.toString()),
        extrinsicSigner,
        extrinsic.signature.toString(),
        args,
        error,
        BigInt(extrinsic.tip.toString()),
        fee,
        pos,
        cid
      )
    );
    extrinsicMethodsToUpdate.push([
      extrinsic.method.section,
      extrinsic.method.method,
    ]);
    addressToUpdate.push(extrinsicSigner);

    // Process extrinsic events
    extrinsicEvents.forEach((event, eventIdx) => {
      const extrinsicId = extrinsic
        ? height + "-" + extrinsicIdx.toString()
        : "";

      // Detect data storage extrinsics and parse args to cid
      let cid: string | undefined = undefined;
      let args: string = stringify(event.event.data);
      if (
        event.event.section === "system" &&
        event.event.method === "Remarked"
      ) {
        const parsedArgs = parseDataToCid(event.event.data[1].toString());
        cid = parsedArgs.cid;
        // The args parameter will be replaced by `{ "cid": "bafkr6i..." }` to minimize the size of the db
        args = parsedArgs.modifiedArgs ?? args;
      }

      newEvents.push(
        createEvent(
          height,
          blockHash,
          BigInt(eventIdx),
          extrinsicId,
          extrinsic.hash.toString(),
          event.event.section,
          event.event.method,
          timestamp ? timestamp : new Date(0),
          event.phase.type,
          pos,
          args,
          cid
        )
      );
      eventMethodsToUpdate.push([event.event.section, event.event.method]);

      // Process specific events
      switch (`${event.event.section}.${event.event.method}`) {
        case "balances.Transfer": {
          const from = event.event.data[0].toString();
          const to = event.event.data[1].toString();
          const amount = BigInt(event.event.data[2].toString());

          addressToUpdate.push(from, to);

          totalTransferValue += amount;

          const newTransfer = createTransfer(
            height,
            blockHash,
            extrinsicId,
            height + "-" + eventIdx.toString(),
            from,
            to,
            amount,
            fee,
            successEvent ? true : false,
            timestamp ? timestamp : new Date(0)
          );
          newTransfers.push(newTransfer);

          break;
        }
        case "rewards.VoteReward": {
          const voter = event.event.data[0].toString();
          const reward = BigInt(event.event.data[1].toString());

          addressToUpdate.push(voter);

          totalVoteRewardsCount++;
          totalRewardValue += reward;
          totalVoteRewardValue += reward;

          const newReward = createReward(
            height,
            blockHash,
            extrinsicId,
            height + "-" + eventIdx.toString(),
            voter,
            "rewards.VoteReward",
            reward,
            timestamp ? timestamp : new Date(0)
          );
          newRewards.push(newReward);

          break;
        }
        case "rewards.BlockReward": {
          const blockAuthor = event.event.data[0].toString();
          const reward = BigInt(event.event.data[1].toString());

          addressToUpdate.push(blockAuthor);

          totalBlockRewardsCount++;
          totalRewardValue += reward;
          totalBlockRewardValue += reward;

          const newReward = createReward(
            height,
            blockHash,
            extrinsicId,
            height + "-" + eventIdx.toString(),
            blockAuthor,
            "rewards.BlockReward",
            reward,
            timestamp ? timestamp : new Date(0)
          );
          newRewards.push(newReward);

          break;
        }
        default:
          break;
      }
    });
  });

  // Create and save block logs
  await Promise.all(
    digest.logs.map((log, i) => {
      const logData = log.toHuman();
      const logJson = log.toPrimitive();
      const kind = logData ? Object.keys(logData)[0] : "";
      const rawKind = logJson ? Object.keys(logJson)[0] : "";
      const _value = logJson ? logJson[rawKind as keyof typeof logJson] : "";
      const value: LogValue =
        Array.isArray(_value) && _value.length === 2
          ? { data: _value[1], engine: _value[0] }
          : { data: _value };

      logKindsToUpdate.push(kind);
      return createAndSaveLog(
        height,
        blockHash,
        i,
        kind,
        stringify(value),
        blockTimestamp
      );
    })
  );

  // Build sections
  const allSections = [
    ...extrinsicMethodsToUpdate.map((method) => method[0]),
    ...eventMethodsToUpdate.map((method) => method[0]),
  ];

  // Remove duplicate entry before updating entities
  const uniqueAddresses = [...new Set(addressToUpdate)];
  const uniqueSections = [...new Set(allSections)];
  const uniqueExtrinsicMethods = [...new Set(extrinsicMethodsToUpdate)];
  const uniqueEventMethods = [...new Set(eventMethodsToUpdate)];
  const uniqueLogKinds = [...new Set(logKindsToUpdate)];

  // Update accounts
  const accounts = await Promise.all(
    uniqueAddresses.map((address) => account(api as any, address))
  );
  // Create and save accounts
  const isExistingAccounts = await Promise.all(
    accounts.map((account, i) =>
      createAndSaveAccountHistory(
        uniqueAddresses[i],
        height,
        BigInt(account.nonce.toString()),
        account.data.free,
        account.data.reserved,
        account.data.free + account.data.reserved
      )
    )
  );

  // Create sections if not exist
  const potentiallyNewSections = await Promise.all(
    uniqueSections.map((section) => createSection(section))
  );
  const nonNullSections = potentiallyNewSections.filter(
    (section) => section !== null
  );
  const newSections = [...new Set(nonNullSections)];

  // Create extrinsic modules if not exist
  const potentiallyNewExtrinsicModules = await Promise.all(
    uniqueExtrinsicMethods.map((method) =>
      createExtrinsicModule(method[0], method[1])
    )
  );
  const nonNullExtrinsicModules = potentiallyNewExtrinsicModules.filter(
    (extrinsicModule) => extrinsicModule !== null
  );
  const newExtrinsicModules = [...new Set(nonNullExtrinsicModules)];

  // Create event modules if not exist
  const potentiallyNewEventModules = await Promise.all(
    uniqueEventMethods.map((method) => createEventModule(method[0], method[1]))
  );
  const nonNullEventModules = potentiallyNewEventModules.filter(
    (eventModule) => eventModule !== null
  );
  const newEventModules = [...new Set(nonNullEventModules)];

  // Create log kinds if not exist
  const potentiallyNewLogKind = await Promise.all(
    uniqueLogKinds.map((kind) => createLogKind(kind))
  );
  const nonNullLogKinds = potentiallyNewLogKind.filter(
    (logKind) => logKind !== null
  );
  const newLogKinds = [...new Set(nonNullLogKinds)];

  const newAccountsCount = isExistingAccounts.filter(
    (existingAccount) => !existingAccount
  ).length;

  // Create block
  await createAndSaveBlock(
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
    newAccountsCount,
    newTransfers.length,
    newRewards.length,
    totalBlockRewardsCount,
    totalVoteRewardsCount,
    totalTransferValue,
    totalRewardValue,
    totalBlockRewardValue,
    totalVoteRewardValue,
    authorId
  );

  // Save extrinsic and events
  await saveExtrinsics(newExtrinsics);
  await saveEvents(newEvents);

  // Save section, extrinsic module, event module, log kind
  await saveSections(newSections);
  await saveExtrinsicModules(newExtrinsicModules);
  await saveEventModules(newEventModules);
  await saveLogKinds(newLogKinds);

  // Save transfers and rewards
  await saveTransfers(newTransfers);
  await saveRewards(newRewards);
}
