import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
  NotImplementedException,
} from '@nestjs/common';
import { CreateMedicalNoteDto } from './dto/create-medical-note.dto';
import { UpdateMedicalNoteDto } from './dto/update-medical-note.dto';
import { InjectRepository } from '@nestjs/typeorm';
import {
  MedicalNote,
  MedicalNoteAp,
  MedicalNoteHistory,
  MedicalNoteOf,
  User,
} from '../all-entities';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { AppErrorMessages } from '../../constants/app-error-messages';
import { UpdateMedicalNoteChildDto } from './dto/update-medical-note-child.dto';
import { MedicalNoteNotes } from './entities/medical-note-notes.entity';
import { MedicalNoteTypes } from '../../shared/types/enums';
import { MedicalNoteResponseType } from './types/medical-note-response.type';
import { MedicalNoteHistoryResponseType } from './types/medical-note-history-response.type';

@Injectable()
export class MedicalNoteService {
  selectColumnsForMedicalNotes = {
    id: true,
    automaticallyDisplayWindow: true,
    ap: {
      id: true,
      value: true,
    },
    of: {
      id: true,
      value: true,
    },
    notes: {
      id: true,
      value: true,
    },
    patient: {
      id: true,
      firstName: true,
      lastName: true,
    },
  };
  constructor(
    @InjectRepository(MedicalNote)
    private readonly medicalNoteRepository: Repository<MedicalNote>,
    @InjectRepository(MedicalNoteAp)
    private readonly medicalNoteApRepository: Repository<MedicalNoteAp>,
    @InjectRepository(MedicalNoteOf)
    private readonly medicalNoteOfRepository: Repository<MedicalNoteOf>,
    @InjectRepository(MedicalNoteNotes)
    private readonly medicalNoteNotesRepository: Repository<MedicalNoteNotes>,
    @InjectRepository(MedicalNoteHistory)
    private readonly medicalNoteHistoryRepository: Repository<MedicalNoteHistory>,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}

  //auto create medical note when user is created through userService.create
  async create(
    createMedicalNoteDto: CreateMedicalNoteDto,
    user: User,
  ): Promise<MedicalNoteResponseType> {
    const patient = await this.userService.findOne(
      createMedicalNoteDto.patient,
    );

    try {
      const medicalNote = await this.medicalNoteRepository.save({
        patient,
        automaticallyDisplayWindow:
          createMedicalNoteDto.automaticallyDisplayWindow || false,
        ap: {},
        of: {},
        notes: {},
      });

      //saving first record of history per medical note type

      //for AP
      await this.medicalNoteHistoryRepository.save({
        medicalNoteRelation: {
          relatedObject: medicalNote.ap.id,
          relatedType: MedicalNoteTypes.AP,
        },
        modifiedFrom: user || null,
        modifiedBy: new Date(),
        medicalNote,
      });

      //for OF
      await this.medicalNoteHistoryRepository.save({
        medicalNoteRelation: {
          relatedObject: medicalNote.of.id,
          relatedType: MedicalNoteTypes.OF,
        },
        modifiedFrom: user || null,
        modifiedBy: new Date(),
        medicalNote,
      });

      //for Notes
      await this.medicalNoteHistoryRepository.save({
        medicalNoteRelation: {
          relatedObject: medicalNote.notes.id,
          relatedType: MedicalNoteTypes.NOTES,
        },
        modifiedFrom: user || null,
        modifiedBy: new Date(),
        medicalNote,
      });

      return await this.findOne(medicalNote.id);
    } catch (error) {
      throw new NotImplementedException(
        AppErrorMessages.database_error,
      );
    }
  }

