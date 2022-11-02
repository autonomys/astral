export const shortString = (
  value: string,
  initialLength = 6,
  endLength = -4
): string => `${value.slice(0, initialLength)}...${value.slice(endLength)}`;

export const generateArrayOfNumbers = (length: number): number[] => {
  return Array.from(Array(length).keys());
};
