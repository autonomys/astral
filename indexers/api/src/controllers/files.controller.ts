import { Controller, Get, NotFoundException, Param, Res } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { Response } from 'express';
import { Repository } from 'typeorm';
import { Chunks } from '../entities/files/chunks.entity';
import { Files } from '../entities/files/files.entity';
import { FileRetrieverService } from '../services/file-retriever.sevice';

@ApiTags('Files')
@Controller('files')
export class FilesController {
  constructor(
    private fileRetrieverService: FileRetrieverService,
    @InjectRepository(Files)
    private filesRepository: Repository<Files>,
    @InjectRepository(Chunks)
    private chunksRepository: Repository<Chunks>,
  ) {}

  @Get(':cid')
  @ApiOperation({
    operationId: 'getFile',
    summary: 'Download file by CID',
  })
  @ApiParam({ name: 'cid', description: 'CID of the file' })
  @ApiResponse({
    status: 200,
    description: 'Returns the file content as a byte stream',
    headers: {
      'Content-Type': {
        description: 'The MIME type of the file',
        example: 'application/octet-stream',
      },
    },
  })
  async getFile(
    @Param('cid') cid: string,
    @Res() res: Response,
  ): Promise<void> {
    const file = await this.filesRepository.findOne({
      where: {
        id: cid,
      },
    });
    if (!file) {
      throw new NotFoundException(`File with CID ${cid} not found`);
    }

    const chunk = await this.chunksRepository.findOne({
      where: {
        id: cid,
      },
    });

    const contentType = file.contentType() || 'application/octet-stream';
    res.setHeader('Content-Type', contentType);
    res.setHeader('Content-Length', file.size);
    res.setHeader('Content-Disposition', `filename="${file.name}"`);

    const isCompressedAndPlainText =
      chunk?.upload_options?.encryption?.algorithm === undefined &&
      chunk?.upload_options?.compression?.algorithm !== undefined;
    if (isCompressedAndPlainText) {
      res.setHeader('Content-Encoding', 'deflate');
    }

    const fileBuffer = await this.fileRetrieverService.getBuffer(cid);

    res.send(fileBuffer);
  }
}
