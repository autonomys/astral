import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { ApiKeyGuard } from '../auth/api-key.guard';
import { Extrinsics } from '../entities/consensus/extrinsics.entity';
import { ExtrinsicsService } from '../services/extrinsics.service';

@ApiTags('Extrinsics')
@Controller('extrinsics')
@UseGuards(ApiKeyGuard)
@ApiSecurity('X-API-KEY')
export class ExtrinsicsController {
  constructor(private readonly extrinsicsService: ExtrinsicsService) {}

  @Get(':hash')
  @ApiOperation({ summary: 'Get extrinsic by hash' })
  @ApiResponse({
    status: 200,
    description: 'Returns the extrinsic details',
    type: Extrinsics,
  })
  @ApiResponse({ status: 404, description: 'Extrinsic not found' })
  async findByHash(@Param('hash') hash: string): Promise<Extrinsics> {
    return this.extrinsicsService.findByHash(hash);
  }
}
