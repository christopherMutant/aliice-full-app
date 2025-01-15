// import {
//   forwardRef,
//   Inject,
//   Injectable,
//   NotFoundException,
//   NotImplementedException,
// } from '@nestjs/common';
// import { CreateConsultationBodyDto } from './dto/create-consultation-body.dto';
// import { UpdateConsultationBodyDto } from './dto/update-consultation-body.dto';
// import { InjectRepository } from '@nestjs/typeorm';
// import {
//   AnalysisConsultation,
//   Consultation,
//   ConsultationBody,
//   DocumentConsultation,
//   // InabilityConsultation,
//   MedicineConsultation,
//   ServiceConsultation,
//   TextConsultation,
// } from '../all-entities';
// import { Repository } from 'typeorm';
// import {
//   ConsultationBodyTypes,
//   ConsultationEntryTypes,
// } from '../../shared/types/enums';
// import { AppErrorMessages } from '../../constants/app-error-messages';
// import { CreateTextConsultationDto } from './dto/create-text-consultation.dto';
// import { CreateDocumentConsultationDto } from './dto/create-document-consultation.dto.';
// import { CreateMedicineConsultationDto } from './dto/create-medicine-consultation.dto';
// import { ConsultationResponseType } from '../consultation/types/consultation-response.type';
// import {
//   ConsultationAnalysisType,
//   ConsultationBodyResponseType,
//   ConsultationDocumentType,
//   ConsultationInabilityType,
//   ConsultationMedicineType,
//   ConsultationServiceType,
//   ConsultationTextType,
// } from './types/consultation-body-part-types';
// import { ConstantMessage } from '../../constants/constant-messages';
// import { CreateInabilityConsultationDto } from './dto/create-inability-consultation.dto';
// import { CreateServiceConsultationDto } from './dto/create-service-consultation.dto';
// import { CreateAnalysisConsultationDto } from './dto/create-analysis-consultation.dto';
// import { ConsultationTitleService } from '../consultation-title/consultation-title.service';
// import { ConsultationBodyPartEntryService } from '../consultation-body-part-entry/consultation-body-part-entry.service';
// import { ConsultationService } from '../consultation/consultation.service';

// @Injectable()
// export class ConsultationBodyService {
//   constructor(
//     @InjectRepository(ConsultationBody)
//     private readonly consultationBodyRepository: Repository<ConsultationBody>,
//     @InjectRepository(TextConsultation)
//     private readonly textConsultationRepository: Repository<TextConsultation>,
//     @InjectRepository(DocumentConsultation)
//     private readonly documentConsultationRepository: Repository<DocumentConsultation>,
//     @InjectRepository(MedicineConsultation)
//     private readonly medicineConsultationRepository: Repository<MedicineConsultation>,
//     @InjectRepository(InabilityConsultation)
//     private readonly inabilityConsultationRepository: Repository<InabilityConsultation>,
//     @InjectRepository(ServiceConsultation)
//     private readonly serviceConsultationRepository: Repository<ServiceConsultation>,
//     @InjectRepository(AnalysisConsultation)
//     private readonly analysisConsultationRepository: Repository<AnalysisConsultation>,
//     private readonly consultationTitleService: ConsultationTitleService,
//     @Inject(forwardRef(() => ConsultationService))
//     private readonly consultationService: ConsultationService,
//     @Inject(forwardRef(() => ConsultationBodyPartEntryService))
//     private readonly consultationBodyPartEntryService: ConsultationBodyPartEntryService,
//   ) {}

//   async create(
//     createConsultationBodyDto: CreateConsultationBodyDto,
//   ): Promise<
//     | ConsultationTextType
//     | ConsultationDocumentType
//     | ConsultationMedicineType
//     | ConsultationInabilityType
//     | ConsultationServiceType
//     | ConsultationAnalysisType
//   > {
//     // validate consultation
//     const consultation = await this.consultationService.findOne(
//       createConsultationBodyDto.consultation,
//     );

//     // validate consultation title
//     const consultationTitle =
//       await this.consultationTitleService.findOne(
//         createConsultationBodyDto.body.title,
//       );

//     if (
//       consultationTitle.type.name !==
//       createConsultationBodyDto.consultationBodyType
//     ) {
//       throw new NotImplementedException(
//         'Consultation body and consultation body type are incompatible',
//       );
//     }

