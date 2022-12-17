import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ProductService } from 'src/application/services/product.service';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { Roles } from '../roles.decorator';

@ApiTags('products')
@ApiBearerAuth()
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get()
  @Roles('admin', 'buyer', 'seller')
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  @Roles('admin', 'buyer', 'seller')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @Patch(':id')
  @Roles('admin', 'buyer', 'seller')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateProductDto) {
    return this.productService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @Roles('admin', 'buyer', 'seller')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
