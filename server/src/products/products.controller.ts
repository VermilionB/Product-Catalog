import {Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import {AuthGuard} from "@nestjs/passport";
import {Roles, RolesGuard} from "../auth/decorators/role.decorator";
import {Role} from "../auth/enum/role.enum";

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.AUser)
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll(
      @Query('searchTerm') searchTerm: string = '',
      @Query('categoryId') categoryId: number,
      @Query('minPrice') minPrice: number = 0,
      @Query('maxPrice') maxPrice: number = Number.MAX_SAFE_INTEGER
  ) {
    return this.productsService.findAll(searchTerm, categoryId, minPrice, maxPrice);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.AUser)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.AUser)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
