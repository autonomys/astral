import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Blocks } from '../entities/consensus/blocks.entity';

@ApiTags('Blocks')
@Controller('blocks')
export class BlocksController {
  constructor(
    @InjectRepository(Blocks)
    private blocksRepository: Repository<Blocks>,
  ) {}

  @Get('latest')
  @ApiOperation({
    operationId: 'getLatestBlock',
    summary: 'Get latest block',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns the latest block',
    type: Blocks,
  })
  @ApiResponse({ status: 404, description: 'No blocks found' })
  async getLatestBlock(): Promise<Blocks> {
    return this.blocksRepository
      .createQueryBuilder('blocks')
      .orderBy('blocks.height', 'DESC')
      .getOne();
  }

  @Get(':height')
  @ApiOperation({
    operationId: 'getBlockByHeight',
    summary: 'Get block by height',
  })
  @ApiParam({ name: 'height', description: 'Block height' })
  @ApiResponse({
    status: 200,
    description: 'Returns the block details',
    type: Blocks,
  })
  @ApiResponse({ status: 404, description: 'Block not found' })
  async getBlockByHeight(@Param('height') height: string) {
    const block = await this.blocksRepository.findOne({
      where: { height: Number(height) },
    });

    if (!block)
      throw new NotFoundException(`Block with height ${height} not found`);

    return block;
  }
}
