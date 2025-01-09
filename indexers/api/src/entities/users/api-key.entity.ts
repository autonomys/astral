import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { ApiKeysDailyUsage } from './api-keys-daily-usage.entity';
import { ApiKeysMonthlyUsage } from './api-keys-monthly-usage.entity';
import { BaseEntity } from './base.entity';
import { Profile } from './profile.entity';

@Entity('api_keys', { schema: 'users' })
export class ApiKey extends BaseEntity {
  @Column('uuid')
  profile_id: string;

  @Column('uuid')
  key: string;

  @Column()
  description: string;

  @Column('numeric')
  total_requests: number;

  @ManyToOne(() => Profile, (profile) => profile.apiKeys)
  @JoinColumn({ name: 'profile_id' })
  profile: Profile;

  @OneToMany(() => ApiKeysDailyUsage, (dailyUsage) => dailyUsage.apiKey)
  dailyUsages: ApiKeysDailyUsage[];

  @OneToMany(() => ApiKeysMonthlyUsage, (monthlyUsage) => monthlyUsage.apiKey)
  monthlyUsages: ApiKeysMonthlyUsage[];
}
