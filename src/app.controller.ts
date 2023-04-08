import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

// CONTROLLER IS USED TO HANDLE ALL ROUTES FOR THE WHOLE APP
@Controller()

// EXPORT CONTROLLER TO BE USED IN OTHER MODULES
export class AppController {
  constructor(private readonly appService: AppService) {}
}
