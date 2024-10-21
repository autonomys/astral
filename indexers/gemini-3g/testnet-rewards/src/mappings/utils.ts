import {
  SubstrateBlock,
  SubstrateEvent,
  SubstrateExtrinsic,
} from "@subql/types";

export const dateEntry = (blockNumber: number) => ({
  createdAt: blockNumber,
  updatedAt: blockNumber,
});

export const getBlockNumberFromBlock = (block: SubstrateBlock): number => {
  try {
    return block.block.header.number.toNumber();
  } catch (error) {
    logger.error(`Error getting block number: ${error}`);
    throw error;
  }
};

export const getBlockNumberFromEvent = (event: SubstrateEvent): number => {
  try {
    return getBlockNumberFromBlock(event.block);
  } catch (error) {
    logger.error(`Error getting block number: ${error}`);
    throw error;
  }
};

export const getExtrinsicCall = (extrinsic: SubstrateExtrinsic): any => {
  try {
    const parsedExtrinsic = extrinsic.extrinsic.toPrimitive();
    if ((parsedExtrinsic as any).signature) return parsedExtrinsic;

    const methodArgs = (extrinsic.extrinsic.method.toPrimitive() as any).args;
    return methodArgs.call;
  } catch (error) {
    try {
      return extrinsic.extrinsic.toPrimitive();
    } catch (error2) {
      logger.error(`Error getting extrinsic call args: ${error2}`);
      throw error;
    }
  }
};

export const getExtrinsicCallArgsByKeys = (
  extrinsic: SubstrateExtrinsic,
  argsKeys: string[]
): any[] => {
  try {
    const args = getExtrinsicCall(extrinsic).args;
    return argsKeys.map((key) => args[key]);
  } catch (error) {
    try {
      const args = getExtrinsicCall(extrinsic);
      return argsKeys.map((key) => args[key]);
    } catch (error2) {
      logger.error(
        `Error getting extrinsic call args: ${error2} by keys ${argsKeys}`
      );
      throw error2;
    }
  }
};

const getArgsFromCall = (call: any) =>
  call.args?.call?.args?.call?.args ?? call.args?.call?.args ?? call.args;

export const getSignedExtrinsicCallArgs = (extrinsic: SubstrateExtrinsic) => {
  try {
    const [origin, call] = getExtrinsicCallArgsByKeys(extrinsic, [
      "as_origin",
      "call",
    ]);
    const signer = origin.system.signed.toString();
    const args = getArgsFromCall(call);

    return { signer, args };
  } catch (error) {
    try {
      const [signature, method] = getExtrinsicCallArgsByKeys(extrinsic, [
        "signature",
        "method",
      ]);

      const signer = signature.signer.id.toString();
      const args = getArgsFromCall(method);

      return { signer, args };
    } catch {
      logger.error(`Error getting extrinsic call args: ${error}`);
      throw error;
    }
  }
};
