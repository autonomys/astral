import { sts, Result, Option, Bytes, BitSequence } from './support'

export interface DomainRuntimeUpgradeEntry {
  atHash: H256
  referenceCount: number
}

export const DomainRuntimeUpgradeEntry: sts.Type<DomainRuntimeUpgradeEntry> = sts.struct(() => {
  return {
    atHash: H256,
    referenceCount: sts.number(),
  }
})

export type PermissionedActionAllowedBy =
  | PermissionedActionAllowedBy_Accounts
  | PermissionedActionAllowedBy_Anyone

export interface PermissionedActionAllowedBy_Accounts {
  __kind: 'Accounts'
  value: AccountId32[]
}

export interface PermissionedActionAllowedBy_Anyone {
  __kind: 'Anyone'
}

export type AccountId32 = Bytes

export type H256 = Bytes

export interface BlockTreeNode {
  executionReceipt: ExecutionReceipt
  operatorIds: bigint[]
}

export interface ExecutionReceipt {
  domainBlockNumber: number
  domainBlockHash: H256
  domainBlockExtrinsicRoot: H256
  parentDomainBlockReceiptHash: H256
  consensusBlockNumber: number
  consensusBlockHash: H256
  inboxedBundles: InboxedBundle[]
  finalStateRoot: H256
  executionTrace: H256[]
  executionTraceRoot: H256
  blockFees: BlockFees
  transfers: Transfers
}

export interface Transfers {
  transfersIn: [ChainId, bigint][]
  transfersOut: [ChainId, bigint][]
  rejectedTransfersClaimed: [ChainId, bigint][]
  transfersRejected: [ChainId, bigint][]
}

export type ChainId = ChainId_Consensus | ChainId_Domain

export interface ChainId_Consensus {
  __kind: 'Consensus'
}

export interface ChainId_Domain {
  __kind: 'Domain'
  value: DomainId
}

export interface BlockFees {
  consensusStorageFee: bigint
  domainExecutionFee: bigint
  burnedBalance: bigint
}

export interface InboxedBundle {
  bundle: BundleValidity
  extrinsicsRoot: H256
}

export type BundleValidity = BundleValidity_Invalid | BundleValidity_Valid

export interface BundleValidity_Invalid {
  __kind: 'Invalid'
  value: InvalidBundleType
}

export interface BundleValidity_Valid {
  __kind: 'Valid'
  value: H256
}

export type InvalidBundleType =
  | InvalidBundleType_IllegalTx
  | InvalidBundleType_InherentExtrinsic
  | InvalidBundleType_InvalidBundleWeight
  | InvalidBundleType_OutOfRangeTx
  | InvalidBundleType_UndecodableTx

export interface InvalidBundleType_IllegalTx {
  __kind: 'IllegalTx'
  value: number
}

export interface InvalidBundleType_InherentExtrinsic {
  __kind: 'InherentExtrinsic'
  value: number
}

export interface InvalidBundleType_InvalidBundleWeight {
  __kind: 'InvalidBundleWeight'
}

export interface InvalidBundleType_OutOfRangeTx {
  __kind: 'OutOfRangeTx'
  value: number
}

export interface InvalidBundleType_UndecodableTx {
  __kind: 'UndecodableTx'
  value: number
}

export const BlockTreeNode: sts.Type<BlockTreeNode> = sts.struct(() => {
  return {
    executionReceipt: ExecutionReceipt,
    operatorIds: sts.array(() => sts.bigint()),
  }
})

export const ExecutionReceipt: sts.Type<ExecutionReceipt> = sts.struct(() => {
  return {
    domainBlockNumber: sts.number(),
    domainBlockHash: H256,
    domainBlockExtrinsicRoot: H256,
    parentDomainBlockReceiptHash: H256,
    consensusBlockNumber: sts.number(),
    consensusBlockHash: H256,
    inboxedBundles: sts.array(() => InboxedBundle),
    finalStateRoot: H256,
    executionTrace: sts.array(() => H256),
    executionTraceRoot: H256,
    blockFees: BlockFees,
    transfers: Transfers,
  }
})