  async findAllHistory(
    id: string,
  ): Promise<MedicalNoteHistoryResponseType[]> {
    const medicalNoteChild = await this.findOneMedicalNoteChild(
      id,
    )[0];

    const histories = await this.medicalNoteHistoryRepository.find({
      where: {
        medicalNoteRelation: { relatedObject: medicalNoteChild.id },
      },
      relations: { modifiedFrom: true },
      select: {
        id: true,
        modifiedBy: true,
        modifiedFrom: {
          id: true,
          firstName: true,
          lastName: true,
        },
        value: true,
      },
      order: { modifiedBy: 'ASC' },
    });

    return histories;
  }

  async findOne(id: string): Promise<MedicalNoteResponseType> {
    const medicalNote = await this.medicalNoteRepository.findOne({
      where: { id },
      relations: { ap: true, of: true, notes: true, patient: true },
      select: this.selectColumnsForMedicalNotes,
    });

    if (!medicalNote) {
      throw new NotFoundException();
    }

    return medicalNote;
  }

  async findOneByPatientId(
    id: string,
  ): Promise<MedicalNoteResponseType> {
    const patient = await this.userService.findOne(id);

    const medicalNote = await this.medicalNoteRepository.findOne({
      where: { patient: { id: patient.id } },
      relations: { ap: true, of: true, notes: true, patient: true },
      select: this.selectColumnsForMedicalNotes,
    });

    if (!medicalNote) {
      throw new NotFoundException();
    }

    return medicalNote;
  }

  async findOneMedicalNoteChild(
    id: string,
  ): Promise<
    [
      MedicalNoteAp | MedicalNoteOf | MedicalNoteNotes,
      MedicalNoteTypes,
    ]
  > {
    let medicalNoteChild = await this.medicalNoteApRepository.findOne(
      { where: { id } },
    );
    let type = MedicalNoteTypes.AP;

    if (!medicalNoteChild) {
      medicalNoteChild = await this.medicalNoteOfRepository.findOne({
        where: { id },
      });
      type = MedicalNoteTypes.OF;
    }

    if (!medicalNoteChild) {
      medicalNoteChild =
        await this.medicalNoteNotesRepository.findOne({
          where: { id },
        });
      type = MedicalNoteTypes.NOTES;
    }

    if (!medicalNoteChild) {
      throw new NotFoundException();
    }

    return [medicalNoteChild, type];
  }

  async update(
    id: string,
    updateMedicalNoteDto: UpdateMedicalNoteDto,
  ): Promise<void> {
    const medicalNote = await this.findOne(id);

    try {
      await this.medicalNoteApRepository.save({
        ...medicalNote,
        ...updateMedicalNoteDto,
      });
    } catch (error) {
      throw new NotImplementedException(
        AppErrorMessages.database_error,
      );
    }
  }

  async updateChild(
    id: string,
    updateMedicalNoteChildDto: UpdateMedicalNoteChildDto,
    user: User,
  ): Promise<void> {
    const [medicalNoteChild, type] =
      await this.findOneMedicalNoteChild(id);

    try {
      switch (type) {
        case MedicalNoteTypes.AP:
          await this.medicalNoteApRepository.save({
            ...medicalNoteChild,
            ...updateMedicalNoteChildDto,
          });
          break;

        case MedicalNoteTypes.OF:
          await this.medicalNoteOfRepository.save({
            ...medicalNoteChild,
            ...updateMedicalNoteChildDto,
          });
          break;

        case MedicalNoteTypes.NOTES:
          await this.medicalNoteNotesRepository.save({
            ...medicalNoteChild,
            ...updateMedicalNoteChildDto,
          });
          break;

        default:
          throw new NotImplementedException(
            'Invalid medical note type',
          );
      }

      await this.medicalNoteHistoryRepository.save({
        medicalNoteRelation: {
          relatedObject: medicalNoteChild.id,
          relatedType: type,
        },
        modifiedFrom: user,
        modifiedBy: new Date(),
        ...updateMedicalNoteChildDto,
        medicalNote: medicalNoteChild.medicalNote,
      });
    } catch (error) {
      throw new NotImplementedException(
        AppErrorMessages.database_error,
      );
    }
  }
}
