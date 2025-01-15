import { Module } from '@nestjs/common';
import { AgendaService } from './agenda.service';
import { AgendaController } from './agenda.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Agenda } from '../all-entities';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Agenda]), UserModule],
  controllers: [AgendaController],
  providers: [AgendaService],
  exports: [AgendaService],
})
export class AgendaModule {}
