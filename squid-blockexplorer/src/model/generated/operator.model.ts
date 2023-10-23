import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, Index as Index_} from "typeorm"
import * as marshal from "./marshal"

@Entity_()
export class Operator {
    constructor(props?: Partial<Operator>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_()
    @Column_("text", {nullable: false})
    signingKey!: string

    @Column_("int4", {nullable: true})
    currentDomainId!: number | undefined | null

    @Column_("int4", {nullable: true})
    nextDomainId!: number | undefined | null

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: true})
    minimumNominatorStake!: bigint | undefined | null

    @Column_("int4", {nullable: true})
    nominationTax!: number | undefined | null

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: true})
    currentTotalStake!: bigint | undefined | null

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: true})
    currentEpochRewards!: bigint | undefined | null

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: true})
    totalShares!: bigint | undefined | null

    @Column_("text", {nullable: true})
    status!: string | undefined | null
}
