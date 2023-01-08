import { Controller, Get, Header } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/object')
  @Header('Content-Type', 'text/html')
  getObject(): { name: string; age: number } {
    return { name: 'Enrico', age: 31 };
  }
}