//     try {
//       let consultationBodyPart:
//         | TextConsultation
//         | DocumentConsultation
//         | MedicineConsultation
//         | InabilityConsultation
//         | AnalysisConsultation
//         | ServiceConsultation;
//       switch (consultationTitle.type.name) {
//         case ConsultationBodyTypes.TEXT:
//           const textConsultationInput =
//             createConsultationBodyDto.body as CreateTextConsultationDto;

//           const textConsultation =
//             await this.textConsultationRepository.save({
//               title: consultationTitle,
//               text: textConsultationInput.text as string,
//               consultationBody: {
//                 consultation: consultation as Consultation,
//                 relatedType: ConsultationBodyTypes.TEXT,
//               },
//             });

//           consultationBodyPart = textConsultation;
//           break;

//         case ConsultationBodyTypes.DOCUMENT:
//           const documentConsultationInput =
//             createConsultationBodyDto.body as CreateDocumentConsultationDto;
//           const documentConsultation =
//             await this.documentConsultationRepository.save({
//               title: consultationTitle,
//               consultationBody: {
//                 consultation: consultation as Consultation,
//                 relatedType: ConsultationBodyTypes.DOCUMENT,
//               },
//             });

//           if (documentConsultationInput.entries) {
//             for (const entry of documentConsultationInput.entries) {
//               await this.consultationBodyPartEntryService.create({
//                 consultationBodyPart: documentConsultation.id,
//                 consultationEntryType:
//                   ConsultationEntryTypes.DOCUMENT,
//                 value: entry,
//               });
//             }
//           }

//           consultationBodyPart = documentConsultation;
//           break;

//         case ConsultationBodyTypes.MEDICINE:
//           const medicineConsultationInput =
//             createConsultationBodyDto.body as CreateMedicineConsultationDto;
//           const medicineConsultation =
//             await this.medicineConsultationRepository.save({
//               title: consultationTitle,
//               consultationBody: {
//                 consultation: consultation as Consultation,
//                 relatedType: ConsultationBodyTypes.MEDICINE,
//               },
//             });

//           if (medicineConsultationInput.entries) {
//             for (const entry of medicineConsultationInput.entries) {
//               await this.consultationBodyPartEntryService.create({
//                 consultationBodyPart: documentConsultation.id,
//                 consultationEntryType:
//                   ConsultationEntryTypes.MEDICINE,
//                 value: entry,
//               });
//             }
//           }

//           consultationBodyPart = medicineConsultation;
//           break;

//         case ConsultationBodyTypes.INABILITY:
//           const inabilityConsultationInput =
//             createConsultationBodyDto.body as CreateInabilityConsultationDto;
//           const inabilityConsultation =
//             await this.inabilityConsultationRepository.save({
//               title: consultationTitle,
//               consultationBody: {
//                 consultation: consultation as Consultation,
//                 relatedType: ConsultationBodyTypes.INABILITY,
//               },
//             });

//           if (inabilityConsultationInput.entries) {
//             for (const entry of inabilityConsultationInput.entries) {
//               await this.consultationBodyPartEntryService.create({
//                 consultationBodyPart: documentConsultation.id,
//                 consultationEntryType:
//                   ConsultationEntryTypes.INABILITY,
//                 value: entry,
//               });
//             }
//           }

//           consultationBodyPart = inabilityConsultation;
//           break;

//         case ConsultationBodyTypes.SERVICE:
//           const serviceConsultationInput =
//             createConsultationBodyDto.body as CreateServiceConsultationDto;
//           const serviceConsultation =
//             await this.serviceConsultationRepository.save({
//               title: consultationTitle,
//               control: serviceConsultationInput.control,
//               consultationBody: {
//                 consultation: consultation as Consultation,
//                 relatedType: ConsultationBodyTypes.SERVICE,
//               },
//             });

//           if (serviceConsultationInput.entries) {
//             for (const entry of serviceConsultationInput.entries) {
//               await this.consultationBodyPartEntryService.create({
//                 consultationBodyPart: documentConsultation.id,
//                 consultationEntryType: ConsultationEntryTypes.SERVICE,
//                 value: entry,
//               });
//             }
//           }

//           consultationBodyPart = serviceConsultation;
//           break;

