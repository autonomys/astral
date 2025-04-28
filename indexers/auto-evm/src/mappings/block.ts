import { account } from "@autonomys/auto-consensus";
import { stringify } from "@autonomys/auto-utils";
import { getBlockAndMore } from "../chain/calls.ts";
import { saveAllData } from "../db/save-all.ts";
import { EVENT_HANDLERS } from "../handlers/events.ts";
import {
  DOMAIN_AUTO_EVM_CHAIN_TYPE,
  EMPTY_SIGNATURE,
  ZERO_BIGINT,
} from "../structures/constants.ts";
import { Cache } from "../types/cache.ts";
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
} from "../utils/cache.ts";
import { groupEventsFromBatchAll } from "../utils/helper.ts";

export const blockMapping = async (cache: Cache) => {
  cache.currentBlock = cache.lastProcessedHeight
    ? cache.lastProcessedHeight + 1
    : 1;
  let eventIndex = 0;

  const {
    api,
    height,
    hash,
    timestamp,
    date,
    header,
    logs,
    extrinsics,
    events,
    logsCount,
    eventsCount,
    extrinsicsCount,
    author,
    specVersion,
    evmBlock,
    evmTransactions,
  } = await getBlockAndMore(cache);

  const [eventsByExtrinsic, finalizationEvents] = events.reduce<
    [Record<number, typeof events>, typeof events]
  >(
    (acc, event) => {
      if ((event.phase as any).applyExtrinsic !== undefined) {
        const idx = (event.phase as any).applyExtrinsic;
        if (!acc[0][idx]) acc[0][idx] = [];
        acc[0][idx].push(event);
      } else if ((event.phase as any).finalization !== undefined) {
        acc[1].push(event);
      }
      return acc;
    },
    [{}, []]
  );

  logs.forEach((log, index) =>
    cache.logs.push(
      createLog(height, hash, index, log.kind, stringify(log.value), timestamp)
    )
  );

  extrinsics.forEach((extrinsic, extrinsicIdx) => {
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
    const successEventId = successEvent?.event.index.toString();
    const failEventId = errorEvent?.event.index.toString();

    const pos = extrinsicEvents ? extrinsicIdx : 0;
    const extrinsicSigner = extrinsic.isSigned
      ? extrinsic.signer.toString()
      : "";
    const extrinsicSignature = extrinsic.isSigned
      ? extrinsic.signature.toString()
      : EMPTY_SIGNATURE;
    const extrinsicId = height + "-" + extrinsicIdx.toString();

    cache.extrinsics.push(
      createExtrinsic(
        extrinsic.hash,
        height,
        hash,
        extrinsicIdx,
        extrinsic.section,
        extrinsic.method,
        successEvent ? true : false,
        date,
        extrinsic.nonce,
        extrinsicSigner,
        extrinsicSignature,
        extrinsicEvents.length,
        stringify(extrinsic.args),
        error,
        extrinsic.tip,
        fee,
        pos
      )
    );
    if (extrinsic.isSigned) {
      cache.addressToUpdate.add(extrinsicSigner);
    }

    if (extrinsic.section === "utility" && extrinsic.method === "batchAll") {
      const batchedExtrinsicEvents = groupEventsFromBatchAll(extrinsicEvents);
      batchedExtrinsicEvents.forEach((events, eventIdx) => {
        events.forEach((event) => {
          cache.events.push(
            createEvent(
              height,
              hash,
              BigInt(eventIndex),
              extrinsicId,
              extrinsic.hash,
              event.event.section,
              event.event.method,
              date,
              (event.phase as any).applyExtrinsic ?? 0,
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
              hash,
              date,
              extrinsicId,
              eventId: height + "-" + eventIndex,
              fee,
              successEvent: successEvent ? true : false,
              extrinsicSigner,
              extrinsicArgs: extrinsic.args,
              extrinsicEvents,
            });

          // Increment event index
          eventIndex++;
        });
      });
    } else {
      // Process extrinsic events
      extrinsicEvents.forEach((event) => {
        cache.events.push(
          createEvent(
            height,
            hash,
            BigInt(eventIndex),
            extrinsicId,
            extrinsic.hash,
            event.event.section,
            event.event.method,
            date,
            (event.phase as any).applyExtrinsic ?? 0,
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
            hash,
            date,
            extrinsicId,
            eventId: height + "-" + eventIndex,
            fee,
            successEvent: successEvent ? true : false,
            extrinsicSigner,
            extrinsicArgs: extrinsic.args,
            extrinsicEvents,
          });

        // Increment event index
        eventIndex++;
      });
    }
  });

  // Process finalization events
  finalizationEvents.forEach((event) => {
    cache.events.push(
      createEvent(
        height,
        hash,
        BigInt(eventIndex),
        "",
        "",
        event.event.section,
        event.event.method,
        date,
        (event.phase as any).finalization ?? 0,
        0,
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
        hash,
        date,
        extrinsicId: "",
        eventId: height + "-" + eventIndex,
        fee: ZERO_BIGINT,
        successEvent: true,
        extrinsicSigner: "",
        extrinsicArgs: {},
        extrinsicEvents: [],
      });

    // Increment event index
    eventIndex++;
  });

  // const evmBlock = await unsafeApi?.rpc.eth.getBlockByNumber(height, true);
  // const evmBlockData = evmBlock?.unwrap();
  // const evmTransactions = evmBlockData?.transactions;
  const codesToFetch: string[] = [];
  if (evmTransactions && evmTransactions?.length > 0) {
    evmTransactions.forEach((transaction: any) => {
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
          hash,
          height,
          date,
          evmBlock?.timestamp.toNumber() ?? 0,
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
              hash,
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
              date
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
        codesToFetch.map((code) => api.rpc.eth.getCode(code))
      );
      codes.forEach((code, i) =>
        cache.evmCodes.push(
          createEvmCode(codesToFetch[i], code?.toString() ?? "0x", "[]")
        )
      );
    }
  }
  cache.evmBlocks.push(
    createEvmBlock(
      evmBlock?.hash.toString() ?? "",
      height,
      date,
      evmBlock?.timestamp.toNumber() ?? 0,
      evmBlock?.parentHash.toString() ?? "",
      evmBlock?.stateRoot.toString() ?? "",
      evmBlock?.transactionsRoot.toString() ?? "",
      evmBlock?.receiptsRoot.toString() ?? "",
      evmBlock?.transactions.length ?? 0,
      evmBlock?.transactions.reduce(
        (sum: bigint, tx: any) => sum + BigInt(tx.value.toString() ?? "0"),
        ZERO_BIGINT
      ) ?? ZERO_BIGINT,
      evmBlock?.author?.toString() ?? "",
      BigInt(evmBlock?.gasUsed?.toString() ?? "0"),
      BigInt(evmBlock?.gasLimit?.toString() ?? "0"),
      evmBlock?.extraData?.toString() ?? "",
      BigInt(evmBlock?.difficulty.toString() ?? "0"),
      BigInt(evmBlock?.totalDifficulty.toString() ?? "0"),
      BigInt(evmBlock?.size.toString() ?? "0")
    )
  );

  // Update accounts
  const uniqueAddresses = Array.from(cache.addressToUpdate);
  const accounts = await Promise.all(
    uniqueAddresses.map((address) => account(api, address))
  );

  // Create and save accounts
  accounts.forEach((account, i) =>
    cache.accountHistories.push(
      createAccountHistory(
        uniqueAddresses[i],
        height,
        hash,
        BigInt(account.nonce.toString()),
        account.data.free,
        account.data.reserved,
        account.data.free + account.data.reserved
      )
    )
  );

  cache.blocks.push(
    createBlock(
      hash,
      height,
      date,
      header.parentHash,
      specVersion.toString(),
      header.stateRoot,
      header.extrinsicsRoot,
      extrinsicsCount,
      eventsCount,
      logsCount,
      cache.transfers.length,
      cache.totalTransferValue,
      author
    )
  );

  await saveAllData(cache);

  return cache;
};
