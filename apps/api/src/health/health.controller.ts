import { Controller, Get } from '@nestjs/common';
export interface Version {
  version: string;
}

@Controller('health')
export class HealthController {
  @Get('')
  checkVersion(): Version {
    return { version: '1.0.0' };
  }
}