//         case ConsultationBodyTypes.ANALYSIS:
//           const analysisConsultationInput =
//             createConsultationBodyDto.body as CreateAnalysisConsultationDto;
//           const analysisConsultation =
//             await this.analysisConsultationRepository.save({
//               title: consultationTitle,
//               consultationBody: {
//                 consultation: consultation as Consultation,
//                 relatedType: ConsultationBodyTypes.ANALYSIS,
//               },
//             });

//           if (analysisConsultationInput.entries) {
//             for (const entry of analysisConsultationInput.entries) {
//               await this.consultationBodyPartEntryService.create({
//                 consultationBodyPart: documentConsultation.id,
//                 consultationEntryType:
//                   ConsultationEntryTypes.ANALYSIS,
//                 value: entry,
//               });
//             }
//           }

//           consultationBodyPart = analysisConsultation;
//           break;

//         default:
//           break;
//       }

//       await this.consultationBodyRepository.save({
//         ...consultationBodyPart.consultationBody,
//         relatedObject: consultationBodyPart.id,
//       });

//       const newConsultationBodyPart =
//         await this.findConsultationBodyPart(consultationBodyPart.id);

//       return newConsultationBodyPart;
//     } catch (error) {
//       throw new NotImplementedException(
//         AppErrorMessages.database_error,
//       );
//     }
//   }

//   async findOne(
//     id: string,
//   ): Promise<
//     | ConsultationTextType
//     | ConsultationDocumentType
//     | ConsultationMedicineType
//     | ConsultationInabilityType
//     | ConsultationServiceType
//     | ConsultationAnalysisType
//   > {
//     const consultationBodyPart = await this.findConsultationBodyPart(
//       id,
//     );

//     if (!consultationBodyPart) {
//       throw new NotFoundException(
//         ConstantMessage.CONSULTATION_BODY_NOT_FOUND,
//       );
//     }

//     return consultationBodyPart;
//   }

//   async update(
//     id: string,
//     updateConsultationBodyDto: UpdateConsultationBodyDto,
//   ): Promise<void> {
//     const consultationBodyPart = await this.findOne(id);

//     try {
//       if (
//         consultationBodyPart.title.type.name ===
//         ConsultationBodyTypes.TEXT
//       ) {
//         await this.textConsultationRepository.save({
//           ...consultationBodyPart,
//           text: updateConsultationBodyDto.text as string,
//         });
//       }
//     } catch (error) {
//       throw new NotImplementedException(
//         AppErrorMessages.database_error,
//       );
//     }
//   }

//   async remove(id: string): Promise<void> {
//     const consultationBodyPart = await this.findOne(id);
//     try {
//       if (
//         consultationBodyPart.title.type.name ==
//         ConsultationBodyTypes.DOCUMENT
//       ) {
//         //deleting each entry in database and bucket
//         for (const entry of (
//           consultationBodyPart as DocumentConsultation
//         ).entries) {
//           await this.consultationBodyPartEntryService.remove(
//             entry.id,
//           );
//         }
//       }

//       await this.consultationBodyRepository.softRemove({
//         id: consultationBodyPart.consultationBody.id,
//       });
//     } catch (error) {
//       throw new NotImplementedException(
//         AppErrorMessages.database_error,
//       );
//     }
//   }

//   async findTextConsultation(id: string): Promise<TextConsultation> {
//     return await this.textConsultationRepository.findOne({
//       where: { id },
//       relations: {
//         title: {
//           type: true,
//         },
//         consultationBody: true,
//       },
//       select: {
//         id: true,
//         text: true,
//         title: {
//           id: true,
//           name: true,
//           type: { name: true },
//         },
//         consultationBody: {
//           id: true,
//         },
//       },
//     });
//   }

//   async findDocumentConsultation(
//     id: string,
//   ): Promise<DocumentConsultation> {
//     return await this.documentConsultationRepository.findOne({
//       where: { id },
//       relations: {
//         title: {
//           type: true,
//         },
//         consultationBody: true,
//         entries: true,
//       },
//       select: {
//         id: true,
//         entries: {
//           id: true,
//           status: true,
//           type: true,
//           name: true,
//           category: true,
//           address: true,
//           dataSensitivity: true,
//           description: true,
//           url: true,
//         },
//         title: {
//           id: true,
//           name: true,
//           type: { name: true },
//         },
//         consultationBody: {
//           id: true,
//         },
//       },
//     });
//   }

