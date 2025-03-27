import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('accounts', { schema: 'consensus' })
export class Accounts extends BaseEntity {
  @ApiProperty()
  @Column('text')
  id: string;

  @ApiProperty()
  @Column('numeric')
  nonce: number;

  @ApiProperty()
  @Column('numeric')
  free: number;

  @ApiProperty()
  @Column('numeric')
  reserved: number;

  @ApiProperty()
  @Column('numeric', { nullable: true })
  total: number;

  @ApiProperty()
  @Column('numeric')
  created_at: number;

  @ApiProperty()
  @Column('numeric')
  updated_at: number;
}
