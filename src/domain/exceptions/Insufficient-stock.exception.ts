import { HttpException, HttpStatus } from '@nestjs/common';

export class InsufficientStockException extends HttpException {
  constructor() {
    super('Not Sufficient Stock Available', HttpStatus.CONFLICT);
  }
}