//   async findMedicineConsultation(
//     id: string,
//   ): Promise<MedicineConsultation> {
//     return await this.medicineConsultationRepository.findOne({
//       where: { id },
//       relations: {
//         title: {
//           type: true,
//         },
//         consultationBody: true,
//         entries: true,
//       },
//       select: {
//         id: true,
//         title: {
//           id: true,
//           name: true,
//           type: { name: true },
//         },
//         entries: {
//           id: true,
//           type: true,
//           product: {
//             id: true,
//             name: true,
//           },
//           packSize: true,
//           dosage: true,
//           noteForDosage: true,
//           duration: true,
//           quantity: true,
//           indications: true,
//           medicationPlan: true,
//           drivers: true,
//           validFor: true,
//         },
//         consultationBody: {
//           id: true,
//         },
//       },
//     });
//   }

//   async findInabilityConsultation(
//     id: string,
//   ): Promise<InabilityConsultation> {
//     return await this.inabilityConsultationRepository.findOne({
//       where: { id },
//       relations: {
//         title: {
//           type: true,
//         },
//         consultationBody: true,
//         entries: true,
//       },
//       select: {
//         id: true,
//         title: {
//           id: true,
//           name: true,
//           type: { name: true },
//         },
//         entries: {
//           id: true,
//           date: true,
//           days: true,
//           incapacityForWork: true,
//           ability: true,
//           cause: true,
//         },
//         consultationBody: { id: true },
//       },
//     });
//   }

//   async findAnalysisConsultation(
//     id: string,
//   ): Promise<AnalysisConsultation> {
//     return await this.analysisConsultationRepository.findOne({
//       where: { id },
//       relations: {
//         title: {
//           type: true,
//         },
//         consultationBody: true,
//         entries: true,
//       },
//       select: {
//         id: true,
//         title: {
//           id: true,
//           name: true,
//           type: { name: true },
//         },
//         entries: {
//           analysis: {
//             id: true,
//             name: true,
//             shortName: true,
//             unit: true,
//             category: true,
//           },
//           date: true,
//           result: true,
//         },
//         consultationBody: {
//           id: true,
//         },
//       },
//     });
//   }

//   async findServiceConsultation(
//     id: string,
//   ): Promise<ServiceConsultation> {
//     return await this.serviceConsultationRepository.findOne({
//       where: { id },
//       relations: {
//         title: {
//           type: true,
//         },
//         consultationBody: true,
//       },
//       select: {
//         id: true,
//         title: {
//           id: true,
//           name: true,
//           type: { name: true },
//         },
//         control: true,
//         entries: {
//           id: true,
//           remark: true,
//           nonMandatoryService: true,
//           tarrifPoint: true,
//           vat: true,
//           total: true,
//           service: {
//             id: true,
//             code: true,
//             referenceService: true,
//             description: true,
//             side: true,
//             nonMandatoryService: true,
//             quantity: true,
//             tarrifPoint: true,
//             pointValue: true,
//             vat: true,
//             info: true,
//             catalogue: true,
//             outOfBusiness: true,
//             discountCategory: true,
//             typeOfCompulsoryInsurance: true,
//             pce: true,
//           },
//         },
//         consultationBody: { id: true },
//       },
//     });
//   }

//   async findConsultationBodyPart(
//     id: string,
//   ): Promise<
//     | TextConsultation
//     | DocumentConsultation
//     | MedicineConsultation
//     | InabilityConsultation
//     | AnalysisConsultation
//     | ServiceConsultation
//   > {
//     const consultationBodyPart =
//       (await this.findTextConsultation(id)) ||
//       (await this.findDocumentConsultation(id)) ||
//       (await this.findMedicineConsultation(id)) ||
//       (await this.findInabilityConsultation(id)) ||
//       (await this.findAnalysisConsultation(id)) ||
//       (await this.findServiceConsultation(id));

//     return consultationBodyPart;
//   }

//   async getConsultationBodyObjects(
//     consultationData: ConsultationResponseType,
//   ): Promise<ConsultationResponseType> {
//     const consultation = consultationData;
//     if (consultation.consultationBody.length) {
//       for (const body of consultation.consultationBody) {
//         const consultationPart: ConsultationBodyResponseType = body;

//         switch (body.relatedType) {
//           case ConsultationBodyTypes.TEXT:
//             const textConsultation: ConsultationTextType =
//               await this.textConsultationRepository.findOne({
//                 where: { id: body.relatedObject as string },
//                 relations: { title: true },
//                 select: {
//                   id: true,
//                   text: true,
//                   title: {
//                     id: true,
//                     name: true,
//                   },
//                 },
//               });