export const Transfers: sts.Type<Transfers> = sts.struct(() => {
  return {
    transfersIn: sts.array(() => sts.tuple(() => [ChainId, sts.bigint()])),
    transfersOut: sts.array(() => sts.tuple(() => [ChainId, sts.bigint()])),
    rejectedTransfersClaimed: sts.array(() => sts.tuple(() => [ChainId, sts.bigint()])),
    transfersRejected: sts.array(() => sts.tuple(() => [ChainId, sts.bigint()])),
  }
})

export const ChainId: sts.Type<ChainId> = sts.closedEnum(() => {
  return {
    Consensus: sts.unit(),
    Domain: DomainId,
  }
})

export const BlockFees: sts.Type<BlockFees> = sts.struct(() => {
  return {
    consensusStorageFee: sts.bigint(),
    domainExecutionFee: sts.bigint(),
    burnedBalance: sts.bigint(),
  }
})

export const InboxedBundle: sts.Type<InboxedBundle> = sts.struct(() => {
  return {
    bundle: BundleValidity,
    extrinsicsRoot: H256,
  }
})

export const BundleValidity: sts.Type<BundleValidity> = sts.closedEnum(() => {
  return {
    Invalid: InvalidBundleType,
    Valid: H256,
  }
})

export const InvalidBundleType: sts.Type<InvalidBundleType> = sts.closedEnum(() => {
  return {
    IllegalTx: sts.number(),
    InherentExtrinsic: sts.number(),
    InvalidBundleWeight: sts.unit(),
    OutOfRangeTx: sts.number(),
    UndecodableTx: sts.number(),
  }
})

export const H256 = sts.bytes()

export type DomainId = number

export interface DomainObject {
  ownerAccountId: AccountId32
  createdAt: number
  genesisReceiptHash: H256
  domainConfig: DomainConfig
  domainRuntimeInfo: DomainRuntimeInfo
}

export type DomainRuntimeInfo = DomainRuntimeInfo_AutoId | DomainRuntimeInfo_EVM

export interface DomainRuntimeInfo_AutoId {
  __kind: 'AutoId'
}

export interface DomainRuntimeInfo_EVM {
  __kind: 'EVM'
  chainId: bigint
}

export interface DomainConfig {
  domainName: string
  runtimeId: number
  maxBlockSize: number
  maxBlockWeight: Weight
  bundleSlotProbability: [bigint, bigint]
  targetBundlesPerBlock: number
  operatorAllowList: OperatorAllowList
  initialBalances: [MultiAccountId, bigint][]
}

export type MultiAccountId =
  | MultiAccountId_AccountId20
  | MultiAccountId_AccountId32
  | MultiAccountId_Raw

export interface MultiAccountId_AccountId20 {
  __kind: 'AccountId20'
  value: Bytes
}

export interface MultiAccountId_AccountId32 {
  __kind: 'AccountId32'
  value: Bytes
}

export interface MultiAccountId_Raw {
  __kind: 'Raw'
  value: Bytes
}

export type OperatorAllowList = OperatorAllowList_Anyone | OperatorAllowList_Operators

export interface OperatorAllowList_Anyone {
  __kind: 'Anyone'
}

export interface OperatorAllowList_Operators {
  __kind: 'Operators'
  value: AccountId32[]
}

export interface Weight {
  refTime: bigint
  proofSize: bigint
}

export const DomainObject: sts.Type<DomainObject> = sts.struct(() => {
  return {
    ownerAccountId: AccountId32,
    createdAt: sts.number(),
    genesisReceiptHash: H256,
    domainConfig: DomainConfig,
    domainRuntimeInfo: DomainRuntimeInfo,
  }
})

export const DomainRuntimeInfo: sts.Type<DomainRuntimeInfo> = sts.closedEnum(() => {
  return {
    AutoId: sts.unit(),
    EVM: sts.enumStruct({
      chainId: sts.bigint(),
    }),
  }
})

export const DomainConfig: sts.Type<DomainConfig> = sts.struct(() => {
  return {
    domainName: sts.string(),
    runtimeId: sts.number(),
    maxBlockSize: sts.number(),
    maxBlockWeight: Weight,
    bundleSlotProbability: sts.tuple(() => [sts.bigint(), sts.bigint()]),
    targetBundlesPerBlock: sts.number(),
    operatorAllowList: OperatorAllowList,
    initialBalances: sts.array(() => sts.tuple(() => [MultiAccountId, sts.bigint()])),
  }
})

