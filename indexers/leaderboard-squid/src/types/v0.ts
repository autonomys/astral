import {sts, Result, Option, Bytes, BitSequence} from './support'

export const Weight: sts.Type<Weight> = sts.struct(() => {
    return  {
        refTime: sts.bigint(),
        proofSize: sts.bigint(),
    }
})

export interface Weight {
    refTime: bigint
    proofSize: bigint
}

export const HistorySize = sts.bigint()

export interface TxRangeState {
    txRange: U256
    intervalBlocks: bigint
    intervalBundles: bigint
}

export type U256 = bigint

export const TxRangeState: sts.Type<TxRangeState> = sts.struct(() => {
    return  {
        txRange: U256,
        intervalBlocks: sts.bigint(),
        intervalBundles: sts.bigint(),
    }
})

export const U256 = sts.bigint()

export interface ElectionVerificationParams {
    operators: [bigint, bigint][]
    totalDomainStake: bigint
}

export const ElectionVerificationParams: sts.Type<ElectionVerificationParams> = sts.struct(() => {
    return  {
        operators: sts.array(() => sts.tuple(() => [sts.bigint(), sts.bigint()])),
        totalDomainStake: sts.bigint(),
    }
})

export interface BundleDigest {
    headerHash: H256
    extrinsicsRoot: H256
}

export const BundleDigest: sts.Type<BundleDigest> = sts.struct(() => {
    return  {
        headerHash: H256,
        extrinsicsRoot: H256,
    }
})

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
}

export interface BlockFees {
    consensusStorageFee: bigint
    domainExecutionFee: bigint
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

export type InvalidBundleType = InvalidBundleType_IllegalTx | InvalidBundleType_InherentExtrinsic | InvalidBundleType_InvalidXDM | InvalidBundleType_OutOfRangeTx | InvalidBundleType_UndecodableTx

export interface InvalidBundleType_IllegalTx {
    __kind: 'IllegalTx'
    value: number
}

export interface InvalidBundleType_InherentExtrinsic {
    __kind: 'InherentExtrinsic'
    value: number
}

export interface InvalidBundleType_InvalidXDM {
    __kind: 'InvalidXDM'
    value: number
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
    return  {
        executionReceipt: ExecutionReceipt,
        operatorIds: sts.array(() => sts.bigint()),
    }
})

export const ExecutionReceipt: sts.Type<ExecutionReceipt> = sts.struct(() => {
    return  {
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
    }
})

export const BlockFees: sts.Type<BlockFees> = sts.struct(() => {
    return  {
        consensusStorageFee: sts.bigint(),
        domainExecutionFee: sts.bigint(),
    }
})

export const InboxedBundle: sts.Type<InboxedBundle> = sts.struct(() => {
    return  {
        bundle: BundleValidity,
        extrinsicsRoot: H256,
    }
})

export const BundleValidity: sts.Type<BundleValidity> = sts.closedEnum(() => {
    return  {
        Invalid: InvalidBundleType,
        Valid: H256,
    }
})

export const InvalidBundleType: sts.Type<InvalidBundleType> = sts.closedEnum(() => {
    return  {
        IllegalTx: sts.number(),
        InherentExtrinsic: sts.number(),
        InvalidXDM: sts.number(),
        OutOfRangeTx: sts.number(),
        UndecodableTx: sts.number(),
    }
})

export interface DomainObject {
    ownerAccountId: AccountId32
    createdAt: number
    genesisReceiptHash: H256
    domainConfig: DomainConfig
    domainRuntimeInfo: DomainRuntimeInfo
}

export type DomainRuntimeInfo = DomainRuntimeInfo_EVM

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
}

export type OperatorAllowList = OperatorAllowList_Anyone | OperatorAllowList_Operators

export interface OperatorAllowList_Anyone {
    __kind: 'Anyone'
}

export interface OperatorAllowList_Operators {
    __kind: 'Operators'
    value: AccountId32[]
}

export const DomainObject: sts.Type<DomainObject> = sts.struct(() => {
    return  {
        ownerAccountId: AccountId32,
        createdAt: sts.number(),
        genesisReceiptHash: H256,
        domainConfig: DomainConfig,
        domainRuntimeInfo: DomainRuntimeInfo,
    }
})

export const DomainRuntimeInfo: sts.Type<DomainRuntimeInfo> = sts.closedEnum(() => {
    return  {
        EVM: sts.enumStruct({
            chainId: sts.bigint(),
        }),
    }
})

