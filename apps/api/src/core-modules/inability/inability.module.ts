import { Module } from '@nestjs/common';
import { InabilityService } from './inability.service';
import { InabilityController } from './inability.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Inability } from './entities/inability.entity';
import { CheckupModule } from '../checkup/checkup.module';

@Module({
  imports: [TypeOrmModule.forFeature([Inability]), CheckupModule],
  controllers: [InabilityController],
  providers: [InabilityService],
  exports: [InabilityService],
})
export class InabilityModule {}