export const MultiAccountId: sts.Type<MultiAccountId> = sts.closedEnum(() => {
  return {
    AccountId20: sts.bytes(),
    AccountId32: sts.bytes(),
    Raw: sts.bytes(),
  }
})

export const OperatorAllowList: sts.Type<OperatorAllowList> = sts.closedEnum(() => {
  return {
    Anyone: sts.unit(),
    Operators: sts.array(() => AccountId32),
  }
})

export const Weight: sts.Type<Weight> = sts.struct(() => {
  return {
    refTime: sts.bigint(),
    proofSize: sts.bigint(),
  }
})

export const AccountId32 = sts.bytes()

export interface RuntimeObject {
  runtimeName: string
  runtimeType: RuntimeType
  runtimeUpgrades: number
  hash: H256
  rawGenesis: RawGenesis
  version: RuntimeVersion
  createdAt: number
  updatedAt: number
}

export interface RuntimeVersion {
  specName: string
  implName: string
  authoringVersion: number
  specVersion: number
  implVersion: number
  apis: [Bytes, number][]
  transactionVersion: number
  stateVersion: number
  extrinsicStateVersion: number
}

export interface RawGenesis {
  top: [StorageKey, StorageData][]
  childrenDefault: [StorageKey, [StorageKey, StorageData][]][]
}

export type StorageData = Bytes

export type StorageKey = Bytes

export type RuntimeType = RuntimeType_AutoId | RuntimeType_Evm

export interface RuntimeType_AutoId {
  __kind: 'AutoId'
}

export interface RuntimeType_Evm {
  __kind: 'Evm'
}

export const RuntimeObject: sts.Type<RuntimeObject> = sts.struct(() => {
  return {
    runtimeName: sts.string(),
    runtimeType: RuntimeType,
    runtimeUpgrades: sts.number(),
    hash: H256,
    rawGenesis: RawGenesis,
    version: RuntimeVersion,
    createdAt: sts.number(),
    updatedAt: sts.number(),
  }
})

export const RuntimeVersion: sts.Type<RuntimeVersion> = sts.struct(() => {
  return {
    specName: sts.string(),
    implName: sts.string(),
    authoringVersion: sts.number(),
    specVersion: sts.number(),
    implVersion: sts.number(),
    apis: sts.array(() => sts.tuple(() => [sts.bytes(), sts.number()])),
    transactionVersion: sts.number(),
    stateVersion: sts.number(),
    extrinsicStateVersion: sts.number(),
  }
})

export const RawGenesis: sts.Type<RawGenesis> = sts.struct(() => {
  return {
    top: sts.array(() => sts.tuple(() => [StorageKey, StorageData])),
    childrenDefault: sts.array(() =>
      sts.tuple(() => [StorageKey, sts.array(() => sts.tuple(() => [StorageKey, StorageData]))]),
    ),
  }
})

export const StorageData = sts.bytes()

export const StorageKey = sts.bytes()

export const PermissionedActionAllowedBy: sts.Type<PermissionedActionAllowedBy> = sts.closedEnum(
  () => {
    return {
      Accounts: sts.array(() => AccountId32),
      Anyone: sts.unit(),
    }
  },
)

export const OperatorConfig: sts.Type<OperatorConfig> = sts.struct(() => {
  return {
    signingKey: sts.bytes(),
    minimumNominatorStake: sts.bigint(),
    nominationTax: Percent,
  }
})

export const Percent = sts.number()

export interface OperatorConfig {
  signingKey: Bytes
  minimumNominatorStake: bigint
  nominationTax: Percent
}

export type Percent = number

export const DomainId = sts.number()

export const FraudProof: sts.Type<FraudProof> = sts.struct(() => {
  return {
    domainId: DomainId,
    badReceiptHash: H256,
    maybeMmrProof: sts.option(() => ConsensusChainMmrLeafProof),
    maybeDomainRuntimeCodeProof: sts.option(() => DomainRuntimeCodeAt),
    proof: FraudProofVariant,
  }
})

export const FraudProofVariant: sts.Type<FraudProofVariant> = sts.closedEnum(() => {
  return {
    InvalidBlockFees: InvalidBlockFeesProof,
    InvalidBundles: InvalidBundlesProof,
    InvalidDomainBlockHash: InvalidDomainBlockHashProof,
    InvalidExtrinsicsRoot: InvalidExtrinsicsRootProof,
    InvalidStateTransition: InvalidStateTransitionProof,
    InvalidTransfers: InvalidTransfersProof,
    ValidBundle: ValidBundleProof,
  }
})

