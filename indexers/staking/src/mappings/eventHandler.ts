import {
  capitalizeFirstLetter,
  EventRecord,
  stringify,
} from "@autonomys/auto-utils";
import { SHARES_CALCULATION_MULTIPLIER, ZERO_BIGINT } from "./constants";
import * as db from "./db";
import { Cache } from "./db";
import { SealedBundleHeader } from "./types";
import {
  calculateTransfer,
  findDomainIdFromOperatorsCache,
  findEpochFromDomainStakingHistoryCache,
  findOneExtrinsicEvent,
  findOperatorFromOperatorsCache,
  findWithdrawalFromWithdrawalCache,
} from "./utils";

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
    const totalAmount = BigInt(String(extrinsic.method.args[1].toPrimitive()));
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
    const { sharePrice } = findOperatorFromOperatorsCache(cache, operatorId);
    const stakeAmount = totalAmount - storageFeeDeposit;
    const estimatedShares =
      stakeAmount /
      (sharePrice > ZERO_BIGINT ? sharePrice : SHARES_CALCULATION_MULTIPLIER);

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
        stakeAmount,
        storageFeeDeposit,
        totalAmount,
        estimatedShares,
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
    const totalAmount = BigInt(event.event.data[2].toString());
    const domainId = findDomainIdFromOperatorsCache(cache, operatorId);

    const storageFeeDepositedEvent = findOneExtrinsicEvent(
      extrinsicEvents,
      "domains",
      "StorageFeeDeposited"
    );
    const storageFeeDeposit = BigInt(
      storageFeeDepositedEvent?.event.data[2].toString() ?? 0
    );
    const { sharePrice } = findOperatorFromOperatorsCache(cache, operatorId);
    const stakeAmount = totalAmount - storageFeeDeposit;
    const estimatedShares =
      stakeAmount /
      (sharePrice > ZERO_BIGINT ? sharePrice : SHARES_CALCULATION_MULTIPLIER);

    cache.depositEvent.push(
      db.createDepositEvent(
        accountId,
        domainId,
        operatorId,
        stakeAmount,
        storageFeeDeposit,
        totalAmount,
        estimatedShares,
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
    const domainId = findDomainIdFromOperatorsCache(cache, operatorId);
    const toWithdraw = extrinsic.method.args[1].toPrimitive() as any;
    const withdrawalInShares = findWithdrawalFromWithdrawalCache(
      cache,
      operatorId,
      accountId
    );
    if (!withdrawalInShares) return;
    const { shares, storageFeeRefund } = withdrawalInShares;
    const { sharePrice } = findOperatorFromOperatorsCache(cache, operatorId);
    const estimatedAmount =
      (shares * sharePrice) / SHARES_CALCULATION_MULTIPLIER + storageFeeRefund;

    cache.withdrawEvent.push(
      db.createWithdrawEvent(
        accountId,
        domainId,
        operatorId,
        stringify(toWithdraw),
        shares,
        storageFeeRefund,
        estimatedAmount,
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
    const domainId = findDomainIdFromOperatorsCache(cache, operatorId);

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
    const domainId = findDomainIdFromOperatorsCache(cache, operatorId);

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
    const domainId = findDomainIdFromOperatorsCache(cache, operatorId);

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
  "domains.NominatorUnlocked": ({
    event,
    cache,
    height,
    extrinsicId,
    eventId,
  }) => {
    const operatorId = event.event.data[0].toString();
    const domainId = findDomainIdFromOperatorsCache(cache, operatorId);

    cache.nominatorsUnlockedEvent.push(
      db.createNominatorsUnlockedEvent(
        domainId,
        operatorId,
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
    const domainId = findDomainIdFromOperatorsCache(cache, operatorId);

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
    extrinsic,
    extrinsicSigner,
    height,
    extrinsicId,
    eventId,
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

    const epoch = findEpochFromDomainStakingHistoryCache(cache, domainId);

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
        BigInt(epoch),
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
        height,
        extrinsicId,
        eventId
      )
    );
  },
};
