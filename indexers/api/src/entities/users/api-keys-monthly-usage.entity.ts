import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { ApiKey } from './api-key.entity';
import { BaseEntity } from './base.entity';

@Entity('api_keys_monthly_usage', { schema: 'users' })
export class ApiKeysMonthlyUsage extends BaseEntity {
  @Column('uuid')
  api_key_id: string;

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

  @ManyToOne(() => ApiKey, (apiKey) => apiKey.monthlyUsages)
  @JoinColumn({ name: 'api_key_id' })
  apiKey: ApiKey;
}
