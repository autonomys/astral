import { NAMESPACE_DNS, v5 } from "jsr:@std/uuid";

// Load the JSON data
const response = await fetch(
  "https://raw.githubusercontent.com/autonomys/subspace/refs/heads/main/crates/subspace-node/src/genesis_allocations.json"
);
const data = await response.json();

// Ensure the seeds directory exists
await Deno.mkdir("seeds", { recursive: true });

// Open a file to write the SQL output
const accountsFile = await Deno.open("seeds/accounts.sql", {
  write: true,
  create: true,
  truncate: true,
});
const accountHistoriesFile = await Deno.open("seeds/account_histories.sql", {
  write: true,
  create: true,
  truncate: true,
});

// Prepare the SQL COPY command
await accountsFile.write(
  new TextEncoder().encode(
    "COPY consensus.accounts (id, nonce, free, reserved, total, created_at, updated_at, _id, _block_range) FROM stdin;\n"
  )
);
await accountHistoriesFile.write(
  new TextEncoder().encode(
    "COPY consensus.account_histories (id, nonce, free, reserved, total, created_at, updated_at, _id, _block_range) FROM stdin;\n"
  )
);

// Iterate over each entry in the JSON data
for (const entry of data) {
  const accountId = entry[0];
  const freeBalance = (
    BigInt(entry[1]) * BigInt(1000000000000000000)
  ).toString(); // Convert to 10^18 units
  const reservedBalance = "0";
  const totalBalance = freeBalance;
  const createdAt = 0;
  const updatedAt = 0;
  const _id = await v5.generate(NAMESPACE_DNS, accountId);
  const _blockRange = "[0,)";

  // Write the SQL row to the file
  await accountsFile.write(
    new TextEncoder().encode(
      `${accountId}\t0\t${freeBalance}\t${reservedBalance}\t${totalBalance}\t${createdAt}\t${updatedAt}\t${_id}\t${_blockRange}\n`
    )
  );
  await accountHistoriesFile.write(
    new TextEncoder().encode(
      `${accountId}\t0\t${freeBalance}\t${reservedBalance}\t${totalBalance}\t${createdAt}\t${updatedAt}\t${_id}\t${_blockRange}\n`
    )
  );
}

// End the SQL COPY command
await accountsFile.write(new TextEncoder().encode("\\.\n"));
await accountHistoriesFile.write(new TextEncoder().encode("\\.\n"));

// Close the file
accountsFile.close();
accountHistoriesFile.close();
