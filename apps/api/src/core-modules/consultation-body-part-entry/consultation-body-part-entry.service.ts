// import {
//   forwardRef,
//   Inject,
//   Injectable,
//   NotFoundException,
//   NotImplementedException,
// } from '@nestjs/common';
// import { CreateConsultationBodyPartEntryDto } from './dto/create-consultation-body-part-entry.dto';
// import { UpdateConsultationBodyPartEntryDto } from './dto/update-consultation-body-part-entry.dto';
// import { InjectRepository } from '@nestjs/typeorm';
// import {
//   DocumentConsultation,
//   DocumentConsultationEntry,
//   InabilityConsultation,
//   InabilityConsultationEntry,
//   MedicineConsultation,
//   MedicineConsultationEntry,
//   ServiceConsultation,
//   ServiceConsultationEntry,
// } from '../all-entities';
// import { Repository } from 'typeorm';
// import { ConsultationBodyService } from '../consultation-body/consultation-body.service';
// import {
//   ConsultationEntryTypes,
//   OpenClosedStatus,
// } from '../../shared/types/enums';
// import { CreateDocumentConsultationEntriesDto } from './dto/create-document-consultation.dto';
// import { CreateMedicineConsultationEntryDto } from './dto/create-medicine-consultation.dto';
// import { MedicineService } from '../medicine/medicine.service';
// import { CreateInabilityConsultationEntryDto } from './dto/create-inability-consultation.dto';
// import { CreateServiceConsultationEntryDto } from './dto/create-service-consultation.dto';
// import { AnalysisResultsService } from '../analysis-results/analysis-results.service';
// import { CreateAnalysisResultDto } from '../analysis-results/dto/create-analysis-result.dto';
// import { AppErrorMessages } from '../../constants/app-error-messages';
// import { AnalysisResultResponseType } from '../analysis-results/types/analysis-result-response.type';
// import { ConstantMessage } from '../../constants/constant-messages';
// import { ConsultationDocumentFormatsService } from '../consultation-document-formats/consultation-document-formats.service';
// import { FileUploadService } from '../../shared/file_upload/file_upload.service';
// import { ServiceService } from '../service/service.service';

// @Injectable()
// export class ConsultationBodyPartEntryService {
//   constructor(
//     @InjectRepository(DocumentConsultationEntry)
//     private readonly documentConsultationEntryRepository: Repository<DocumentConsultationEntry>,
//     @InjectRepository(MedicineConsultationEntry)
//     private readonly medicineConsultationEntryRepository: Repository<MedicineConsultationEntry>,
//     @InjectRepository(InabilityConsultationEntry)
//     private readonly inabilityConsultationEntryRepository: Repository<InabilityConsultationEntry>,
//     @InjectRepository(ServiceConsultationEntry)
//     private readonly serviceConsultationEntryRepository: Repository<ServiceConsultationEntry>,
//     @Inject(forwardRef(() => AnalysisResultsService))
//     private readonly analysisResultService: AnalysisResultsService,
//     private readonly medicineService: MedicineService,
//     @Inject(forwardRef(() => ConsultationBodyService))
//     private readonly consultationBodyService: ConsultationBodyService,
//     private readonly consultationDocumentFormatService: ConsultationDocumentFormatsService,
//     private readonly fileUploadService: FileUploadService,
//     private readonly serviceService: ServiceService,
//   ) {}
//   async create(
//     createConsultationBodyPartEntryDto: CreateConsultationBodyPartEntryDto,
//   ): Promise<
//     | InabilityConsultationEntry
//     | ServiceConsultationEntry
//     | AnalysisResultResponseType
//     | DocumentConsultationEntry
//     | MedicineConsultationEntry
//   > {
//     const consultationBodyPart =
//       await this.consultationBodyService.findConsultationBodyPart(
//         createConsultationBodyPartEntryDto.consultationBodyPart,
//       );

