import { capitalizeFirstLetter, EventRecord, stringify } from '@autonomys/auto-utils';
import * as db from './db';
import { Cache } from './db';
import { SealedBundleHeader } from './types';
import { findOneExtrinsicEvent } from './utils';

type EventHandler = (params: {
  event: EventRecord;
  cache: Cache;
  height: bigint;
  blockTimestamp: Date;
  extrinsicId: string;
  eventId: string;
  extrinsicSigner: string;
  extrinsicEvents: EventRecord[];
  extrinsicMethodToPrimitive: any;
  domainEpochMap: Map<string, number>;
  operatorOwnerMap: Map<string, string>;
  operatorDomainMap: Map<string, string>;
}) => void;

export const EVENT_HANDLERS: Record<string, EventHandler> = {
  'domains.DomainRuntimeCreated': ({
    event,
    cache,
    extrinsicSigner,
    height,
    extrinsicId,
    eventId,
    extrinsicMethodToPrimitive,
  }) => {
    const runtimeId = event.event.data[0].toString();
    const runtimeType = event.event.data[1].toString();
    const runtimeName = extrinsicMethodToPrimitive.args.runtime_name;

    cache.runtimeCreation.push(
      db.createRuntimeCreation(
        runtimeId,
        runtimeName,
        runtimeType,
        extrinsicSigner,
        height,
        extrinsicId,
        eventId,
      ),
    );
  },
  'domains.DomainInstantiated': ({
    event,
    cache,
    extrinsicSigner,
    height,
    extrinsicId,
    eventId,
    extrinsicMethodToPrimitive,
  }) => {
    const domainId = event.event.data[0].toString();
    const extrinsicArgs = extrinsicMethodToPrimitive.args.domain_config_params;
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
        eventId,
      ),
    );
  },
  'domains.OperatorRegistered': ({
    event,
    cache,
    extrinsicSigner,
    height,
    extrinsicId,
    eventId,
    extrinsicMethodToPrimitive,
  }) => {
    const operatorId = event.event.data[0].toString();
    const domainId = event.event.data[1].toString();
    const signingKey = String(extrinsicMethodToPrimitive.args.config.signingKey);
    const minimumNominatorStake = BigInt(
      extrinsicMethodToPrimitive.args.config.minimumNominatorStake,
    );
    const nominationTax = Number(extrinsicMethodToPrimitive.args.config.nominationTax);

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
        eventId,
      ),
    );
  },
  'domains.OperatorNominated': ({ event, cache, extrinsicId, eventId, operatorDomainMap }) => {
    const operatorId = event.event.data[0].toString();
    const address = event.event.data[1].toString();
    const domainId = operatorDomainMap.get(operatorId) ?? '';

    cache.nominatorDepositEvent.push(
      db.createNominatorDepositEvent(address, domainId, operatorId, extrinsicId, eventId),
    );
  },
  'domains.WithdrewStake': ({
    event,
    cache,
    height,
    blockTimestamp,
    extrinsicId,
    eventId,
    operatorDomainMap,
  }) => {
    const operatorId = event.event.data[0].toString();
    const address = event.event.data[1].toString();
    const domainId = operatorDomainMap.get(operatorId) ?? '';

    cache.withdrawEvent.push(
      db.createWithdrawEvent(
        address,
        domainId,
        operatorId,
        blockTimestamp,
        height,
        extrinsicId,
        eventId,
      ),
    );
  },
  'domains.OperatorRewarded': ({
    event,
    cache,
    height,
    extrinsicId,
    eventId,
    operatorDomainMap,
  }) => {
    const bundleDetails = event.event.data[0].toPrimitive() as any;
    const operatorId = event.event.data[1].toString();
    const amount = BigInt(event.event.data[2].toString());
    const atBlockNumber = BigInt(bundleDetails.bundle.atBlockNumber.toString());
    const domainId = operatorDomainMap.get(operatorId) ?? '';

    cache.operatorReward.push(
      db.createOperatorReward(
        domainId,
        operatorId,
        amount,
        atBlockNumber,
        height,
        extrinsicId,
        eventId,
      ),
    );
  },
  'domains.OperatorTaxCollected': ({
    event,
    cache,
    height,
    extrinsicId,
    eventId,
    operatorDomainMap,
  }) => {
    const operatorId = event.event.data[0].toString();
    const domainId = operatorDomainMap.get(operatorId) ?? '';
    const tax = BigInt(event.event.data[1].toString());

    cache.operatorTaxCollection.push(
      db.createOperatorTaxCollection(domainId, operatorId, tax, height, extrinsicId, eventId),
    );
  },
  'domains.NominatedStakedUnlocked': ({
    event,
    cache,
    height,
    extrinsicEvents,
    blockTimestamp,
    extrinsicId,
    eventId,
    operatorDomainMap,
  }) => {
    const operatorId = event.event.data[0].toString();
    const address = event.event.data[1].toString();
    const domainId = operatorDomainMap.get(operatorId) ?? '';
    const amount = BigInt(event.event.data[2].toString());

    const StorageFeeUnlockedEvent = findOneExtrinsicEvent(
      extrinsicEvents,
      'domains',
      'StorageFeeUnlocked',
    );
    const storageFee = BigInt(StorageFeeUnlockedEvent?.event.data[2].toString() ?? 0);

    cache.unlockedEvent.push(
      db.createUnlockedEvent(
        domainId,
        operatorId,
        address,
        amount,
        storageFee,
        blockTimestamp,
        height,
        extrinsicId,
        eventId,
      ),
    );
  },
  'domains.NominatorUnlocked': ({
    event,
    cache,
    height,
    extrinsicId,
    eventId,
    extrinsicSigner,
    operatorDomainMap,
  }) => {
    const operatorId = event.event.data[0].toString();
    const domainId = operatorDomainMap.get(operatorId) ?? '';

    cache.nominatorsUnlockedEvent.push(
      db.createNominatorsUnlockedEvent(
        domainId,
        operatorId,
        extrinsicSigner,
        height,
        extrinsicId,
        eventId,
      ),
    );
  },
  'domains.OperatorDeregistered': ({
    event,
    cache,
    extrinsicSigner,
    height,
    extrinsicId,
    eventId,
    operatorDomainMap,
  }) => {
    const operatorId = event.event.data[0].toString();
    const domainId = operatorDomainMap.get(operatorId) ?? '';

    cache.operatorDeregistration.push(
      db.createOperatorDeregistration(
        operatorId,
        extrinsicSigner,
        domainId,
        height,
        extrinsicId,
        eventId,
      ),
    );
  },
  'domains.BundleStored': ({
    event,
    cache,
    extrinsicId,
    eventId,
    extrinsicMethodToPrimitive,
    domainEpochMap,
    height,
    operatorOwnerMap,
  }) => {
    const bundleHash = event.event.data[1].toString();
    const { header } = extrinsicMethodToPrimitive.args.opaque_bundle
      .sealedHeader as SealedBundleHeader;
    const domainId = header.proofOfElection.domainId.toString();
    const operatorId = header.proofOfElection.operatorId.toString();

    const { domainBlockNumber, consensusBlockNumber } = header.receipt;

    const operatorOwner = operatorOwnerMap.get(operatorId) ?? '';
    const epoch = domainEpochMap.get(domainId);

    // Check if epoch exists before converting to BigInt
    if (epoch === undefined) {
      logger.error(`No epoch found for domainId: ${domainId} in domainEpochMap`);
      return; // Skip this event or use a default value
    }

    cache.bundleSubmission.push(
      db.createBundleSubmission(
        bundleHash,
        operatorOwner,
        domainId,
        operatorId,
        BigInt(domainBlockNumber),
        BigInt(epoch),
        BigInt(consensusBlockNumber),
        extrinsicId,
        eventId,
        BigInt(height),
      ),
    );
  },
};
