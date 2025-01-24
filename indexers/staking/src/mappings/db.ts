import { Domain, Operator, Runtime } from "../types";
import { getSortId } from "./utils";

export async function createAndSaveRuntime(
  runtimeId: string,
  name: string,
  type: string,
  createdBy: string,
  blockHeight: bigint,
  extrinsicId: string
): Promise<Runtime> {
  const runtime = Runtime.create({
    id: runtimeId,
    sortId: getSortId(runtimeId),
    name,
    type,
    createdBy,
    blockHeight,
    extrinsicId,
  });
  await runtime.save();
  return runtime;
}

export async function createAndSaveDomain(
  domainId: string,
  name: string,
  runtimeId: number,
  runtime: string,
  runtimeInfo: string,
  completedEpoch: bigint,
  createdBy: string,
  blockHeight: bigint,
  extrinsicId: string
): Promise<Domain> {
  const id = domainId.toLowerCase();
  const domain = Domain.create({
    id,
    sortId: getSortId(id),
    name,
    runtimeId,
    runtime,
    runtimeInfo,
    completedEpoch,
    createdBy,
    blockHeight,
    extrinsicId,
  });
  await domain.save();
  return domain;
}

export async function createAndSaveOperator(
  operatorId: string,
  owner: string,
  domainId: string,
  signingKey: string,
  minimumNominatorStake: bigint,
  nominationTax: number,
  blockHeight: bigint,
  extrinsicId: string
): Promise<Operator> {
  const id = operatorId.toLowerCase();
  const operator = Operator.create({
    id,
    sortId: getSortId(domainId, id),
    owner,
    domainId,
    signingKey,
    minimumNominatorStake,
    nominationTax,
    blockHeight,
    extrinsicId,
  });
  await operator.save();
  return operator;
}
