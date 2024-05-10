import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_} from "typeorm"
import * as marshal from "./marshal"

@Entity_()
export class BackupCounter {
    constructor(props?: Partial<BackupCounter>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    balancesTransfersVolume!: bigint

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    balancesTransfersAmount!: bigint

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    chainSignedExtrinsics!: bigint
}
