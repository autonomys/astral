import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, StringColumn as StringColumn_, Index as Index_, ManyToOne as ManyToOne_, BigIntColumn as BigIntColumn_, OneToMany as OneToMany_, IntColumn as IntColumn_} from "@subsquid/typeorm-store"
import {Operator} from "./operator.model"
import {Deposit} from "./deposit.model"
import {Withdrawal} from "./withdrawal.model"
import {NominatorStatus} from "./_nominatorStatus"

@Entity_()
export class Nominator {
    constructor(props?: Partial<Nominator>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_()
    @StringColumn_({nullable: false})
    account!: string

    @Index_()
    @ManyToOne_(() => Operator, {nullable: true})
    operator!: Operator

    @BigIntColumn_({nullable: false})
    shares!: bigint

    @OneToMany_(() => Deposit, e => e.nominator)
    deposits!: Deposit[]

    @OneToMany_(() => Withdrawal, e => e.nominator)
    withdrawals!: Withdrawal[]

    @Index_()
    @Column_("varchar", {length: 12, nullable: false})
    status!: NominatorStatus

    @Index_()
    @IntColumn_({nullable: true})
    createdAt!: number | undefined | null

    @Index_()
    @IntColumn_({nullable: true})
    updatedAt!: number | undefined | null
}
