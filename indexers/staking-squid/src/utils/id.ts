export const operatorIdToString = (operatorId: number) =>
  `op-${operatorId.toString().padStart(9, "0")}`;

export const nominatorIdToString = (operatorId: number, account: string) =>
  `no-${account}-op-${operatorId.toString().padStart(9, "0")}`;
