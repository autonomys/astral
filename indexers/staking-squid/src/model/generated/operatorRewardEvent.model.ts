import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_, DateTimeColumn as DateTimeColumn_, IntColumn as IntColumn_, StringColumn as StringColumn_, BigIntColumn as BigIntColumn_} from "@subsquid/typeorm-store"
import {Operator} from "./operator.model"

@Entity_()
export class OperatorRewardEvent {
    constructor(props?: Partial<OperatorRewardEvent>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_()
    @ManyToOne_(() => Operator, {nullable: true})
    operator!: Operator

    @Index_()
    @DateTimeColumn_({nullable: false})
    timestamp!: Date

    @Index_()
    @IntColumn_({nullable: false})
    blockNumber!: number

    @Index_()
    @StringColumn_({nullable: false})
    extrinsicHash!: string

    @BigIntColumn_({nullable: false})
    amount!: bigint
}