//     if (
//       consultationBodyPart.title.type.name !==
//       createConsultationBodyPartEntryDto.consultationEntryType
//     ) {
//       throw new NotImplementedException(
//         'Consultation body and consultation entry type are incompatible',
//       );
//     }

//     let entry:
//       | DocumentConsultationEntry
//       | MedicineConsultationEntry
//       | InabilityConsultationEntry
//       | ServiceConsultationEntry
//       | AnalysisResultResponseType;
//     try {
//       switch (consultationBodyPart.title.type.name) {
//         case ConsultationEntryTypes.DOCUMENT:
//           const documentDetails =
//             createConsultationBodyPartEntryDto.value as CreateDocumentConsultationEntriesDto;

//           const consultationDocumentFormat =
//             await this.consultationDocumentFormatService.findOne(
//               documentDetails.consultationDocumentFormat,
//             );

//           const documentConsultationFile =
//             await this.fileUploadService.createDocumentConsultationFile(
//               consultationDocumentFormat.url,
//             );

//           entry = await this.documentConsultationEntryRepository.save(
//             {
//               ...documentDetails,
//               name:
//                 documentDetails.name ||
//                 consultationDocumentFormat.name,
//               status: documentDetails.status || OpenClosedStatus.OPEN,
//               type: consultationDocumentFormat.type,
//               date: consultationDocumentFormat.createdAt,
//               category:
//                 documentDetails.category ||
//                 consultationDocumentFormat.category,
//               address:
//                 documentDetails.address ||
//                 consultationDocumentFormat.address,
//               dataSensitivity:
//                 documentDetails.dataSensitivity ||
//                 consultationDocumentFormat.dataSensitivity,
//               description:
//                 documentDetails.description ||
//                 consultationDocumentFormat.description,
//               url: documentConsultationFile.relativeUrl,
//               documentConsultation:
//                 consultationBodyPart as DocumentConsultation,
//             },
//           );
//           break;

//         case ConsultationEntryTypes.MEDICINE:
//           const medicineDetails =
//             createConsultationBodyPartEntryDto.value as CreateMedicineConsultationEntryDto;
//           const medicine = await this.medicineService.findOne(
//             medicineDetails.product,
//           );
//           entry = await this.medicineConsultationEntryRepository.save(
//             {
//               ...medicineDetails,
//               medicineConsultation:
//                 consultationBodyPart as MedicineConsultation,
//               product: medicine,
//             },
//           );
//           break;

//         case ConsultationEntryTypes.INABILITY:
//           const inabilityDetails =
//             createConsultationBodyPartEntryDto.value as CreateInabilityConsultationEntryDto;
//           entry =
//             await this.inabilityConsultationEntryRepository.save({
//               ...inabilityDetails,
//               inabilityConsultation:
//                 consultationBodyPart as InabilityConsultation,
//             });
//           break;

//         case ConsultationEntryTypes.SERVICE:
//           const serviceDetails =
//             createConsultationBodyPartEntryDto.value as CreateServiceConsultationEntryDto;

//           const service = await this.serviceService.findOne(
//             serviceDetails.service,
//           );

//           const quantity =
//             serviceDetails.quantity || service.quantity;

//           const nonMandatoryService =
//             serviceDetails.nonMandatoryService ||
//             service.nonMandatoryService;

//           const tarrifPoint =
//             serviceDetails.tarrifPoint || service.tarrifPoint;

//           const total = quantity * tarrifPoint * service.pointValue;

//           entry = await this.serviceConsultationEntryRepository.save({
//             ...serviceDetails,
//             service,
//             serviceConsultation:
//               consultationBodyPart as ServiceConsultation,
//             ...service,
//             quantity,
//             nonMandatoryService,
//             tarrifPoint,
//             total,
//           });
//           break;

//         case ConsultationEntryTypes.ANALYSIS:
//           const analysisDetails = {
//             ...(createConsultationBodyPartEntryDto.value as CreateAnalysisResultDto),
//             analysisConsultation: consultationBodyPart.id,
//           };

