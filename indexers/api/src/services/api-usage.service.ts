import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  ApiDailyUsage,
  ApiKey,
  ApiKeysDailyUsage,
  ApiKeysMonthlyUsage,
  ApiMonthlyUsage,
  Profile,
} from '../entities';
import { ApiUsageLimitException } from '../exceptions/api-usage-limit.exception';

@Injectable()
export class ApiUsageService {
  constructor(
    @InjectRepository(ApiKey)
    private apiKeyRepository: Repository<ApiKey>,
    @InjectRepository(ApiDailyUsage)
    private apiDailyUsageRepository: Repository<ApiDailyUsage>,
    @InjectRepository(ApiMonthlyUsage)
    private apiMonthlyUsageRepository: Repository<ApiMonthlyUsage>,
    @InjectRepository(ApiKeysDailyUsage)
    private apiKeysDailyUsageRepository: Repository<ApiKeysDailyUsage>,
    @InjectRepository(ApiKeysMonthlyUsage)
    private apiKeysMonthlyUsageRepository: Repository<ApiKeysMonthlyUsage>,
  ) {}

  async trackUsage(apiKeyId: string) {
    await this.apiKeyRepository.manager.transaction(
      async (transactionalEntityManager) => {
        await transactionalEntityManager
          .createQueryBuilder()
          .update(ApiKey)
          .set({
            total_requests: () => '"total_requests" + 1',
          })
          .where('key = :key', { key: apiKeyId })
          .execute();

        const apiKey = await transactionalEntityManager
          .createQueryBuilder(ApiKey, 'ak')
          .where('ak.key = :key', { key: apiKeyId })
          .getOne();

        const profile = await transactionalEntityManager
          .createQueryBuilder(Profile, 'p')
          .where('p.id = :id', { id: apiKey.profile_id })
          .getOne();

        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const thisMonth = new Date();
        thisMonth.setDate(1);
        thisMonth.setHours(0, 0, 0, 0);

        const apiDailyUsage = await transactionalEntityManager
          .createQueryBuilder(ApiDailyUsage, 'ad')
          .where('profile_id = :profileId AND date = :date', {
            profileId: apiKey.profile_id,
            date: today,
          })
          .getOne();

        const newApiDailyUsage = Number(apiDailyUsage.total_requests) + 1;
        if (profile.api_daily_requests_limit <= newApiDailyUsage)
          throw new ApiUsageLimitException('Daily requests limit exceeded');

        const apiMonthlyUsage = await transactionalEntityManager
          .createQueryBuilder(ApiMonthlyUsage, 'am')
          .where('profile_id = :profileId AND date = :date', {
            profileId: apiKey.profile_id,
            date: thisMonth,
          })
          .getOne();

        const newApiMonthlyUsage = Number(apiMonthlyUsage.total_requests) + 1;
        if (profile.api_monthly_requests_limit <= newApiMonthlyUsage)
          throw new ApiUsageLimitException('Monthly requests limit exceeded');

        await transactionalEntityManager
          .createQueryBuilder()
          .update(Profile)
          .set({
            api_total_requests: () => '"api_total_requests" + 1',
          })
          .where('id = :id', { id: apiKey.profile_id })
          .execute();

        const updateDailyResult = await transactionalEntityManager
          .createQueryBuilder()
          .update(ApiDailyUsage)
          .set({
            total_requests: () => '"total_requests" + 1',
          })
          .where('profile_id = :profileId AND date = :date', {
            profileId: apiKey.profile_id,
            date: today,
          })
          .execute();

        if (updateDailyResult.affected === 0)
          await transactionalEntityManager
            .createQueryBuilder()
            .insert()
            .into(ApiDailyUsage)
            .values({
              profile_id: apiKey.profile_id,
              total_requests: 1,
            })
            .execute();

        const updateMonthlyResult = await transactionalEntityManager
          .createQueryBuilder()
          .update(ApiMonthlyUsage)
          .set({
            total_requests: () => '"total_requests" + 1',
          })
          .where('profile_id = :profileId AND date = :date', {
            profileId: apiKey.profile_id,
            date: thisMonth,
          })
          .execute();

        if (updateMonthlyResult.affected === 0)
          await transactionalEntityManager
            .createQueryBuilder()
            .insert()
            .into(ApiMonthlyUsage)
            .values({
              profile_id: apiKey.profile_id,
              total_requests: 1,
            })
            .orIgnore()
            .execute();

        const updateApiKeysDailyResult = await transactionalEntityManager
          .createQueryBuilder()
          .update(ApiKeysDailyUsage)
          .set({
            total_requests: () => '"total_requests" + 1',
          })
          .where('api_key_id = :apiKeyId AND date = :date', {
            apiKeyId: apiKeyId,
            date: today,
          })
          .execute();

        if (updateApiKeysDailyResult.affected === 0)
          await transactionalEntityManager
            .createQueryBuilder()
            .insert()
            .into(ApiKeysDailyUsage)
            .values({
              api_key_id: apiKeyId,
              total_requests: 1,
            })
            .orIgnore()
            .execute();

        const updateApiKeysMonthlyResult = await transactionalEntityManager
          .createQueryBuilder()
          .update(ApiKeysMonthlyUsage)
          .set({
            total_requests: () => '"total_requests" + 1',
          })
          .where('api_key_id = :apiKeyId AND date = :date', {
            apiKeyId: apiKeyId,
            date: thisMonth,
          })
          .execute();

        if (updateApiKeysMonthlyResult.affected === 0)
          await transactionalEntityManager
            .createQueryBuilder()
            .insert()
            .into(ApiKeysMonthlyUsage)
            .values({
              api_key_id: apiKeyId,
              total_requests: 1,
            })
            .orIgnore()
            .execute();
      },
    );
  }
}
