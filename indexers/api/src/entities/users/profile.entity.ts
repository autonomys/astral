import { Column, Entity, OneToMany } from 'typeorm';
import { ApiDailyUsage } from './api-daily-usage.entity';
import { ApiKey } from './api-key.entity';
import { ApiMonthlyUsage } from './api-monthly-usage.entity';
import { BaseEntity } from './base.entity';

@Entity('profiles', { schema: 'users' })
export class Profile extends BaseEntity {
  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  avatar_url: string;

  @Column()
  banner_url: string;

  @Column()
  email: string;

  @Column()
  email_is_verified: boolean;

  @Column()
  email_is_public: boolean;

  @Column()
  website: string;

  @Column()
  website_is_verified: boolean;

  @Column()
  website_is_public: boolean;

  @Column()
  discord: string;

  @Column()
  discord_is_verified: boolean;

  @Column()
  discord_is_public: boolean;

  @Column()
  github: string;

  @Column()
  github_is_verified: boolean;

  @Column()
  github_is_public: boolean;

  @Column()
  twitter: string;

  @Column()
  twitter_is_verified: boolean;

  @Column()
  twitter_is_public: boolean;

  @Column()
  proof_message: string;

  @Column()
  proof_signature: string;

  @Column('numeric')
  api_total_requests: number;

  @Column('numeric')
  api_daily_requests_limit: number;

  @Column('numeric')
  api_monthly_requests_limit: number;

  @Column({ type: 'timestamp with time zone' })
  created_at: Date;

  @Column({ type: 'timestamp with time zone' })
  updated_at: Date;

  @Column({ type: 'timestamp with time zone', nullable: true })
  deleted_at: Date | null;

  @OneToMany(() => ApiKey, (apiKey) => apiKey.profile)
  apiKeys: ApiKey[];

  @OneToMany(() => ApiDailyUsage, (dailyUsage) => dailyUsage.profile)
  dailyUsages: ApiDailyUsage[];

  @OneToMany(() => ApiMonthlyUsage, (monthlyUsage) => monthlyUsage.profile)
  monthlyUsages: ApiMonthlyUsage[];
}
