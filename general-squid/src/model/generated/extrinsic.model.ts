import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, Index as Index_, ManyToOne as ManyToOne_, OneToMany as OneToMany_} from "typeorm"
import * as marshal from "./marshal"
import {Block} from "./block.model"
import {Event} from "./event.model"
import {Call} from "./call.model"

@Entity_()
export class Extrinsic {
    constructor(props?: Partial<Extrinsic>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Column_("text", {nullable: false})
    hash!: string

    @Column_("int4", {nullable: false})
    indexInBlock!: number

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: true})
    nonce!: bigint | undefined | null

    @Column_("text", {nullable: false})
    name!: string

    @Column_("text", {nullable: true})
    signer!: string | undefined | null

    @Index_()
    @Column_("text", {nullable: true})
    signature!: string | undefined | null

    @Column_("jsonb", {nullable: true})
    error!: unknown | undefined | null

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: true})
    tip!: bigint | undefined | null

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: true})
    fee!: bigint | undefined | null

    @Column_("bool", {nullable: false})
    success!: boolean

    @Index_()
    @ManyToOne_(() => Block, {nullable: true})
    block!: Block

    @Column_("int4", {nullable: true})
    pos!: number | undefined | null

    @Index_()
    @Column_("timestamp with time zone", {nullable: false})
    timestamp!: Date

    @Column_("jsonb", {nullable: true})
    args!: unknown | undefined | null

    @OneToMany_(() => Event, e => e.extrinsic)
    events!: Event[]

    @OneToMany_(() => Call, e => e.extrinsic)
    calls!: Call[]
}
