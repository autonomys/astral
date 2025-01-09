import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('extrinsic_modules', { schema: 'consensus' })
export class ExtrinsicModules extends BaseEntity {
  @Column('text')
  id: string;

  @Column('text')
  section: string;

  @Column('text')
  method: string;
}
