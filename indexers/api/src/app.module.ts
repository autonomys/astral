import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiKeyStrategy } from './auth/api-key.strategy';
import { AccountsController } from './controllers/accounts.controller';
import { AppController } from './controllers/app.controller';
import { BlocksController } from './controllers/blocks.controller';
import { ExtrinsicsController } from './controllers/extrinsics.controller';
import { FilesController } from './controllers/files.controller';
import { ApiKeysDailyUsage, ApiKeysMonthlyUsage } from './entities';
import { Accounts } from './entities/consensus/accounts.entity';
import { Blocks } from './entities/consensus/blocks.entity';
import { Extrinsics } from './entities/consensus/extrinsics.entity';
import { Chunks } from './entities/files/chunks.entity';
import { FileCids } from './entities/files/file-cids.entity';
import { Files } from './entities/files/files.entity';
import { ApiDailyUsage } from './entities/users/api-daily-usage.entity';
import { ApiKey } from './entities/users/api-key.entity';
import { ApiMonthlyUsage } from './entities/users/api-monthly-usage.entity';
import { Profile } from './entities/users/profile.entity';
import { ApiUsageService } from './services/api-usage.service';
import { FileRetrieverService } from './services/file-retriever.sevice';

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
        Files,
        Chunks,
        FileCids,
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
      Files,
      Chunks,
      FileCids,
    ]),
    PassportModule.register({ defaultStrategy: 'api-key' }),
  ],
  controllers: [
    AppController,
    BlocksController,
    ExtrinsicsController,
    AccountsController,
    FilesController,
  ],
  providers: [ApiKeyStrategy, ApiUsageService, FileRetrieverService],
})
export class AppModule {}
