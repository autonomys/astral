import {
  Controller,
  Get,
  NotFoundException,
  Param,
  UseGuards,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApiKeyGuard } from '../auth/api-key.guard';
import { Extrinsics } from '../entities/consensus/extrinsics.entity';

@ApiTags('Extrinsics')
@Controller('extrinsics')
@UseGuards(ApiKeyGuard)
@ApiSecurity('X-API-KEY')
export class ExtrinsicsController {
  constructor(
    @InjectRepository(Extrinsics)
    private extrinsicsRepository: Repository<Extrinsics>,
  ) {}

  @Get(':hash')
  @ApiOperation({ summary: 'Get extrinsic by hash' })
  @ApiResponse({
    status: 200,
    description: 'Returns the extrinsic details',
    type: Extrinsics,
  })
  @ApiResponse({ status: 404, description: 'Extrinsic not found' })
  async findByHash(@Param('hash') hash: string): Promise<Extrinsics> {
    const extrinsic = await this.extrinsicsRepository.findOne({
      where: { hash },
    });

    if (!extrinsic)
      throw new NotFoundException(`Extrinsic with hash ${hash} not found`);

    return extrinsic;
  }
}