export const ValidBundleProof: sts.Type<ValidBundleProof> = sts.struct(() => {
  return {
    bundleWithProof: OpaqueBundleWithProof,
  }
})

export const OpaqueBundleWithProof: sts.Type<OpaqueBundleWithProof> = sts.struct(() => {
  return {
    bundle: Bundle,
    bundleIndex: sts.number(),
    bundleStorageProof: SuccessfulBundlesProof,
  }
})

export const SuccessfulBundlesProof: sts.Type<SuccessfulBundlesProof> = sts.struct(() => {
  return {
    trieNodes: sts.array(() => sts.bytes()),
  }
})

export interface SuccessfulBundlesProof {
  trieNodes: Bytes[]
}

export interface OpaqueBundleWithProof {
  bundle: Bundle
  bundleIndex: number
  bundleStorageProof: SuccessfulBundlesProof
}

export interface Bundle {
  sealedHeader: SealedBundleHeader
  extrinsics: OpaqueExtrinsic[]
}

export type OpaqueExtrinsic = Bytes

export interface SealedBundleHeader {
  header: BundleHeader
  signature: Bytes
}

export interface BundleHeader {
  proofOfElection: ProofOfElection
  receipt: ExecutionReceipt
  estimatedBundleWeight: Weight
  bundleExtrinsicsRoot: H256
}

export interface ProofOfElection {
  domainId: DomainId
  slotNumber: bigint
  proofOfTime: PotOutput
  vrfSignature: VrfSignature
  operatorId: bigint
  consensusBlockHash: H256
}

export interface VrfSignature {
  preOutput: Bytes
  proof: Bytes
}

export type PotOutput = Bytes

export interface ValidBundleProof {
  bundleWithProof: OpaqueBundleWithProof
}

export const InvalidTransfersProof: sts.Type<InvalidTransfersProof> = sts.struct(() => {
  return {
    storageProof: StorageProof,
  }
})

export const StorageProof: sts.Type<StorageProof> = sts.struct(() => {
  return {
    trieNodes: sts.array(() => sts.bytes()),
  }
})

export interface StorageProof {
  trieNodes: Bytes[]
}

export interface InvalidTransfersProof {
  storageProof: StorageProof
}

export const InvalidStateTransitionProof: sts.Type<InvalidStateTransitionProof> = sts.struct(() => {
  return {
    executionProof: StorageProof,
    executionPhase: ExecutionPhase,
  }
})

export const ExecutionPhase: sts.Type<ExecutionPhase> = sts.closedEnum(() => {
  return {
    ApplyExtrinsic: sts.enumStruct({
      extrinsicProof: StorageProof,
      mismatch: ApplyExtrinsicMismatch,
    }),
    FinalizeBlock: sts.enumStruct({
      mismatch: FinalizeBlockMismatch,
    }),
    InitializeBlock: sts.unit(),
  }
})

export const FinalizeBlockMismatch: sts.Type<FinalizeBlockMismatch> = sts.closedEnum(() => {
  return {
    Longer: sts.number(),
    StateRoot: sts.unit(),
  }
})

export type FinalizeBlockMismatch = FinalizeBlockMismatch_Longer | FinalizeBlockMismatch_StateRoot

export interface FinalizeBlockMismatch_Longer {
  __kind: 'Longer'
  value: number
}

export interface FinalizeBlockMismatch_StateRoot {
  __kind: 'StateRoot'
}

export const ApplyExtrinsicMismatch: sts.Type<ApplyExtrinsicMismatch> = sts.closedEnum(() => {
  return {
    Shorter: sts.unit(),
    StateRoot: sts.number(),
  }
})

export type ApplyExtrinsicMismatch =
  | ApplyExtrinsicMismatch_Shorter
  | ApplyExtrinsicMismatch_StateRoot

export interface ApplyExtrinsicMismatch_Shorter {
  __kind: 'Shorter'
}

export interface ApplyExtrinsicMismatch_StateRoot {
  __kind: 'StateRoot'
  value: number
}

export type ExecutionPhase =
  | ExecutionPhase_ApplyExtrinsic
  | ExecutionPhase_FinalizeBlock
  | ExecutionPhase_InitializeBlock

