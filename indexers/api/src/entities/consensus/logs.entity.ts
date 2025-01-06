import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('logs', { schema: 'consensus' })
export class Logs extends BaseEntity {
  @Column('text')
  id: string;

  @Column('text')
  sort_id: string;

  @Column('numeric')
  block_height: number;

  @Column('text')
  block_hash: string;

  @Column('integer')
  index_in_block: number;

  @Column('text')
  kind: string;

  @Column('text', { nullable: true })
  value: string;

  @Column('timestamp without time zone')
  timestamp: Date;
}
