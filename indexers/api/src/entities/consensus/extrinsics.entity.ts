import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('extrinsics', { schema: 'consensus' })
export class Extrinsics extends BaseEntity {
  @ApiProperty()
  @Column('text')
  id: string;

  @ApiProperty()
  @Column('text')
  sort_id: string;

  @ApiProperty()
  @Column('text')
  hash: string;

  @ApiProperty()
  @Column('numeric')
  block_height: number;

  @ApiProperty()
  @Column('text')
  block_hash: string;

  @ApiProperty()
  @Column('text')
  section: string;

  @ApiProperty()
  @Column('text')
  module: string;

  @ApiProperty()
  @Column('text')
  name: string;

  @ApiProperty()
  @Column('integer')
  index_in_block: number;

  @ApiProperty()
  @Column('boolean')
  success: boolean;

  @ApiProperty()
  @Column('timestamp without time zone')
  timestamp: Date;

  @ApiProperty()
  @Column('numeric')
  nonce: number;

  @ApiProperty()
  @Column('text')
  signer: string;

  @ApiProperty()
  @Column('text')
  signature: string;

  @ApiProperty()
  @Column('text')
  args: string;

  @ApiProperty()
  @Column('text')
  error: string;

  @ApiProperty()
  @Column('numeric')
  tip: number;

  @ApiProperty()
  @Column('numeric')
  fee: number;

  @ApiProperty()
  @Column('integer')
  pos: number;

  @ApiProperty()
  @Column('text', { nullable: true })
  cid: string;
}
