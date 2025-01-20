import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Profile } from './profile.entity';

@Entity('api_daily_usage', { schema: 'users' })
export class ApiDailyUsage extends BaseEntity {
  @Column('uuid')
  profile_id: string;

  @Column('numeric')
  total_requests: number;

  @Column('date', { default: () => 'CURRENT_DATE' })
  date: Date;

  @Column('timestamp with time zone', { default: () => 'now()' })
  created_at: Date;

  @Column('timestamp with time zone', { default: () => 'now()' })
  updated_at: Date;

  @Column('timestamp with time zone', { nullable: true })
  deleted_at: Date | null;

  @ManyToOne(() => Profile, (profile) => profile.dailyUsages)
  @JoinColumn({ name: 'profile_id' })
  profile: Profile;
}
