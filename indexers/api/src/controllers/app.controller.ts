import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Blocks } from '../entities/consensus/blocks.entity';

@Controller()
export class AppController {
  constructor(
    @InjectRepository(Blocks)
    private blocksRepository: Repository<Blocks>,
  ) {}

  @Get()
  getHello(): string {
    return 'Hello Autonomys World!';
  }

  @Get('spacePledged')
  @ApiOperation({
    operationId: 'getSpacePledged',
    summary: 'Get current network space pledged',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns the current network space pledged',
    type: Number,
  })
  @ApiResponse({ status: 404, description: 'No blocks found' })
  async getSpacePledged(): Promise<number> {
    const latestBlock = await this.blocksRepository
      .createQueryBuilder('blocks')
      .orderBy('blocks.height', 'DESC')
      .getOne();

    return latestBlock.space_pledged;
  }

  @Get('blockchainSize')
  @ApiOperation({
    operationId: 'getBlockchainSize',
    summary: 'Get current network blockchain size',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns the current network blockchain size',
    type: Number,
  })
  @ApiResponse({ status: 404, description: 'No blocks found' })
  async getBlockchainSize(): Promise<number> {
    const latestBlock = await this.blocksRepository
      .createQueryBuilder('blocks')
      .orderBy('blocks.height', 'DESC')
      .getOne();

    return latestBlock.blockchain_size;
  }
}
