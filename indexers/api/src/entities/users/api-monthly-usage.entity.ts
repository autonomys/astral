import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Profile } from './profile.entity';

@Entity('api_monthly_usage', { schema: 'users' })
export class ApiMonthlyUsage extends BaseEntity {
  @Column('uuid')
  profile_id: string;

  @Column('numeric')
  total_requests: number;

  @Column('date', { default: () => "date_trunc('month', CURRENT_DATE)" })
  date: Date;

  @Column('timestamp with time zone', { default: () => 'now()' })
  created_at: Date;

  @Column('timestamp with time zone', { default: () => 'now()' })
  updated_at: Date;

  @Column('timestamp with time zone', { nullable: true })
  deleted_at: Date | null;

  @ManyToOne(() => Profile, (profile) => profile.monthlyUsages)
  @JoinColumn({ name: 'profile_id' })
  profile: Profile;
}
