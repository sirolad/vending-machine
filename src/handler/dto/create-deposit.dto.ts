import { IsNumber, Validate } from 'class-validator';
import { IsValidCoin } from '../../infrastructure/validators/is-valid-coin.validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateDepositInterface } from '../../domain/interfaces/create-deposit.interface';

export class CreateDepositDto implements CreateDepositInterface {
  @IsNumber()
  @Validate(IsValidCoin, { message: 'Only Valid coins are allowed.' })
  @ApiProperty({ description: 'Number of deposit amount', example: 100 })
  public deposit: number;

  constructor(deposit: number) {
    this.deposit = deposit;
  }
}
