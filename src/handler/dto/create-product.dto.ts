import { CreateProductInterface } from '../../domain/interfaces/create-product.interface';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../domain/user';

export class CreateProductDto implements CreateProductInterface {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: 'Amount of product available',
    example: 5,
  })
  public amountAvailable: number;

  @IsNumber()
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

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Id of Seller',
    example: 1,
  })
  public sellerId: User;

  constructor(
    amountAvailable: number,
    cost: number,
    name: string,
    sellerId: User,
  ) {
    this.amountAvailable = amountAvailable;
    this.cost = cost;
    this.name = name;
    this.sellerId = sellerId;
  }
}
