import { forwardRef, Module } from '@nestjs/common';
import { MedicalNoteService } from './medical-note.service';
import { MedicalNoteController } from './medical-note.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  MedicalNote,
  MedicalNoteAp,
  MedicalNoteHistory,
  MedicalNoteHistoryRelation,
  MedicalNoteNotes,
  MedicalNoteOf,
} from '../all-entities';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      MedicalNote,
      MedicalNoteAp,
      MedicalNoteOf,
      MedicalNoteNotes,
      MedicalNoteHistory,
      MedicalNoteHistoryRelation,
    ]),
    forwardRef(() => UserModule),
  ],
  controllers: [MedicalNoteController],
  providers: [MedicalNoteService],
  exports: [MedicalNoteService],
})
export class MedicalNoteModule {}
