import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, OneToMany as OneToMany_} from "typeorm"
import {RewardEvent} from "./rewardEvent.model"
import {Nominator} from "./nominator.model"

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

    @OneToMany_(() => RewardEvent, e => e.account)
    rewards!: RewardEvent[]

    @OneToMany_(() => Nominator, e => e.account)
    nominations!: Nominator[]
}