//             consultationPart.relatedObject = textConsultation;
//             break;

//           case ConsultationBodyTypes.DOCUMENT:
//             const documentConsultation: ConsultationDocumentType =
//               await this.documentConsultationRepository.findOne({
//                 where: { id: body.relatedObject as string },
//                 relations: { title: true, entries: true },
//                 select: {
//                   id: true,
//                   entries: {
//                     id: true,
//                     status: true,
//                     type: true,
//                     name: true,
//                     category: true,
//                     address: true,
//                     dataSensitivity: true,
//                     description: true,
//                     url: true,
//                   },
//                   title: {
//                     id: true,
//                     name: true,
//                   },
//                 },
//               });

//             consultationPart.relatedObject = documentConsultation;
//             break;

//           case ConsultationBodyTypes.MEDICINE:
//             const medicineConsultation: ConsultationMedicineType =
//               await this.medicineConsultationRepository.findOne({
//                 where: { id: body.relatedObject as string },
//                 relations: {
//                   title: true,
//                   entries: { product: true },
//                 },
//                 select: {
//                   id: true,
//                   title: {
//                     id: true,
//                     name: true,
//                   },
//                   entries: {
//                     id: true,
//                     type: true,
//                     product: {
//                       id: true,
//                       name: true,
//                     },
//                     packSize: true,
//                     dosage: true,
//                     noteForDosage: true,
//                     duration: true,
//                     quantity: true,
//                     indications: true,
//                     medicationPlan: true,
//                     drivers: true,
//                     validFor: true,
//                   },
//                 },
//               });

//             consultationPart.relatedObject = medicineConsultation;
//             break;

//           case ConsultationBodyTypes.INABILITY:
//             const inabilityConsultation: ConsultationInabilityType =
//               await this.inabilityConsultationRepository.findOne({
//                 where: { id: body.relatedObject as string },
//                 relations: {
//                   title: true,
//                   entries: true,
//                 },
//                 select: {
//                   id: true,
//                   title: {
//                     id: true,
//                     name: true,
//                   },
//                   entries: {
//                     id: true,
//                     date: true,
//                     days: true,
//                     incapacityForWork: true,
//                     ability: true,
//                     cause: true,
//                   },
//                 },
//               });

//             consultationPart.relatedObject = inabilityConsultation;
//             break;

//           case ConsultationBodyTypes.SERVICE:
//             const serviceConsultation: ConsultationServiceType =
//               await this.serviceConsultationRepository.findOne({
//                 where: { id: body.relatedObject as string },
//                 relations: {
//                   title: true,
//                   entries: true,
//                 },
//                 select: {
//                   id: true,
//                   title: {
//                     id: true,
//                     name: true,
//                   },
//                   control: true,
//                   entries: {
//                     id: true,
//                     remark: true,
//                     nonMandatoryService: true,
//                     tarrifPoint: true,
//                     vat: true,
//                     total: true,
//                     service: {
//                       id: true,
//                       code: true,
//                       referenceService: true,
//                       description: true,
//                       side: true,
//                       nonMandatoryService: true,
//                       quantity: true,
//                       tarrifPoint: true,
//                       pointValue: true,
//                       vat: true,
//                       info: true,
//                       catalogue: true,
//                       outOfBusiness: true,
//                       discountCategory: true,
//                       typeOfCompulsoryInsurance: true,
//                       pce: true,
//                     },
//                   },
//                 },
//               });

//             consultationPart.relatedObject = serviceConsultation;
//             break;

//           case ConsultationBodyTypes.ANALYSIS:
//             const analysisConsultation: ConsultationAnalysisType =
//               await this.analysisConsultationRepository.findOne({
//                 where: { id: body.relatedObject as string },
//                 relations: {
//                   title: true,
//                   entries: { analysis: true },
//                 },
//                 select: {
//                   id: true,
//                   title: {
//                     id: true,
//                     name: true,
//                   },
//                   entries: {
//                     analysis: {
//                       id: true,
//                       name: true,
//                       shortName: true,
//                       unit: true,
//                       category: true,
//                     },
//                     date: true,
//                     result: true,
//                   },
//                 },
//               });

//             consultationPart.relatedObject = analysisConsultation;
//             break;

//           default:
//             break;
//         }
//       }
//     }

//     return consultation;
//   }
// }
