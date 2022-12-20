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
  Headers,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ProductService } from 'src/application/services/product.service';
import {
  CreateProductDto,
  CreatedProductDto,
  PurchaseDto,
} from '../dto/product';
import { UpdateProductDto } from '../dto/product';
import { Roles } from '../decorators/roles.decorator';
import { Role } from '../../domain/enum/role.enum';
import { CreateProductInterface } from '../../domain/interfaces/product';

@ApiTags('products')
@ApiBearerAuth()
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @Roles(Role.Seller)
  create(@Body() createProductDto: CreateProductDto, @Headers() headers) {
    return this.productService
      .create(createProductDto, headers.user)
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
  async findAll(): Promise<CreatedProductDto[]> {
    const products = await this.productService.findAll();
    return products.map((product) =>
      ProductController.mapProductToCreatedProduct(product),
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<CreatedProductDto> {
    const product = await this.productService.findOne(+id);
    return ProductController.mapProductToCreatedProduct(product);
  }

  @Patch(':id')
  @Roles(Role.Admin, Role.Seller)
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateProductDto,
    @Headers() headers,
  ): Promise<CreatedProductDto> {
    const product = await this.productService
      .update(+id, updateUserDto, headers.user)
      .catch((err) => {
        throw new HttpException(
          {
            message: err.message,
          },
          HttpStatus.BAD_REQUEST,
        );
      });

    return ProductController.mapProductToCreatedProduct(product);
  }

  @Delete(':id')
  @Roles(Role.Admin, Role.Seller)
  async remove(@Param('id') id: string, @Headers() headers) {
    return this.productService.remove(+id, headers.user);
  }

  @Post(':id/buy')
  @Roles(Role.Buyer)
  async buyProduct(
    @Param('id') id: string,
    @Body() purchaseDto: PurchaseDto,
    @Headers() headers,
  ) {
    return this.productService.buy(+id, purchaseDto, headers.user);
  }

  private static mapProductToCreatedProduct(
    product: CreateProductInterface,
  ): CreatedProductDto {
    return new CreatedProductDto(
      product.id,
      product.amountAvailable,
      product.cost,
      product.name,
      product.user.id,
    );
  }
}
