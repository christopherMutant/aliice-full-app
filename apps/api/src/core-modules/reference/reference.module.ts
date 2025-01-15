import { Module } from '@nestjs/common';
import { ReferenceService } from './reference.service';
import { ReferenceController } from './reference.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reference } from '../all-entities';

@Module({
  imports: [TypeOrmModule.forFeature([Reference])],
  controllers: [ReferenceController],
  providers: [ReferenceService],
})
export class ReferenceModule {}
