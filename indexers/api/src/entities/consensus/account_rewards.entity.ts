import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('account_rewards', { schema: 'consensus' })
export class AccountRewards extends BaseEntity {
  @Column('text')
  id: string;

  @Column('numeric', { nullable: true })
  total_rewards_value: number;

  @Column('numeric', { nullable: true })
  total_rewards_counts: number;

  @Column('numeric', { nullable: true })
  block_rewards_value: number;

  @Column('numeric', { nullable: true })
  block_rewards_counts: number;

  @Column('numeric', { nullable: true })
  vote_rewards_value: number;

  @Column('numeric', { nullable: true })
  vote_rewards_counts: number;

  @Column('numeric', { nullable: true })
  estimated_staking_rewards_value: number;

  @Column('numeric', { nullable: true })
  estimated_staking_rewards_counts: number;

  @Column('numeric')
  created_at: number;

  @Column('numeric')
  updated_at: number;
}
