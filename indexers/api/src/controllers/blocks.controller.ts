import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
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

  @Get(':height')
  async getBlockByHeight(@Param('height') height: string) {
    const block = await this.blocksService.findByHeight(Number(height));

    if (!block) {
      throw new NotFoundException(`Block with height ${height} not found`);
    }

    return block;
  }
}
