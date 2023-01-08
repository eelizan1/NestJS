import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './products/products.module';

@Module({
  imports: [ProductModule], // add modules here
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
