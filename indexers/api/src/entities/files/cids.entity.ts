import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../consensus/base.entity';

@Entity('cids', { schema: 'files' })
export class Cids extends BaseEntity {
  @ApiProperty()
  @Column('varchar', { length: 161 })
  id: string;

  @ApiProperty()
  @Column('jsonb')
  links: string[];
}
