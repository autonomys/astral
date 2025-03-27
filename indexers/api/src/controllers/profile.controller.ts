import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApiKeyGuard } from '../auth/api-key.guard';
import { Profile } from '../entities/users/profile.entity';

@ApiTags('profiles')
@Controller('profiles')
export class ProfileController {
  constructor(
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
  ) {}

  @Get('public')
  @ApiOperation({ summary: 'Get public profiles' })
  @ApiResponse({ status: 200, description: 'List of public profiles' })
  async getPublicProfiles() {
    return this.profileRepository.find({
      select: [
        'id',
        'name',
        'api_total_requests',
        'api_daily_requests_limit',
        'api_monthly_requests_limit',
      ],
    });
  }

  @Get('private')
  @UseGuards(ApiKeyGuard)
  @ApiOperation({ summary: 'Get private profiles' })
  @ApiResponse({ status: 200, description: 'List of private profiles' })
  @ApiHeader({
    name: 'X-API-KEY',
    description: 'API key for authentication',
  })
  async getPrivateProfiles() {
    return this.profileRepository.find();
  }
}
