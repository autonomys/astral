import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('events', { schema: 'consensus' })
export class Events extends BaseEntity {
  @Column('text')
  id: string;

  @Column('text')
  sort_id: string;

  @Column('numeric')
  block_height: number;

  @Column('text')
  block_hash: string;

  @Column('text')
  extrinsic_id: string;

  @Column('text')
  extrinsic_hash: string;

  @Column('text')
  section: string;

  @Column('text')
  module: string;

  @Column('text')
  name: string;

  @Column('numeric')
  index_in_block: number;

  @Column('timestamp without time zone')
  timestamp: Date;

  @Column('text')
  phase: string;

  @Column('integer')
  pos: number;

  @Column('text')
  args: string;

  @Column('text', { nullable: true })
  cid: string;
}
