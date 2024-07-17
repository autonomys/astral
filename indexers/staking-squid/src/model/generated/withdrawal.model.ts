import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, Index as Index_, StringColumn as StringColumn_, BigIntColumn as BigIntColumn_, ManyToOne as ManyToOne_, DateTimeColumn as DateTimeColumn_} from "@subsquid/typeorm-store"
import {Operator} from "./operator.model"
import {Nominator} from "./nominator.model"
import {WithdrawalStatus} from "./_withdrawalStatus"

@Entity_()
export class Withdrawal {
    constructor(props?: Partial<Withdrawal>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_()
    @IntColumn_({nullable: false})
    blockNumber!: number

    @Index_()
    @StringColumn_({nullable: false})
    account!: string

    @BigIntColumn_({nullable: false})
    shares!: bigint

    @Index_()
    @ManyToOne_(() => Operator, {nullable: true})
    operator!: Operator

    @Index_()
    @ManyToOne_(() => Nominator, {nullable: true})
    nominator!: Nominator

    @Index_()
    @DateTimeColumn_({nullable: false})
    timestamp!: Date

    @Index_()
    @StringColumn_({nullable: false})
    extrinsicHash!: string

    @Index_()
    @Column_("varchar", {length: 8, nullable: false})
    status!: WithdrawalStatus
}
