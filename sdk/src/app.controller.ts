import { Controller, Get, Query } from '@nestjs/common';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('rss')
  getRSS(@Query('path') path: string): string {
    return this.appService.getRSS(path);
  }
}
