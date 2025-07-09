import { SubstrateBlock } from '@subql/types';
import * as db from './db';
import { EVENT_HANDLERS } from './eventHandler';
import { EXTRINSIC_HANDLERS } from './extrinsicHandler';
import { ExtrinsicPrimitive } from './types';
import { groupEventsFromBatchAll } from './utils';

export async function handleBlock(_block: SubstrateBlock): Promise<void> {
  const {
    block: {
      header: { number },
      extrinsics,
    },
    timestamp: blockTimestamp,
    events,
  } = _block;
  const height = BigInt(number.toString());
  const timestamp = blockTimestamp ? blockTimestamp : new Date();

  const cache = db.initializeCache();
  let eventIndex = 0;

  const eventsByExtrinsic = new Map<number, typeof events>();
  const finalizationEvents: typeof events = [];
  for (const event of events) {
    if (event.phase.isApplyExtrinsic) {
      const idx = event.phase.asApplyExtrinsic.toNumber();
      if (!eventsByExtrinsic.has(idx)) {
        eventsByExtrinsic.set(idx, []);
      }
      eventsByExtrinsic.get(idx)!.push(event);
    } else if (event.phase.isFinalization) {
      finalizationEvents.push(event);
    }
  }
  // Process extrinsics
  extrinsics.forEach((extrinsic, extrinsicIdx) => {
    const extrinsicEvents = eventsByExtrinsic.get(extrinsicIdx) || [];
    const successEvent = extrinsicEvents.findLast(
      (event) => event.event.section === 'system' && event.event.method === 'ExtrinsicSuccess',
    );
    const successEventId = successEvent?.event.index.toString() || '';
    const extrinsicId = extrinsic ? height + '-' + extrinsicIdx.toString() : '';
    const extrinsicMethodToPrimitive = extrinsic.method.toPrimitive() as ExtrinsicPrimitive;
    const extrinsicSigner = extrinsic.isSigned ? extrinsic.signer.toString() : '';

    if (extrinsic.isSigned)
      cache.accountExtrinsicTotalCountHistory.push(
        db.createAccountExtrinsicTotalCount(
          extrinsicSigner,
          BigInt(1),
          height,
          extrinsicId,
          height + '-' + successEventId,
          timestamp,
        ),
      );
    if (extrinsic.isSigned && successEvent) {
      cache.accountExtrinsicSuccessTotalCountHistory.push(
        db.createAccountExtrinsicSuccessTotalCount(
          extrinsicSigner,
          BigInt(1),
          height,
          extrinsicId,
          height + '-' + successEventId,
          timestamp,
        ),
      );

      // Process specific extrinsic
      const extrinsicKey = extrinsic.method.section + '.' + extrinsic.method.method;
      const handler = EXTRINSIC_HANDLERS[extrinsicKey];
      if (handler)
        handler({
          extrinsicEvents,
          cache,
          height,
          timestamp,
          extrinsicId,
          extrinsicSigner,
        });

      if (extrinsic.method.section === 'utility' && extrinsic.method.method === 'batchAll') {
        const batchedExtrinsicEvents = groupEventsFromBatchAll(extrinsicEvents);
        batchedExtrinsicEvents.forEach((events, index) => {
          const extrinsicArgs = (extrinsic.args[0].toPrimitive() as any)[index];
          events.forEach((event) => {
            const eventId = height + '-' + eventIndex;

            // Process specific events
            const eventKey = event.event.section + '.' + event.event.method;
            const handler = EVENT_HANDLERS[eventKey];
            if (handler)
              handler({
                event,
                cache,
                height,
                timestamp,
                extrinsicId,
                eventId,
                extrinsicSigner,
                extrinsicMethodToPrimitive: extrinsicArgs,
              });

            // Increment event index
            eventIndex++;
          });
        });
      } else {
        // Process extrinsic events
        extrinsicEvents.forEach((event) => {
          const eventId = height + '-' + eventIndex;

          // Process specific events
          const eventKey = event.event.section + '.' + event.event.method;
          const handler = EVENT_HANDLERS[eventKey];
          if (handler)
            handler({
              event,
              cache,
              height,
              timestamp,
              extrinsicId,
              eventId,
              extrinsicSigner,
              extrinsicMethodToPrimitive,
            });

          // Increment event index
          eventIndex++;
        });
      }
    } else {
      // Process fail extrinsic
      if (extrinsic.isSigned)
        cache.accountExtrinsicFailedTotalCountHistory.push(
          db.createAccountExtrinsicFailedTotalCount(
            extrinsicSigner,
            BigInt(1),
            height,
            extrinsicId,
            height + '-' + successEventId.toString(),
            timestamp,
          ),
        );
    }
  });

  // Process finalization events
  finalizationEvents.forEach((event) => {
    const extrinsicId = height + '-' + event.phase.type; // AKA (blockHeight-Finalization)
    const eventId = height + '-' + eventIndex;

    // Process specific events
    const eventKey = event.event.section + '.' + event.event.method;
    const handler = EVENT_HANDLERS[eventKey];
    if (handler)
      handler({
        event,
        cache,
        height,
        timestamp,
        extrinsicId,
        extrinsicSigner: '',
        eventId,
      });

    // Increment event index
    eventIndex++;
  });

  // Save cache
  await db.saveCache(cache);
}
