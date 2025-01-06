import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('blocks', { schema: 'consensus' })
export class Blocks extends BaseEntity {
  @Column('text')
  id: string;

  @Column('text')
  sort_id: string;

  @Column('numeric')
  height: number;

  @Column('text')
  hash: string;

  @Column('timestamp without time zone')
  timestamp: Date;

  @Column('text')
  parent_hash: string;

  @Column('text')
  spec_id: string;

  @Column('text')
  state_root: string;

  @Column('text')
  extrinsics_root: string;

  @Column('numeric')
  space_pledged: number;

  @Column('numeric')
  blockchain_size: number;

  @Column('integer')
  extrinsics_count: number;

  @Column('integer')
  events_count: number;

  @Column('integer')
  transfers_count: number;

  @Column('integer')
  rewards_count: number;

  @Column('integer')
  block_rewards_count: number;

  @Column('integer')
  vote_rewards_count: number;

  @Column('numeric')
  transfer_value: number;

  @Column('numeric')
  reward_value: number;

  @Column('numeric')
  block_reward_value: number;

  @Column('numeric')
  vote_reward_value: number;

  @Column('text')
  author_id: string;
}
