import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('cumulative_blocks', { schema: 'consensus' })
export class CumulativeBlocks extends BaseEntity {
  @Column('text')
  id: string;

  @Column('numeric')
  cumulative_extrinsics_count: number;

  @Column('numeric')
  cumulative_events_count: number;

  @Column('numeric')
  cumulative_transfers_count: number;

  @Column('numeric')
  cumulative_rewards_count: number;

  @Column('numeric')
  cumulative_block_rewards_count: number;

  @Column('numeric')
  cumulative_vote_rewards_count: number;

  @Column('numeric')
  cumulative_transfer_value: number;

  @Column('numeric')
  cumulative_reward_value: number;

  @Column('numeric')
  cumulative_block_reward_value: number;

  @Column('numeric')
  cumulative_vote_reward_value: number;
}
