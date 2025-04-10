import { account } from "@autonomys/auto-consensus";
import { stringify } from "@autonomys/auto-utils";
import { SubstrateBlock } from "@subql/types";
import { Entity } from "@subql/types-core";
import {
  DEFAULT_ACCOUNT_ID,
  DOMAIN_AUTO_EVM_CHAIN_TYPE,
  EMPTY_SIGNATURE,
  ZERO_BIGINT,
} from "./constants";
import {
  createAccountHistory,
  createBlock,
  createEvent,
  createEvmBlock,
  createEvmCode,
  createEvmCodeSelector,
  createEvmTransaction,
  createExtrinsic,
  createLog,
  createTransfer,
  initializeCache,
} from "./db";
import { EVENT_HANDLERS } from "./eventHandler";
import { ExtrinsicPrimitive, LogValue } from "./types";

export async function handleBlock(_block: SubstrateBlock): Promise<void> {
  const {
    block: {
      header: { number, parentHash, stateRoot, extrinsicsRoot, digest },
      hash,
      extrinsics,
    },
    timestamp,
    specVersion,
    events,
  } = _block;
  const height = BigInt(number.toString());
  const blockHash = hash.toString();
  const blockTimestamp = timestamp ? timestamp : new Date(0);
  const eventsCount = events.length;
  const extrinsicsCount = extrinsics.length;

  let cache = initializeCache();
  const newExtrinsics = new Array<Entity>(extrinsics.length);
  const newEvents = new Array<Entity>(events.length);
  let eventIndex = 0;

  const [eventsByExtrinsic, finalizationEvents] = events.reduce<
    [Record<number, typeof events>, typeof events]
  >(
    (acc, event) => {
      if (event.phase.isApplyExtrinsic) {
        const idx = event.phase.asApplyExtrinsic.toNumber();
        if (!acc[0][idx]) acc[0][idx] = [];
        acc[0][idx].push(event);
      } else if (event.phase.isFinalization) {
        acc[1].push(event);
      }
      return acc;
    },
    [{}, []]
  );

  // Process extrinsics
  extrinsics.forEach((extrinsic, extrinsicIdx) => {
    const extrinsicHash = extrinsic.hash.toString();
    const extrinsicMethodToPrimitive =
      extrinsic.method.toPrimitive() as ExtrinsicPrimitive;
    const extrinsicEvents = eventsByExtrinsic[extrinsicIdx] || [];

    const { feeEvent, errorEvent, successEvent } = extrinsicEvents.reduce(
      (
        acc: {
          feeEvent?: (typeof events)[number];
          errorEvent?: (typeof events)[number];
          successEvent?: (typeof events)[number];
        },
        event
      ) => {
        // Check for fee event
        if (
          !acc.feeEvent &&
          event.event.section === "balances" &&
          event.event.method === "Withdraw"
        ) {
          acc.feeEvent = event;
        }
        // Check for error event
        else if (
          !acc.errorEvent &&
          event.event.section === "system" &&
          event.event.method === "ExtrinsicFailed"
        ) {
          acc.errorEvent = event;
        }
        // Check for success event
        else if (
          !acc.successEvent &&
          event.event.section === "system" &&
          event.event.method === "ExtrinsicSuccess"
        ) {
          acc.successEvent = event;
        }
        return acc;
      },
      {}
    );

    // Calculate fee
    const fee = feeEvent?.event?.data[1]
      ? BigInt(feeEvent.event.data[1].toString())
      : ZERO_BIGINT;
    const error = errorEvent ? stringify(errorEvent.event.data) : "";

    const pos = extrinsicEvents ? extrinsicIdx : 0;
    const extrinsicSigner = extrinsic.isSigned
      ? extrinsic.signer.toString()
      : DEFAULT_ACCOUNT_ID;
    const extrinsicSignature = extrinsic.isSigned
      ? extrinsic.signature.toString()
      : EMPTY_SIGNATURE;

    newExtrinsics.push(
      createExtrinsic(
        extrinsicHash,
        height,
        blockHash,
        extrinsicIdx,
        extrinsic.method.section,
        extrinsic.method.method,
        successEvent ? true : false,
        blockTimestamp,
        BigInt(extrinsic.nonce.toString()),
        extrinsicSigner,
        extrinsicSignature,
        extrinsicEvents.length,
        stringify(extrinsicMethodToPrimitive.args),
        error,
        BigInt(extrinsic.tip.toString()),
        fee,
        pos
      )
    );
    cache.addressToUpdate.add(extrinsicSigner);

    // Process extrinsic events
    extrinsicEvents.forEach((event) => {
      const extrinsicId = extrinsic
        ? height + "-" + extrinsicIdx.toString()
        : "";

      newEvents.push(
        createEvent(
          height,
          blockHash,
          BigInt(eventIndex),
          extrinsicId,
          extrinsicHash,
          event.event.section,
          event.event.method,
          blockTimestamp,
          event.phase.type,
          pos,
          stringify(event.event.data)
        )
      );

      // Process specific events
      const eventKey = event.event.section + "." + event.event.method;
      const handler = EVENT_HANDLERS[eventKey];
      if (handler)
        handler({
          event,
          cache,
          height,
          blockHash,
          blockTimestamp,
          extrinsicId,
          eventId: height + "-" + eventIndex,
          fee,
          successEvent: successEvent ? true : false,
          extrinsicSigner,
          extrinsicMethodToPrimitive,
        });

      // Increment event index
      eventIndex++;
    });
  });

  // Process finalization events
  finalizationEvents.forEach(async (event) => {
    newEvents.push(
      createEvent(
        height,
        blockHash,
        BigInt(eventIndex),
        "",
        "",
        event.event.section,
        event.event.method,
        blockTimestamp,
        event.phase.type,
        0,
        stringify(event.event.data),
        ""
      )
    );

    // Process specific events
    const eventKey = event.event.section + "." + event.event.method;
    const handler = EVENT_HANDLERS[eventKey];
    if (handler)
      handler({
        event,
        cache,
        height,
        blockHash,
        blockTimestamp,
        extrinsicId: height + "-" + event.phase.type,
        eventId: height + "-" + eventIndex,
        fee: ZERO_BIGINT,
        successEvent: true,
        extrinsicSigner: "",
        extrinsicMethodToPrimitive: {},
      });

    // Increment event index
    eventIndex++;
  });

  // Create block logs
  const newLogs = digest.logs.map((log, i) => {
    const logData = log.toHuman();
    const logJson = log.toPrimitive();
    const kind = logData ? Object.keys(logData)[0] : "";
    const rawKind = logJson ? Object.keys(logJson)[0] : "";
    const _value = logJson ? logJson[rawKind as keyof typeof logJson] : "";
    const value: LogValue =
      Array.isArray(_value) && _value.length === 2
        ? { data: _value[1], engine: _value[0] }
        : { data: _value };

    return createLog(
      height,
      blockHash,
      i,
      kind,
      stringify(value),
      blockTimestamp
    );
  });

  const evmBlock = await unsafeApi?.rpc.eth.getBlockByNumber(height, true);
  const evmBlockData = evmBlock?.unwrap();
  const evmTransactions = evmBlockData?.transactions;
  const codesToFetch: string[] = [];
  if (evmTransactions && evmTransactions?.length > 0) {
    evmTransactions.forEach((transaction) => {
      const from = transaction.from.toString();
      const to = transaction.to.toString();
      const value = BigInt(transaction.value.toString());
      const gas = BigInt(transaction.gas.toString());
      const input = transaction.input.toString();
      const creates = transaction.creates.toString();
      const transactionIndex = evmTransactions.indexOf(transaction).toString();
      cache.evmTransactions.push(
        createEvmTransaction(
          transaction.hash.toString(),
          BigInt(transaction.nonce.toString()),
          blockHash,
          height,
          blockTimestamp,
          evmBlockData?.timestamp.toNumber() ?? 0,
          BigInt(transactionIndex),
          from,
          to,
          value,
          BigInt(transaction.gasPrice.toString()),
          BigInt(transaction.maxFeePerGas.toString()),
          BigInt(transaction.maxPriorityFeePerGas.toString()),
          gas,
          input,
          creates,
          transaction.raw.toString(),
          transaction.publicKey.toString(),
          BigInt(transaction.chainId.toString()),
          BigInt(transaction.standardV.toString()),
          transaction.v.toString(),
          transaction.r.toString(),
          transaction.s.toString(),
          transaction.accessList.toString(),
          BigInt(transaction.transactionType.toString())
        )
      );
      if (creates) codesToFetch.push(creates);
      cache.addressToUpdate.add(from);
      if (to) {
        cache.addressToUpdate.add(to);

        if (value > ZERO_BIGINT) {
          cache.totalTransferValue += value;
          cache.transfers.push(
            createTransfer(
              height,
              blockHash,
              height + "-evm-tx-" + transactionIndex,
              height + "-evm-tx-" + transactionIndex,
              from,
              DOMAIN_AUTO_EVM_CHAIN_TYPE,
              to,
              DOMAIN_AUTO_EVM_CHAIN_TYPE,
              value,
              gas,
              "evm.Transfer",
              true,
              true,
              blockTimestamp
            )
          );
        }
      }

      if (!to && creates && input !== "0x")
        cache.evmCodeSelectors.push(
          createEvmCodeSelector(creates, input.slice(0, 10))
        );
    });
    if (codesToFetch.length > 0) {
      const codes = await Promise.all(
        codesToFetch.map((code) => unsafeApi?.rpc.eth.getCode(code))
      );
      codes.forEach((code, i) =>
        cache.evmCodes.push(
          createEvmCode(codesToFetch[i], code?.toString() ?? "0x", "[]")
        )
      );
    }
  }

  // Update accounts
  const uniqueAddresses = Array.from(cache.addressToUpdate).filter(
    (address) => address !== "" && address !== DEFAULT_ACCOUNT_ID
  );
  const accounts = await Promise.all(
    uniqueAddresses.map((address) => account(api as any, address))
  );

  // Create and save accounts
  const accountHistories = accounts.map((account, i) =>
    createAccountHistory(
      uniqueAddresses[i],
      height,
      BigInt(account.nonce.toString()),
      account.data.free,
      account.data.reserved,
      account.data.free + account.data.reserved
    )
  );

  // Save many entities in parallel
  await Promise.all([
    // Save extrinsic, events and logs
    store.bulkCreate(`Extrinsic`, newExtrinsics),
    store.bulkCreate(`Event`, newEvents),
    store.bulkCreate(`Log`, newLogs),

    // Save transfers
    store.bulkCreate(`Transfer`, cache.transfers),

    // Save account
    store.bulkCreate(`AccountHistory`, accountHistories),

    // Create and save block
    store.bulkCreate(`Block`, [
      createBlock(
        blockHash,
        height,
        blockTimestamp,
        parentHash.toString(),
        specVersion.toString(),
        stateRoot.toString(),
        extrinsicsRoot.toString(),
        extrinsicsCount,
        eventsCount,
        newLogs.length,
        cache.transfers.length,
        cache.totalTransferValue,
        DEFAULT_ACCOUNT_ID
      ),
    ]),
    // Create and save block
    store.bulkCreate(`EvmBlock`, [
      createEvmBlock(
        evmBlockData?.hash.toString() ?? "",
        height,
        blockTimestamp,
        evmBlockData?.timestamp.toNumber() ?? 0,
        evmBlockData?.parentHash.toString() ?? "",
        evmBlockData?.stateRoot.toString() ?? "",
        evmBlockData?.transactionsRoot.toString() ?? "",
        evmBlockData?.receiptsRoot.toString() ?? "",
        evmBlockData?.transactions.length ?? 0,
        evmBlockData?.transactions.reduce(
          (sum, tx) => sum + BigInt(tx.value.toString() ?? "0"),
          ZERO_BIGINT
        ) ?? ZERO_BIGINT,
        evmBlockData?.author?.toString() ?? "",
        BigInt(evmBlockData?.gasUsed?.toString() ?? "0"),
        BigInt(evmBlockData?.gasLimit?.toString() ?? "0"),
        evmBlockData?.extraData?.toString() ?? "",
        BigInt(evmBlockData?.difficulty.toString() ?? "0"),
        BigInt(evmBlockData?.totalDifficulty.toString() ?? "0"),
        BigInt(evmBlockData?.size.toString() ?? "0")
      ),
    ]),
    // Create and save evm transactions
    store.bulkCreate(`EvmTransaction`, cache.evmTransactions),
    // Create and save evm codes
    store.bulkCreate(`EvmCode`, cache.evmCodes),
    // Create and save evm code selectors
    store.bulkCreate(`EvmCodeSelector`, cache.evmCodeSelectors),
  ]);
}
