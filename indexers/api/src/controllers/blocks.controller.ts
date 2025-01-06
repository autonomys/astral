import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Blocks } from '../entities/consensus/blocks.entity';
import { BlocksService } from '../services/blocks.service';

@ApiTags('blocks')
@Controller('blocks')
export class BlocksController {
  constructor(private readonly blocksService: BlocksService) {}

  @Get('latest')
  @ApiOperation({ summary: 'Get latest block' })
  @ApiResponse({
    status: 200,
    description: 'Returns the latest block',
    type: Blocks,
  })
  async getLatestBlock(): Promise<Blocks> {
    return this.blocksService.findLatest();
  }
}
