import {
  capitalizeFirstLetter,
  EventRecord,
  stringify,
} from "@autonomys/auto-utils";
import * as db from "./db";
import { Cache } from "./db";
import { SealedBundleHeader } from "./types";
import { calculateTransfer, findOneExtrinsicEvent } from "./utils";

type EventHandler = (params: {
  event: EventRecord;
  extrinsic: any;
  cache: Cache;
  height: bigint;
  blockTimestamp: Date;
  extrinsicId: string;
  eventId: string;
  extrinsicSigner: string;
  extrinsicEvents: EventRecord[];
}) => void;

export const EVENT_HANDLERS: Record<string, EventHandler> = {
  "domains.DomainRuntimeCreated": ({
    event,
    cache,
    extrinsicSigner,
    height,
    extrinsicId,
    eventId,
    extrinsic,
  }) => {
    const runtimeId = event.event.data[0].toString();
    const runtimeType = event.event.data[1].toString();
    const extrinsicArgs = extrinsic.method.args[0].toPrimitive() as any;
    const runtimeName = extrinsicArgs.args.runtime_name;

    cache.runtimeCreation.push(
      db.createRuntimeCreation(
        runtimeId,
        runtimeName,
        runtimeType,
        extrinsicSigner,
        height,
        extrinsicId,
        eventId
      )
    );
  },
  "domains.DomainInstantiated": ({
    event,
    cache,
    extrinsicSigner,
    height,
    extrinsicId,
    eventId,
    extrinsic,
  }) => {
    const domainId = event.event.data[0].toString();
    const extrinsicArgs = extrinsic.method.args[0].toPrimitive() as any;
    const domainName = capitalizeFirstLetter(extrinsicArgs.domainName);
    const runtimeId = Number(extrinsicArgs.runtimeId);

    cache.domainInstantiation.push(
      db.createDomainInstantiation(
        domainId,
        domainName,
        runtimeId,
        domainName.toLowerCase(),
        stringify(extrinsicArgs),
        extrinsicSigner,
        height,
        extrinsicId,
        eventId
      )
    );
  },
  "domains.OperatorRegistered": ({
    event,
    cache,
    extrinsicSigner,
    height,
    blockTimestamp,
    extrinsicId,
    eventId,
    extrinsic,
    extrinsicEvents,
  }) => {
    const operatorId = event.event.data[0].toString();
    const domainId = event.event.data[1].toString();
    const amount = BigInt(String(extrinsic.method.args[1].toPrimitive()));
    const operatorDetails = extrinsic.method.args[2].toPrimitive() as any;

    const signingKey = operatorDetails.signingKey;
    const minimumNominatorStake = operatorDetails.minimumNominatorStake;
    const nominationTax = operatorDetails.nominationTax;

    const storageFeeDepositedEvent = findOneExtrinsicEvent(
      extrinsicEvents,
      "domains",
      "StorageFeeDeposited"
    );
    const storageFeeDeposit = BigInt(
      storageFeeDepositedEvent?.event.data[2].toString() ?? 0
    );

    cache.operatorRegistration.push(
      db.createOperatorRegistration(
        operatorId,
        extrinsicSigner,
        domainId,
        signingKey,
        minimumNominatorStake,
        nominationTax,
        height,
        extrinsicId,
        eventId
      )
    );
    cache.depositEvent.push(
      db.createDepositEvent(
        extrinsicSigner,
        domainId,
        operatorId,
        amount - storageFeeDeposit,
        storageFeeDeposit,
        amount,
        blockTimestamp,
        height,
        extrinsicId,
        eventId
      )
    );
  },
  "domains.OperatorNominated": ({
    event,
    cache,
    height,
    blockTimestamp,
    extrinsicId,
    eventId,
    extrinsicEvents,
  }) => {
    const operatorId = event.event.data[0].toString();
    const accountId = event.event.data[1].toString();
    const amount = BigInt(event.event.data[2].toString());

    const storageFeeDepositedEvent = findOneExtrinsicEvent(
      extrinsicEvents,
      "domains",
      "StorageFeeDeposited"
    );
    const storageFeeDeposit = BigInt(
      storageFeeDepositedEvent?.event.data[2].toString() ?? 0
    );
    const opFromCache = cache.operatorStakingHistory.find(
      (o) => o.operatorId === operatorId
    );
    if (!opFromCache) throw new Error("Operator from cache not found");
    const domainId = opFromCache.currentDomainId;

    cache.depositEvent.push(
      db.createDepositEvent(
        accountId,
        domainId,
        operatorId,
        amount,
        storageFeeDeposit,
        amount + storageFeeDeposit,
        blockTimestamp,
        height,
        extrinsicId,
        eventId
      )
    );
  },
  "domains.WithdrewStake": ({
    event,
    cache,
    height,
    blockTimestamp,
    extrinsicId,
    eventId,
    extrinsic,
    extrinsicEvents,
  }) => {
    const operatorId = event.event.data[0].toString();
    const accountId = event.event.data[1].toString();
    const toWithdraw = extrinsic.method.args[1].toPrimitive() as any;

    const amount1Event = findOneExtrinsicEvent(
      extrinsicEvents,
      "balances",
      "Withdraw"
    );
    const amount1 = BigInt(amount1Event?.event.data[1].toString() ?? 0);
    const amount2Event = findOneExtrinsicEvent(
      extrinsicEvents,
      "balances",
      "Rescinded"
    );
    const amount2 =
      amount1 - BigInt(amount2Event?.event.data[0].toString() ?? 0);
    const opFromCache = cache.operatorStakingHistory.find(
      (o) => o.operatorId === operatorId
    );
    if (!opFromCache) throw new Error("Operator from cache not found");
    const domainId = opFromCache.currentDomainId;

    cache.withdrawEvent.push(
      db.createWithdrawEvent(
        accountId,
        domainId,
        operatorId,
        stringify(toWithdraw),
        amount1,
        amount2,
        amount1 + amount2,
        blockTimestamp,
        height,
        extrinsicId,
        eventId
      )
    );
  },
  "domains.OperatorRewarded": ({
    event,
    cache,
    height,
    extrinsicId,
    eventId,
  }) => {
    const bundleDetails = event.event.data[0].toPrimitive() as any;
    const operatorId = event.event.data[1].toString();
    const amount = BigInt(event.event.data[2].toString());
    const atBlockNumber = BigInt(bundleDetails.bundle.atBlockNumber.toString());
    const opFromCache = cache.operatorStakingHistory.find(
      (o) => o.operatorId === operatorId
    );
    if (!opFromCache) throw new Error("Operator from cache not found");
    const domainId = opFromCache.currentDomainId;

    cache.operatorReward.push(
      db.createOperatorReward(
        domainId,
        operatorId,
        amount,
        atBlockNumber,
        height,
        extrinsicId,
        eventId
      )
    );
  },
  "domains.OperatorTaxCollected": ({
    event,
    cache,
    height,
    extrinsicId,
    eventId,
  }) => {
    const operatorId = event.event.data[0].toString();
    const tax = BigInt(event.event.data[1].toString());
    const opFromCache = cache.operatorStakingHistory.find(
      (o) => o.operatorId === operatorId
    );
    if (!opFromCache) throw new Error("Operator from cache not found");
    const domainId = opFromCache.currentDomainId;

    cache.operatorTaxCollection.push(
      db.createOperatorTaxCollection(
        domainId,
        operatorId,
        tax,
        height,
        extrinsicId,
        eventId
      )
    );
  },
  "domains.NominatedStakedUnlocked": ({
    event,
    cache,
    height,
    extrinsicEvents,
    extrinsicId,
    eventId,
  }) => {
    const operatorId = event.event.data[0].toString();
    const accountId = event.event.data[1].toString();
    const amount = BigInt(event.event.data[2].toString());
    let domainId = null;
    const opFromCache = cache.operatorStakingHistory.find(
      (o) => o.operatorId === operatorId
    );
    if (!opFromCache) {
      const parentOpFromCache = cache.parentBlockOperators.find(
        (o) => o.operatorId.toString() === operatorId
      );
      if (!parentOpFromCache) throw new Error("Operator from cache not found");
      domainId = parentOpFromCache.operatorDetails.currentDomainId.toString();
    } else {
      domainId = opFromCache.currentDomainId;
    }

    const StorageFeeUnlockedEvent = findOneExtrinsicEvent(
      extrinsicEvents,
      "domains",
      "StorageFeeUnlocked"
    );
    const storageFee = BigInt(
      StorageFeeUnlockedEvent?.event.data[2].toString() ?? 0
    );

    cache.unlockedEvent.push(
      db.createUnlockedEvent(
        domainId,
        operatorId,
        accountId,
        amount,
        storageFee,
        height,
        extrinsicId,
        eventId
      )
    );
  },
  "domains.OperatorDeregistered": ({
    event,
    cache,
    extrinsicSigner,
    height,
    extrinsicId,
    eventId,
  }) => {
    const operatorId = event.event.data[0].toString();
    const opFromCache = cache.operatorStakingHistory.find(
      (o) => o.operatorId === operatorId
    );
    if (!opFromCache) throw new Error("Operator from cache not found");
    const domainId = opFromCache.currentDomainId;

    cache.operatorDeregistration.push(
      db.createOperatorDeregistration(
        operatorId,
        extrinsicSigner,
        domainId,
        height,
        extrinsicId,
        eventId
      )
    );
  },
  "domains.BundleStored": ({
    event,
    cache,
    extrinsicSigner,
    eventId,
    extrinsic,
  }) => {
    const bundleHash = event.event.data[1].toString();
    const _extrinsic = extrinsic.method.args[0].toPrimitive() as any;
    const { header } = _extrinsic.sealedHeader as SealedBundleHeader;
    const domainId = header.proofOfElection.domainId.toString();
    const operatorId = header.proofOfElection.operatorId.toString();

    const {
      domainBlockNumber,
      domainBlockHash,
      domainBlockExtrinsicRoot,
      consensusBlockNumber,
      consensusBlockHash,
      blockFees,
      transfers,
    } = header.receipt;

    const { consensusStorageFee, domainExecutionFee, burnedBalance } =
      blockFees;
    const {
      transfersIn,
      transfersOut,
      rejectedTransfersClaimed,
      transfersRejected,
    } = transfers;

    const [totalTransfersIn, transfersInCount] = calculateTransfer(transfersIn);
    const [totalTransfersOut, transfersOutCount] =
      calculateTransfer(transfersOut);
    const [totalRejectedTransfersClaimed, rejectedTransfersClaimedCount] =
      calculateTransfer(rejectedTransfersClaimed);
    const [totalTransfersRejected, transfersRejectedCount] =
      calculateTransfer(transfersRejected);
    const totalVolume = totalTransfersIn + totalTransfersOut;

    cache.bundleSubmission.push(
      db.createBundleSubmission(
        bundleHash,
        extrinsicSigner,
        String(domainId),
        String(domainBlockNumber),
        operatorId,
        BigInt(domainBlockNumber),
        String(domainBlockHash),
        String(domainBlockExtrinsicRoot),
        BigInt(consensusBlockNumber),
        String(consensusBlockHash),
        totalTransfersIn,
        transfersInCount,
        totalTransfersOut,
        transfersOutCount,
        totalRejectedTransfersClaimed,
        rejectedTransfersClaimedCount,
        totalTransfersRejected,
        transfersRejectedCount,
        totalVolume,
        BigInt(consensusStorageFee),
        BigInt(domainExecutionFee),
        BigInt(burnedBalance),
        eventId
      )
    );
  },
};
