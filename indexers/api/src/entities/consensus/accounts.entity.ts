import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('accounts', { schema: 'consensus' })
export class Accounts extends BaseEntity {
  @Column('text')
  id: string;

  @Column('numeric')
  nonce: number;

  @Column('numeric')
  free: number;

  @Column('numeric')
  reserved: number;

  @Column('numeric', { nullable: true })
  total: number;

  @Column('numeric')
  created_at: number;

  @Column('numeric')
  updated_at: number;
}
