import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_} from "typeorm"
import {Block} from "./block.model"

@Entity_()
export class Log {
  constructor(props?: Partial<Log>) {
    Object.assign(this, props)
  }

  @PrimaryColumn_()
  id!: string

  @Column_("text", {nullable: false})
  kind!: string

  @Column_("jsonb", {nullable: true})
  value!: unknown | undefined | null

  @Index_()
  @ManyToOne_(() => Block, {nullable: true})
  block!: Block
}
