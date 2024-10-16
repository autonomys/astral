export const stringify = (value: any) =>
  JSON.stringify(value, (_, value) =>
    typeof value === "bigint" ? value.toString() : value
  );

export const capitalizeFirstLetter = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1);
