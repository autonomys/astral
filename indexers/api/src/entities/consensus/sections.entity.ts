import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('sections', { schema: 'consensus' })
export class Sections extends BaseEntity {
  @Column('text')
  id: string;

  @Column('text')
  section: string;
}
