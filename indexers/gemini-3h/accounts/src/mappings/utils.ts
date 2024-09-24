export const stringify = (value: any) =>
  JSON.stringify(value, (_, value) =>
    typeof value === "bigint" ? value.toString() : value
  );

export const dateEntry = (blockNumber: bigint) => ({
  createdAt: blockNumber,
  updatedAt: blockNumber,
});
