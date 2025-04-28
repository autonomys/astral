import { capitalizeFirstLetter, stringify } from "@autonomys/auto-utils";
import {
  CONSENSUS_CHAIN_TYPE,
  SHARES_CALCULATION_MULTIPLIER,
} from "../structures/constants.ts";
import { Cache } from "../types/cache.ts";
import { Event, SealedBundleHeader } from "../types/chain.ts";
import {
  createBundleSubmission,
  createDepositEvent,
  createDomainInstantiation,
  createLeaderboardEntity,
  createNominatorsUnlockedEvent,
  createOperatorDeregistration,
  createOperatorRegistration,
  createOperatorReward,
  createOperatorTaxCollection,
  createReward,
  createRuntimeCreation,
  createTransfer,
  createUnlockedEvent,
  createWithdrawEvent,
} from "../utils/cache.ts";
import {
  calculateShares,
  calculateTransfer,
  findDomainIdFromOperatorsCache,
  findEpochFromDomainStakingHistoryCache,
  findOneExtrinsicEvent,
  findOperatorFromOperatorsCache,
  findWithdrawalFromWithdrawalCache,
} from "../utils/helper.ts";

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
  "rewards.VoteReward": ({
    event,
    cache,
    height,
    hash,
    date,
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
        hash,
        extrinsicId,
        eventId,
        voter,
        "rewards.VoteReward",
        reward,
        date
      )
    );

    cache.farmerVoteTotalCountHistory.push(
      createLeaderboardEntity(
        voter,
        BigInt(1),
        height,
        hash,
        extrinsicId,
        eventId,
        date
      )
    );
    cache.farmerVoteTotalValueHistory.push(
      createLeaderboardEntity(
        voter,
        reward,
        height,
        hash,
        extrinsicId,
        eventId,
        date
      )
    );

    cache.farmerVoteAndBlockTotalCountHistory.push(
      createLeaderboardEntity(
        voter,
        BigInt(1),
        height,
        hash,
        extrinsicId,
        eventId,
        date
      )
    );
    cache.farmerVoteAndBlockTotalValueHistory.push(
      createLeaderboardEntity(
        voter,
        reward,
        height,
        hash,
        extrinsicId,
        eventId,
        date
      )
    );
  },
  "rewards.BlockReward": ({
    event,
    cache,
    height,
    hash,
    date,
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
        hash,
        extrinsicId,
        eventId,
        blockAuthor,
        "rewards.BlockReward",
        reward,
        date
      )
    );

    cache.farmerBlockTotalCountHistory.push(
      createLeaderboardEntity(
        blockAuthor,
        BigInt(1),
        height,
        hash,
        extrinsicId,
        eventId,
        date
      )
    );
    cache.farmerBlockTotalValueHistory.push(
      createLeaderboardEntity(
        blockAuthor,
        reward,
        height,
        hash,
        extrinsicId,
        eventId,
        date
      )
    );

    cache.farmerVoteAndBlockTotalCountHistory.push(
      createLeaderboardEntity(
        blockAuthor,
        BigInt(1),
        height,
        hash,
        extrinsicId,
        eventId,
        date
      )
    );
    cache.farmerVoteAndBlockTotalValueHistory.push(
      createLeaderboardEntity(
        blockAuthor,
        reward,
        height,
        hash,
        extrinsicId,
        eventId,
        date
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

    // Mapping for leaderboard
    cache.accountTransferSenderTotalCountHistory.push(
      createLeaderboardEntity(
        from,
        BigInt(1),
        height,
        hash,
        extrinsicId,
        eventId,
        date
      )
    );
    cache.accountTransferSenderTotalValueHistory.push(
      createLeaderboardEntity(
        from,
        amount,
        height,
        hash,
        extrinsicId,
        eventId,
        date
      )
    );

    cache.accountTransferReceiverTotalCountHistory.push(
      createLeaderboardEntity(
        to,
        BigInt(1),
        height,
        hash,
        extrinsicId,
        eventId,
        date
      )
    );
    cache.accountTransferReceiverTotalValueHistory.push(
      createLeaderboardEntity(
        to,
        amount,
        height,
        hash,
        extrinsicId,
        eventId,
        date
      )
    );
  },
  "transactionPayment.TransactionFeePaid": ({
    event,
    cache,
    height,
    hash,
    date,
    extrinsicId,
    eventId,
  }) => {
    const who = event.event.data[0].toString();
    const actualFee = BigInt(event.event.data[1].toString());
    const tip = BigInt(event.event.data[2].toString());

    cache.accountTransactionFeePaidTotalValueHistory.push(
      createLeaderboardEntity(
        who,
        actualFee + tip,
        height,
        hash,
        extrinsicId,
        eventId,
        date
      )
    );
  },
  "domains.OperatorRewarded": ({
    event,
    cache,
    height,
    hash,
    date,
    extrinsicId,
    eventId,
  }) => {
    const bundleDetails = event.event.data[0];
    const operatorId = event.event.data[1].toString();
    const reward = BigInt(event.event.data[2].toString());
    if (reward === BigInt(0)) return;

    const atBlockNumber = BigInt(bundleDetails.bundle.atBlockNumber.toString());
    const domainId = findDomainIdFromOperatorsCache(cache, operatorId);

    cache.operatorTotalRewardsCollectedHistory.push(
      createLeaderboardEntity(
        operatorId,
        reward,
        height,
        hash,
        extrinsicId,
        eventId,
        date
      )
    );

    cache.operatorReward.push(
      createOperatorReward(
        domainId,
        operatorId,
        reward,
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
    hash,
    date,
    extrinsicId,
    eventId,
  }) => {
    const operatorId = event.event.data[0].toString();
    const tax = BigInt(event.event.data[1].toString());
    const domainId = findDomainIdFromOperatorsCache(cache, operatorId);

    cache.operatorTotalTaxCollectedHistory.push(
      createLeaderboardEntity(
        operatorId,
        tax,
        height,
        hash,
        extrinsicId,
        eventId,
        date
      )
    );

    cache.operatorTaxCollection.push(
      createOperatorTaxCollection(
        domainId,
        operatorId,
        tax,
        height,
        extrinsicId,
        eventId
      )
    );
  },
  "domains.BundleStored": ({
    event,
    cache,
    height,
    hash,
    date,
    extrinsicId,
    eventId,
    extrinsicArgs,
  }) => {
    const bundleAuthor = event.event.data[0].toString();
    const bundleHash = event.event.data[1].toString();
    const { header } = extrinsicArgs.opaque_bundle
      .sealedHeader as SealedBundleHeader;
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

    const { operatorOwner } = findOperatorFromOperatorsCache(cache, operatorId);
    const epoch = findEpochFromDomainStakingHistoryCache(cache, domainId);

    cache.operatorBundleTotalCountHistory.push(
      createLeaderboardEntity(
        bundleAuthor,
        BigInt(1),
        height,
        hash,
        extrinsicId,
        eventId,
        date
      )
    );

    cache.bundleSubmission.push(
      createBundleSubmission(
        bundleHash,
        operatorOwner,
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
  "domains.OperatorRegistered": ({
    event,
    cache,
    height,
    hash,
    date,
    extrinsicId,
    extrinsicSigner,
    eventId,
    extrinsicArgs,
    extrinsicEvents,
  }) => {
    const operatorId = event.event.data[0].toString();
    const domainId = event.event.data[1].toString();
    const amount = extrinsicArgs
      ? BigInt(String(extrinsicArgs.amount))
      : BigInt(0);
    const signingKey = String(extrinsicArgs.config.signingKey);
    const minimumNominatorStake = BigInt(
      extrinsicArgs.config.minimumNominatorStake
    );
    const nominationTax = Number(extrinsicArgs.config.nominationTax);

    const storageFeeDepositedEvent = findOneExtrinsicEvent(
      extrinsicEvents,
      "domains",
      "StorageFeeDeposited"
    );
    const storageFeeDeposit = BigInt(
      storageFeeDepositedEvent?.event.data[2].toString() ?? 0
    );
    const { sharePrice } = findOperatorFromOperatorsCache(cache, operatorId);
    const stakeAmount = amount - storageFeeDeposit;
    const estimatedShares = calculateShares(stakeAmount, sharePrice);

    cache.operatorOwnerMap.set(operatorId, extrinsicSigner);

    cache.operatorDepositsTotalCountHistory.push(
      createLeaderboardEntity(
        operatorId,
        BigInt(1),
        height,
        hash,
        extrinsicId,
        eventId,
        date
      )
    );
    cache.operatorDepositsTotalValueHistory.push(
      createLeaderboardEntity(
        operatorId,
        amount,
        height,
        hash,
        extrinsicId,
        eventId,
        date
      )
    );

    cache.nominatorDepositsTotalCountHistory.push(
      createLeaderboardEntity(
        operatorId,
        BigInt(1),
        height,
        hash,
        extrinsicId,
        eventId,
        date
      )
    );
    cache.nominatorDepositsTotalValueHistory.push(
      createLeaderboardEntity(
        operatorId,
        amount,
        height,
        hash,
        extrinsicId,
        eventId,
        date
      )
    );

    cache.operatorRegistration.push(
      createOperatorRegistration(
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
      createDepositEvent(
        extrinsicSigner,
        domainId,
        operatorId,
        stakeAmount,
        storageFeeDeposit,
        amount,
        estimatedShares,
        date,
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
    hash,
    date,
    extrinsicId,
    eventId,
    extrinsicEvents,
  }) => {
    const operatorId = event.event.data[0].toString();
    const nominatorId = event.event.data[1].toString();
    const stakeAmount = BigInt(event.event.data[2].toString());

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
    const totalAmount = stakeAmount + storageFeeDeposit;
    const estimatedShares = calculateShares(stakeAmount, sharePrice);

    cache.operatorDepositsTotalCountHistory.push(
      createLeaderboardEntity(
        operatorId,
        BigInt(1),
        height,
        hash,
        extrinsicId,
        eventId,
        date
      )
    );
    cache.operatorDepositsTotalValueHistory.push(
      createLeaderboardEntity(
        operatorId,
        totalAmount,
        height,
        hash,
        extrinsicId,
        eventId,
        date
      )
    );

    cache.nominatorDepositsTotalCountHistory.push(
      createLeaderboardEntity(
        nominatorId,
        BigInt(1),
        height,
        hash,
        extrinsicId,
        eventId,
        date
      )
    );
    cache.nominatorDepositsTotalValueHistory.push(
      createLeaderboardEntity(
        nominatorId,
        totalAmount,
        height,
        hash,
        extrinsicId,
        eventId,
        date
      )
    );

    cache.depositEvent.push(
      createDepositEvent(
        nominatorId,
        domainId,
        operatorId,
        stakeAmount,
        storageFeeDeposit,
        totalAmount,
        estimatedShares,
        date,
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
    hash,
    date,
    extrinsicId,
    eventId,
    extrinsicEvents,
  }) => {
    const operatorId = event.event.data[0].toString();
    const nominatorId = event.event.data[1].toString();
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

    cache.operatorWithdrawalsTotalCountHistory.push(
      createLeaderboardEntity(
        operatorId,
        BigInt(1),
        height,
        hash,
        extrinsicId,
        eventId,
        date
      )
    );
    cache.operatorWithdrawalsTotalValueHistory.push(
      createLeaderboardEntity(
        operatorId,
        amount,
        height,
        hash,
        extrinsicId,
        eventId,
        date
      )
    );

    cache.nominatorWithdrawalsTotalCountHistory.push(
      createLeaderboardEntity(
        nominatorId,
        BigInt(1),
        height,
        hash,
        extrinsicId,
        eventId,
        date
      )
    );
    cache.nominatorWithdrawalsTotalValueHistory.push(
      createLeaderboardEntity(
        nominatorId,
        amount,
        height,
        hash,
        extrinsicId,
        eventId,
        date
      )
    );

    cache.unlockedEvent.push(
      createUnlockedEvent(
        domainId,
        operatorId,
        nominatorId,
        amount,
        storageFee,
        date,
        height,
        extrinsicId,
        eventId
      )
    );
  },
  "transporter.OutgoingTransferInitiated": ({
    cache,
    height,
    hash,
    date,
    extrinsicId,
    eventId,
    extrinsicSigner,
    fee,
    successEvent,
    extrinsicArgs,
  }) => {
    const [chainType, domainId] = Object.entries(
      extrinsicArgs.dst_location.chainId
    )[0] as [string, string | undefined];
    const [_, to] = Object.entries(extrinsicArgs.dst_location.accountId)[0] as [
      string,
      string,
    ];
    const amount = BigInt(extrinsicArgs.amount.toString());

    cache.addressToUpdate.add(extrinsicSigner);
    if (chainType === CONSENSUS_CHAIN_TYPE) cache.addressToUpdate.add(to);

    cache.totalTransferValue += amount;

    const newTransfer = createTransfer(
      height,
      hash,
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
      false,
      date
    );
    cache.transfers.push(newTransfer);
  },
  "balances.Burned": ({ event, cache }) => {
    cache.addressToUpdate.add(event.event.data[0].toString());
  },
  "domains.DomainRuntimeCreated": ({
    event,
    cache,
    height,
    extrinsicSigner,
    extrinsicId,
    eventId,
    extrinsicArgs,
  }) => {
    const runtimeId = event.event.data[0].toString();
    const runtimeType = event.event.data[1].toString();
    const runtimeName = extrinsicArgs.call.args.runtime_name;

    cache.runtimeCreation.push(
      createRuntimeCreation(
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
    height,
    extrinsicSigner,
    extrinsicId,
    eventId,
    extrinsicArgs,
  }) => {
    const domainId = event.event.data[0].toString();
    const domainConfigParams = extrinsicArgs.domain_config_params;
    const domainName = capitalizeFirstLetter(domainConfigParams.domainName);
    const runtimeId = Number(domainConfigParams.runtimeId);

    cache.domainInstantiation.push(
      createDomainInstantiation(
        domainId,
        domainName,
        runtimeId,
        domainName.toLowerCase(),
        stringify(domainConfigParams),
        extrinsicSigner,
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
    extrinsicId,
    eventId,
    date,
    extrinsicArgs,
  }) => {
    const operatorId = event.event.data[0].toString();
    const accountId = event.event.data[1].toString();
    const domainId = findDomainIdFromOperatorsCache(cache, operatorId);
    const toWithdraw = stringify(extrinsicArgs.to_withdraw);
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
      createWithdrawEvent(
        accountId,
        domainId,
        operatorId,
        toWithdraw,
        shares,
        storageFeeRefund,
        estimatedAmount,
        date,
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
      createNominatorsUnlockedEvent(
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
    height,
    extrinsicSigner,
    extrinsicId,
    eventId,
  }) => {
    const operatorId = event.event.data[0].toString();
    const domainId = findDomainIdFromOperatorsCache(cache, operatorId);

    cache.operatorDeregistration.push(
      createOperatorDeregistration(
        operatorId,
        extrinsicSigner,
        domainId,
        height,
        extrinsicId,
        eventId
      )
    );
  },
};
