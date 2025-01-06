import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Profile } from './profile.entity';

@Entity('api_daily_usage', { schema: 'users' })
export class ApiDailyUsage extends BaseEntity {
  @Column('uuid')
  profile_id: string;

  @Column('numeric')
  total_requests: number;

  @ManyToOne(() => Profile, (profile) => profile.dailyUsages)
  @JoinColumn({ name: 'profile_id' })
  profile: Profile;
}
