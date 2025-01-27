import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('rewards', { schema: 'consensus' })
export class Rewards extends BaseEntity {
  @Column('text')
  id: string;

  @Column('numeric')
  block_height: number;

  @Column('text')
  block_hash: string;

  @Column('text')
  extrinsic_id: string;

  @Column('text')
  event_id: string;

  @Column('text')
  account_id: string;

  @Column('text')
  reward_type: string;

  @Column('numeric')
  amount: number;

  @Column('timestamp without time zone')
  timestamp: Date;
}
