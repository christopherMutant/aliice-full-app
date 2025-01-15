import {
  Injectable,
  NotFoundException,
  NotImplementedException,
} from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import {
  AboutAppointmentResponseType,
  AppointmentResponseType,
} from './types/appointment-response.type';
import { InjectRepository } from '@nestjs/typeorm';
import {
  AboutAppointment,
  Agenda,
  Appointment,
  AppointmentStatus,
  User,
} from '../all-entities';
import { Brackets, Repository } from 'typeorm';
import { AppointmentTransformer } from './transformer/appointment.transformer';
import {
  AppointmentQueryListingDto,
  OrderBy,
} from './dto/appointment-list.dto';
import { EntityNames } from '../../config/entity-names';
import { ConstantMessage } from '../../constants/constant-messages';
import { GlobalHelper } from '../../config/app-global-helper';
import { PaginatedAppointmentType } from './types/appointment-list.type';
import { AppErrorMessages } from '../../constants/app-error-messages';
import { PaginationDto } from '../../shared/dtos/pagination.dto';
import { PaginatedUserType } from '../user/types/user-list.type';
import { UserTransformer } from '../user/transformers/user.transformer';
import { AppointmentCategoryService } from '../appointment-category/appointment-category.service';
import { AppointmentStatusService } from '../appointment-status/appointment-status.service';
import {
  AppointmentIntervalUnits,
  apppointmentOrderByStatement,
  DefaultAppointmentStatus,
  RruleFreq,
} from '../../shared/types/enums';
import { AgendaService } from '../agenda/agenda.service';
import { RRule, rrulestr, RRuleSet } from 'rrule';
import { AppointmentOccurrence } from './entities/appointment_occurrence.entity';
import { occurrenceInterface } from './types/occurence.interface.type';
import { AppointmentCalendarResponseType } from './types/appointment-calendar-response.type';
import { CreateAboutAppointmentDto } from './dto/create-about-appointment.dto';
import { AboutAppointmentTransformer } from './transformer/about-appointment.transformer';
import { UserService } from '../user/user.service';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentRepository: Repository<Appointment>,
    @InjectRepository(AboutAppointment)
    private readonly aboutAppointmentRepository: Repository<AboutAppointment>,
    @InjectRepository(AppointmentOccurrence)
    private readonly appointmentOccurenceRepository: Repository<AppointmentOccurrence>,
    private readonly userService: UserService,
    private readonly agendaService: AgendaService,
    private readonly appointmentCategoryService: AppointmentCategoryService,
    private readonly appointmentStatusService: AppointmentStatusService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Agenda)
    private readonly agendaRepository: Repository<Agenda>,
  ) {}

  async create(
    createAppointmentDto: CreateAppointmentDto,
  ): Promise<AppointmentResponseType> {
    // setting 1hr appointments by default if no duration is given
    if (!createAppointmentDto.duration) {
      createAppointmentDto.duration = 60;
    }

    //makes sure department, patient, doctor, categoy, status are all valid
    const patient = createAppointmentDto.patient
      ? await this.userService.findOne(createAppointmentDto.patient)
      : null;

    const doctor = createAppointmentDto.doctor
      ? await this.userService.findOne(createAppointmentDto.doctor)
      : null;
    const department = doctor ? doctor.department : null;
    const agendas = await this.getAgendas(
      createAppointmentDto.agendas,
    );

    const category = createAppointmentDto.category
      ? await this.appointmentCategoryService.findOne(
          createAppointmentDto.category,
        )
      : null;

    const status = await this.validateStatus(
      createAppointmentDto.status,
    );

    const {
      description,
      start,
      duration,
      title,
      notes,
      isRepeating,
      interval,
      intervalUnit,
      until,
      includeWeekend,
    } = createAppointmentDto;

    // ignore count if until date is given
    const count = !until ? createAppointmentDto.count : null;

    const end = this.getAppointmentEnd(start, duration);

    const rrule = this.generateRrule(
      isRepeating,
      intervalUnit,
      start,
      interval,
      until,
      count,
      includeWeekend,
    );

    const occurrences = this.generateOccurences(
      rrule,
      duration,
      status,
    );

    try {
      const createAppointment = await this.appointmentRepository.save(
        {
          patient,
          doctor,
          department,
          status,
          description,
          start,
          end,
          notes,
          isRepeating,
          rrule,
          aboutAppointment: { title, category, duration, agendas },
          occurrences,
        },
      );

      return new AppointmentTransformer(
        await this.validateAppointment(createAppointment.id),
      );
    } catch (error) {
      throw new NotImplementedException(
        AppErrorMessages.database_error,
      );
    }
  }

  async findAllList(
    appointmentQueryListingDto: AppointmentQueryListingDto,
    user: User,
  ): Promise<PaginatedAppointmentType> {
    const { limit, offset } = GlobalHelper.getPaginationLimitOffSet(
      appointmentQueryListingDto.limit,
      appointmentQueryListingDto.offset,
    );

    const appointmentEntity = EntityNames.APPOINTMENT;
    const departmentEntity = EntityNames.DEPARTMENTS;
    const appointmentStatusEntity = EntityNames.APPOINTMENT_STATUS;
    const aboutAppointmentEntity = EntityNames.ABOUT_APPOINTMENT;
    const appointmentCategoryEntity =
      EntityNames.APPOINTMENT_CATEGORY;
    const agendaEntity = EntityNames.AGENDA;
    const appointmentOccurenceEntity =
      EntityNames.APPOINTMENT_OCCURRENCE;

    const queryBuilder = this.appointmentRepository
      .createQueryBuilder(appointmentEntity)
      .leftJoinAndSelect(`${appointmentEntity}.patient`, `patient`)
      .leftJoinAndSelect(`${appointmentEntity}.doctor`, `doctor`)
      .leftJoinAndSelect(
        `${appointmentEntity}.department`,
        `${departmentEntity}`,
      )
      .leftJoinAndSelect(
        `${appointmentEntity}.status`,
        `${appointmentStatusEntity}`,
      )
      .leftJoinAndSelect(
        `${appointmentEntity}.aboutAppointment`,
        `${aboutAppointmentEntity}`,
      )
      .leftJoinAndSelect(
        `${aboutAppointmentEntity}.category`,
        `${appointmentCategoryEntity}`,
      )
      .leftJoinAndSelect(
        `${aboutAppointmentEntity}.agendas`,
        `${agendaEntity}`,
      )
      .leftJoinAndSelect(
        `${appointmentEntity}.occurrences`,
        `${appointmentOccurenceEntity}`,
      )
      .leftJoinAndSelect(
        `${appointmentOccurenceEntity}.status`,
        `status`,
      )
      .select([
        `${appointmentEntity}.id`,
        `${appointmentEntity}.start`,
        `${appointmentEntity}.end`,
        `${appointmentEntity}.description`,
        `${appointmentEntity}.notes`,
        `${appointmentEntity}.isRepeating`,
        `${appointmentEntity}.rrule`,
        `patient.id`,
        `patient.firstName`,
        `patient.lastName`,
        `doctor.id`,
        `doctor.firstName`,
        `doctor.lastName`,
        `${departmentEntity}.id`,
        `${departmentEntity}.name`,
        `${appointmentStatusEntity}.id`,
        `${appointmentStatusEntity}.name`,
        `${appointmentStatusEntity}.icon`,
        `${aboutAppointmentEntity}.id`,
        `${aboutAppointmentEntity}.title`,
        `${aboutAppointmentEntity}.duration`,
        `${agendaEntity}.id`,
        `${agendaEntity}.name`,
        `${agendaEntity}.title`,
        `${agendaEntity}.color`,
        `${appointmentCategoryEntity}.id`,
        `${appointmentCategoryEntity}.name`,
        `${appointmentCategoryEntity}.color`,
        `${appointmentOccurenceEntity}.id`,
        `${appointmentOccurenceEntity}.start`,
        `${appointmentOccurenceEntity}.end`,
        `${appointmentOccurenceEntity}.duration`,
        `${appointmentOccurenceEntity}.notes`,
        `status.id`,
        `status.name`,
        `status.icon`,
      ])
      .skip(offset)
      .take(limit)
      .orderBy(
        this.getOrderByStatement(appointmentQueryListingDto.orderBy),
        appointmentQueryListingDto.sort,
      );

    /** By this check it means only logged in patient or doctor's appointments will be returned */
    if (
      !GlobalHelper.checkAdmin(user) &&
      !appointmentQueryListingDto.agendas
    ) {
      queryBuilder.andWhere(
        new Brackets(qb => {
          qb.where(`doctor.id = :id`, {
            id: `${user.id}`,
          }).orWhere(`patient.id = :id`, {
            id: `${user.id}`,
          });
        }),
      );
    }

    /**By this check only appointments with related agenda IDs will be returned */
    if (appointmentQueryListingDto.agendas) {
      queryBuilder.andWhere(`${agendaEntity}.id IN (:...id)`, {
        id: appointmentQueryListingDto.agendas,
      });
    }

    if (appointmentQueryListingDto.status) {
      queryBuilder.andWhere(
        `${appointmentStatusEntity}.id IN (:...id)`,
        {
          id: appointmentQueryListingDto.status,
        },
      );
    }

    if (appointmentQueryListingDto.category) {
      queryBuilder.andWhere(
        `${appointmentCategoryEntity}.id IN (:...id)`,
        {
          id: appointmentQueryListingDto.category,
        },
      );
    }

    if (appointmentQueryListingDto.search) {
      queryBuilder.andWhere(
        new Brackets(qb => {
          qb.where(`doctor.firstName ILIKE :search`, {
            search: `%${appointmentQueryListingDto.search}%`,
          })
            .orWhere(`doctor.lastName ILIKE :search`, {
              search: `%${appointmentQueryListingDto.search}%`,
            })
            .orWhere(`doctor.email ILIKE :search`, {
              search: `%${appointmentQueryListingDto.search}%`,
            })
            .orWhere(`patient.firstName ILIKE :search`, {
              search: `%${appointmentQueryListingDto.search}%`,
            })
            .orWhere(`patient.lastName ILIKE :search`, {
              search: `%${appointmentQueryListingDto.search}%`,
            })
            .orWhere(`patient.email ILIKE :search`, {
              search: `%${appointmentQueryListingDto.search}%`,
            })
            .orWhere(`${departmentEntity}.name ILIKE :search`, {
              search: `%${appointmentQueryListingDto.search}%`,
            })
            .orWhere(
              `${appointmentEntity}.description ILIKE :search`,
              {
                search: `%${appointmentQueryListingDto.search}%`,
              },
            )
            .orWhere(
              `${aboutAppointmentEntity}.title ILIKE :search`,
              {
                search: `%${appointmentQueryListingDto.search}%`,
              },
            );
        }),
      );
    }

    if (appointmentQueryListingDto.from) {
      queryBuilder.andWhere(
        new Brackets(qb => {
          qb.where(`${appointmentEntity}.start >= :from`, {
            from: `${appointmentQueryListingDto.from}`,
          }).orWhere(`${appointmentOccurenceEntity}.start >= :from`, {
            from: `${appointmentQueryListingDto.from}`,
          });
        }),
      );
    }

    if (appointmentQueryListingDto.to) {
      queryBuilder.andWhere(
        new Brackets(qb => {
          qb.where(`${appointmentEntity}.start <= :to`, {
            to: `${appointmentQueryListingDto.to}`,
          }).orWhere(`${appointmentOccurenceEntity}.start <= :to`, {
            to: `${appointmentQueryListingDto.to}`,
          });
        }),
      );
    }

    const [appointments, count] =
      await queryBuilder.getManyAndCount();

    const allAppointments = await Promise.all(
      appointments.map(async (appointment: Appointment) => {
        if (appointment.occurrences.length) {
          return await Promise.all(
            appointment.occurrences.map(
              async (occcurrence: AppointmentOccurrence) =>
                await this.convertToAppointment(occcurrence),
            ),
          );
        }
        return appointment;
      }),
    );

    const flatAppointments = allAppointments.flat();

    return {
      pagination: { limit, offset, count },
      message: ConstantMessage.APPOINTMENT_FETCHED,
      data: flatAppointments.map(
        (appointment: Appointment) =>
          new AppointmentTransformer(appointment),
      ),
    };
  }

  async findAllCalendar(): // appointmentQueryCalendarDto: AppointmentQueryCalendarDto,
  // user: User,
  Promise<AppointmentCalendarResponseType[]> {
    const calendar = await this.agendaRepository.query(`
      SELECT
      json_agg(
        json_build_object(
          'id', appointments.id,
          'start', appointments.start,
          'end', appointments.end,
          'name', about_appointments.title,
          'resourceId', agendas.id,
          'title', agendas.title,
          'color', agendas.color,
          'owner', json_build_object(
            'id', owner.id,
            'name', CONCAT(owner.first_name, ' ', owner.last_name)
          ),
          'client', json_build_object(
            'id', client.id,
            'name', CONCAT(client.first_name, ' ', client.last_name)
          ),
          'status', json_build_object(
            'id', appointment_status.id,
            'name', appointment_status.name,
            'icon', appointment_status.icon
          ),
          'category', json_build_object(
            'id', appointment_categories.id,
            'name', appointment_categories.name,
            'color', appointment_categories.color
          )
        )
      )
      FROM agendas 
        INNER JOIN users AS "owner" ON agendas.owner = owner.id
        INNER JOIN users AS "client" ON agendas.client = client.id
        INNER JOIN agendas_aboutappointments ON agendas.id = agendas_aboutappointments.agendas_id
        INNER JOIN about_appointments ON agendas_aboutappointments.about_appointments_id = about_appointments.id
        LEFT OUTER JOIN appointment_categories ON about_appointments.category = appointment_categories.id
        INNER JOIN appointments ON about_appointments.appointment = appointments.id
        INNER JOIN appointment_status ON appointments.status = appointment_status.id
        WHERE appointments.is_repeating IS NOT true
        AND appointments.deleted_at IS NULL
        UNION ALL
        SELECT
          json_agg(
            json_build_object(
              'id', appointment_occurrences.id,
              'start', appointment_occurrences.start,
              'end', appointment_occurrences.end,
              'name', about_appointments.title,
              'resourceId', agendas.id,
              'title', agendas.title,
              'color', agendas.color,
              'owner', json_build_object(
                'id', owner.id,
                'name', CONCAT(owner.first_name, ' ', owner.last_name)
              ),
              'client', json_build_object(
                'id', client.id,
                'name', CONCAT(client.first_name, ' ', client.last_name)
              ),
              'status', json_build_object(
                'id', appointment_status.id,
                'name', appointment_status.name,
                'icon', appointment_status.icon
              ),
              'category', json_build_object(
                'id', appointment_categories.id,
                'name', appointment_categories.name,
                'color', appointment_categories.color
              )
            )
          )
        FROM agendas 
          INNER JOIN users AS "owner" ON agendas.owner = owner.id
          INNER JOIN users AS "client" ON agendas.client = client.id
          INNER JOIN agendas_aboutappointments ON agendas.id = agendas_aboutappointments.agendas_id
          INNER JOIN about_appointments ON agendas_aboutappointments.about_appointments_id = about_appointments.id
          LEFT OUTER JOIN appointment_categories ON about_appointments.category = appointment_categories.id
          INNER JOIN appointments ON about_appointments.appointment = appointments.id
          INNER JOIN appointment_occurrences ON appointment_occurrences.appointment = appointments.id
          INNER JOIN appointment_status ON appointment_occurrences.status = appointment_status.id
          WHERE appointment_occurrences.deleted_at IS NULL`);

    const appointments: AppointmentCalendarResponseType[] =
      calendar[0]['json_agg'];
    const occurrences: AppointmentCalendarResponseType[] =
      calendar[1]['json_agg'];

    if (appointments && occurrences) {
      return appointments.concat(occurrences);
    }

    return appointments || occurrences;
  }

  async createAboutAppointment(
    createAboutAppointmentDto: CreateAboutAppointmentDto,
  ): Promise<AboutAppointment> {
    const agendas = await this.getAgendas(
      createAboutAppointmentDto.agendas,
    );

    const category = await this.appointmentCategoryService.findOne(
      createAboutAppointmentDto.category,
    );
    const createAboutAppointment =
      await this.aboutAppointmentRepository.save({
        ...createAboutAppointmentDto,
        category,
        agendas,
      });

    return new AboutAppointmentTransformer(createAboutAppointment);
  }

  async findAllAboutAppointment(): Promise<
    AboutAppointmentResponseType[]
  > {
    const aboutAppointmentEntity = EntityNames.ABOUT_APPOINTMENT;
    const appointmentCategoryEntity =
      EntityNames.APPOINTMENT_CATEGORY;
    const agendaEntity = EntityNames.AGENDA;

    const selectColumns = [
      `${aboutAppointmentEntity}.id`,
      `${aboutAppointmentEntity}.title`,
      `${aboutAppointmentEntity}.duration`,
      `${appointmentCategoryEntity}.id`,
      `${appointmentCategoryEntity}.name`,
      `${appointmentCategoryEntity}.color`,
      `${agendaEntity}.id`,
      `${agendaEntity}.name`,
      `${agendaEntity}.title`,
      `${agendaEntity}.color`,
    ];

    const queryBuilder = this.aboutAppointmentRepository
      .createQueryBuilder(aboutAppointmentEntity)
      .leftJoinAndSelect(
        `${aboutAppointmentEntity}.agendas`,
        `${agendaEntity}`,
      )
      .leftJoinAndSelect(
        `${aboutAppointmentEntity}.category`,
        `${appointmentCategoryEntity}`,
      )
      .select(selectColumns);

    return await queryBuilder.getMany();
  }

  async findAllAboutAppointmentTitle(): Promise<string[]> {
    const aboutAppointmentEntity = EntityNames.ABOUT_APPOINTMENT;
    const selectColumns = [`${aboutAppointmentEntity}.title`];
    const queryBuilder = this.aboutAppointmentRepository
      .createQueryBuilder(aboutAppointmentEntity)
      .select(selectColumns)
      .distinctOn([`${aboutAppointmentEntity}.title`]);

    const aboutAppointmentTitles = await queryBuilder.getMany();

    return aboutAppointmentTitles.map(
      aboutAppointment => aboutAppointment.title,
    );
  }

  async findAllPatients(
    paginationDto: PaginationDto,
    user: User,
  ): Promise<PaginatedUserType> {
    const doctor = await this.userService.findOne(user.id);

    const { limit, offset } = GlobalHelper.getPaginationLimitOffSet(
      paginationDto.limit,
      paginationDto.offset,
    );
    const userEntity = EntityNames.USER;

    const queryBuilder = this.userRepository
      .createQueryBuilder(userEntity)
      .leftJoinAndSelect(`${userEntity}.appointments`, `appointment`)
      .skip(offset)
      .take(limit)
      .orderBy(`${userEntity}.id`);

    queryBuilder.andWhere(
      new Brackets(qb => {
        qb.where(`appointment.doctor = :id`, {
          id: `${doctor.id}`,
        });
      }),
    );

    const [patients, count] = await queryBuilder.getManyAndCount();

    return {
      message: ConstantMessage.USER_FETCHED,
      data: patients.map(patient => {
        delete patient.appointments;
        return new UserTransformer(patient);
      }),
      pagination: { limit, offset, count },
    };
  }

  async findOne(id: string): Promise<AppointmentResponseType> {
    const occurrence = await this.validateOccurence(id);

    // return main appointment if id is occurrence
    if (occurrence) {
      const appointment = await this.convertToAppointment(occurrence);
      return new AppointmentTransformer(appointment);
    }

    const appointment = await this.validateAppointment(id);
    delete appointment.occurrences;
    return new AppointmentTransformer(appointment);
  }

  async update(
    id: string,
    updateAppointmentDto: UpdateAppointmentDto,
  ): Promise<void> {
    const occurrence = await this.validateOccurence(id);

    const {
      doctor,
      patient,
      agendas,
      category,
      status,
      description,
      title,
      notes,
      isRepeating,
      interval,
      intervalUnit,
      until,
      includeWeekend,
    } = updateAppointmentDto;

    // ignore count if until date is given
    const count = !until ? updateAppointmentDto.count : null;

    let duration: number;

    // validation for appointment status
    const appointmentStatus = await this.validateStatus(status);

    // if id is an appointment occurrence, update that specific occurrence
    if (occurrence) {
      duration = updateAppointmentDto.duration
        ? updateAppointmentDto.duration
        : occurrence.duration;

      const start = updateAppointmentDto.start
        ? updateAppointmentDto.start
        : occurrence.start;

      const end = this.getAppointmentEnd(start, duration);

      try {
        await this.appointmentOccurenceRepository.save({
          id,
          status: appointmentStatus,
          start,
          end,
          duration,
          notes,
        });
      } catch (error) {
        throw new NotImplementedException(
          AppErrorMessages.database_error,
        );
      }
      return;
    }

    const appointment = await this.validateAppointment(id);
    const prevOccurrences = appointment.occurrences;

    //validation for related entities
    const patientUser = await this.userService.findOne(patient);
    const doctorUser = await this.userService.findOne(doctor);
    const newAgendas = await this.getAgendas(agendas);

    const appointmentCategory =
      await this.appointmentCategoryService.findOne(category);

    const start = updateAppointmentDto.start
      ? updateAppointmentDto.start
      : appointment.start;

    duration = updateAppointmentDto.duration
      ? updateAppointmentDto.duration
      : appointment.aboutAppointment.duration;

    const end = this.getAppointmentEnd(start, duration);

    // if new rrule is being updated
    const rrule = this.generateRrule(
      isRepeating,
      intervalUnit,
      start,
      interval,
      until,
      count,
      includeWeekend,
      appointment.rrule,
    );

    const occurrences = this.generateOccurences(
      rrule,
      duration,
      appointmentStatus,
    );

    const updateValues = {
      ...appointment,
      department: doctorUser.department,
      patient: patientUser,
      doctor: doctorUser,
      status: appointmentStatus,
      description,
      start,
      end,
      notes,
      isRepeating,
      rrule,
      aboutAppointment: {
        ...appointment.aboutAppointment,
        title,
        duration,
        category: appointmentCategory,
        agendas: newAgendas,
      },
      occurrences,
    };

    try {
      await this.appointmentRepository.save({
        ...updateValues,
      });

      if (rrule) {
        await this.deleteInvalidOccurrences(prevOccurrences);
      }
    } catch (error) {
      throw new NotImplementedException(
        AppErrorMessages.database_error,
      );
    }
  }

  async cancel(id: string): Promise<void> {
    const occurrence = await this.validateOccurence(id);
    const cancelledStatus =
      await this.appointmentStatusService.findOneByName(
        DefaultAppointmentStatus.CANCELLED,
      );

    // if id is occurrence, only that occurrence is cancelled
    if (occurrence) {
      try {
        await this.appointmentOccurenceRepository.save({
          ...occurrence,
          status: cancelledStatus,
        });

        return;
      } catch (error) {
        throw new NotImplementedException(
          AppErrorMessages.database_error,
        );
      }
    }

    const appointment = await this.validateAppointment(id);

    try {
      await this.appointmentRepository.save({
        ...appointment,
        status: cancelledStatus,
      });

      // if id is appointment, all of its occurrences are cancelled as well
      if (appointment.occurrences.length) {
        await Promise.all(
          appointment.occurrences.map(async occurrence => {
            await this.appointmentOccurenceRepository.save({
              id: occurrence.id,
              status: cancelledStatus,
            });
          }),
        );
      }
    } catch (error) {
      throw new NotImplementedException(
        AppErrorMessages.database_error,
      );
    }
  }

  async remove(id: string): Promise<void> {
    const occurrence = await this.validateOccurence(id);

    if (occurrence) {
      const appointment = await this.validateAppointment(
        occurrence.appointment.id,
      );

      //updating rrule to exclude this occurrence's date
      const rruleSet = new RRuleSet();
      rruleSet.rrule(rrulestr(appointment.rrule));

      // this occurrence's date
      const excludeDate = new Date(occurrence.start).toDateString();

      rruleSet.exdate(new Date(excludeDate));
      appointment.rrule = rruleSet.toString();

      try {
        await this.appointmentRepository.save({ ...appointment });
        await this.appointmentOccurenceRepository.softRemove({
          ...occurrence,
        });
        return;
      } catch (error) {
        throw new NotImplementedException(
          AppErrorMessages.database_error,
        );
      }
    }

    const appointment = await this.validateAppointment(id);

    try {
      await this.appointmentRepository.softRemove({
        ...appointment,
      });
    } catch (error) {
      throw new NotImplementedException(
        AppErrorMessages.database_error,
      );
    }
  }

  async validateAppointment(id: string): Promise<Appointment> {
    const appointment = await this.appointmentRepository.findOne({
      where: { id },
      relations: {
        patient: true,
        doctor: true,
        department: true,
        status: true,
        occurrences: { status: true },
        aboutAppointment: {
          category: true,
          agendas: { aboutAppointments: false },
        },
      },
      order: {
        occurrences: {
          start: 'ASC',
        },
      },
      select: {
        id: true,
        patient: {
          id: true,
          firstName: true,
          lastName: true,
        },
        doctor: {
          id: true,
          firstName: true,
          lastName: true,
        },
        department: {
          id: true,
          name: true,
        },
        start: true,
        end: true,
        description: true,
        notes: true,
        isRepeating: true,
        rrule: true,
        status: {
          id: true,
          name: true,
          icon: true,
        },
        occurrences: {
          id: true,
          start: true,
          end: true,
          duration: true,
          notes: true,
          status: {
            id: true,
            name: true,
            icon: true,
          },
        },
        aboutAppointment: {
          id: true,
          title: true,
          duration: true,
          category: {
            id: true,
            name: true,
            color: true,
          },
          agendas: {
            id: true,
            name: true,
            title: true,
            color: true,
          },
        },
      },
    });

    if (!appointment) {
      throw new NotFoundException(
        ConstantMessage.APPOINTMENT_NOT_FOUND,
      );
    }

    return appointment;
  }

  async validateStatus(status: string): Promise<AppointmentStatus> {
    if (!status) {
      return await this.appointmentStatusService.findOneByName(
        DefaultAppointmentStatus.PENDING,
      );
    }

    return await this.appointmentStatusService.findOneById(status);
  }

  async getAgendas(agendas: string[]): Promise<Agenda[]> {
    if (agendas) {
      const findAgendas = agendas.map(
        async agenda => await this.agendaService.findOne(agenda),
      );
      return Promise.all(findAgendas);
    }
  }

  getOrderByStatement(
    orderBy: OrderBy,
  ): apppointmentOrderByStatement {
    return apppointmentOrderByStatement[`${orderBy.toUpperCase()}`];
  }

  async validateOccurence(
    id: string,
  ): Promise<AppointmentOccurrence> {
    const occurrence =
      await this.appointmentOccurenceRepository.findOne({
        relations: { appointment: true, status: true },
        where: { id },
        select: {
          id: true,
          start: true,
          end: true,
          duration: true,
          notes: true,
          status: {
            id: true,
            name: true,
            icon: true,
          },
          appointment: {
            id: true,
          },
        },
      });

    return occurrence;
  }

  getAppointmentEnd(start: Date, duration: number): Date {
    const end = new Date(start);
    end.setTime(start.getTime() + duration * 60 * 1000);

    return end;
  }

  generateRrule(
    isRepeating: boolean,
    intervalUnit: AppointmentIntervalUnits,
    start: Date,
    interval: number,
    until: Date,
    count: number,
    includeWeekend: boolean,
    prevRrule?: string,
  ): string | null {
    if (
      isRepeating &&
      interval &&
      start &&
      intervalUnit &&
      (count || until)
    ) {
      const rrule = new RRule({
        freq: RRule[RruleFreq[intervalUnit.toLocaleUpperCase()]],
        dtstart: start,
        interval,
        until,
        count,
        byweekday: !includeWeekend
          ? [RRule.MO, RRule.TU, RRule.WE, RRule.TH, RRule.FR]
          : null,
      });

      return rrule.toString();
    }

    if (
      prevRrule &&
      (isRepeating ||
        interval ||
        start ||
        intervalUnit ||
        count ||
        until ||
        includeWeekend)
    ) {
      const prevRruleOptions = rrulestr(prevRrule).origOptions;
      const freqValue = intervalUnit
        ? RRule[RruleFreq[intervalUnit.toLocaleUpperCase()]]
        : prevRruleOptions.freq;
      const intervalValue = interval
        ? interval
        : prevRruleOptions.interval;
      const dtstartValue = start ? start : prevRruleOptions.dtstart;
      const untilValue = until ? until : prevRruleOptions.until;
      const countValue = count ? count : prevRruleOptions.count;

      const rrule = new RRule({
        freq: freqValue,
        dtstart: dtstartValue,
        interval: intervalValue,
        until: untilValue,
        count: countValue,
        byweekday: !includeWeekend
          ? [RRule.MO, RRule.TU, RRule.WE, RRule.TH, RRule.FR]
          : null,
      });

      return rrule.toString();
    }
  }

  generateOccurences(
    rrule: string,
    duration: number,
    status: AppointmentStatus,
  ): occurrenceInterface[] {
    if (rrule) {
      const occurrenceDates = rrulestr(rrule).all();
      const occurrences = occurrenceDates.map(
        (occurrenceDate: Date) => {
          const occurenceEnd = this.getAppointmentEnd(
            occurrenceDate,
            duration,
          );

          const occurence = {
            start: occurrenceDate,
            end: occurenceEnd,
            duration,
            status,
          };

          return occurence;
        },
      );
      return occurrences;
    }
  }

  async deleteInvalidOccurrences(
    occurrences: AppointmentOccurrence[],
  ): Promise<void> {
    return occurrences.forEach(async occurrence => {
      await this.appointmentOccurenceRepository.softRemove({
        ...occurrence,
      });
    });
  }

  async convertToAppointment(
    occurrence: AppointmentOccurrence,
  ): Promise<Appointment> {
    const appointmentOccurence = await this.validateOccurence(
      occurrence.id,
    );

    const appointment = await this.validateAppointment(
      appointmentOccurence.appointment.id,
    );

    const convertedOccurence = {
      ...appointment,
      id: occurrence.id,
      start: occurrence.start,
      end: occurrence.end,
      status: occurrence.status,
      notes: occurrence.notes,
      isRepeating: false,
      rrule: null,
      aboutAppointment: {
        ...appointment.aboutAppointment,
        duration: occurrence.duration,
      },
    };

    delete convertedOccurence.occurrences;

    return convertedOccurence;
  }
}
