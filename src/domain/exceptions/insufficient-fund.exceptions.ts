import { HttpException, HttpStatus } from '@nestjs/common';

export class InsufficientFundsException extends HttpException {
  constructor() {
    super('Insufficient Funds', HttpStatus.PRECONDITION_FAILED);
  }
}