export interface ExecutionPhase_ApplyExtrinsic {
  __kind: 'ApplyExtrinsic'
  extrinsicProof: StorageProof
  mismatch: ApplyExtrinsicMismatch
}

export interface ExecutionPhase_FinalizeBlock {
  __kind: 'FinalizeBlock'
  mismatch: FinalizeBlockMismatch
}

export interface ExecutionPhase_InitializeBlock {
  __kind: 'InitializeBlock'
}

export interface InvalidStateTransitionProof {
  executionProof: StorageProof
  executionPhase: ExecutionPhase
}

export const InvalidExtrinsicsRootProof: sts.Type<InvalidExtrinsicsRootProof> = sts.struct(() => {
  return {
    validBundleDigests: sts.array(() => ValidBundleDigest),
    blockRandomnessProof: BlockRandomnessProof,
    domainInherentExtrinsicDataProof: DomainInherentExtrinsicDataProof,
  }
})

export const DomainInherentExtrinsicDataProof: sts.Type<DomainInherentExtrinsicDataProof> =
  sts.struct(() => {
    return {
      timestampProof: TimestampStorageProof,
      maybeDomainRuntimeUpgradeProof: MaybeDomainRuntimeUpgradedProof,
      dynamicCostOfStorageProof: DynamicCostOfStorageProof,
      consensusChainByteFeeProof: ConsensusTransactionByteFeeProof,
      domainChainAllowlistProof: DomainChainsAllowlistUpdateStorageProof,
    }
  })

export const DomainChainsAllowlistUpdateStorageProof: sts.Type<DomainChainsAllowlistUpdateStorageProof> =
  sts.struct(() => {
    return {
      trieNodes: sts.array(() => sts.bytes()),
    }
  })

export interface DomainChainsAllowlistUpdateStorageProof {
  trieNodes: Bytes[]
}

export const ConsensusTransactionByteFeeProof: sts.Type<ConsensusTransactionByteFeeProof> =
  sts.struct(() => {
    return {
      trieNodes: sts.array(() => sts.bytes()),
    }
  })

export interface ConsensusTransactionByteFeeProof {
  trieNodes: Bytes[]
}

export const DynamicCostOfStorageProof: sts.Type<DynamicCostOfStorageProof> = sts.struct(() => {
  return {
    trieNodes: sts.array(() => sts.bytes()),
  }
})

export interface DynamicCostOfStorageProof {
  trieNodes: Bytes[]
}

export const MaybeDomainRuntimeUpgradedProof: sts.Type<MaybeDomainRuntimeUpgradedProof> =
  sts.struct(() => {
    return {
      blockDigest: BlockDigestProof,
      newDomainRuntimeCode: sts.option(() => DomainRuntimeCodeProof),
    }
  })

export const DomainRuntimeCodeProof: sts.Type<DomainRuntimeCodeProof> = sts.struct(() => {
  return {
    trieNodes: sts.array(() => sts.bytes()),
  }
})

export interface DomainRuntimeCodeProof {
  trieNodes: Bytes[]
}

export const BlockDigestProof: sts.Type<BlockDigestProof> = sts.struct(() => {
  return {
    trieNodes: sts.array(() => sts.bytes()),
  }
})

export interface BlockDigestProof {
  trieNodes: Bytes[]
}

export interface MaybeDomainRuntimeUpgradedProof {
  blockDigest: BlockDigestProof
  newDomainRuntimeCode?: DomainRuntimeCodeProof | undefined
}

export const TimestampStorageProof: sts.Type<TimestampStorageProof> = sts.struct(() => {
  return {
    trieNodes: sts.array(() => sts.bytes()),
  }
})

export interface TimestampStorageProof {
  trieNodes: Bytes[]
}

export interface DomainInherentExtrinsicDataProof {
  timestampProof: TimestampStorageProof
  maybeDomainRuntimeUpgradeProof: MaybeDomainRuntimeUpgradedProof
  dynamicCostOfStorageProof: DynamicCostOfStorageProof
  consensusChainByteFeeProof: ConsensusTransactionByteFeeProof
  domainChainAllowlistProof: DomainChainsAllowlistUpdateStorageProof
}

