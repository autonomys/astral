import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, Index as Index_, StringColumn as StringColumn_, BigIntColumn as BigIntColumn_, OneToMany as OneToMany_} from "@subsquid/typeorm-store"
import {Deposit} from "./deposit.model"
import {Nominator} from "./nominator.model"
import {Withdrawal} from "./withdrawal.model"
import {OperatorRewardEvent} from "./operatorRewardEvent.model"
import {OperatorFeesEarned} from "./operatorFeesEarned.model"
import {OperatorStatus} from "./_operatorStatus"

@Entity_()
export class Operator {
    constructor(props?: Partial<Operator>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_()
    @IntColumn_({nullable: false})
    domainId!: number

    @Index_()
    @IntColumn_({nullable: false})
    operatorId!: number

    @Index_()
    @StringColumn_({nullable: false})
    signingKey!: string

    @Index_()
    @StringColumn_({nullable: false})
    operatorOwner!: string

    @BigIntColumn_({nullable: false})
    minimumNominatorStake!: bigint

    @IntColumn_({nullable: false})
    nominationTax!: number

    @BigIntColumn_({nullable: false})
    taxCollected!: bigint

    @BigIntColumn_({nullable: false})
    pendingTotalStake!: bigint

    @BigIntColumn_({nullable: false})
    pendingStorageFeeDeposit!: bigint

    @BigIntColumn_({nullable: false})
    currentTotalStake!: bigint

    @BigIntColumn_({nullable: false})
    currentStorageFeeDeposit!: bigint

    @BigIntColumn_({nullable: false})
    currentEpochRewards!: bigint

    @BigIntColumn_({nullable: false})
    currentTotalShares!: bigint

    @OneToMany_(() => Deposit, e => e.operator)
    deposits!: Deposit[]

    @OneToMany_(() => Nominator, e => e.operator)
    nominators!: Nominator[]

    @OneToMany_(() => Withdrawal, e => e.operator)
    withdrawals!: Withdrawal[]

    @OneToMany_(() => OperatorRewardEvent, e => e.operator)
    operatorRewards!: OperatorRewardEvent[]

    @OneToMany_(() => OperatorFeesEarned, e => e.operator)
    operatorFees!: OperatorFeesEarned[]

    @Index_()
    @Column_("varchar", {length: 12, nullable: false})
    status!: OperatorStatus

    @IntColumn_({nullable: false})
    depositsCount!: number

    @IntColumn_({nullable: false})
    nominatorsCount!: number

    @IntColumn_({nullable: false})
    withdrawalsCount!: number

    @IntColumn_({nullable: false})
    bundleCount!: number

    @IntColumn_({nullable: false})
    lastBundleAt!: number

    @Index_()
    @IntColumn_({nullable: true})
    createdAt!: number | undefined | null

    @Index_()
    @IntColumn_({nullable: true})
    updatedAt!: number | undefined | null
}
