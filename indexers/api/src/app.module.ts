import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiKeyStrategy } from './auth/api-key.strategy';
import { AccountsController } from './controllers/accounts.controller';
import { BlocksController } from './controllers/blocks.controller';
import { ExtrinsicsController } from './controllers/extrinsics.controller';
import { ApiKeysDailyUsage, ApiKeysMonthlyUsage } from './entities';
import { Accounts } from './entities/consensus/accounts.entity';
import { Blocks } from './entities/consensus/blocks.entity';
import { Extrinsics } from './entities/consensus/extrinsics.entity';
import { ApiDailyUsage } from './entities/users/api-daily-usage.entity';
import { ApiKey } from './entities/users/api-key.entity';
import { ApiMonthlyUsage } from './entities/users/api-monthly-usage.entity';
import { Profile } from './entities/users/profile.entity';
import { ApiUsageService } from './services/api-usage.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT) || 5432,
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_NAME || 'postgres',
      entities: [
        Blocks,
        Extrinsics,
        ApiKey,
        Profile,
        ApiDailyUsage,
        ApiMonthlyUsage,
        ApiKeysDailyUsage,
        ApiKeysMonthlyUsage,
        Accounts,
      ],
      synchronize: false,
    }),
    TypeOrmModule.forFeature([
      Blocks,
      Extrinsics,
      ApiKey,
      Profile,
      ApiDailyUsage,
      ApiMonthlyUsage,
      ApiKeysDailyUsage,
      ApiKeysMonthlyUsage,
      Accounts,
    ]),
    PassportModule.register({ defaultStrategy: 'api-key' }),
  ],
  controllers: [
    AppController,
    BlocksController,
    ExtrinsicsController,
    AccountsController,
  ],
  providers: [AppService, ApiKeyStrategy, ApiUsageService],
})
export class AppModule {}
