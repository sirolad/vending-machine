import { PurchaseInterface } from '../../../domain/interfaces/product/purchase.interface';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Min } from 'class-validator';

export class PurchaseDto implements PurchaseInterface {
  @IsNumber()
  @Min(1)
  @ApiProperty({ description: 'amount of purchase ' })
  amount: number;

  constructor(amount: number) {
    this.amount = amount;
  }
}
