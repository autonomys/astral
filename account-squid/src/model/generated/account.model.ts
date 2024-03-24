import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, OneToMany as OneToMany_} from "typeorm"
import * as marshal from "./marshal"
import {Transfer} from "./transfer.model"

@Entity_()
export class Account {
    constructor(props?: Partial<Account>) {
        Object.assign(this, props)
    }

    /**
     * Account address
     */
    @PrimaryColumn_()
    id!: string

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    free!: bigint

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    reserved!: bigint

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    total!: bigint

    @Column_("int4", {nullable: false})
    updatedAtBlock!: number

    @Column_("int4", {nullable: false})
    nonce!: number

    @OneToMany_(() => Transfer, e => e.to)
    transfersTo!: Transfer[]

    @OneToMany_(() => Transfer, e => e.from)
    transfersFrom!: Transfer[]
}
