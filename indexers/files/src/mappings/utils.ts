import { PAD_ZEROS } from './constants';

export const hexToUint8Array = (hex: string): Uint8Array => {
  if (hex.length % 2 !== 0) throw new Error('Hex string must have an even length');
  return new Uint8Array(hex.match(/.{1,2}/g)?.map((byte) => parseInt(byte, 16)) || []);
};

export const getSortId = (blockHeight: bigint | string, indexInBlock?: bigint | string): string => {
  const str1 = blockHeight.toString().padStart(32, PAD_ZEROS);
  if (indexInBlock === undefined) return str1;
  const str2 = indexInBlock.toString().padStart(32, PAD_ZEROS);
  return str1 + '-' + str2;
};
