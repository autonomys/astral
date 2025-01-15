import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Accounts } from '../entities/consensus/accounts.entity';

@ApiTags('Accounts')
@Controller('accounts')
export class AccountsController {
  constructor(
    @InjectRepository(Accounts)
    private accountRepository: Repository<Accounts>,
  ) {}

  @Get('count')
  @ApiOperation({
    operationId: 'getAccountsCount',
    summary: 'Get total number of accounts',
  })
  @ApiResponse({
    status: 200,
    description: 'Total number of accounts retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        count: {
          type: 'number',
          description: 'Total number of accounts',
        },
      },
    },
  })
  async getAccountsCount() {
    const count = await this.accountRepository.count();
    return { count };
  }

  @Get(':accountId')
  @ApiOperation({
    operationId: 'getAccountById',
    summary: 'Get account details by ID',
  })
  @ApiParam({ name: 'accountId', description: 'Account ID or address' })
  @ApiResponse({
    status: 200,
    description: 'Account details retrieved successfully',
    type: Accounts,
  })
  @ApiResponse({ status: 404, description: 'Account not found' })
  async getAccountById(@Param('accountId') accountId: string) {
    const account = await this.accountRepository.findOne({
      where: { id: accountId },
    });

    if (!account)
      throw new NotFoundException(`Account with ID ${accountId} not found`);

    return account;
  }
}
