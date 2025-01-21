import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('account_histories', { schema: 'consensus' })
export class AccountHistories extends BaseEntity {
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
}
