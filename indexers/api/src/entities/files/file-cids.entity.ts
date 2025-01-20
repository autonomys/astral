import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../consensus/base.entity';

@Entity('file_cids', { schema: 'files' })
export class FileCids extends BaseEntity {
  @ApiProperty()
  @Column('varchar', { length: 161 })
  id: string;

  @ApiProperty()
  @Column('varchar', { length: 161 })
  parent_cid: string;

  @ApiProperty()
  @Column('varchar', { length: 161 })
  child_cid: string;
}
