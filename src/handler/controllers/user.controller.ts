import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ClassSerializerInterceptor,
  UseInterceptors,
  HttpException,
  HttpStatus,
  Headers,
} from '@nestjs/common';
import { UserService } from '../../application/services/user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { ApiBearerAuth, ApiNotFoundResponse, ApiTags } from '@nestjs/swagger';
import { CreatedUserDto } from '../dto/created-user.dto';
import { Roles } from '../roles.decorator';
import { JwtStrategy } from '../../auth/jwt.strategy';

@ApiTags('users')
@ApiBearerAuth()
@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtStrategy: JwtStrategy,
  ) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<CreatedUserDto> {
    const user = await this.userService.create(createUserDto).catch((err) => {
      throw new HttpException(
        {
          message: err.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    });

    return UserController.mapUserToCreatedUser(user);
  }

  @Get()
  async findAll(): Promise<CreatedUserDto[]> {
    const users = await this.userService.findAll();
    return users.map((user) => UserController.mapUserToCreatedUser(user));
  }

  @Get(':id')
  @ApiNotFoundResponse({ description: 'User Not Found' })
  async findOne(@Param('id') id: string): Promise<CreatedUserDto> {
    const user = await this.userService.findOne(+id);
    return UserController.mapUserToCreatedUser(user);
  }

  @Roles('admin', 'buyer', 'seller')
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Headers() headers,
  ) {
    const user = await this.userService
      .update(+id, updateUserDto, headers.user)
      .catch((err) => {
        throw new HttpException(
          {
            message: err.message,
          },
          HttpStatus.BAD_REQUEST,
        );
      });

    return UserController.mapUserToCreatedUser(user);
  }

  @Roles('admin', 'buyer', 'seller')
  @Delete(':id')
  remove(@Param('id') id: string, @Headers() headers) {
    return this.userService.remove(+id, headers.user);
  }

  private static mapUserToCreatedUser(user: CreateUserDto) {
    return new CreatedUserDto(
      user.id,
      user.username,
      user.password,
      user.deposit,
      user.role,
    );
  }
}
