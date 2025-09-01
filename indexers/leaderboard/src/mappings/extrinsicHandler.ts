import { EventRecord } from '@autonomys/auto-utils';
import * as db from './db';
import { Cache } from './db';

type ExtrinsicHandler = (params: {
  extrinsicEvents: EventRecord[];
  cache: Cache;
  height: bigint;
  timestamp: Date;
  extrinsicId: string;
  extrinsicSigner: string;
  extrinsic?: any;
}) => void;

const handleRemark: ExtrinsicHandler = ({
  extrinsicEvents,
  cache,
  height,
  timestamp,
  extrinsicId,
  extrinsicSigner,
}) => {
  const eventRemarked = extrinsicEvents.find(
    (e) => e.event.section === 'system' && e.event.method === 'Remarked',
  );
  const eventRemarkedId = eventRemarked ? height + '-' + eventRemarked.event.index.toString() : '';
  cache.accountRemarkCountHistory.push(
    db.createAccountRemarkCount(
      extrinsicSigner,
      BigInt(1),
      height,
      extrinsicId,
      eventRemarkedId,
      timestamp,
    ),
  );
};

export const EXTRINSIC_HANDLERS: Record<string, ExtrinsicHandler> = {
  'system.remark': handleRemark,
  'system.remarkWithEvent': handleRemark,
};
