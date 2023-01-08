import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './products/products.module';
import { MongooseModule } from '@nestjs/mongoose';

import dotenv from 'dotenv';

@Module({
  imports: [
    ProductModule,
    MongooseModule.forRoot(
      'mongodb+srv://eelizanjr:BOYboy12!@cluster0.oevrzhf.mongodb.net/nestjs-demo?retryWrites=true&w=majority',
    ),
  ], // add modules here
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