export const BlockRandomnessProof: sts.Type<BlockRandomnessProof> = sts.struct(() => {
  return {
    trieNodes: sts.array(() => sts.bytes()),
  }
})

export interface BlockRandomnessProof {
  trieNodes: Bytes[]
}

export const ValidBundleDigest: sts.Type<ValidBundleDigest> = sts.struct(() => {
  return {
    bundleIndex: sts.number(),
    bundleDigest: sts.array(() =>
      sts.tuple(() => [sts.option(() => sts.bytes()), ExtrinsicDigest]),
    ),
  }
})

export const ExtrinsicDigest: sts.Type<ExtrinsicDigest> = sts.closedEnum(() => {
  return {
    Data: sts.bytes(),
    Hash: H256,
  }
})

export type ExtrinsicDigest = ExtrinsicDigest_Data | ExtrinsicDigest_Hash

export interface ExtrinsicDigest_Data {
  __kind: 'Data'
  value: Bytes
}

export interface ExtrinsicDigest_Hash {
  __kind: 'Hash'
  value: H256
}

export interface ValidBundleDigest {
  bundleIndex: number
  bundleDigest: [Bytes | undefined, ExtrinsicDigest][]
}

export interface InvalidExtrinsicsRootProof {
  validBundleDigests: ValidBundleDigest[]
  blockRandomnessProof: BlockRandomnessProof
  domainInherentExtrinsicDataProof: DomainInherentExtrinsicDataProof
}

export const InvalidDomainBlockHashProof: sts.Type<InvalidDomainBlockHashProof> = sts.struct(() => {
  return {
    digestStorageProof: StorageProof,
  }
})

export interface InvalidDomainBlockHashProof {
  digestStorageProof: StorageProof
}

export const InvalidBundlesProof: sts.Type<InvalidBundlesProof> = sts.struct(() => {
  return {
    bundleIndex: sts.number(),
    invalidBundleType: InvalidBundleType,
    isTrueInvalidFraudProof: sts.boolean(),
    proofData: InvalidBundlesProofData,
  }
})

export const InvalidBundlesProofData: sts.Type<InvalidBundlesProofData> = sts.closedEnum(() => {
  return {
    Bundle: OpaqueBundleWithProof,
    BundleAndExecution: sts.enumStruct({
      bundleWithProof: OpaqueBundleWithProof,
      executionProof: StorageProof,
    }),
    Extrinsic: StorageProof,
  }
})

export type InvalidBundlesProofData =
  | InvalidBundlesProofData_Bundle
  | InvalidBundlesProofData_BundleAndExecution
  | InvalidBundlesProofData_Extrinsic

export interface InvalidBundlesProofData_Bundle {
  __kind: 'Bundle'
  value: OpaqueBundleWithProof
}

export interface InvalidBundlesProofData_BundleAndExecution {
  __kind: 'BundleAndExecution'
  bundleWithProof: OpaqueBundleWithProof
  executionProof: StorageProof
}

export interface InvalidBundlesProofData_Extrinsic {
  __kind: 'Extrinsic'
  value: StorageProof
}

export interface InvalidBundlesProof {
  bundleIndex: number
  invalidBundleType: InvalidBundleType
  isTrueInvalidFraudProof: boolean
  proofData: InvalidBundlesProofData
}

export const InvalidBlockFeesProof: sts.Type<InvalidBlockFeesProof> = sts.struct(() => {
  return {
    storageProof: StorageProof,
  }
})

export interface InvalidBlockFeesProof {
  storageProof: StorageProof
}

export type FraudProofVariant =
  | FraudProofVariant_InvalidBlockFees
  | FraudProofVariant_InvalidBundles
  | FraudProofVariant_InvalidDomainBlockHash
  | FraudProofVariant_InvalidExtrinsicsRoot
  | FraudProofVariant_InvalidStateTransition
  | FraudProofVariant_InvalidTransfers
  | FraudProofVariant_ValidBundle

export interface FraudProofVariant_InvalidBlockFees {
  __kind: 'InvalidBlockFees'
  value: InvalidBlockFeesProof
}

export interface FraudProofVariant_InvalidBundles {
  __kind: 'InvalidBundles'
  value: InvalidBundlesProof
}

export interface FraudProofVariant_InvalidDomainBlockHash {
  __kind: 'InvalidDomainBlockHash'
  value: InvalidDomainBlockHashProof
}

