import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_} from "typeorm"
import * as marshal from "./marshal"

@Entity_()
export class Account {
  constructor(props?: Partial<Account>) {
    Object.assign(this, props)
  }

  @PrimaryColumn_()
  id!: string

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
  free!: bigint

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
  reserved!: bigint

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
  total!: bigint

  @Column_("int4", {nullable: true})
  updatedAt!: number | undefined | null
}
