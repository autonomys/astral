import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('accounts')
export class Account {
  @ApiProperty()
  @PrimaryColumn()
  id: string;

  @ApiProperty()
  @Column({ nullable: true })
  balance: string;

  @ApiProperty()
  @Column({ nullable: true })
  nonce: number;

  @ApiProperty()
  @Column({ type: 'timestamp', nullable: true })
  lastUpdated: Date;
}
