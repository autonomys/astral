export const getSortId = (
  blockHeight: bigint | string,
  indexInBlock?: bigint | string
): string => {
  const totalLength = 32;
  if (typeof blockHeight !== "string") {
    blockHeight = blockHeight.toString();
  }
  const str1 = blockHeight.padStart(totalLength, "0");

  if (indexInBlock === undefined) return str1;
  if (typeof indexInBlock !== "string") {
    indexInBlock = indexInBlock.toString();
  }

  const str2 = indexInBlock.padStart(totalLength, "0");
  return `${str1}-${str2}`;
};
