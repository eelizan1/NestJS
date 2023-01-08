import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products') // url: host/products
export class ProductsController {
  // private and readonly to ensure we can't replace the productService value
  constructor(private readonly productServce: ProductsService) {}

  @Post() // post request and return type of 'any'
  public async addProduct(
    @Body('title') prodTitle: string, // specify json property values from request
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number,
  ) {
    const generatedId = await this.productServce.insertProduct(
      prodTitle,
      prodDesc,
      prodPrice,
    );
    return { id: generatedId };
  }

  @Get()
  public async getAllProducts() {
    return await this.productServce.getProducts();
  }

  @Get(':id') // specify param name and use @Param to get the param id
  public getProduct(@Param('id') prodId: string) {
    return this.productServce.getProduct(prodId);
  }

  @Patch(':id')
  public async updateProduct(
    @Param('id') prodId: string,
    @Body('title') prodTitle: string, // specify json property values from request
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number,
  ) {
    return await this.productServce.updateProduct(
      prodId,
      prodTitle,
      prodDesc,
      prodPrice,
    );
  }

  @Delete(':id')
  public async removeProduct(@Param('id') prodId: string) {
    await this.productServce.deleteProduct(prodId);
    return 'Item has been deleted';
  }
}
