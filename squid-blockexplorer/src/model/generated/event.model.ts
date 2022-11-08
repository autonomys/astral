import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_} from "typeorm"
import {Block} from "./block.model"
import {Extrinsic} from "./extrinsic.model"
import {Call} from "./call.model"

@Entity_()
export class Event {
  constructor(props?: Partial<Event>) {
    Object.assign(this, props)
  }

  @PrimaryColumn_()
  id!: string

  @Column_("int4", {nullable: false})
  indexInBlock!: number

  @Column_("text", {nullable: false})
  name!: string

  @Column_("timestamp with time zone", {nullable: true})
  timestamp!: Date | undefined | null

  @Column_("text", {nullable: false})
  phase!: string

  @Column_("int4", {nullable: true})
  pos!: number | undefined | null

  @Column_("jsonb", {nullable: true})
  args!: unknown | undefined | null

  @Index_()
  @ManyToOne_(() => Block, {nullable: true})
  block!: Block | undefined | null

  @Index_()
  @ManyToOne_(() => Extrinsic, {nullable: true})
  extrinsic!: Extrinsic | undefined | null

  @Index_()
  @ManyToOne_(() => Call, {nullable: true})
  call!: Call | undefined | null
}
