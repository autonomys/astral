import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlocksController } from './controllers/blocks.controller';
import { Blocks } from './entities/consensus/blocks.entity';
import { BlocksService } from './services/blocks.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT) || 5432,
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_NAME || 'postgres',
      entities: [Blocks],
      synchronize: false, // Set to false in production
      schema: 'consensus', // Add this to match your entity schema
    }),
    TypeOrmModule.forFeature([Blocks]),
  ],
  controllers: [AppController, BlocksController],
  providers: [AppService, BlocksService],
})
export class AppModule {}
