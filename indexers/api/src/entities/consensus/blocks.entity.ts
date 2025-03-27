import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('blocks', { schema: 'consensus' })
export class Blocks extends BaseEntity {
  @ApiProperty()
  @Column('text')
  id: string;

  @ApiProperty()
  @Column('text')
  sort_id: string;

  @ApiProperty()
  @Column('numeric')
  height: number;

  @ApiProperty()
  @Column('text')
  hash: string;

  @ApiProperty()
  @Column('timestamp without time zone')
  timestamp: Date;

  @ApiProperty()
  @Column('text')
  parent_hash: string;

  @ApiProperty()
  @Column('text')
  spec_id: string;

  @ApiProperty()
  @Column('text')
  state_root: string;

  @ApiProperty()
  @Column('text')
  extrinsics_root: string;

  @ApiProperty()
  @Column('numeric')
  space_pledged: number;

  @ApiProperty()
  @Column('numeric')
  blockchain_size: number;

  @ApiProperty()
  @Column('integer')
  extrinsics_count: number;

  @ApiProperty()
  @Column('integer')
  events_count: number;

  @ApiProperty()
  @Column('integer')
  transfers_count: number;

  @ApiProperty()
  @Column('integer')
  rewards_count: number;

  @ApiProperty()
  @Column('integer')
  block_rewards_count: number;

  @ApiProperty()
  @Column('integer')
  vote_rewards_count: number;

  @ApiProperty()
  @Column('numeric')
  transfer_value: number;

  @ApiProperty()
  @Column('numeric')
  reward_value: number;

  @ApiProperty()
  @Column('numeric')
  block_reward_value: number;

  @ApiProperty()
  @Column('numeric')
  vote_reward_value: number;

  @ApiProperty()
  @Column('text')
  author_id: string;
}
