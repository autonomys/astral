import { SubstrateEvent, SubstrateExtrinsic } from "@subql/types";
import {
  createAndSaveAccountHistory,
  createAndSaveReward,
  createAndSaveTransfer,
} from "./db";
import { getAccountBalance } from "./helper";

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

  const fromBalance = await getAccountBalance(from);
  const toBalance = await getAccountBalance(to);

  // create or update and save accounts
  await createAndSaveAccountHistory(
    from,
    blockNumber,
    BigInt(fromBalance.nonce.toString()),
    fromBalance.data.free,
    fromBalance.data.reserved,
    fromBalance.data.free + fromBalance.data.reserved
  );
  await createAndSaveAccountHistory(
    to,
    blockNumber,
    BigInt(toBalance.nonce.toString()),
    toBalance.data.free,
    toBalance.data.reserved,
    toBalance.data.free + toBalance.data.reserved
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

  const balance = await getAccountBalance(address);

  // create or update and save accounts
  await createAndSaveAccountHistory(
    address,
    blockNumber,
    BigInt(balance.nonce.toString()),
    balance.data.free,
    balance.data.reserved,
    balance.data.free + balance.data.reserved
  );
}

export async function handleFarmerVoteRewardEvent(
  event: SubstrateEvent
): Promise<void> {
  const {
    idx,
    event: {
      section,
      method,
      data: [_voter, _reward],
    },
    block: {
      block: {
        header: { number },
        hash,
      },
      timestamp,
    },
  } = event;
  const voter = _voter.toString();
  const blockNumber = BigInt(number.toString());

  const balance = await getAccountBalance(voter);

  // create or update and save accounts
  await createAndSaveAccountHistory(
    voter,
    blockNumber,
    BigInt(balance.nonce.toString()),
    balance.data.free,
    balance.data.reserved,
    balance.data.free + balance.data.reserved
  );

  await createAndSaveReward(
    blockNumber,
    hash.toString(),
    voter,
    BigInt(idx.toString()),
    section + "." + method,
    BigInt(_reward.toString()),
    timestamp ? timestamp : new Date(0)
  );
}

export async function handleFarmerBlockRewardEvent(
  event: SubstrateEvent
): Promise<void> {
  const {
    idx,
    event: {
      section,
      method,
      data: [_blockAuthor, _reward],
    },
    block: {
      block: {
        header: { number },
        hash,
      },
      timestamp,
    },
  } = event;
  const blockAuthor = _blockAuthor.toString();
  const blockNumber = BigInt(number.toString());

  const balance = await getAccountBalance(blockAuthor);

  // create or update and save accounts
  await createAndSaveAccountHistory(
    blockAuthor,
    blockNumber,
    BigInt(balance.nonce.toString()),
    balance.data.free,
    balance.data.reserved,
    balance.data.free + balance.data.reserved
  );

  await createAndSaveReward(
    blockNumber,
    hash.toString(),
    blockAuthor,
    BigInt(idx.toString()),
    section + "." + method,
    BigInt(_reward.toString()),
    timestamp ? timestamp : new Date(0)
  );
}
