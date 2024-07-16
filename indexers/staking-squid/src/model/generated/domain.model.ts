import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, Index as Index_} from "@subsquid/typeorm-store"

@Entity_()
export class Domain {
    constructor(props?: Partial<Domain>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_()
    @IntColumn_({nullable: false})
    domainId!: number

    @Index_()
    @IntColumn_({nullable: false})
    completedEpoch!: number

    @Index_()
    @IntColumn_({nullable: true})
    updatedAt!: number | undefined | null
}
