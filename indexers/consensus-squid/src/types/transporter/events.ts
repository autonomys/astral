import { sts, Block, Bytes, Option, Result, EventType, RuntimeCtx } from '../support'
import * as v0 from '../v0'

export const outgoingTransferInitiated = {
  name: 'Transporter.OutgoingTransferInitiated',
  /**
   * Emits when there is a new outgoing transfer.
   */
  v0: new EventType(
    'Transporter.OutgoingTransferInitiated',
    sts.struct({
      /**
       * Destination chain the transfer is bound to.
       */
      chainId: v0.ChainId,
      /**
       * Id of the transfer.
       */
      messageId: sts.tuple(() => [sts.bigint(), sts.bigint()]),
    }),
  ),
}

export const outgoingTransferFailed = {
  name: 'Transporter.OutgoingTransferFailed',
  /**
   * Emits when a given outgoing transfer was failed on dst_chain.
   */
  v0: new EventType(
    'Transporter.OutgoingTransferFailed',
    sts.struct({
      /**
       * Destination chain the transfer is bound to.
       */
      chainId: v0.ChainId,
      /**
       * Id of the transfer.
       */
      messageId: sts.tuple(() => [sts.bigint(), sts.bigint()]),
      /**
       * Error from dst_chain endpoint.
       */
      err: v0.DispatchError,
    }),
  ),
}

export const outgoingTransferSuccessful = {
  name: 'Transporter.OutgoingTransferSuccessful',
  /**
   * Emits when a given outgoing transfer was successful.
   */
  v0: new EventType(
    'Transporter.OutgoingTransferSuccessful',
    sts.struct({
      /**
       * Destination chain the transfer is bound to.
       */
      chainId: v0.ChainId,
      /**
       * Id of the transfer.
       */
      messageId: sts.tuple(() => [sts.bigint(), sts.bigint()]),
    }),
  ),
}

export const incomingTransferSuccessful = {
  name: 'Transporter.IncomingTransferSuccessful',
  /**
   * Emits when a given incoming transfer was successfully processed.
   */
  v0: new EventType(
    'Transporter.IncomingTransferSuccessful',
    sts.struct({
      /**
       * Source chain the transfer is coming from.
       */
      chainId: v0.ChainId,
      /**
       * Id of the transfer.
       */
      messageId: sts.tuple(() => [sts.bigint(), sts.bigint()]),
    }),
  ),
}
