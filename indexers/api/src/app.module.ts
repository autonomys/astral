import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiKeyStrategy } from './auth/api-key.strategy';
import { BlocksController } from './controllers/blocks.controller';
import { ExtrinsicsController } from './controllers/extrinsics.controller';
import { ApiKeysDailyUsage, ApiKeysMonthlyUsage } from './entities';
import { Blocks } from './entities/consensus/blocks.entity';
import { Extrinsics } from './entities/consensus/extrinsics.entity';
import { ApiDailyUsage } from './entities/users/api-daily-usage.entity';
import { ApiKey } from './entities/users/api-key.entity';
import { ApiMonthlyUsage } from './entities/users/api-monthly-usage.entity';
import { Profile } from './entities/users/profile.entity';
import { BlocksService } from './services/blocks.service';
import { ExtrinsicsService } from './services/extrinsics.service';

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
    ]),
    PassportModule.register({ defaultStrategy: 'api-key' }),
  ],
  controllers: [AppController, BlocksController, ExtrinsicsController],
  providers: [AppService, BlocksService, ExtrinsicsService, ApiKeyStrategy],
})
export class AppModule {}
