import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ClassSerializerInterceptor,
  UseInterceptors,
  SetMetadata,
} from '@nestjs/common';
import { UserService } from '../../application/services/user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { ApiNotFoundResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { CreatedUserDto } from '../dto/created-user.dto';
import { Roles } from '../roles.decorator';
import { RolesGuard } from '../guards/roles.guard';

@ApiTags('users')
@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<CreatedUserDto> {
    const user = await this.userService.create(createUserDto);
    return UserController.mapUserToCreatedUser(user);
  }

  @Get()
  async findAll(): Promise<CreatedUserDto[]> {
    const users = await this.userService.findAll();
    return users.map((user) => UserController.mapUserToCreatedUser(user));
  }

  @Get(':id')
  @Roles('buyer')
  @ApiNotFoundResponse({ description: 'User Not Found' })
  async findOne(@Param('id') id: string): Promise<CreatedUserDto> {
    const user = await this.userService.findOne(+id);
    return UserController.mapUserToCreatedUser(user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const user = await this.userService.update(+id, updateUserDto);

    return UserController.mapUserToCreatedUser(user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  private static mapUserToCreatedUser(user: CreateUserDto) {
    return new CreatedUserDto(
      user.username,
      user.password,
      user.deposit,
      user.role,
    );
  }
}
