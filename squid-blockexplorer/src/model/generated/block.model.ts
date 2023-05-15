import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, Index as Index_, OneToMany as OneToMany_, ManyToOne as ManyToOne_} from "typeorm"
import * as marshal from "./marshal"
import {Extrinsic} from "./extrinsic.model"
import {Event} from "./event.model"
import {RewardEvent} from "./rewardEvent.model"
import {Call} from "./call.model"
import {Log} from "./log.model"
import {Account} from "./account.model"

@Entity_()
export class Block {
    constructor(props?: Partial<Block>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_()
    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    height!: bigint

    @Column_("timestamp with time zone", {nullable: false})
    timestamp!: Date

    @Column_("text", {nullable: false})
    hash!: string

    @Column_("text", {nullable: false})
    parentHash!: string

    @Column_("text", {nullable: false})
    specId!: string

    @Column_("text", {nullable: false})
    stateRoot!: string

    @Column_("text", {nullable: false})
    extrinsicsRoot!: string

    @OneToMany_(() => Extrinsic, e => e.block)
    extrinsics!: Extrinsic[]

    @OneToMany_(() => Event, e => e.block)
    events!: Event[]

    @OneToMany_(() => RewardEvent, e => e.block)
    rewards!: RewardEvent[]

    @OneToMany_(() => Call, e => e.block)
    calls!: Call[]

    @OneToMany_(() => Log, e => e.block)
    logs!: Log[]

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    spacePledged!: bigint

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    blockchainSize!: bigint

    @Column_("int4", {nullable: false})
    extrinsicsCount!: number

    @Column_("int4", {nullable: false})
    eventsCount!: number

    @Index_()
    @ManyToOne_(() => Account, {nullable: true})
    author!: Account | undefined | null
}
