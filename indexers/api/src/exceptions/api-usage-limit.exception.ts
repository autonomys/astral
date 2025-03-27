import { HttpException, HttpStatus } from '@nestjs/common';

export class ApiUsageLimitException extends HttpException {
  constructor(message: string) {
    super(message, HttpStatus.TOO_MANY_REQUESTS);
  }
}
