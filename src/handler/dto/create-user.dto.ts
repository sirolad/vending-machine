import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  Matches,
  MaxLength,
  MinLength,
  Validate,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../../domain/enum/role.enum';
import { CreateUserInterface } from '../../domain/interfaces/create-user.interface';
import { IsValidCoin } from 'src/infrastructure/validators/is-valid-coin.validator';

export class CreateUserDto implements CreateUserInterface {
  public id?: number;
  @IsNotEmpty()
  @ApiProperty({
    description: 'Name of the user',
    example: 'John Doe',
  })
  public username: string;

  @IsString()
  @MinLength(6)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\w+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password too weak',
  })
  @ApiProperty({ description: 'Password of the user', example: 'Secrets' })
  public password: string;

  @IsNumber()
  @Validate(IsValidCoin, { message: 'Only Valid coins are allowed.' })
  @ApiProperty({ description: 'Number of deposit amount', example: 100 })
  public deposit: number;

  @IsEnum(Role)
  @ApiProperty({
    description: 'User Role',
    example: Role.Buyer,
  })
  public role: Role;

  constructor(
    id: number,
    username: string,
    password: string,
    deposit: number,
    role: Role,
  ) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.deposit = deposit;
    this.role = role;
  }
}
