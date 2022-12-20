import {
  IsEnum,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../../../domain/enum/role.enum';
import { CreateUserInterface } from '../../../domain/interfaces/user';

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

  @IsEnum(Role)
  @ApiProperty({
    description: 'User Role',
    example: Role.Buyer,
  })
  public role: Role;

  constructor(id: number, username: string, password: string, role: Role) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.role = role;
  }
}
