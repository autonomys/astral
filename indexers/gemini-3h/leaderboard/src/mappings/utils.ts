export const stringify = (value: any) =>
  JSON.stringify(value, (_, value) =>
    typeof value === "bigint" ? value.toString() : value
  );
