import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApiDailyUsage } from '../entities/api-daily-usage.entity';
import { ApiKey } from '../entities/api-key.entity';
import { ApiMonthlyUsage } from '../entities/api-monthly-usage.entity';

@Injectable()
export class ApiUsageService {
  constructor(
    @InjectRepository(ApiKey)
    private apiKeyRepository: Repository<ApiKey>,
    @InjectRepository(ApiDailyUsage)
    private apiDailyUsageRepository: Repository<ApiDailyUsage>,
    @InjectRepository(ApiMonthlyUsage)
    private apiMonthlyUsageRepository: Repository<ApiMonthlyUsage>,
  ) {}

  async trackUsage(apiKeyId: string) {
    // Start transaction
    await this.apiKeyRepository.manager.transaction(
      async (transactionalEntityManager) => {
        // Update API key usage
        await transactionalEntityManager
          .createQueryBuilder()
          .update(ApiKey)
          .set({
            total_requests: () => '"total_requests" + 1',
            total_requests_remaining: () => '"total_requests_remaining" - 1',
          })
          .where('id = :id', { id: apiKeyId })
          .execute();

        // Get API key with profile
        const apiKey = await transactionalEntityManager
          .createQueryBuilder(ApiKey, 'ak')
          .where('ak.id = :id', { id: apiKeyId })
          .getOne();

        // Update or create daily usage
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        await transactionalEntityManager
          .createQueryBuilder()
          .insert()
          .into(ApiDailyUsage)
          .values({
            profile_id: apiKey.profile_id,
            total_requests: 1,
            created_at: today,
          })
          .orIgnore()
          .execute();

        await transactionalEntityManager
          .createQueryBuilder()
          .update(ApiDailyUsage)
          .set({
            total_requests: () => '"total_requests" + 1',
          })
          .where('profile_id = :profileId AND DATE(created_at) = :date', {
            profileId: apiKey.profile_id,
            date: today,
          })
          .execute();

        // Update or create monthly usage
        const firstDayOfMonth = new Date();
        firstDayOfMonth.setDate(1);
        firstDayOfMonth.setHours(0, 0, 0, 0);

        await transactionalEntityManager
          .createQueryBuilder()
          .insert()
          .into(ApiMonthlyUsage)
          .values({
            profile_id: apiKey.profile_id,
            total_requests: 1,
            total_requests_remaining: 999999, // Set your monthly limit
            created_at: firstDayOfMonth,
          })
          .orIgnore()
          .execute();

        await transactionalEntityManager
          .createQueryBuilder()
          .update(ApiMonthlyUsage)
          .set({
            total_requests: () => '"total_requests" + 1',
            total_requests_remaining: () => '"total_requests_remaining" - 1',
          })
          .where(
            "profile_id = :profileId AND DATE_TRUNC('month', created_at) = :month",
            {
              profileId: apiKey.profile_id,
              month: firstDayOfMonth,
            },
          )
          .execute();
      },
    );
  }
}
