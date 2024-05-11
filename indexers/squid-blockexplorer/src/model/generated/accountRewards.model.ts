import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_} from "typeorm"
import * as marshal from "./marshal"
import {Account} from "./account.model"

@Entity_()
export class AccountRewards {
    constructor(props?: Partial<AccountRewards>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_()
    @ManyToOne_(() => Account, {nullable: true})
    account!: Account

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: true})
    amount!: bigint | undefined | null

    @Index_()
    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: true})
    block!: bigint | undefined | null

    @Index_()
    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: true})
    vote!: bigint | undefined | null

    @Index_()
    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: true})
    operator!: bigint | undefined | null

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: true})
    farmerEventsCount!: bigint | undefined | null

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    updatedAt!: bigint
}
