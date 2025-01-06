import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { HeaderAPIKeyStrategy } from 'passport-headerapikey';
import { Repository } from 'typeorm';
import { ApiKey } from '../entities/users/api-key.entity';
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
      return this.validate(apiKey, done);
    });
  }

  async validate(
    apiKey: string,
    done: (error: Error | null, data: ApiKey | boolean) => void,
  ) {
    if (!apiKey) {
      return done(new UnauthorizedException('Missing API Key'), false);
    }

    try {
      const key = await this.apiKeyRepository.findOne({
        where: { id: apiKey },
      });

      if (!key || key.total_requests_remaining <= 0) {
        return done(new UnauthorizedException('Invalid API Key'), false);
      }

      // Track API usage after successful validation
      await this.apiUsageService.trackUsage(apiKey);

      return done(null, key);
    } catch (error) {
      return done(new UnauthorizedException('Invalid API Key'), false);
    }
  }
}
