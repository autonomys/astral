import { AnyTuple, Codec, StorageKey } from "@autonomys/auto-utils";

export const parseOperatorDetails = (operatorDetails: Codec): any => {
  const rawOD = operatorDetails.toJSON() as any;
  return {
    signingKey: rawOD.signingKey,
    currentDomainId: BigInt(rawOD.currentDomainId),
    nextDomainId: BigInt(rawOD.nextDomainId),
    minimumNominatorStake: BigInt(rawOD.minimumNominatorStake), // hex
    nominationTax: rawOD.nominationTax,
    currentTotalStake: BigInt(rawOD.currentTotalStake), // hex
    // currentEpochRewards: BigInt(rawOD.currentEpochRewards), // undefined
    currentTotalShares: BigInt(rawOD.currentTotalShares),
    // status: rawOD.status,
    partialStatus: rawOD.partialStatus,
    depositsInEpoch: BigInt(rawOD.depositsInEpoch),
    withdrawalsInEpoch: BigInt(rawOD.withdrawalsInEpoch),
    totalStorageFeeDeposit: BigInt(rawOD.totalStorageFeeDeposit),
  };
};

export const parseOperator = (operator: [StorageKey<AnyTuple>, Codec]): any => {
  return {
    operatorId: BigInt((operator[0].toHuman() as any)[0]),
    operatorDetails: parseOperatorDetails(operator[1]),
  };
};