export interface Withdrawal {
    totalWithdrawalAmount: bigint
    withdrawals: [DomainId, number, bigint][]
    withdrawalInShares?: ([DomainEpoch, number, bigint] | undefined)
}

export const Withdrawal: sts.Type<Withdrawal> = sts.struct(() => {
    return  {
        totalWithdrawalAmount: sts.bigint(),
        withdrawals: sts.array(() => sts.tuple(() => [DomainId, sts.number(), sts.bigint()])),
        withdrawalInShares: sts.option(() => sts.tuple(() => [DomainEpoch, sts.number(), sts.bigint()])),
    }
})

export interface Deposit {
    known: KnownDeposit
    pending?: (PendingDeposit | undefined)
}

export interface PendingDeposit {
    effectiveDomainEpoch: DomainEpoch
    amount: bigint
}

export interface KnownDeposit {
    shares: bigint
}

export const Deposit: sts.Type<Deposit> = sts.struct(() => {
    return  {
        known: KnownDeposit,
        pending: sts.option(() => PendingDeposit),
    }
})

export const PendingDeposit: sts.Type<PendingDeposit> = sts.struct(() => {
    return  {
        effectiveDomainEpoch: DomainEpoch,
        amount: sts.bigint(),
    }
})

export const KnownDeposit: sts.Type<KnownDeposit> = sts.struct(() => {
    return  {
        shares: sts.bigint(),
    }
})

export type DomainEpoch = [DomainId, number]

export type SharePrice = number

export const SharePrice = sts.number()

export const DomainEpoch = sts.tuple(() => [DomainId, sts.number()])

export interface Operator {
    signingKey: Bytes
    currentDomainId: DomainId
    nextDomainId: DomainId
    minimumNominatorStake: bigint
    nominationTax: Percent
    currentTotalStake: bigint
    currentEpochRewards: bigint
    currentTotalShares: bigint
    status: OperatorStatus
    depositsInEpoch: bigint
    withdrawalsInEpoch: bigint
}

export type OperatorStatus = OperatorStatus_Deregistered | OperatorStatus_Registered | OperatorStatus_Slashed

export interface OperatorStatus_Deregistered {
    __kind: 'Deregistered'
    value: OperatorDeregisteredInfo
}

export interface OperatorStatus_Registered {
    __kind: 'Registered'
}

export interface OperatorStatus_Slashed {
    __kind: 'Slashed'
}

export interface OperatorDeregisteredInfo {
    domainEpoch: DomainEpoch
    unlockAtConfirmedDomainBlockNumber: number
}

export type Percent = number

export const Operator: sts.Type<Operator> = sts.struct(() => {
    return  {
        signingKey: sts.bytes(),
        currentDomainId: DomainId,
        nextDomainId: DomainId,
        minimumNominatorStake: sts.bigint(),
        nominationTax: Percent,
        currentTotalStake: sts.bigint(),
        currentEpochRewards: sts.bigint(),
        currentTotalShares: sts.bigint(),
        status: OperatorStatus,
        depositsInEpoch: sts.bigint(),
        withdrawalsInEpoch: sts.bigint(),
    }
})

export const OperatorStatus: sts.Type<OperatorStatus> = sts.closedEnum(() => {
    return  {
        Deregistered: OperatorDeregisteredInfo,
        Registered: sts.unit(),
        Slashed: sts.unit(),
    }
})

export const OperatorDeregisteredInfo: sts.Type<OperatorDeregisteredInfo> = sts.struct(() => {
    return  {
        domainEpoch: DomainEpoch,
        unlockAtConfirmedDomainBlockNumber: sts.number(),
    }
})

export const Percent = sts.number()

export interface StakingSummary {
    currentEpochIndex: number
    currentTotalStake: bigint
    currentOperators: [bigint, bigint][]
    nextOperators: bigint[]
    currentEpochRewards: [bigint, bigint][]
}

export const StakingSummary: sts.Type<StakingSummary> = sts.struct(() => {
    return  {
        currentEpochIndex: sts.number(),
        currentTotalStake: sts.bigint(),
        currentOperators: sts.array(() => sts.tuple(() => [sts.bigint(), sts.bigint()])),
        nextOperators: sts.array(() => sts.bigint()),
        currentEpochRewards: sts.array(() => sts.tuple(() => [sts.bigint(), sts.bigint()])),
    }
})

