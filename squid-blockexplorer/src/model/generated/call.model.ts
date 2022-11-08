import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_, OneToMany as OneToMany_} from "typeorm"
import {Block} from "./block.model"
import {Extrinsic} from "./extrinsic.model"

@Entity_()
export class Call {
  constructor(props?: Partial<Call>) {
    Object.assign(this, props)
  }

  @PrimaryColumn_()
  id!: string

  @Column_("text", {nullable: false})
  name!: string

  @Column_("timestamp with time zone", {nullable: true})
  timestamp!: Date | undefined | null

  @Column_("bool", {nullable: false})
  success!: boolean

  @Column_("jsonb", {nullable: true})
  args!: unknown | undefined | null

  @Index_()
  @ManyToOne_(() => Block, {nullable: true})
  block!: Block

  @Index_()
  @ManyToOne_(() => Extrinsic, {nullable: true})
  extrinsic!: Extrinsic

  @Column_("jsonb", {nullable: true})
  error!: unknown | undefined | null

  @Column_("text", {nullable: true})
  signer!: string | undefined | null

  @Index_()
  @ManyToOne_(() => Call, {nullable: true})
  parent!: Call | undefined | null

  @OneToMany_(() => Call, e => e.parent)
  calls!: Call[]

  @Column_("int4", {nullable: true})
  pos!: number | undefined | null
}
