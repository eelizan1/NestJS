import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

@Module({
  controllers: [ProductsController], // bundle the controller and service in module
  providers: [ProductsService],
})
export class ProductModule {}
