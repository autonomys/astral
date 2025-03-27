import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  Blocks,
  ConsensusMetadata,
  FilesMetadata,
  LeaderboardMetadata,
  StakingMetadata,
} from '../entities';

@Controller()
export class AppController {
  constructor(
    @InjectRepository(Blocks)
    private blocksRepository: Repository<Blocks>,
    @InjectRepository(ConsensusMetadata)
    private consensusMetadataRepository: Repository<ConsensusMetadata>,
    @InjectRepository(LeaderboardMetadata)
    private leaderboardMetadataRepository: Repository<LeaderboardMetadata>,
    @InjectRepository(FilesMetadata)
    private filesMetadataRepository: Repository<FilesMetadata>,
    @InjectRepository(StakingMetadata)
    private stakingMetadataRepository: Repository<StakingMetadata>,
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

  @Get('health')
  @ApiOperation({
    operationId: 'getHealth',
    summary: 'Get all indexers health status',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns the health status for all indexers',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          indexer: {
            type: 'string',
            description: 'Name of the indexer',
          },
          lastProcessedHeight: {
            type: 'number',
            description: 'Last processed block height',
          },
          targetHeight: {
            type: 'number',
            description: 'Target block height to process',
          },
          isSynced: {
            type: 'boolean',
            description: 'Whether the indexer is synced with the chain',
          },
        },
      },
    },
  })
  async getHealth() {
    const indexers = [
      {
        name: 'consensus',
        repository: this.consensusMetadataRepository,
      },
      {
        name: 'leaderboard',
        repository: this.leaderboardMetadataRepository,
      },
      {
        name: 'files',
        repository: this.filesMetadataRepository,
      },
      {
        name: 'staking',
        repository: this.stakingMetadataRepository,
      },
    ];

    const results = await Promise.all(
      indexers.map(async ({ name, repository }) => {
        const [lastProcessedHeight, targetHeight] = await Promise.all([
          repository.findOne({
            where: { key: 'lastProcessedHeight' },
          }),
          repository.findOne({ where: { key: 'targetHeight' } }),
        ]);

        const processedHeight = lastProcessedHeight?.value || 0;
        const currentTarget = targetHeight?.value || 0;

        return {
          indexer: name,
          lastProcessedHeight: processedHeight,
          targetHeight: currentTarget,
          isSynced: processedHeight >= currentTarget,
        };
      }),
    );

    return results;
  }
}
