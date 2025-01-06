import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Extrinsics } from '../entities/consensus/extrinsics.entity';

@Injectable()
export class ExtrinsicsService {
  constructor(
    @InjectRepository(Extrinsics)
    private readonly extrinsicsRepository: Repository<Extrinsics>,
  ) {}

  async findByHash(hash: string): Promise<Extrinsics> {
    const extrinsic = await this.extrinsicsRepository.findOne({
      where: { hash },
    });

    if (!extrinsic) {
      throw new NotFoundException(`Extrinsic with hash ${hash} not found`);
    }

    return extrinsic;
  }
}
