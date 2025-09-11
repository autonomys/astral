import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Chunks } from '../entities/files/chunks.entity';
import { Cids } from '../entities/files/cids.entity';

@Injectable()
export class FileRetrieverService {
  constructor(
    @InjectRepository(Cids)
    private fileCidsRepository: Repository<Cids>,
    @InjectRepository(Chunks)
    private chunksRepository: Repository<Chunks>,
  ) {}

  private async getChildrenChunks(str: string): Promise<Chunks[]> {
    const children = await this.fileCidsRepository.findOne({
      where: {
        id: str,
      },
    });

    const chunks = await this.chunksRepository.find({
      where: {
        id: In(children.links),
      },
    });

    const map = new Map<string, Chunks>();
    chunks.forEach((chunk) => {
      map.set(chunk.id, chunk);
    });

    return children.links
      .map((link) => {
        const chunk = map.get(link);
        if (!chunk) {
          throw new Error(`Chunk ${link} not found and it's required`);
        }
        return chunk;
      })
      .filter(Boolean);
  }

  async getBuffer(fileId: string): Promise<Buffer> {
    const file = await this.chunksRepository.findOne({
      where: {
        id: fileId,
      },
    });

    let chunks = [file];
    while (chunks.some((chunk) => chunk.link_depth > 0)) {
      chunks = await Promise.all(
        chunks.map((chunk) => {
          return this.getChildrenChunks(chunk.id);
        }),
      ).then((children) => children.flat());
    }

    return Buffer.concat(
      chunks.map((chunk) => Buffer.from(Object.values(JSON.parse(chunk.data)))),
    );
  }
}
