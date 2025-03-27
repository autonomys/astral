import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('event_modules', { schema: 'consensus' })
export class EventModules extends BaseEntity {
  @Column('text')
  id: string;

  @Column('text')
  section: string;

  @Column('text')
  method: string;
}
