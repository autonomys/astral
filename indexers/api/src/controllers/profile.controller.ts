import { Controller, Get, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiHeader,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApiKeyGuard } from '../auth/api-key.guard';
import { Profile } from '../entities/profile.entity';

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
      select: ['id', 'name', 'account_id'],
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
