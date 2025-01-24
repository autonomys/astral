import { capitalizeFirstLetter, stringify } from "@autonomys/auto-utils";
import { SubstrateEvent } from "@subql/types";
import {
  createAndSaveDomain,
  createAndSaveOperator,
  createAndSaveRuntime,
} from "./db";

export async function handleDomainRuntimeCreated(
  event: SubstrateEvent
): Promise<void> {
  const {
    extrinsic,
    event: { data },
  } = event;
  if (extrinsic) {
    const extrinsicArgs =
      extrinsic.extrinsic.method.args[0].toPrimitive() as any;
    const [_runtimeId, _runtimeType] = data;

    const runtimeName = extrinsicArgs.args.runtime_name;
    const runtimeId = String(_runtimeId);
    const runtimeType = String(_runtimeType);
    const createdBy = extrinsic.extrinsic.signer.toString();
    const blockHeight = BigInt(event.block.block.header.number.toString());
    const extrinsicId = `${blockHeight}-${extrinsic.idx}`;

    await createAndSaveRuntime(
      runtimeId,
      runtimeName,
      runtimeType,
      createdBy,
      blockHeight,
      extrinsicId
    );
  }
}

export async function handleDomainInstantiated(
  event: SubstrateEvent
): Promise<void> {
  const {
    extrinsic,
    event: { data },
  } = event;
  if (extrinsic) {
    const extrinsicArgs =
      extrinsic.extrinsic.method.args[0].toPrimitive() as any;
    const [_domainId, _completedEpochIndex] = data;
    const domainName = capitalizeFirstLetter(extrinsicArgs.domainName);
    const runtimeId = Number(extrinsicArgs.runtimeId);
    const domainId = _domainId.toString();
    const completedEpoch = BigInt(_completedEpochIndex?.toString() ?? 0);
    const createdBy = extrinsic.extrinsic.signer.toString();
    const blockHeight = BigInt(event.block.block.header.number.toString());
    const extrinsicId = `${blockHeight}-${extrinsic.idx}`;

    await createAndSaveDomain(
      domainId,
      domainName,
      runtimeId,
      domainName.toLowerCase(),
      stringify(extrinsicArgs),
      completedEpoch,
      createdBy,
      blockHeight,
      extrinsicId
    );
  }
}

export async function handleOperatorRegistered(
  event: SubstrateEvent
): Promise<void> {
  const {
    extrinsic,
    event: { data },
  } = event;
  if (extrinsic) {
    const domainId = String(extrinsic.extrinsic.method.args[0].toPrimitive());
    const amount = BigInt(
      String(extrinsic.extrinsic.method.args[1].toPrimitive())
    );
    const operatorDetails =
      extrinsic.extrinsic.method.args[2].toPrimitive() as any;

    const signingKey = operatorDetails.signingKey;
    const minimumNominatorStake = operatorDetails.minimumNominatorStake;
    const nominationTax = operatorDetails.nominationTax;
    const eventOperatorId = String(data[0]);
    const eventDomainId = String(data[1]);
    if (domainId !== eventDomainId) throw new Error("domainId mismatch");

    const signer = extrinsic.extrinsic.signer.toString();

    const blockHeight = BigInt(event.block.block.header.number.toString());
    const extrinsicId = `${blockHeight}-${extrinsic.idx}`;

    const storageFeeDepositedEvent = extrinsic.events.find(
      (e) =>
        e.phase.isApplyExtrinsic &&
        e.event.section === "domains" &&
        e.event.method === "StorageFeeDeposited"
    );
    const storageFeeDeposit = BigInt(
      storageFeeDepositedEvent?.event.data[2].toString() ?? 0
    );

    const operator = await createAndSaveOperator(
      eventOperatorId,
      signer,
      domainId,
      signingKey,
      minimumNominatorStake,
      nominationTax,
      blockHeight,
      extrinsicId
    );
    // const nominator = await createAndSaveNominator(
    //   signer,
    //   domainId,
    //   operator.operatorId,
    //   blockHeight
    // );
    // await createAndSaveDeposit(
    //   signer,
    //   domainId,
    //   operator.operatorId,
    //   nominator.nominatorId,
    //   amount,
    //   storageFeeDeposit,
    //   extrinsicId,
    //   blockHeight
    // );
  }
}
