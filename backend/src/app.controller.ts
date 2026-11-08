import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service.js';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('health')
  getHealth() {
    return this.appService.getHealth();
  }

  @Get('dashboard/summary')
  getDashboardSummary() {
    return this.appService.getDashboardSummary();
  }

  @Get('inventory')
  getInventory() {
    return this.appService.getInventory();
  }

  @Get('customers')
  getCustomers() {
    return this.appService.getCustomers();
  }

  @Get('documents')
  getDocuments() {
    return this.appService.getDocuments();
  }

  @Get('reports/gst')
  getGstReport() {
    return this.appService.getGstReport();
  }
}
