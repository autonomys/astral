import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, OneToMany as OneToMany_} from "typeorm"
import * as marshal from "./marshal"
import {Extrinsic} from "./extrinsic.model"
import {Event} from "./event.model"
import {Call} from "./call.model"
import {Log} from "./log.model"

@Entity_()
export class Block {
    constructor(props?: Partial<Block>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

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

    @Column_("text", {nullable: true})
    extrinsicRoot!: string | undefined | null

    @OneToMany_(() => Extrinsic, e => e.block)
    extrinsics!: Extrinsic[]

    @OneToMany_(() => Event, e => e.block)
    events!: Event[]

    @OneToMany_(() => Call, e => e.block)
    calls!: Call[]

    @OneToMany_(() => Log, e => e.block)
    logs!: Log[]

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    spacePledged!: bigint

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    blockchainSize!: bigint
}
