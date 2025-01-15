// import {
//   forwardRef,
//   Inject,
//   Injectable,
//   NotFoundException,
//   NotImplementedException,
// } from '@nestjs/common';
// import { CreateConsultationDto } from './dto/create-consultation.dto';
// import { UpdateConsultationDto } from './dto/update-consultation.dto';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Consultation } from '../all-entities';
// import { Repository } from 'typeorm';
// import { AppErrorMessages } from '../../constants/app-error-messages';
// import { ConstantMessage } from '../../constants/constant-messages';
// import { ConsultationQueryDto } from './dto/consultation-list.dto';
// import { ConsultationResponseType } from './types/consultation-response.type';
// import { EntityNames } from '../../config/entity-names';
// import { ConsultationBodyService } from '../consultation-body/consultation-body.service';
// import { UserService } from '../user/user.service';

// @Injectable()
// export class ConsultationService {
//   constructor(
//     @InjectRepository(Consultation)
//     private readonly consultationRepository: Repository<Consultation>,
//     @Inject(forwardRef(() => ConsultationBodyService))
//     private readonly consultationBodyService: ConsultationBodyService,
//     private readonly userService: UserService,
//   ) {}
//   async create(
//     createConsultationDto: CreateConsultationDto,
//   ): Promise<ConsultationResponseType> {
//     const patient = await this.userService.findOne(
//       createConsultationDto.patient,
//     );

//     const doctor = await this.userService.findOne(
//       createConsultationDto.doctor,
//     );

//     try {
//       // creating consultation
//       const consultation = await this.consultationRepository.save({
//         ...createConsultationDto,
//         patient,
//         doctor,
//       });

//       return await this.findOne(consultation.id);
//     } catch (error) {
//       throw new NotImplementedException(
//         AppErrorMessages.database_error,
//       );
//     }
//   }

//   async findAll(
//     consultationQueryDto: ConsultationQueryDto,
//   ): Promise<ConsultationResponseType[]> {
//     const consultationEntity = EntityNames.CONSULTATION;
//     const consultationBodyEntity = EntityNames.CONSULTATION_BODY;

//     const consultations = await this.consultationRepository
//       .createQueryBuilder(consultationEntity)
//       .leftJoinAndSelect(`${consultationEntity}.patient`, `patient`)
//       .leftJoinAndSelect(`${consultationEntity}.doctor`, `doctor`)
//       .leftJoinAndSelect(
//         `${consultationEntity}.consultationBody`,
//         consultationBodyEntity,
//       )
//       .select([
//         `${consultationEntity}.id`,
//         `${consultationEntity}.date`,
//         `${consultationEntity}.subject`,
//         `patient.id`,
//         `patient.firstName`,
//         `patient.lastName`,
//         `doctor.id`,
//         `doctor.firstName`,
//         `doctor.lastName`,
//         `${consultationBodyEntity}.id`,
//         `${consultationBodyEntity}.relatedObject`,
//         `${consultationBodyEntity}.relatedType`,
//       ])
//       .where(`patient.id = :id`, {
//         id: consultationQueryDto.patient,
//       })
//       .getMany();

//     const consultationsWithBody = [];
//     for (const consultation of consultations) {
//       consultationsWithBody.push(
//         await this.consultationBodyService.getConsultationBodyObjects(
//           consultation,
//         ),
//       );
//     }

//     return consultationsWithBody;
//   }

//   async findOne(id: string): Promise<ConsultationResponseType> {
//     const consultation: ConsultationResponseType =
//       await this.consultationRepository.findOne({
//         where: { id },
//         relations: {
//           patient: true,
//           doctor: true,
//           consultationBody: true,
//         },
//         select: {
//           id: true,
//           date: true,
//           subject: true,
//           patient: {
//             id: true,
//             firstName: true,
//             lastName: true,
//           },
//           doctor: {
//             id: true,
//             firstName: true,
//             lastName: true,
//           },
//           consultationBody: {
//             id: true,
//             relatedObject: true,
//             relatedType: true,
//           },
//         },
//       });

//     if (!consultation) {
//       throw new NotFoundException(
//         ConstantMessage.CONSULTATION_NOT_FOUND,
//       );
//     }

//     return await this.consultationBodyService.getConsultationBodyObjects(
//       consultation,
//     );
//   }

//   async update(
//     id: string,
//     updateConsultationDto: UpdateConsultationDto,
//   ): Promise<void> {
//     const consultation = await this.findOne(id);
//     const patient =
//       (await this.userService.findOne(
//         updateConsultationDto.patient,
//       )) || consultation.patient;
//     const doctor =
//       (await this.userService.findOne(
//         updateConsultationDto.doctor,
//       )) || consultation.doctor;
//     try {
//       await this.consultationRepository.save({
//         id,
//         patient,
//         doctor,
//         date: updateConsultationDto.date,
//         subject: updateConsultationDto.subject,
//       });
//     } catch (error) {
//       throw new NotImplementedException(
//         AppErrorMessages.database_error,
//       );
//     }
//   }

//   async remove(id: string): Promise<void> {
//     const consultation = (await this.findOne(id)) as Consultation;
//     try {
//       await this.consultationRepository.softRemove(consultation);
//     } catch (error) {
//       throw new NotImplementedException(
//         AppErrorMessages.database_error,
//       );
//     }
//   }
// }
