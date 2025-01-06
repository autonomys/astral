import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { ApiKey } from './api-key.entity';
import { BaseEntity } from './base.entity';

@Entity('api_keys_monthly_usage', { schema: 'users' })
export class ApiKeysMonthlyUsage extends BaseEntity {
  @Column('uuid')
  api_key_id: string;

  @Column('numeric')
  total_requests: number;

  @ManyToOne(() => ApiKey, (apiKey) => apiKey.monthlyUsages)
  @JoinColumn({ name: 'api_key_id' })
  apiKey: ApiKey;
}
