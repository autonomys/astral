import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../consensus/base.entity';
import { UploadOptions } from './uploadOptions.valueObject';

@Entity('chunks', { schema: 'files' })
export class Chunks extends BaseEntity {
  @ApiProperty()
  @Column('text')
  id: string;

  @ApiProperty()
  @Column('enum', {
    enum: [
      'FileChunk',
      'File',
      'Folder',
      'FileInlink',
      'FolderInlink',
      'Metadata',
      'MetadataInlink',
      'MetadataChunk',
    ],
  })
  type: string;

  @ApiProperty()
  @Column('numeric')
  link_depth: number;

  @ApiProperty()
  @Column('numeric')
  size: number;

  @ApiProperty()
  @Column('varchar', { length: 255 })
  name: string;

  @ApiProperty()
  @Column('text')
  data: string;

  @ApiProperty()
  @Column('jsonb')
  upload_options: UploadOptions;
}
