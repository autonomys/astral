import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_} from "typeorm"
import * as marshal from "./marshal"

@Entity_()
export class Block {
  constructor(props?: Partial<Block>) {
    Object.assign(this, props)
  }

  @PrimaryColumn_()
  id!: string

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: true})
  height!: bigint | undefined | null

  @Column_("timestamp with time zone", {nullable: true})
  timestamp!: Date | undefined | null

  @Column_("text", {nullable: true})
  hash!: string | undefined | null

  @Column_("text", {nullable: true})
  parentHash!: string | undefined | null

  @Column_("text", {nullable: true})
  specId!: string | undefined | null

  @Column_("text", {nullable: true})
  stateRoot!: string | undefined | null

  @Column_("text", {nullable: true})
  extrinsicRoot!: string | undefined | null

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
  spacePledged!: bigint

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
  blockchainSize!: bigint
}
