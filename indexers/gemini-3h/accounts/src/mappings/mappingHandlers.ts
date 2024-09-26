import { SubstrateEvent, SubstrateExtrinsic } from "@subql/types";
import { createAndSaveTransfer, createOrUpdateAndSaveAccount } from "./db";
import { updateAccountBalance } from "./helper";

export async function handleTransferEvent(
  event: SubstrateEvent
): Promise<void> {
  const {
    event: {
      data: [_from, _to, _amount],
    },
  } = event;
  const blockNumber = BigInt(event.block.block.header.number.toString());
  const timestamp = Number(event.block.timestamp) * 1000;
  const from = _from.toString();
  const to = _to.toString();
  const amount = BigInt(_amount.toString());

  const fromBalance = await updateAccountBalance(from, blockNumber);
  const toBalance = await updateAccountBalance(to, blockNumber);

  // create or update and save accounts
  await createOrUpdateAndSaveAccount(
    from,
    blockNumber,
    BigInt(0),
    fromBalance.free,
    fromBalance.reserved,
    fromBalance.free + fromBalance.reserved
  );
  await createOrUpdateAndSaveAccount(
    to,
    blockNumber,
    BigInt(0),
    toBalance.free,
    toBalance.reserved,
    toBalance.free + toBalance.reserved
  );

  await createAndSaveTransfer(
    blockNumber,
    event.extrinsic ? blockNumber + "-" + event.extrinsic.idx.toString() : "",
    event.event.index.toString(),
    from,
    to,
    amount,
    BigInt(0),
    event.extrinsic?.success ?? false,
    BigInt(timestamp),
    new Date(timestamp)
  );
}

export async function handleExtrinsic(
  extrinsic: SubstrateExtrinsic
): Promise<void> {
  const {
    extrinsic: { signer },
    block: {
      block: {
        header: { number },
      },
    },
  } = extrinsic;
  const blockNumber = BigInt(number.toString());
  const address = signer.toString();

  const balance = await updateAccountBalance(address, blockNumber);

  // create or update and save accounts
  await createOrUpdateAndSaveAccount(
    address,
    blockNumber,
    BigInt(0),
    balance.free,
    balance.reserved,
    balance.free + balance.reserved
  );
}

export async function handleFarmerVoteRewardEvent(
  event: SubstrateEvent
): Promise<void> {
  const {
    event: {
      data: [_voter, _reward],
    },
    block: {
      block: {
        header: { number },
      },
    },
  } = event;
  const voter = _voter.toString();
  const blockNumber = BigInt(number.toString());

  const balance = await updateAccountBalance(voter, blockNumber);

  // create or update and save accounts
  await createOrUpdateAndSaveAccount(
    voter,
    blockNumber,
    BigInt(0),
    balance.free,
    balance.reserved,
    balance.free + balance.reserved
  );
}

export async function handleFarmerBlockRewardEvent(
  event: SubstrateEvent
): Promise<void> {
  const {
    event: {
      data: [_blockAuthor, _reward],
    },
    block: {
      block: {
        header: { number },
      },
    },
  } = event;
  const blockAuthor = _blockAuthor.toString();
  const blockNumber = BigInt(number.toString());

  const balance = await updateAccountBalance(blockAuthor, blockNumber);

  // create or update and save accounts
  await createOrUpdateAndSaveAccount(
    blockAuthor,
    blockNumber,
    BigInt(0),
    balance.free,
    balance.reserved,
    balance.free + balance.reserved
  );
}