export interface FraudProofVariant_InvalidExtrinsicsRoot {
  __kind: 'InvalidExtrinsicsRoot'
  value: InvalidExtrinsicsRootProof
}

export interface FraudProofVariant_InvalidStateTransition {
  __kind: 'InvalidStateTransition'
  value: InvalidStateTransitionProof
}

export interface FraudProofVariant_InvalidTransfers {
  __kind: 'InvalidTransfers'
  value: InvalidTransfersProof
}

export interface FraudProofVariant_ValidBundle {
  __kind: 'ValidBundle'
  value: ValidBundleProof
}

export const DomainRuntimeCodeAt: sts.Type<DomainRuntimeCodeAt> = sts.struct(() => {
  return {
    mmrProof: ConsensusChainMmrLeafProof,
    domainRuntimeCodeProof: DomainRuntimeCodeProof,
  }
})

export interface DomainRuntimeCodeAt {
  mmrProof: ConsensusChainMmrLeafProof
  domainRuntimeCodeProof: DomainRuntimeCodeProof
}

export interface ConsensusChainMmrLeafProof {
  consensusBlockNumber: number
  consensusBlockHash: H256
  opaqueMmrLeaf: EncodableOpaqueLeaf
  proof: Proof
}

export interface Proof {
  leafIndices: bigint[]
  leafCount: bigint
  items: H256[]
}

export type EncodableOpaqueLeaf = Bytes

export const ConsensusChainMmrLeafProof: sts.Type<ConsensusChainMmrLeafProof> = sts.struct(() => {
  return {
    consensusBlockNumber: sts.number(),
    consensusBlockHash: H256,
    opaqueMmrLeaf: EncodableOpaqueLeaf,
    proof: Proof,
  }
})

export const Proof: sts.Type<Proof> = sts.struct(() => {
  return {
    leafIndices: sts.array(() => sts.bigint()),
    leafCount: sts.bigint(),
    items: sts.array(() => H256),
  }
})

export const EncodableOpaqueLeaf = sts.bytes()

export interface FraudProof {
  domainId: DomainId
  badReceiptHash: H256
  maybeMmrProof?: ConsensusChainMmrLeafProof | undefined
  maybeDomainRuntimeCodeProof?: DomainRuntimeCodeAt | undefined
  proof: FraudProofVariant
}

export const Bundle: sts.Type<Bundle> = sts.struct(() => {
  return {
    sealedHeader: SealedBundleHeader,
    extrinsics: sts.array(() => OpaqueExtrinsic),
  }
})

export const OpaqueExtrinsic = sts.bytes()

export const SealedBundleHeader: sts.Type<SealedBundleHeader> = sts.struct(() => {
  return {
    header: BundleHeader,
    signature: sts.bytes(),
  }
})

export const BundleHeader: sts.Type<BundleHeader> = sts.struct(() => {
  return {
    proofOfElection: ProofOfElection,
    receipt: ExecutionReceipt,
    estimatedBundleWeight: Weight,
    bundleExtrinsicsRoot: H256,
  }
})

export const ProofOfElection: sts.Type<ProofOfElection> = sts.struct(() => {
  return {
    domainId: DomainId,
    slotNumber: sts.bigint(),
    proofOfTime: PotOutput,
    vrfSignature: VrfSignature,
    operatorId: sts.bigint(),
    consensusBlockHash: H256,
  }
})

export const VrfSignature: sts.Type<VrfSignature> = sts.struct(() => {
  return {
    preOutput: sts.bytes(),
    proof: sts.bytes(),
  }
})

export const PotOutput = sts.bytes()

export const SlashedReason: sts.Type<SlashedReason> = sts.closedEnum(() => {
  return {
    BadExecutionReceipt: H256,
    InvalidBundle: sts.number(),
  }
})

export type SlashedReason = SlashedReason_BadExecutionReceipt | SlashedReason_InvalidBundle

export interface SlashedReason_BadExecutionReceipt {
  __kind: 'BadExecutionReceipt'
  value: H256
}

export interface SlashedReason_InvalidBundle {
  __kind: 'InvalidBundle'
  value: number
}

export const RuntimeType: sts.Type<RuntimeType> = sts.closedEnum(() => {
  return {
    AutoId: sts.unit(),
    Evm: sts.unit(),
  }
})
