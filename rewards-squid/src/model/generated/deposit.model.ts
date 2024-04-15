import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, Index as Index_, ManyToOne as ManyToOne_} from "typeorm"
import * as marshal from "./marshal"
import {Operator} from "./operator.model"
import {Nominator} from "./nominator.model"

@Entity_()
export class Deposit {
    constructor(props?: Partial<Deposit>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_()
    @Column_("int4", {nullable: false})
    blockNumber!: number

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: true})
    amount!: bigint | undefined | null

    @Index_()
    @ManyToOne_(() => Operator, {nullable: true})
    operator!: Operator

    @Index_()
    @ManyToOne_(() => Nominator, {nullable: true})
    nominator!: Nominator

    @Column_("text", {nullable: false})
    nominatorAccount!: string

    @Index_()
    @Column_("timestamp with time zone", {nullable: false})
    timestamp!: Date

    @Index_()
    @Column_("text", {nullable: true})
    extrinsicHash!: string | undefined | null
}
