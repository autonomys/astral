import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, Index as Index_, OneToMany as OneToMany_} from "typeorm"
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

    @Index_()
    @Column_("int4", {nullable: false})
    height!: number

    @Index_()
    @Column_("bytea", {nullable: false})
    hash!: Uint8Array

    @Column_("bytea", {nullable: false})
    parentHash!: Uint8Array

    @Column_("bytea", {nullable: false})
    stateRoot!: Uint8Array

    @Column_("bytea", {nullable: false})
    extrinsicsRoot!: Uint8Array

    @Column_("text", {nullable: false})
    specId!: string

    @Column_("text", {nullable: false})
    specName!: string

    @Index_()
    @Column_("int4", {nullable: false})
    specVersion!: number

    @Column_("text", {nullable: false})
    implName!: string

    @Column_("int4", {nullable: false})
    implVersion!: number

    @Index_()
    @Column_("timestamp with time zone", {nullable: false})
    timestamp!: Date

    @Index_()
    @Column_("bytea", {nullable: true})
    validator!: Uint8Array | undefined | null

    @Column_("int4", {nullable: false})
    extrinsicsCount!: number

    @Column_("int4", {nullable: false})
    callsCount!: number

    @Column_("int4", {nullable: false})
    eventsCount!: number

    @Column_("int4", {nullable: false})
    logsCount!: number

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    spacePledged!: bigint

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    blockchainSize!: bigint

    @Column_("text", {nullable: true})
    author!: string | undefined | null

    @OneToMany_(() => Extrinsic, e => e.block)
    extrinsics!: Extrinsic[]

    @OneToMany_(() => Event, e => e.block)
    events!: Event[]

    @OneToMany_(() => Call, e => e.block)
    calls!: Call[]

    @OneToMany_(() => Log, e => e.block)
    logs!: Log[]
}
