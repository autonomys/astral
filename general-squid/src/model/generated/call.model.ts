import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, Index as Index_, ManyToOne as ManyToOne_, OneToMany as OneToMany_} from "typeorm"
import {Block} from "./block.model"
import {Extrinsic} from "./extrinsic.model"
import {Event} from "./event.model"

@Index_(["id", "pallet", "name"], {unique: false})
@Entity_()
export class Call {
    constructor(props?: Partial<Call>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_()
    @ManyToOne_(() => Block, {nullable: true})
    block!: Block

    @Index_()
    @ManyToOne_(() => Extrinsic, {nullable: true})
    extrinsic!: Extrinsic

    @Index_()
    @ManyToOne_(() => Call, {nullable: true})
    parent!: Call | undefined | null

    @Column_("int4", {array: true, nullable: false})
    address!: (number)[]

    @Index_()
    @Column_("bool", {nullable: false})
    success!: boolean

    @Column_("jsonb", {nullable: true})
    error!: unknown | undefined | null

    @Index_()
    @Column_("text", {nullable: false})
    pallet!: string

    @Column_("text", {nullable: false})
    name!: string

    @Index_()
    @Column_("timestamp with time zone", {nullable: false})
    timestamp!: Date

    @Index_()
    @Column_("text", {nullable: true})
    signer!: string | undefined | null

    @Column_("jsonb", {nullable: true})
    args!: unknown | undefined | null

    @Column_("text", {array: true, nullable: true})
    argsStr!: (string | undefined | null)[] | undefined | null

    @OneToMany_(() => Call, e => e.parent)
    subcalls!: Call[]

    @OneToMany_(() => Event, e => e.call)
    events!: Event[]

    @Column_("int4", {nullable: true})
    pos!: number | undefined | null
}
