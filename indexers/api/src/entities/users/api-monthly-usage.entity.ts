import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Profile } from './profile.entity';

@Entity('api_monthly_usage', { schema: 'users' })
export class ApiMonthlyUsage extends BaseEntity {
  @Column('uuid')
  profile_id: string;

  @Column('numeric')
  total_requests: number;

  @Column('numeric')
  total_requests_remaining: number;

  @ManyToOne(() => Profile, (profile) => profile.monthlyUsages)
  @JoinColumn({ name: 'profile_id' })
  profile: Profile;
}
