import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_, BigIntColumn as BigIntColumn_, IntColumn as IntColumn_} from "@subsquid/typeorm-store"
import {Operator} from "./operator.model"

@Entity_()
export class OperatorFeesEarned {
    constructor(props?: Partial<OperatorFeesEarned>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_()
    @ManyToOne_(() => Operator, {nullable: true})
    operator!: Operator

    @BigIntColumn_({nullable: false})
    amount!: bigint

    @IntColumn_({nullable: false})
    updatedAt!: number
}
