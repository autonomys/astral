import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Chunks } from '../entities/files/chunks.entity';
import { FileCids } from '../entities/files/file-cids.entity';

@Injectable()
export class FileRetrieverService {
  constructor(
    @InjectRepository(FileCids)
    private fileCidsRepository: Repository<FileCids>,
    @InjectRepository(Chunks)
    private chunksRepository: Repository<Chunks>,
  ) {}

  async getBuffer(fileId: string): Promise<Buffer> {
    const children = await this.fileCidsRepository.find({
      where: {
        parent_cid: fileId,
      },
    });

    const chunks = await this.chunksRepository.find({
      where: {
        id: In(children.map((child) => child.child_cid)),
      },
    });

    return Buffer.concat(
      chunks.map((chunk) =>
        Buffer.from(
          Object.values(JSON.parse(chunk.data) as Record<string, number>),
        ),
      ),
    );
  }
}
