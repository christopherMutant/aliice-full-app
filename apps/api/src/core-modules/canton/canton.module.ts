import { Module } from '@nestjs/common';
import { CantonService } from './canton.service';
import { CantonController } from './canton.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Canton } from '../all-entities';

@Module({
  imports: [TypeOrmModule.forFeature([Canton])],
  controllers: [CantonController],
  providers: [CantonService],
  exports: [CantonService],
})
export class CantonModule {}
