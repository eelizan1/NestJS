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
import { Product } from './product.model';

@Controller('products') // url: host/products
export class ProductsController {
  // private and readonly to ensure we can't replace the productService value
  constructor(private readonly productServce: ProductsService) {}

  @Post() // post request and return type of 'any'
  public addProduct(
    @Body('title') prodTitle: string, // specify json property values from request
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number,
  ): { id: string } {
    const generatedId = this.productServce.insertProduct(
      prodTitle,
      prodDesc,
      prodPrice,
    );
    return { id: generatedId };
  }

  @Get()
  public getAllProducts(): Product[] {
    return this.productServce.getProducts();
  }

  @Get(':id') // specify param name and use @Param to get the param id
  public getProduct(@Param('id') prodId: string): Product {
    return this.productServce.getProduct(prodId);
  }

  @Patch(':id')
  public updateProduct(
    @Param('id') prodId: string,
    @Body('title') prodTitle: string, // specify json property values from request
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number,
  ): Product {
    return this.productServce.updateProduct(
      prodId,
      prodTitle,
      prodDesc,
      prodPrice,
    );
  }

  @Delete(':id')
  public removeProduct(@Param('id') prodId: string) {
    return this.productServce.deleteProduct(prodId);
  }
}
