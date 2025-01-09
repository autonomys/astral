import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { HeaderAPIKeyStrategy } from 'passport-headerapikey';
import { Repository } from 'typeorm';
import { ApiKey } from '../entities/users/api-key.entity';
import { ApiUsageLimitException } from '../exceptions/api-usage-limit.exception';
import { ApiUsageService } from '../services/api-usage.service';

@Injectable()
export class ApiKeyStrategy extends PassportStrategy(
  HeaderAPIKeyStrategy,
  'api-key',
) {
  constructor(
    @InjectRepository(ApiKey)
    private apiKeyRepository: Repository<ApiKey>,
    private apiUsageService: ApiUsageService,
  ) {
    super({ header: 'X-API-KEY', prefix: '' }, true, async (apiKey, done) => {
      console.log('apiKey', apiKey);
      return this.validate(apiKey, done);
    });
  }

  async validate(
    apiKey: string,
    done: (error: Error | null, data: ApiKey | boolean) => void,
  ) {
    if (!apiKey)
      return done(new UnauthorizedException('Missing API Key'), false);

    try {
      const key = await this.apiKeyRepository.findOne({
        where: { key: apiKey },
      });

      if (!key)
        return done(new UnauthorizedException('Invalid API Key'), false);

      await this.apiUsageService.trackUsage(apiKey);

      return done(null, key);
    } catch (error) {
      if (error instanceof ApiUsageLimitException) return done(error, false);

      return done(new UnauthorizedException('Invalid API Key'), false);
    }
  }
}
