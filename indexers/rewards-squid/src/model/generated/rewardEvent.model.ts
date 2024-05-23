import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, Index as Index_, ManyToOne as ManyToOne_} from "typeorm"
import * as marshal from "./marshal"
import {Account} from "./account.model"

@Entity_()
export class RewardEvent {
    constructor(props?: Partial<RewardEvent>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Column_("int4", {nullable: false})
    indexInBlock!: number

    @Column_("text", {nullable: false})
    name!: string

    @Index_()
    @Column_("timestamp with time zone", {nullable: false})
    timestamp!: Date

    @Index_()
    @Column_("int4", {nullable: false})
    blockNumber!: number

    @Index_()
    @Column_("text", {nullable: true})
    extrinsicHash!: string | undefined | null

    @Index_()
    @ManyToOne_(() => Account, {nullable: true})
    account!: Account

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: true})
    amount!: bigint | undefined | null
}