//           entry = await this.analysisResultService.create({
//             ...analysisDetails,
//           });
//           break;

//         default:
//           break;
//       }
//       return await this.findOne(entry.id);
//     } catch (error) {
//       throw new NotImplementedException(
//         AppErrorMessages.database_error,
//       );
//     }
//   }

//   async findOne(
//     id: string,
//   ): Promise<
//     | InabilityConsultationEntry
//     | ServiceConsultationEntry
//     | AnalysisResultResponseType
//     | DocumentConsultationEntry
//     | MedicineConsultationEntry
//   > {
//     const entry = (await this.findEntryWithType(id))[0];
//     return entry;
//   }

//   async update(
//     id: string,
//     updateConsultationBodyPartEntryDto: UpdateConsultationBodyPartEntryDto,
//   ): Promise<void> {
//     // will not allow change of consultation body ID, only other values
//     const [entry, type] = await this.findEntryWithType(id);

//     try {
//       switch (type) {
//         case ConsultationEntryTypes.DOCUMENT:
//           const documentEntryValues =
//             updateConsultationBodyPartEntryDto.value as CreateDocumentConsultationEntriesDto;

//           await this.documentConsultationEntryRepository.save({
//             ...entry,
//             ...documentEntryValues,
//           });
//           break;

//         case ConsultationEntryTypes.MEDICINE:
//           const medicineEntryValues =
//             updateConsultationBodyPartEntryDto.value as CreateMedicineConsultationEntryDto;

//           const medicine = await this.medicineService.findOne(
//             medicineEntryValues.product,
//           );

//           await this.medicineConsultationEntryRepository.save({
//             ...entry,
//             ...medicineEntryValues,
//             product: medicine,
//           });
//           break;

//         case ConsultationEntryTypes.INABILITY:
//           const inabilityEntryValues =
//             updateConsultationBodyPartEntryDto.value as CreateInabilityConsultationEntryDto;

//           await this.inabilityConsultationEntryRepository.save({
//             ...entry,
//             ...inabilityEntryValues,
//           });
//           break;

//         case ConsultationEntryTypes.SERVICE:
//           const serviceEntryValues =
//             updateConsultationBodyPartEntryDto.value as CreateServiceConsultationEntryDto;

//           const serviceConsultationEntry =
//             entry as ServiceConsultationEntry;

//           const service = serviceEntryValues.service
//             ? await this.serviceService.findOne(
//                 serviceEntryValues.service,
//               )
//             : serviceConsultationEntry.service;

//           const quantity =
//             serviceEntryValues.quantity ||
//             serviceConsultationEntry.quantity;

//           const nonMandatoryService =
//             serviceEntryValues.nonMandatoryService ||
//             serviceConsultationEntry.nonMandatoryService;

//           const tarrifPoint =
//             serviceEntryValues.tarrifPoint ||
//             serviceConsultationEntry.tarrifPoint;

//           const total = quantity * tarrifPoint * service.pointValue;

//           await this.serviceConsultationEntryRepository.save({
//             ...entry,
//             ...serviceEntryValues,
//             service,
//             quantity,
//             nonMandatoryService,
//             tarrifPoint,
//             total,
//           });
//           break;

//         case ConsultationEntryTypes.ANALYSIS:
//           const analysisEntryValues =
//             updateConsultationBodyPartEntryDto.value as CreateAnalysisResultDto;

//           await this.analysisResultService.update(
//             id,
//             analysisEntryValues,
//           );
//           break;

//         default:
//           break;
//       }
//     } catch (error) {
//       throw new NotImplementedException(
//         AppErrorMessages.database_error,
//       );
//     }
//   }

//   async remove(id: string): Promise<void> {
//     const [entry, type] = await this.findEntryWithType(id);

//     try {
//       switch (type) {
//         case ConsultationEntryTypes.DOCUMENT:
//           // deleting file in bucket
//           await this.fileUploadService.deleteFile(
//             (entry as DocumentConsultationEntry).url,
//           );

