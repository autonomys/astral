import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_, OneToMany as OneToMany_} from "typeorm"
import * as marshal from "./marshal"
import {Block} from "./block.model"
import {Event} from "./event.model"

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

  @Column_("timestamp with time zone", {nullable: true})
  timestamp!: Date | undefined | null

  @Column_("jsonb", {nullable: true})
  args!: unknown | undefined | null

  @OneToMany_(() => Event, e => e.extrinsic)
  events!: Event[]
}
