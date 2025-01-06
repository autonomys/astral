import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { HeaderAPIKeyStrategy } from 'passport-headerapikey';
import { Repository } from 'typeorm';
import { ApiKey } from '../entities/users/api-key.entity';

@Injectable()
export class ApiKeyStrategy extends PassportStrategy(
  HeaderAPIKeyStrategy,
  'api-key',
) {
  constructor(
    @InjectRepository(ApiKey)
    private apiKeyRepository: Repository<ApiKey>,
  ) {
    super({ header: 'X-API-KEY', prefix: '' }, true, async (apiKey, done) => {
      console.log('apiKey', apiKey);
      console.log('done', done);
      return this.validate(apiKey, done);
    });
  }

  async validate(
    apiKey: string,
    done: (error: Error | null, data: ApiKey | boolean) => void,
  ) {
    console.log('Received API Key:', apiKey);

    if (!apiKey) {
      console.log('No API Key provided');
      return done(new UnauthorizedException('Missing API Key'), false);
    }

    try {
      const key = await this.apiKeyRepository.findOne({
        where: { id: apiKey },
      });

      console.log('Database query result:', key);

      if (!key || key.total_requests_remaining <= 0) {
        console.log('Invalid or expired API Key');
        return done(new UnauthorizedException('Invalid API Key'), false);
      }

      return done(null, key);
    } catch (error) {
      console.log('Error during validation:', error);
      return done(new UnauthorizedException('Invalid API Key'), false);
    }
  }
}
