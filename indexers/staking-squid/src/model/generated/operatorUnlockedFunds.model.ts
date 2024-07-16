import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, Index as Index_, ManyToOne as ManyToOne_, StringColumn as StringColumn_, DateTimeColumn as DateTimeColumn_, BigIntColumn as BigIntColumn_} from "@subsquid/typeorm-store"
import {Operator} from "./operator.model"
import {Nominator} from "./nominator.model"

@Entity_()
export class OperatorUnlockedFunds {
    constructor(props?: Partial<OperatorUnlockedFunds>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_()
    @IntColumn_({nullable: false})
    blockNumber!: number

    @Index_()
    @ManyToOne_(() => Operator, {nullable: true})
    operator!: Operator

    @Index_()
    @ManyToOne_(() => Nominator, {nullable: true})
    nominator!: Nominator

    @StringColumn_({nullable: false})
    nominatorAccount!: string

    @Index_()
    @DateTimeColumn_({nullable: false})
    timestamp!: Date

    @Index_()
    @StringColumn_({nullable: false})
    extrinsicHash!: string

    @BigIntColumn_({nullable: false})
    amount!: bigint
}
