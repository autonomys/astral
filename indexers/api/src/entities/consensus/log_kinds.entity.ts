import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('log_kinds', { schema: 'consensus' })
export class LogKinds extends BaseEntity {
  @Column('text')
  id: string;

  @Column('text')
  kind: string;
}
