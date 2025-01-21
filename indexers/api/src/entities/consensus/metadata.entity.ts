import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('_metadata', { schema: 'consensus' })
export class ConsensusMetadata {
  @ApiProperty()
  @PrimaryColumn('varchar', { unique: true })
  key: string;

  @ApiProperty()
  @Column('jsonb', { nullable: true })
  value: any;

  @ApiProperty()
  @Column('timestamp with time zone')
  createdAt: Date;

  @ApiProperty()
  @Column('timestamp with time zone')
  updatedAt: Date;
}
