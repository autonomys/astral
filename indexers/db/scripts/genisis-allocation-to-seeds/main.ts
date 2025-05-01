import { Keyring } from "npm:@autonomys/auto-utils";

// Load the JSON data
const response = await fetch(
  "https://raw.githubusercontent.com/autonomys/subspace/refs/heads/main/crates/subspace-node/src/genesis_allocations.json"
);
const data = await response.json();

// Ensure the seeds directory exists
await Deno.mkdir("seeds", { recursive: true });

// Open a file to write the SQL output
const accountHistoriesFile = await Deno.open("seeds/account_histories.sql", {
  write: true,
  create: true,
  truncate: true,
});

// Open a file to write the SQL output
const accountsFile = await Deno.open("seeds/accounts.sql", {
  write: true,
  create: true,
  truncate: true,
});

// Iterate over each entry in the JSON data and generate the insert sql
for (const entry of data) {
  const keyring = new Keyring({ type: "sr25519", ss58Format: 42 });
  const accountId = keyring.encodeAddress(entry[0], 6094);
  const freeBalance = (
    BigInt(entry[1]) * BigInt(1000000000000000000)
  ).toString(); // Convert to 10^18 units
  const reservedBalance = "0";
  const totalBalance = freeBalance;
  const createdAt = 0;

  await accountHistoriesFile.write(
    new TextEncoder().encode(
      `INSERT INTO consensus.account_histories (id, account_id, nonce, free, reserved, total, block_id, block_height, block_hash) VALUES ('${accountId}-0x', '${accountId}', 0, ${freeBalance}, ${reservedBalance}, ${totalBalance}, '0x', ${createdAt}, '0x');\n`
    )
  );

  await accountsFile.write(
    new TextEncoder().encode(
      `INSERT INTO consensus.accounts (id, nonce, free, reserved, total, created_at, updated_at) VALUES ('${accountId}', 0, ${freeBalance}, ${reservedBalance}, ${totalBalance}, ${createdAt}, ${createdAt});\n`
    )
  );
}

// Close the file
accountHistoriesFile.close();
accountsFile.close();
