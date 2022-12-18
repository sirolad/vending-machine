import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  Req,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ProductService } from 'src/application/services/product.service';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { Roles } from '../roles.decorator';
import { Role } from '../../domain/enum/role.enum';

@ApiTags('products')
@ApiBearerAuth()
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @Roles(Role.Seller)
  create(@Body() createProductDto: CreateProductDto, @Req() request: Request) {
    return this.productService
      .create(createProductDto, request.headers)
      .catch((err) => {
        throw new HttpException(
          {
            message: err.message,
          },
          HttpStatus.BAD_REQUEST,
        );
      });
  }

  @Get()
  @Roles(Role.Admin, Role.Seller)
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  @Roles(Role.Admin, Role.Seller)
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @Patch(':id')
  @Roles(Role.Admin, Role.Seller)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateProductDto) {
    return this.productService.update(+id, updateUserDto).catch((err) => {
      throw new HttpException(
        {
          message: err.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    });
  }

  @Delete(':id')
  @Roles(Role.Admin, Role.Seller)
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
