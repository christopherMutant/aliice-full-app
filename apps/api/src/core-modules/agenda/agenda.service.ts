import {
  Injectable,
  NotFoundException,
  NotImplementedException,
} from '@nestjs/common';
import { CreateAgendaDto } from './dto/create-agenda.dto';
import { UpdateAgendaDto } from './dto/update-agenda.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Agenda, User } from '../all-entities';
import { Brackets, Repository } from 'typeorm';
import { AppErrorMessages } from '../../constants/app-error-messages';
import { EntityNames } from '../../config/entity-names';
import { ConstantMessage } from '../../constants/constant-messages';
import { AgendaTransformer } from './transformer/agenda.transformer';
import { AgendaQueryListingDto } from './dto/agenda-list.dto';
import { GlobalHelper } from '../../config/app-global-helper';
import { AgendaResponseType } from './types/agenda-response.type';
import { AgendaInListTransformer } from './transformer/agenda-in-list.transformer';
import { AppointmentAgendaInListResponseType } from './types/agenda-in-list-response.type';
import { UserService } from '../user/user.service';

@Injectable()
export class AgendaService {
  constructor(
    @InjectRepository(Agenda)
    private readonly agendaRepository: Repository<Agenda>,
    private readonly userService: UserService,
  ) {}

  async create(
    createAgendaDto: CreateAgendaDto,
  ): Promise<AgendaResponseType> {
    const owner = await this.userService.findOne(
      createAgendaDto.owner,
    );
    const client = await this.userService.findOne(
      createAgendaDto.client,
    );

    // Auto create initials if no input was given
    const fullName = owner.firstName + ' ' + owner.lastName;
    const generatedInitials = GlobalHelper.getNameInitials(fullName);

    const title = createAgendaDto.title
      ? createAgendaDto.title
      : generatedInitials;

    try {
      const createAgenda = await this.agendaRepository.save({
        ...createAgendaDto,
        owner,
        client,
        title,
      });

      return await this.findOne(createAgenda.id);
    } catch (error) {
      throw new NotImplementedException(
        AppErrorMessages.database_error,
      );
    }
  }

  async findAll(
    agendaQueryListingDto: AgendaQueryListingDto,
    user: User,
  ): Promise<AgendaResponseType[]> {
    const agendaEntity = EntityNames.AGENDA;

    const queryBuilder = this.agendaRepository
      .createQueryBuilder(agendaEntity)
      .leftJoinAndSelect(`${agendaEntity}.owner`, `owner`)
      .leftJoinAndSelect(`${agendaEntity}.client`, `client`)
      .select([
        `${agendaEntity}.id`,
        `${agendaEntity}.name`,
        `${agendaEntity}.title`,
        `${agendaEntity}.color`,
        `owner.id`,
        `owner.firstName`,
        `owner.lastName`,
        `client.id`,
        `client.firstName`,
        `client.lastName`,
        `${agendaEntity}.disabled`,
        `${agendaEntity}.remark`,
      ]);

    if (!GlobalHelper.checkAdmin(user)) {
      queryBuilder.andWhere(
        new Brackets(qb => {
          qb.where(`owner.id = :id`, {
            id: `${user.id}`,
          }).orWhere(`client.id = :id`, {
            id: `${user.id}`,
          });
        }),
      );
    }

    if (agendaQueryListingDto.search) {
      queryBuilder.andWhere(
        new Brackets(qb => {
          qb.where(`${agendaEntity}.name ILIKE :search`, {
            search: `%${agendaQueryListingDto.search}%`,
          })
            .orWhere(`${agendaEntity}.initials ILIKE :search`, {
              search: `%${agendaQueryListingDto.search}%`,
            })
            .orWhere(`${agendaEntity}.status ILIKE :search`, {
              search: `%${agendaQueryListingDto.search}%`,
            })
            .orWhere(`${agendaEntity}.remark ILIKE :search`, {
              search: `%${agendaQueryListingDto.search}%`,
            })
            .orWhere(`owner.lastName ILIKE :search`, {
              search: `%${agendaQueryListingDto.search}%`,
            })
            .orWhere(`owner.email ILIKE :search`, {
              search: `%${agendaQueryListingDto.search}%`,
            })
            .orWhere(`client.firstName ILIKE :search`, {
              search: `%${agendaQueryListingDto.search}%`,
            })
            .orWhere(`client.lastName ILIKE :search`, {
              search: `%${agendaQueryListingDto.search}%`,
            })
            .orWhere(`client.email ILIKE :search`, {
              search: `%${agendaQueryListingDto.search}%`,
            })
            .orWhere(`owner.firstName ILIKE :search`, {
              search: `%${agendaQueryListingDto.search}%`,
            });
        }),
      );
    }
    const agendas = await queryBuilder.getMany();

    return agendas.map(
      (agenda: Agenda) => new AgendaTransformer(agenda),
    );
  }

  async findAllList(): Promise<
    AppointmentAgendaInListResponseType[]
  > {
    const agendas = await this.agendaRepository.find();
    return agendas.map(agenda => new AgendaInListTransformer(agenda));
  }

  async findOne(id: string): Promise<Agenda> {
    const agenda = await this.agendaRepository.findOne({
      where: { id },
      relations: {
        owner: true,
        client: true,
      },
      select: {
        id: true,
        name: true,
        title: true,
        color: true,
        owner: {
          id: true,
          firstName: true,
          lastName: true,
        },
        client: {
          id: true,
          firstName: true,
          lastName: true,
        },
        status: true,
        disabled: true,
        remark: true,
      },
    });

    if (!agenda) {
      throw new NotFoundException(ConstantMessage.AGENDA_NOT_FOUND);
    }

    return agenda;
  }
  async update(
    id: string,
    updateAgendaDto: UpdateAgendaDto,
  ): Promise<void> {
    const agenda = await this.findOne(id);
    const owner = await this.userService.findOne(
      updateAgendaDto.owner,
    );
    const client = await this.userService.findOne(
      updateAgendaDto.client,
    );

    try {
      await this.agendaRepository.save({
        id: agenda.id,
        ...updateAgendaDto,
        owner,
        client,
      });
    } catch (error) {
      throw new NotImplementedException(
        AppErrorMessages.database_error,
      );
    }
  }

  async remove(id: string): Promise<void> {
    const agenda = await this.findOne(id);
    await this.agendaRepository.softRemove({
      id: agenda.id,
    });
  }
}
