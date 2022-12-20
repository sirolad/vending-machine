import { CreateProductInterface } from '../../../domain/interfaces/product/create-product.interface';
import { IsNotEmpty, IsNumber, IsString, Validate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsMultipleFive } from '../../../infrastructure/validators/is-multiple-5.validator';

export class CreateProductDto implements CreateProductInterface {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: 'Amount of product available',
    example: 5,
  })
  public amountAvailable: number;

  @IsNumber()
  @Validate(IsMultipleFive, { message: 'Cost should be a multiple of 5' })
  @ApiProperty({
    description: 'The cost of product (Multiples of 5 only)',
    example: 200,
  })
  public cost: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'The name of the product',
    example: 'X BOX One',
  })
  public name: string;

  constructor(amountAvailable: number, cost: number, name: string) {
    this.amountAvailable = amountAvailable;
    this.cost = cost;
    this.name = name;
  }
}
