import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, Index as Index_, ManyToOne as ManyToOne_} from "typeorm"
import * as marshal from "./marshal"
import {Block} from "./block.model"
import {Extrinsic} from "./extrinsic.model"
import {Call} from "./call.model"
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

    @Column_("text", {nullable: false})
    phase!: string

    @Column_("int4", {nullable: true})
    pos!: number | undefined | null

    @Index_()
    @ManyToOne_(() => Block, {nullable: true})
    block!: Block | undefined | null

    @Index_()
    @ManyToOne_(() => Extrinsic, {nullable: true})
    extrinsic!: Extrinsic | undefined | null

    @Index_()
    @ManyToOne_(() => Call, {nullable: true})
    call!: Call | undefined | null

    @Index_()
    @ManyToOne_(() => Account, {nullable: true})
    account!: Account | undefined | null

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: true})
    amount!: bigint | undefined | null
}
