import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ProductSchema } from './product.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }]), // bundle the product schema
  ],
  controllers: [ProductsController], // bundle the controller and service in module
  providers: [ProductsService],
})
export class ProductModule {}
