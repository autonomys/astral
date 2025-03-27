import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiQuery,
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

  @Get('account/:accountId')
  @ApiOperation({
    operationId: 'getExtrinsicsByAccount',
    summary: 'Get extrinsics by account ID (signer)',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Page number (starts from 1)',
    example: 1,
  })
  @ApiQuery({
    name: 'order',
    required: false,
    type: String,
    description: 'Sort order by timestamp',
    enum: ['asc', 'desc'],
    default: 'desc',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns the extrinsics for the account',
    type: [Extrinsics],
  })
  async findByAccount(
    @Param('accountId') accountId: string,
    @Query('page') page: number = 1,
    @Query('order') order: 'asc' | 'desc' = 'desc',
  ) {
    const take = 100;
    const skip = (page - 1) * take;

    const [extrinsics, total] = await this.extrinsicsRepository.findAndCount({
      where: { signer: accountId },
      order: { timestamp: order },
      take,
      skip,
    });

    if (extrinsics.length === 0 && page === 1) {
      throw new NotFoundException(
        `No extrinsics found for account ${accountId}`,
      );
    }

    return {
      items: extrinsics,
      metadata: {
        total,
        page,
        pageSize: take,
        pageCount: Math.ceil(total / take),
      },
    };
  }

  @Get(':hash')
  @ApiOperation({
    operationId: 'getExtrinsicByHash',
    summary: 'Get extrinsic by hash',
  })
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
