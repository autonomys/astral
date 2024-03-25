import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, Index as Index_} from "typeorm"

@Entity_()
export class DomainEpoch {
    constructor(props?: Partial<DomainEpoch>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_()
    @Column_("int4", {nullable: false})
    domainId!: number

    @Column_("int4", {nullable: false})
    epoch!: number

    @Column_("int4", {nullable: true})
    updatedAt!: number | undefined | null
}