//           await this.documentConsultationEntryRepository.softRemove(
//             entry as DocumentConsultationEntry,
//           );
//           break;

//         case ConsultationEntryTypes.MEDICINE:
//           await this.medicineConsultationEntryRepository.softRemove(
//             entry as MedicineConsultationEntry,
//           );
//           break;

//         case ConsultationEntryTypes.INABILITY:
//           await this.inabilityConsultationEntryRepository.softRemove(
//             entry as InabilityConsultationEntry,
//           );
//           break;

//         case ConsultationEntryTypes.SERVICE:
//           await this.serviceConsultationEntryRepository.softRemove(
//             entry as ServiceConsultationEntry,
//           );
//           break;

//         case ConsultationEntryTypes.ANALYSIS:
//           await this.analysisResultService.remove(id);
//           break;

//         default:
//           break;
//       }
//     } catch (error) {
//       throw new NotImplementedException(
//         AppErrorMessages.database_error,
//       );
//     }
//   }

//   async findEntryWithType(
//     id: string,
//   ): Promise<
//     [
//       (
//         | InabilityConsultationEntry
//         | ServiceConsultationEntry
//         | AnalysisResultResponseType
//         | DocumentConsultationEntry
//         | MedicineConsultationEntry
//       ),
//       string,
//     ]
//   > {
//     let entry:
//       | InabilityConsultationEntry
//       | ServiceConsultationEntry
//       | AnalysisResultResponseType
//       | DocumentConsultationEntry
//       | MedicineConsultationEntry;

//     entry = await this.documentConsultationEntryRepository.findOne({
//       where: { id },
//       select: {
//         id: true,
//         status: true,
//         type: true,
//         name: true,
//         category: true,
//         address: true,
//         dataSensitivity: true,
//         description: true,
//         url: true,
//       },
//     });

//     if (entry) {
//       return [entry, ConsultationEntryTypes.DOCUMENT];
//     }

//     entry = await this.medicineConsultationEntryRepository.findOne({
//       where: { id },
//       relations: { product: true },
//       select: {
//         id: true,
//         type: true,
//         product: {
//           id: true,
//           name: true,
//         },
//         packSize: true,
//         dosage: true,
//         noteForDosage: true,
//         duration: true,
//         quantity: true,
//         indications: true,
//         medicationPlan: true,
//         drivers: true,
//         validFor: true,
//       },
//     });

//     if (entry) {
//       return [entry, ConsultationEntryTypes.MEDICINE];
//     }

//     entry = await this.inabilityConsultationEntryRepository.findOne({
//       where: { id },
//       select: {
//         id: true,
//         date: true,
//         days: true,
//         incapacityForWork: true,
//         ability: true,
//         cause: true,
//       },
//     });

//     if (entry) {
//       return [entry, ConsultationEntryTypes.INABILITY];
//     }

//     entry = await this.serviceConsultationEntryRepository.findOne({
//       where: { id },
//       select: {
//         id: true,
//         remark: true,
//         nonMandatoryService: true,
//         tarrifPoint: true,
//         vat: true,
//         total: true,
//         service: {
//           id: true,
//           code: true,
//           referenceService: true,
//           description: true,
//           side: true,
//           nonMandatoryService: true,
//           quantity: true,
//           tarrifPoint: true,
//           pointValue: true,
//           vat: true,
//           info: true,
//           catalogue: true,
//           outOfBusiness: true,
//           discountCategory: true,
//           typeOfCompulsoryInsurance: true,
//           pce: true,
//         },
//       },
//     });

//     if (entry) {
//       return [entry, ConsultationEntryTypes.SERVICE];
//     }

//     entry = await this.analysisResultService.findEntry(id);

//     if (entry) {
//       return [entry, ConsultationEntryTypes.ANALYSIS];
//     }

//     if (!entry) {
//       throw new NotFoundException(
//         ConstantMessage.CONSULTATION_BODY_ENTRY_NOT_FOUND,
//       );
//     }
//   }
// }
