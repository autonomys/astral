import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('extrinsics', { schema: 'consensus' })
export class Extrinsics extends BaseEntity {
  @Column('text')
  id: string;

  @Column('text')
  sort_id: string;

  @Column('text')
  hash: string;

  @Column('numeric')
  block_height: number;

  @Column('text')
  block_hash: string;

  @Column('text')
  section: string;

  @Column('text')
  module: string;

  @Column('text')
  name: string;

  @Column('integer')
  index_in_block: number;

  @Column('boolean')
  success: boolean;

  @Column('timestamp without time zone')
  timestamp: Date;

  @Column('numeric')
  nonce: number;

  @Column('text')
  signer: string;

  @Column('text')
  signature: string;

  @Column('text')
  args: string;

  @Column('text')
  error: string;

  @Column('numeric')
  tip: number;

  @Column('numeric')
  fee: number;

  @Column('integer')
  pos: number;

  @Column('text', { nullable: true })
  cid: string;
}
