import { ApiProperty } from '@nestjs/swagger';
import { lookup } from 'mime-types';
import { AfterInsert, AfterLoad, AfterUpdate, Column, Entity } from 'typeorm';
import { BaseEntity } from '../consensus/base.entity';

@Entity('files', { schema: 'files' })
export class Files extends BaseEntity {
  @ApiProperty()
  @Column('varchar', { length: 80 })
  id: string;

  @ApiProperty()
  @Column('numeric')
  size: number;

  @ApiProperty()
  @Column('varchar', { length: 255, nullable: true })
  name: string;

  @AfterLoad()
  @AfterInsert()
  @AfterUpdate()
  contentType(): string | undefined {
    return lookup(this.name) || undefined;
  }
}
