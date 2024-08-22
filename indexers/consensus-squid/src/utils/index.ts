import { ApiPromise, DEFAULT_SS58_FORMAT } from '@autonomys/auto-utils'
import { Struct, u64 } from '@polkadot/types'
import { AccountId32 } from '@polkadot/types/interfaces'
import { HexSink } from '@subsquid/scale-codec'
import { codec } from '@subsquid/ss58'
import { Store } from '@subsquid/typeorm-store'
import { decodeHex, toHex } from '@subsquid/util-internal-hex'
import { xxhash128 } from '@subsquid/util-xxhash'
import type { Ctx, CtxBlock, ProcessorContext } from '../processor'
import { digest } from '../types/system/storage'
import { DigestItem_PreRuntime } from '../types/v0'

const PIECE_SIZE = 1048576n
const MAX_PIECES_IN_SECTOR = 1000n

export const hexToAccount = (hex: string): string => {
  try {
    return codec(DEFAULT_SS58_FORMAT).encode(decodeHex(hex))
  } catch (error) {
    console.error('Failed to convert hex to account:', error)
    return ''
  }
}

export const getCallSigner = (
  call: ProcessorContext<Store>['blocks'][0]['extrinsics'][0]['call'],
): string => {
  try {
    return hexToAccount((call as any).origin.value.value)
  } catch (error) {
    console.error('Failed to get call signer:', error)
    return ''
  }
}

export const getBlockNumber = (block: CtxBlock): number => block.header.height

export const getTimestamp = (block: CtxBlock): Date => new Date(block.header.timestamp ?? 0)

export const splitModuleAndId = (extrinsicName: string): [string, string] => {
  const [module, call] = extrinsicName.split('.')
  return [module, call]
}

export const stringUID = (id: string): string => id.toLowerCase()

export const logBlock = (blocks: CtxBlock[]): void => {
  const from = getBlockNumber(blocks[0])
  const to = getBlockNumber(blocks[blocks.length - 1])
  return console.log(
    '\x1b[33mProcessing ' + blocks.length + ' blocks\x1b[0m',
    'From ' + from,
    'to ' + to + ' (' + (to - from) + ' blocks)',
  )
}

export const solutionRangeToSectors = (solutionRange: bigint): bigint => {
  const MAX_U64 = 2n ** 64n - 1n
  const SLOT_PROBABILITY = [1n, 6n]
  const RECORD_NUM_CHUNKS = 32768n
  const RECORD_NUM_S_BUCKETS = 65536n

  const sectors =
    ((MAX_U64 / SLOT_PROBABILITY[1]) * SLOT_PROBABILITY[0]) /
    ((MAX_PIECES_IN_SECTOR * RECORD_NUM_CHUNKS) / RECORD_NUM_S_BUCKETS)

  // Take solution range into account
  return sectors / solutionRange
}

export const calcSpacePledged = (solutionRange: bigint): bigint => {
  const sectors = solutionRangeToSectors(solutionRange)

  return sectors * MAX_PIECES_IN_SECTOR * PIECE_SIZE
}

export const calcHistorySize = (segmentsCount: number): bigint => {
  const PIECES_IN_SEGMENT = 256n
  const segmentsCountBigInt = BigInt(segmentsCount)

  return PIECE_SIZE * PIECES_IN_SEGMENT * segmentsCountBigInt
}

export const decodeLog = (value: null | Uint8Array | Uint8Array[]) => {
  if (!value) return null

  if (Array.isArray(value)) {
    return {
      engine: value[0].toString(),
      data: toHex(value[1]),
    }
  }

  return { data: toHex(value) }
}

interface Solution extends Struct {
  readonly public_key: AccountId32
  readonly reward_address: AccountId32
}

export interface SubPreDigest extends Struct {
  readonly slot: u64
  readonly solution: Solution
}

export const getBlockAuthor = async (block: CtxBlock, api: ApiPromise) => {
  if (block.header.height === 0) return // genesis block does not have logs
  const storage = (await digest.v0.get(block.header)) ?? digest.v0.getDefault(block.header)
  const preRuntimeRaw = storage.logs.find(
    (digestItem) => digestItem.__kind === 'PreRuntime',
  ) as DigestItem_PreRuntime
  if (!preRuntimeRaw) return

  const subPreDigest = api.registry.createType('SubPreDigest', preRuntimeRaw.value[1])
  return (subPreDigest as unknown as SubPreDigest).solution.reward_address.toString()
}

const getNameHash = (name: string): string => {
  const digest = xxhash128().update(name).digest()
  const sink = new HexSink()
  sink.u128(digest)
  const hash = sink.toHex()
  return hash
}

export const getStorageHash = (prefix: string, name: string) => {
  return getNameHash(prefix) + getNameHash(name).slice(2)
}

export const getHistorySize = async (ctx: Ctx<Store>, block: CtxBlock, api: ApiPromise) => {
  const { client } = ctx._chain

  const storageHash = getStorageHash('Subspace', 'SegmentCommitment')

  const totalSize = (await client.call('state_getStorageSizeAt', [
    storageHash,
    block.header.hash,
  ])) as number
  if (totalSize === 0 || !totalSize) return BigInt(0)

  const keys = (await client.call('state_getKeysPagedAt', [
    storageHash,
    1,
    null,
    block.header.hash,
  ])) as string[]

  const keySize = (await client.call('state_getStorageSizeAt', [
    keys[0],
    block.header.hash,
  ])) as number

  const segmentsCount = totalSize / keySize

  return calcHistorySize(segmentsCount)
}