export interface ScheduledRuntimeUpgrade {
    rawGenesis: RawGenesis
    version: RuntimeVersion
    hash: H256
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

export const ScheduledRuntimeUpgrade: sts.Type<ScheduledRuntimeUpgrade> = sts.struct(() => {
    return  {
        rawGenesis: RawGenesis,
        version: RuntimeVersion,
        hash: H256,
    }
})

export const RuntimeVersion: sts.Type<RuntimeVersion> = sts.struct(() => {
    return  {
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
    return  {
        top: sts.array(() => sts.tuple(() => [StorageKey, StorageData])),
        childrenDefault: sts.array(() => sts.tuple(() => [StorageKey, sts.array(() => sts.tuple(() => [StorageKey, StorageData]))])),
    }
})

export const StorageData = sts.bytes()

export const StorageKey = sts.bytes()

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

export type RuntimeType = RuntimeType_Evm

export interface RuntimeType_Evm {
    __kind: 'Evm'
}

export const RuntimeObject: sts.Type<RuntimeObject> = sts.struct(() => {
    return  {
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

export type DomainId = number

export type H256 = Bytes

export interface CollectedFees {
    storage: bigint
    compute: bigint
    tips: bigint
}

export const CollectedFees: sts.Type<CollectedFees> = sts.struct(() => {
    return  {
        storage: sts.bigint(),
        compute: sts.bigint(),
        tips: sts.bigint(),
    }
})

export interface BlockTransactionByteFee {
    current: bigint
    next: bigint
}

export const BlockTransactionByteFee: sts.Type<BlockTransactionByteFee> = sts.struct(() => {
    return  {
        current: sts.bigint(),
        next: sts.bigint(),
    }
})

export type Randomness = Bytes

export const Randomness = sts.bytes()

export interface PotEntropyValue {
    targetSlot?: (Slot | undefined)
    entropy: Bytes
}

export const PotEntropyValue: sts.Type<PotEntropyValue> = sts.struct(() => {
    return  {
        targetSlot: sts.option(() => Slot),
        entropy: sts.bytes(),
    }
})

export type Signature = Bytes

export const Signature = sts.bytes()

export type AccountId32 = Bytes

export interface Scalar {
    inner: Bytes
}

export type PieceOffset = number

export const Scalar: sts.Type<Scalar> = sts.struct(() => {
    return  {
        inner: sts.bytes(),
    }
})

export const PieceOffset = sts.number()

export interface VoteVerificationData {
    solutionRange: bigint
    voteSolutionRange: bigint
    currentSlot: Slot
    parentSlot: Slot
}

export const VoteVerificationData: sts.Type<VoteVerificationData> = sts.struct(() => {
    return  {
        solutionRange: sts.bigint(),
        voteSolutionRange: sts.bigint(),
        currentSlot: Slot,
        parentSlot: Slot,
    }
})

export type SegmentIndex = bigint

export type SegmentCommitment = Bytes

export const SegmentCommitment = sts.bytes()

export const SegmentIndex = sts.bigint()

export type Public = Bytes

export interface SolutionRangeOverride {
    solutionRange: bigint
    votingSolutionRange: bigint
}

export const SolutionRangeOverride: sts.Type<SolutionRangeOverride> = sts.struct(() => {
    return  {
        solutionRange: sts.bigint(),
        votingSolutionRange: sts.bigint(),
    }
})

export interface SolutionRanges {
    current: bigint
    next?: (bigint | undefined)
    votingCurrent: bigint
    votingNext?: (bigint | undefined)
}

export const SolutionRanges: sts.Type<SolutionRanges> = sts.struct(() => {
    return  {
        current: sts.bigint(),
        next: sts.option(() => sts.bigint()),
        votingCurrent: sts.bigint(),
        votingNext: sts.option(() => sts.bigint()),
    }
})

export type NonZeroU32 = number

export const NonZeroU32 = sts.number()

export type Slot = bigint

export const Slot = sts.bigint()

export const OperatorAllowList: sts.Type<OperatorAllowList> = sts.closedEnum(() => {
    return  {
        Anyone: sts.unit(),
        Operators: sts.array(() => AccountId32),
    }
})

export const DomainConfig: sts.Type<DomainConfig> = sts.struct(() => {
    return  {
        domainName: sts.string(),
        runtimeId: sts.number(),
        maxBlockSize: sts.number(),
        maxBlockWeight: Weight,
        bundleSlotProbability: sts.tuple(() => [sts.bigint(), sts.bigint()]),
        targetBundlesPerBlock: sts.number(),
        operatorAllowList: OperatorAllowList,
    }
})

export const OperatorConfig: sts.Type<OperatorConfig> = sts.struct(() => {
    return  {
        signingKey: sts.bytes(),
        minimumNominatorStake: sts.bigint(),
        nominationTax: Percent,
    }
})

export interface OperatorConfig {
    signingKey: Bytes
    minimumNominatorStake: bigint
    nominationTax: Percent
}

export const FraudProof: sts.Type<FraudProof> = sts.closedEnum(() => {
    return  {
        BundleEquivocation: BundleEquivocationProof,
        ImproperTransactionSortition: ImproperTransactionSortitionProof,
        InvalidBlockFees: InvalidBlockFeesProof,
        InvalidBundles: InvalidBundlesFraudProof,
        InvalidDomainBlockHash: InvalidDomainBlockHashProof,
        InvalidExtrinsicsRoot: InvalidExtrinsicsRootProof,
        InvalidStateTransition: InvalidStateTransitionProof,
        InvalidTransaction: InvalidTransactionProof,
        ValidBundle: ValidBundleProof,
    }
})

export const ValidBundleProof: sts.Type<ValidBundleProof> = sts.struct(() => {
    return  {
        domainId: DomainId,
        badReceiptHash: H256,
        bundleIndex: sts.number(),
    }
})

export interface ValidBundleProof {
    domainId: DomainId
    badReceiptHash: H256
    bundleIndex: number
}

export const InvalidTransactionProof: sts.Type<InvalidTransactionProof> = sts.struct(() => {
    return  {
        domainId: DomainId,
        badReceiptHash: H256,
        domainBlockNumber: sts.number(),
        domainBlockHash: H256,
        invalidExtrinsic: sts.bytes(),
        storageProof: StorageProof,
    }
})

export const StorageProof: sts.Type<StorageProof> = sts.struct(() => {
    return  {
        trieNodes: sts.array(() => sts.bytes()),
    }
})

export interface StorageProof {
    trieNodes: Bytes[]
}

export interface InvalidTransactionProof {
    domainId: DomainId
    badReceiptHash: H256
    domainBlockNumber: number
    domainBlockHash: H256
    invalidExtrinsic: Bytes
    storageProof: StorageProof
}

export const InvalidStateTransitionProof: sts.Type<InvalidStateTransitionProof> = sts.struct(() => {
    return  {
        domainId: DomainId,
        badReceiptHash: H256,
        proof: StorageProof,
        executionPhase: ExecutionPhase,
    }
})

export const ExecutionPhase: sts.Type<ExecutionPhase> = sts.closedEnum(() => {
    return  {
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
    return  {
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
    return  {
        Shorter: sts.unit(),
        StateRoot: sts.number(),
    }
})

export type ApplyExtrinsicMismatch = ApplyExtrinsicMismatch_Shorter | ApplyExtrinsicMismatch_StateRoot

export interface ApplyExtrinsicMismatch_Shorter {
    __kind: 'Shorter'
}

export interface ApplyExtrinsicMismatch_StateRoot {
    __kind: 'StateRoot'
    value: number
}

export type ExecutionPhase = ExecutionPhase_ApplyExtrinsic | ExecutionPhase_FinalizeBlock | ExecutionPhase_InitializeBlock

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
    domainId: DomainId
    badReceiptHash: H256
    proof: StorageProof
    executionPhase: ExecutionPhase
}

export const InvalidExtrinsicsRootProof: sts.Type<InvalidExtrinsicsRootProof> = sts.struct(() => {
    return  {
        domainId: DomainId,
        badReceiptHash: H256,
        validBundleDigests: sts.array(() => ValidBundleDigest),
    }
})

export const ValidBundleDigest: sts.Type<ValidBundleDigest> = sts.struct(() => {
    return  {
        bundleIndex: sts.number(),
        bundleDigest: sts.array(() => sts.tuple(() => [sts.option(() => sts.bytes()), ExtrinsicDigest])),
    }
})

export const ExtrinsicDigest: sts.Type<ExtrinsicDigest> = sts.closedEnum(() => {
    return  {
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
    bundleDigest: [(Bytes | undefined), ExtrinsicDigest][]
}

export interface InvalidExtrinsicsRootProof {
    domainId: DomainId
    badReceiptHash: H256
    validBundleDigests: ValidBundleDigest[]
}

export const InvalidDomainBlockHashProof: sts.Type<InvalidDomainBlockHashProof> = sts.struct(() => {
    return  {
        domainId: DomainId,
        badReceiptHash: H256,
        digestStorageProof: StorageProof,
    }
})

export interface InvalidDomainBlockHashProof {
    domainId: DomainId
    badReceiptHash: H256
    digestStorageProof: StorageProof
}

export const InvalidBundlesFraudProof: sts.Type<InvalidBundlesFraudProof> = sts.struct(() => {
    return  {
        badReceiptHash: H256,
        domainId: DomainId,
        bundleIndex: sts.number(),
        invalidBundleType: InvalidBundleType,
        proofData: StorageProof,
        isTrueInvalidFraudProof: sts.boolean(),
    }
})

export interface InvalidBundlesFraudProof {
    badReceiptHash: H256
    domainId: DomainId
    bundleIndex: number
    invalidBundleType: InvalidBundleType
    proofData: StorageProof
    isTrueInvalidFraudProof: boolean
}

export const InvalidBlockFeesProof: sts.Type<InvalidBlockFeesProof> = sts.struct(() => {
    return  {
        domainId: DomainId,
        badReceiptHash: H256,
        storageProof: StorageProof,
    }
})

export interface InvalidBlockFeesProof {
    domainId: DomainId
    badReceiptHash: H256
    storageProof: StorageProof
}

export const ImproperTransactionSortitionProof: sts.Type<ImproperTransactionSortitionProof> = sts.struct(() => {
    return  {
        domainId: DomainId,
        badReceiptHash: H256,
    }
})

export interface ImproperTransactionSortitionProof {
    domainId: DomainId
    badReceiptHash: H256
}

export const BundleEquivocationProof: sts.Type<BundleEquivocationProof> = sts.struct(() => {
    return  {
        domainId: DomainId,
        slot: Slot,
        firstHeader: SealedBundleHeader,
        secondHeader: SealedBundleHeader,
    }
})

export const SealedBundleHeader: sts.Type<SealedBundleHeader> = sts.struct(() => {
    return  {
        header: BundleHeader,
        signature: sts.bytes(),
    }
})

export const BundleHeader: sts.Type<BundleHeader> = sts.struct(() => {
    return  {
        proofOfElection: ProofOfElection,
        receipt: ExecutionReceipt,
        bundleSize: sts.number(),
        estimatedBundleWeight: Weight,
        bundleExtrinsicsRoot: H256,
    }
})

export const ProofOfElection: sts.Type<ProofOfElection> = sts.struct(() => {
    return  {
        domainId: DomainId,
        slotNumber: sts.bigint(),
        globalRandomness: Randomness,
        vrfSignature: VrfSignature,
        operatorId: sts.bigint(),
        consensusBlockHash: H256,
    }
})

export const VrfSignature: sts.Type<VrfSignature> = sts.struct(() => {
    return  {
        preOutput: sts.bytes(),
        proof: sts.bytes(),
    }
})

export interface VrfSignature {
    preOutput: Bytes
    proof: Bytes
}

export interface ProofOfElection {
    domainId: DomainId
    slotNumber: bigint
    globalRandomness: Randomness
    vrfSignature: VrfSignature
    operatorId: bigint
    consensusBlockHash: H256
}

export interface BundleHeader {
    proofOfElection: ProofOfElection
    receipt: ExecutionReceipt
    bundleSize: number
    estimatedBundleWeight: Weight
    bundleExtrinsicsRoot: H256
}

export interface SealedBundleHeader {
    header: BundleHeader
    signature: Bytes
}

export interface BundleEquivocationProof {
    domainId: DomainId
    slot: Slot
    firstHeader: SealedBundleHeader
    secondHeader: SealedBundleHeader
}

export type FraudProof = FraudProof_BundleEquivocation | FraudProof_ImproperTransactionSortition | FraudProof_InvalidBlockFees | FraudProof_InvalidBundles | FraudProof_InvalidDomainBlockHash | FraudProof_InvalidExtrinsicsRoot | FraudProof_InvalidStateTransition | FraudProof_InvalidTransaction | FraudProof_ValidBundle

export interface FraudProof_BundleEquivocation {
    __kind: 'BundleEquivocation'
    value: BundleEquivocationProof
}

export interface FraudProof_ImproperTransactionSortition {
    __kind: 'ImproperTransactionSortition'
    value: ImproperTransactionSortitionProof
}

export interface FraudProof_InvalidBlockFees {
    __kind: 'InvalidBlockFees'
    value: InvalidBlockFeesProof
}

export interface FraudProof_InvalidBundles {
    __kind: 'InvalidBundles'
    value: InvalidBundlesFraudProof
}

export interface FraudProof_InvalidDomainBlockHash {
    __kind: 'InvalidDomainBlockHash'
    value: InvalidDomainBlockHashProof
}

export interface FraudProof_InvalidExtrinsicsRoot {
    __kind: 'InvalidExtrinsicsRoot'
    value: InvalidExtrinsicsRootProof
}

export interface FraudProof_InvalidStateTransition {
    __kind: 'InvalidStateTransition'
    value: InvalidStateTransitionProof
}

export interface FraudProof_InvalidTransaction {
    __kind: 'InvalidTransaction'
    value: InvalidTransactionProof
}

export interface FraudProof_ValidBundle {
    __kind: 'ValidBundle'
    value: ValidBundleProof
}

export const Bundle: sts.Type<Bundle> = sts.struct(() => {
    return  {
        sealedHeader: SealedBundleHeader,
        extrinsics: sts.array(() => OpaqueExtrinsic),
    }
})

export const OpaqueExtrinsic = sts.bytes()

export interface Bundle {
    sealedHeader: SealedBundleHeader
    extrinsics: OpaqueExtrinsic[]
}

export type OpaqueExtrinsic = Bytes

export const EnableRewardsAt: sts.Type<EnableRewardsAt> = sts.closedEnum(() => {
    return  {
        Height: sts.option(() => sts.number()),
        Manually: sts.unit(),
        SolutionRange: sts.bigint(),
    }
})

export type EnableRewardsAt = EnableRewardsAt_Height | EnableRewardsAt_Manually | EnableRewardsAt_SolutionRange

export interface EnableRewardsAt_Height {
    __kind: 'Height'
    value?: (number | undefined)
}

export interface EnableRewardsAt_Manually {
    __kind: 'Manually'
}

export interface EnableRewardsAt_SolutionRange {
    __kind: 'SolutionRange'
    value: bigint
}

export const SignedVote: sts.Type<SignedVote> = sts.struct(() => {
    return  {
        vote: Vote,
        signature: Signature,
    }
})

export const Vote: sts.Type<Vote> = sts.closedEnum(() => {
    return  {
        V0: sts.enumStruct({
            height: sts.number(),
            parentHash: H256,
            slot: Slot,
            solution: Solution,
            proofOfTime: PotOutput,
            futureProofOfTime: PotOutput,
        }),
    }
})

export const PotOutput = sts.bytes()

export const Solution: sts.Type<Solution> = sts.struct(() => {
    return  {
        publicKey: Public,
        rewardAddress: AccountId32,
        sectorIndex: sts.number(),
        historySize: HistorySize,
        pieceOffset: PieceOffset,
        recordCommitment: RecordCommitment,
        recordWitness: RecordWitness,
        chunk: Scalar,
        chunkWitness: ChunkWitness,
        proofOfSpace: PosProof,
    }
})

export const PosProof = sts.bytes()

export const ChunkWitness = sts.bytes()

export const RecordWitness = sts.bytes()

export const RecordCommitment = sts.bytes()

export interface Solution {
    publicKey: Public
    rewardAddress: AccountId32
    sectorIndex: number
    historySize: HistorySize
    pieceOffset: PieceOffset
    recordCommitment: RecordCommitment
    recordWitness: RecordWitness
    chunk: Scalar
    chunkWitness: ChunkWitness
    proofOfSpace: PosProof
}

export type PosProof = Bytes

export type ChunkWitness = Bytes

export type RecordWitness = Bytes

export type RecordCommitment = Bytes

export type HistorySize = bigint

export type Vote = Vote_V0

export interface Vote_V0 {
    __kind: 'V0'
    height: number
    parentHash: H256
    slot: Slot
    solution: Solution
    proofOfTime: PotOutput
    futureProofOfTime: PotOutput
}

export type PotOutput = Bytes

export interface SignedVote {
    vote: Vote
    signature: Signature
}

export const EquivocationProof: sts.Type<EquivocationProof> = sts.struct(() => {
    return  {
        offender: Public,
        slot: Slot,
        firstHeader: Header,
        secondHeader: Header,
    }
})

export const Header: sts.Type<Header> = sts.struct(() => {
    return  {
        parentHash: H256,
        number: sts.number(),
        stateRoot: H256,
        extrinsicsRoot: H256,
        digest: Digest,
    }
})

export const Digest: sts.Type<Digest> = sts.struct(() => {
    return  {
        logs: sts.array(() => DigestItem),
    }
})

export const DigestItem: sts.Type<DigestItem> = sts.closedEnum(() => {
    return  {
        Consensus: sts.tuple(() => [sts.bytes(), sts.bytes()]),
        Other: sts.bytes(),
        PreRuntime: sts.tuple(() => [sts.bytes(), sts.bytes()]),
        RuntimeEnvironmentUpdated: sts.unit(),
        Seal: sts.tuple(() => [sts.bytes(), sts.bytes()]),
    }
})

export type DigestItem = DigestItem_Consensus | DigestItem_Other | DigestItem_PreRuntime | DigestItem_RuntimeEnvironmentUpdated | DigestItem_Seal

export interface DigestItem_Consensus {
    __kind: 'Consensus'
    value: [Bytes, Bytes]
}

export interface DigestItem_Other {
    __kind: 'Other'
    value: Bytes
}

export interface DigestItem_PreRuntime {
    __kind: 'PreRuntime'
    value: [Bytes, Bytes]
}

export interface DigestItem_RuntimeEnvironmentUpdated {
    __kind: 'RuntimeEnvironmentUpdated'
}

export interface DigestItem_Seal {
    __kind: 'Seal'
    value: [Bytes, Bytes]
}

export interface Digest {
    logs: DigestItem[]
}

export interface Header {
    parentHash: H256
    number: number
    stateRoot: H256
    extrinsicsRoot: H256
    digest: Digest
}

export interface EquivocationProof {
    offender: Public
    slot: Slot
    firstHeader: Header
    secondHeader: Header
}

export const SlashedReason: sts.Type<SlashedReason> = sts.closedEnum(() => {
    return  {
        BadExecutionReceipt: H256,
        BundleEquivocation: Slot,
        InvalidBundle: sts.number(),
    }
})

export type SlashedReason = SlashedReason_BadExecutionReceipt | SlashedReason_BundleEquivocation | SlashedReason_InvalidBundle

export interface SlashedReason_BadExecutionReceipt {
    __kind: 'BadExecutionReceipt'
    value: H256
}

export interface SlashedReason_BundleEquivocation {
    __kind: 'BundleEquivocation'
    value: Slot
}

export interface SlashedReason_InvalidBundle {
    __kind: 'InvalidBundle'
    value: number
}

export const RuntimeType: sts.Type<RuntimeType> = sts.closedEnum(() => {
    return  {
        Evm: sts.unit(),
    }
})

export const DomainId = sts.number()

export const H256 = sts.bytes()

export const AccountId32 = sts.bytes()

export const Public = sts.bytes()

export const SegmentHeader: sts.Type<SegmentHeader> = sts.closedEnum(() => {
    return  {
        V0: sts.enumStruct({
            segmentIndex: SegmentIndex,
            segmentCommitment: SegmentCommitment,
            prevSegmentHeaderHash: sts.bytes(),
            lastArchivedBlock: LastArchivedBlock,
        }),
    }
})

export const LastArchivedBlock: sts.Type<LastArchivedBlock> = sts.struct(() => {
    return  {
        number: sts.number(),
        archivedProgress: ArchivedBlockProgress,
    }
})

export const ArchivedBlockProgress: sts.Type<ArchivedBlockProgress> = sts.closedEnum(() => {
    return  {
        Complete: sts.unit(),
        Partial: sts.number(),
    }
})

export type ArchivedBlockProgress = ArchivedBlockProgress_Complete | ArchivedBlockProgress_Partial

export interface ArchivedBlockProgress_Complete {
    __kind: 'Complete'
}

export interface ArchivedBlockProgress_Partial {
    __kind: 'Partial'
    value: number
}

export interface LastArchivedBlock {
    number: number
    archivedProgress: ArchivedBlockProgress
}

export type SegmentHeader = SegmentHeader_V0

export interface SegmentHeader_V0 {
    __kind: 'V0'
    segmentIndex: SegmentIndex
    segmentCommitment: SegmentCommitment
    prevSegmentHeaderHash: Bytes
    lastArchivedBlock: LastArchivedBlock
}
