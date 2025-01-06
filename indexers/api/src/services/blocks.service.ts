import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Blocks } from '../entities/consensus/blocks.entity';

@Injectable()
export class BlocksService {
  constructor(
    @InjectRepository(Blocks)
    private blocksRepository: Repository<Blocks>,
  ) {}

  async findLatest(): Promise<Blocks> {
    return this.blocksRepository
      .createQueryBuilder('blocks')
      .orderBy('blocks.height', 'DESC')
      .getOne();
  }

  async findByHeight(height: number): Promise<Blocks> {
    return this.blocksRepository.findOne({
      where: { height },
    });
  }
}
