import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    description: 'user login name',
    example: 'username',
  })
  public username: string;

  @ApiProperty({
    description: 'user password',
    example: 'Secrets',
  })
  public password: string;
}
