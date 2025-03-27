import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('transfers', { schema: 'consensus' })
export class Transfers extends BaseEntity {
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
  from: string;

  @Column('text')
  to: string;

  @Column('numeric')
  value: number;

  @Column('numeric')
  fee: number;

  @Column('boolean')
  success: boolean;

  @Column('timestamp without time zone')
  timestamp: Date;
}
