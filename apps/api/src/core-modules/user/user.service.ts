import {
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
  NotImplementedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Brackets,
  FindManyOptions,
  ILike,
  In,
  IsNull,
  Not,
  Repository,
} from 'typeorm';
import { HashService } from '../../shared/hash/hash.service';
import {
  Family,
  Insurance,
  Reference,
  UserRole,
} from '../all-entities';
import { UserTransformer } from './transformers/user.transformer';
import { UserSuccessResponse } from './types/user-response';
import { AppErrorMessages } from '../../constants/app-error-messages';
import { ConstantMessage } from '../../constants/constant-messages';
import { UserQueryListingDto } from './dto/user-query-list.dto';
import { PaginatedUserType } from './types/user-list.type';
import { GlobalHelper } from '../../config/app-global-helper';
import { ENV } from '../../config/env';
import { DepartmentsService } from '../departments/departments.service';
import { RoleService } from '../role/role.service';
import { EntityNames } from '../../config/entity-names';
import {
  FamilialRelationship,
  FamilyCategory,
  RefRoleKeys,
  UserUniqueIdPrefix,
} from '../../shared/types/enums';
import { GoogleAuthenticatorService } from '../../shared/google-authenticator/google-authenticator.service';
import { MailService } from '../../shared/mail/mail.service';
import { DoctorQueryListingDto } from './dto/doctor-query-list.dto';
import { MedicalNoteService } from '../medical-note/medical-note.service';
import { CreateMedicalNoteDto } from '../medical-note/dto/create-medical-note.dto';
import { CityService } from '../city/city.service';
import { CantonService } from '../canton/canton.service';
import { CountryService } from '../country/country.service';
import { FamilialRelationshipDto } from './dto/familial-relationship.dto';
import { CompanyService } from '../company/company.service';
import { PatientQueryListingDto } from './dto/patient-query-list.dto copy';

@Injectable()
export class UserService {
  relationForSingleUser = {
    userRoles: { refRole: true },
    department: true,
    address: {
      locality: true,
      canton: true,
      country: true,
    },
    bankDetails: {
      locality: true,
      country: true,
    },
    family: {
      familyMember: {
        address: {
          locality: true,
          canton: true,
          country: true,
        },
      },
    },
    insurances: {
      company: {
        address: {
          locality: true,
          canton: true,
          country: true,
        },
      },
    },
    reference: {
      reference: {
        address: {
          locality: true,
          canton: true,
          country: true,
        },
      },
    },
    contactOwner: true,
  };
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Family)
    private readonly familyRepository: Repository<Family>,
    @InjectRepository(Insurance)
    private readonly insuranceRepository: Repository<Insurance>,
    @InjectRepository(Reference)
    private readonly referenceRepository: Repository<Reference>,
    private readonly companyService: CompanyService,
    private readonly hashService: HashService,
    private readonly departmentService: DepartmentsService,
    private readonly roleService: RoleService,
    private readonly googleAuthService: GoogleAuthenticatorService,
    private readonly mailService: MailService,
    @Inject(forwardRef(() => MedicalNoteService))
    private readonly medicalNoteService: MedicalNoteService,
    private readonly cityService: CityService,
    private readonly cantonService: CantonService,
    private readonly countryService: CountryService,
  ) {}

  /** This function is to get user for JWT Strategy /auth/jwt/jwt.strategy.ts */
  async getUserForStrategy(id: string): Promise<User> {
    return await this.userRepository.findOne({
      relations: this.relationForSingleUser,
      where: { id },
    });
  }

  async updateAccessToken(user: User): Promise<User> {
    return await this.userRepository.save({
      id: user.id,
      accessTokenHash: user.accessTokenHash,
      refreshTokenHash: user.refreshTokenHash,
    });
  }

  /** User creation by providing the department ID and User role ID */
  /** Providing form data of address, family, insurance and free references section */
  async create(
    createUserDto: CreateUserDto,
    user: User,
  ): Promise<UserSuccessResponse> {
    const {
      patientInformation,
      individualInformation,
      informationAboutMedicalCenter,
      administrativeMessage,
      bankDetails,
      contactDetails,
      address,
      // familyData,
      // insuranceData,
      // freeReferenceData,
      communication,
    } = createUserDto;

    const contactOwner = createUserDto.contactOwner
      ? await this.findOne(createUserDto.contactOwner)
      : null;

    await this.checkIfUserAlreadyExist(
      createUserDto.individualInformation.email,
    );

    const patientRole = await this.roleService.findOneByKey(
      RefRoleKeys.PATIENT,
    );

    const refRole = !patientInformation.roleId
      ? patientRole
      : await this.roleService.findOne(patientInformation.roleId);

    let prefix: UserUniqueIdPrefix | null = null;

    switch (refRole.name) {
      case 'Super Admin':
        prefix = UserUniqueIdPrefix.ADMIN;
        break;
      case 'Patient':
        prefix = UserUniqueIdPrefix.PATIENT;
        break;
      case 'Doctor':
        prefix = UserUniqueIdPrefix.DOCTOR;
        break;
      case 'Nurse':
        prefix = UserUniqueIdPrefix.NURSE;
        break;
      case 'Accountant':
        prefix = UserUniqueIdPrefix.ACCOUNTANT;
        break;
      case 'Receptionist':
        prefix = UserUniqueIdPrefix.RECEPTIONIST;
        break;
      case 'Front Desk':
        prefix = UserUniqueIdPrefix.FRONT_DESK;
        break;
      default:
        prefix = null;
        break;
    }
    const uniqueUserId = GlobalHelper.generateUniqueId(prefix);

    const department = patientInformation.departmentId
      ? await this.departmentService.findOne(
          patientInformation.departmentId,
        )
      : null;

    const city = address?.locality
      ? await this.cityService.findOne(address.locality)
      : null;
    const canton = address?.canton
      ? await this.cantonService.findOne(address.canton)
      : null;
    const country = address?.country
      ? await this.countryService.findOne(address.country)
      : null;

    const bankCity = bankDetails?.locality
      ? await this.cityService.findOne(bankDetails.locality)
      : null;
    const bankCountry = bankDetails?.country
      ? await this.countryService.findOne(bankDetails.country)
      : null;

    const familyMembers = [];
    if (familyMembers.length) {
      // for (const member of familyData) {
      //   const familyMember = await this.findOne(
      //     member.familyMemberId,
      //   );
      //   familyMembers.push({ ...member, familyMember: familyMember });
      // }
    }

    //Create a new family entity
    // let userFamily = [];
    // if (familyData) {
    //   // Checkes if Family data is not null
    //   userFamily = await this.familyRepository.save(
    //     familyData.map(family => ({
    //       ...family,
    //       person: {
    //         id: family.personId,
    //       },
    //     })),
    //   );
    // }

    //Create a new Insurance entity
    const userInsurance = [];
    // if (insuranceData) {
    //   for (const insurance of insuranceData) {
    //     const company = await this.companyService.findOne(
    //       insurance.company,
    //     );
    //     userInsurance.push({ ...insurance, company });
    //   }
    // }

    //Create a new Reference entity
    // let userReference = [];
    // if (freeReferenceData) {
    //   // Checks if Free Reference Data is Not Null
    //   userReference = await this.referenceRepository.save(
    //     freeReferenceData.map(reference => ({
    //       ...reference,
    //       reference: {
    //         id: reference.referencesId,
    //       },
    //       category: {
    //         id: reference.categoryId,
    //       },
    //     })),
    //   );
    // }

    const hashPassword =
      patientInformation.password &&
      (await this.hashService.hash(patientInformation.password));

    /** Please avoid to use create because audit logs will
     * not work properly by using create function AuditGlobalSubscriber*/
    const createUser = await this.userRepository.save({
      ...patientInformation,
      ...individualInformation,
      ...informationAboutMedicalCenter,
      ...administrativeMessage,
      userRoles: [
        {
          refRole: refRole,
        } as UserRole,
      ],
      contactDetails,
      communication,
      passwordHash: hashPassword,
      uniqueUserId,
      address: {
        ...address,
        locality: city,
        canton,
        country,
      },
      family: familyMembers,
      // insurance: userInsurance,
      // reference: userReference,
      department,
      bankDetails: {
        ...bankDetails,
        locality: bankCity,
        country: bankCountry,
      },
      contactOwner,
      insurance: userInsurance,
    });

    await this.medicalNoteService.create(
      {
        patient: createUser.id,
      } as CreateMedicalNoteDto,
      user,
    );

    // await this.userRoleRepository.save({
    //   user: createUser,
    //   refRole: {
    //     id: patientInformation.roleId,
    //   } /** We can check that coming role ID is valid or not  */,
    // });

    if (contactDetails) {
      // const contactEmail = createUser.contactDetails.find(
      //   contacts => contacts.type === 'email',
      // );
      // const googleAuthDto: GoogleAuthDto = {
      //   email: contactEmail ? contactEmail.value : null,
      // };
    }

    // const googleAuthToken =
    //   await this.googleAuthService.genGoogleAuthSecrete(
    //     googleAuthDto,
    //   );

    /** Sending User Credentials to User Email */
    // await this.mailService.sendUserCredentialsToEmail(
    //   createUser,
    //   createUser.password,
    //   googleAuthToken.secret,
    // );

    return {
      message: ConstantMessage.USER_CREATED,
      user: new UserTransformer(await this.findOne(createUser.id)),
    };
  }

  async findAll(
    userQueryListingDto: UserQueryListingDto,
  ): Promise<PaginatedUserType> {
    /**Get default limit and offset if not in dto */
    const { limit, offset } = GlobalHelper.getPaginationLimitOffSet(
      userQueryListingDto.limit,
      userQueryListingDto.offset,
    );

    const userEntity = EntityNames.USER;
    const refRoleEntity = EntityNames.REF_ROLE;
    const userRoleEntity = EntityNames.USER_ROLE;
    const userAddressEntity = EntityNames.USER_ADDRESS;
    const userFamilyEntity = EntityNames.FAMILY;
    const insuranceEntity = EntityNames.INSURANCE;
    const userReferenceEntity = EntityNames.REFERENCE;
    const companyEntity = EntityNames.COMPANY;
    const userBankDetailsEntity = EntityNames.BANKDETAILS;
    const cityEntity = EntityNames.CITY;
    const cantonEntity = EntityNames.CANTON;
    const countryEntity = EntityNames.COUNTRY;

    const queryBuilder = this.userRepository
      .createQueryBuilder(userEntity)
      .leftJoinAndSelect(`${userEntity}.department`, 'department')
      .leftJoinAndSelect(`${userEntity}.contactOwner`, 'contactOwner')
      // .leftJoinAndSelect(`${userEntity}.userRoles`, userRoleEntity)
      // .leftJoinAndSelect(`${userRoleEntity}.refRole`, refRoleEntity)
      .leftJoinAndSelect(`${userEntity}.address`, userAddressEntity)
      .leftJoinAndSelect(`${userAddressEntity}.locality`, cityEntity)
      .leftJoinAndSelect(`${userAddressEntity}.canton`, cantonEntity)
      .leftJoinAndSelect(
        `${userAddressEntity}.country`,
        countryEntity,
      )
      .leftJoinAndSelect(
        `${userEntity}.family`,
        `${userFamilyEntity}`,
      )
      .leftJoinAndSelect(
        `${userFamilyEntity}.familyMember`,
        'familyMember',
      )
      .leftJoinAndSelect(
        'familyMember.address',
        'familyMemberAddress',
      )
      .leftJoinAndSelect(
        'familyMemberAddress.locality',
        'familyMemberLocality',
      )
      .leftJoinAndSelect(
        'familyMemberAddress.canton',
        'familyMemberCanton',
      )
      .leftJoinAndSelect(
        'familyMemberAddress.country',
        'familyMemberCountry',
      )
      .leftJoinAndSelect(
        `${userEntity}.bankDetails`,
        `${userBankDetailsEntity}`,
      )
      .leftJoinAndSelect(
        `${userBankDetailsEntity}.locality`,
        'bankDetailsLocality',
      )
      .leftJoinAndSelect(
        `${userBankDetailsEntity}.country`,
        'bankDetailsCountry',
      )
      .leftJoinAndSelect(
        `${userEntity}.insurances`,
        `${insuranceEntity}`,
      )
      .leftJoinAndSelect(
        `${insuranceEntity}.company`,
        `${companyEntity}`,
      )
      .leftJoinAndSelect(`${companyEntity}.address`, 'companyAddress')
      .leftJoinAndSelect(
        'companyAddress.locality',
        'companyAddressLocality',
      )
      .leftJoinAndSelect(
        'companyAddress.canton',
        'companyAddressCanton',
      )
      .leftJoinAndSelect(
        'companyAddress.country',
        'companyAddressCountry',
      )
      .leftJoinAndSelect(
        `${userEntity}.reference`,
        `${userReferenceEntity}`,
      )
      .leftJoinAndSelect(
        `${userReferenceEntity}.reference`,
        'references',
      )
      .leftJoinAndSelect(
        `${userReferenceEntity}.category`,
        'category',
      )
      .where(`${userEntity}.id != '${ENV.SYSTEM_USER_ID}'`)
      .skip(offset)
      .take(limit)
      .orderBy(
        `${userEntity}.${userQueryListingDto.orderBy}`,
        userQueryListingDto.sort,
      ); // Add your order by conditions here

    if (userQueryListingDto.search) {
      queryBuilder.andWhere(
        new Brackets(qb => {
          qb.where(`${userEntity}.email ILIKE :search`, {
            search: `%${userQueryListingDto.search}%`,
          })
            .orWhere(`${userEntity}.firstName ILIKE :search`, {
              search: `%${userQueryListingDto.search}%`,
            })
            .orWhere(`${userEntity}.lastName ILIKE :search`, {
              search: `%${userQueryListingDto.search}%`,
            });
        }),
      );
    }

    if (userQueryListingDto.roleId) {
      queryBuilder.andWhere(
        `${userEntity}.id IN (SELECT ur.user_id FROM user_roles ur WHERE ur.ref_role_id = '${userQueryListingDto.roleId}' )`,
      );
    }

    const [users, count] = await queryBuilder.getManyAndCount();

    return {
      message: ConstantMessage.USER_FETCHED,
      pagination: { limit, offset, count },
      data: users.map((user: User) => new UserTransformer(user)),
    };
  }

  async findAllPatientsDropdown(): Promise<User[]> {
    const patients = await this.userRepository.find({
      where: {
        userRoles: { refRole: { key: RefRoleKeys.PATIENT } },
      },
      select: { id: true, firstName: true, lastName: true },
    });

    return patients.map(patient => new UserTransformer(patient));
  }

  async findAllDoctorsDropdown(): Promise<User[]> {
    const doctors = await this.userRepository.find({
      // relations: this.relationForSingleUser,
      where: {
        userRoles: { refRole: { key: RefRoleKeys.DOCTOR } },
      },
      select: { id: true, firstName: true, lastName: true },
    });
    return doctors.map(doctor => new UserTransformer(doctor));
  }

  /** The following function will return the all doctor list for patient only */
  async findAllDoctors(
    doctorQueryListingDto: DoctorQueryListingDto,
  ): Promise<PaginatedUserType> {
    /**Get default limit and offset if not in dto */
    const { limit, offset } = GlobalHelper.getPaginationLimitOffSet(
      doctorQueryListingDto.limit,
      doctorQueryListingDto.offset,
    );

    const options: FindManyOptions<User> = {
      relations: this.relationForSingleUser,
      where: {
        userRoles: {
          refRole: { key: RefRoleKeys.DOCTOR },
        },
      },
      skip: offset,
      take: limit,
    };

    if (doctorQueryListingDto.search) {
      options.where = [
        {
          ...options.where,
          firstName: ILike(`%${doctorQueryListingDto.search}%`),
        },
        {
          ...options.where,
          lastName: ILike(`%${doctorQueryListingDto.search}%`),
        },
        {
          ...options.where,
          email: ILike(`%${doctorQueryListingDto.search}%`),
        },
      ];
    }

    const [doctors, count] = await this.userRepository.findAndCount(
      options,
    );

    return {
      message: ConstantMessage.USER_FETCHED,
      pagination: { limit, offset, count },
      data: doctors.map((user: User) => new UserTransformer(user)),
    };
  }

  async findAllPatients(
    patientQueryListingDto: PatientQueryListingDto,
  ): Promise<PaginatedUserType> {
    const { limit, offset } = GlobalHelper.getPaginationLimitOffSet(
      patientQueryListingDto.limit,
      patientQueryListingDto.offset,
    );
    const userEntity = EntityNames.USER;
    const userAddressEntity = EntityNames.USER_ADDRESS;
    const cityEntity = EntityNames.CITY;
    const cantonEntity = EntityNames.CANTON;
    const countryEntity = EntityNames.COUNTRY;
    const departmentEntity = EntityNames.DEPARTMENTS;
    const userRoleEntity = EntityNames.USER_ROLE;
    const refRoleEntity = EntityNames.REF_ROLE;

    const queryBuilder = this.userRepository
      .createQueryBuilder(userEntity)
      .leftJoinAndSelect(`${userEntity}.department`, departmentEntity)
      .leftJoinAndSelect(`${userEntity}.userRoles`, userRoleEntity)
      .leftJoinAndSelect(`${userRoleEntity}.refRole`, refRoleEntity)
      .leftJoinAndSelect(`${userEntity}.address`, userAddressEntity)
      .leftJoinAndSelect(`${userAddressEntity}.locality`, cityEntity)
      .leftJoinAndSelect(`${userAddressEntity}.canton`, cantonEntity)
      .leftJoinAndSelect(
        `${userAddressEntity}.country`,
        countryEntity,
      )
      .where(`${refRoleEntity}.key = :roleKey`, {
        roleKey: RefRoleKeys.PATIENT,
      })
      .skip(offset)
      .take(limit)
      .orderBy(`${userEntity}.${patientQueryListingDto.orderBy}`);

    if (patientQueryListingDto.search) {
      queryBuilder.andWhere(
        new Brackets(qb => {
          qb.where(`${userEntity}.email ILIKE :search`, {
            search: `%${patientQueryListingDto.search}%`,
          })
            .orWhere(`${userEntity}.firstName ILIKE :search`, {
              search: `%${patientQueryListingDto.search}%`,
            })
            .orWhere(`${userEntity}.lastName ILIKE :search`, {
              search: `%${patientQueryListingDto.search}%`,
            });
        }),
      );
    }

    const [patients, count] = await queryBuilder.getManyAndCount();

    return {
      message: ConstantMessage.USER_FETCHED,
      data: patients.map(patient => {
        return new UserTransformer(patient);
      }),
      pagination: { limit, offset, count },
    };
  }

  async findOne(id: string): Promise<User> {
    const userFound = await this.userRepository.findOne({
      relations: this.relationForSingleUser,
      where: {
        id: id,
      },
    });

    if (!userFound) {
      throw new NotFoundException(
        AppErrorMessages.user_not_exists_em,
      );
    }

    return new UserTransformer(userFound);
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    const {
      patientInformation,
      individualInformation,
      informationAboutMedicalCenter,
      administrativeMessage,
      bankDetails,
      contactDetails,
      address,
      // familyData,
      // insuranceData,
      // freeReferenceData,
      communication,
    } = updateUserDto;

    const user = await this.findOne(id);

    const contactOwner = updateUserDto.contactOwner
      ? await this.findOne(updateUserDto.contactOwner)
      : user.contactOwner;

    // Handle family data updates
    // if (familyData && familyData.length > 0) {
    //   user.family = user.family || []; // Initialize if undefined

    //   for (const familyMember of familyData) {
    //     const existingFamilyMember = user.family.find(
    //       member => member.id === familyMember.id,
    //     );

    //     if (existingFamilyMember) {
    //       // Update existing family member data
    //       let person = null;
    //       if (familyMember.personId) {
    //         person = await this.userRepository.findOneBy({
    //           id: familyMember.personId,
    //         });
    //       }
    //       existingFamilyMember.person = person;

    //       Object.assign(existingFamilyMember, familyMember);
    //     } else {
    //       // Add new family member
    //       const newMember = await this.familyRepository.save({
    //         ...familyMember,
    //         person: {
    //           id: familyMember.personId,
    //         },
    //       });
    //       user.family.push(newMember);
    //     }
    //   }
    // }

    // //handleInsurance
    // if (insuranceData && insuranceData.length > 0) {
    //   user.insurance = user.insurance || []; // Initialize if undefined

    //   for (const userInsurance of insuranceData) {
    //     const existingInsurance = user.insurance.find(
    //       member => member.id === userInsurance.id,
    //     );

    // //handleReference
    // if (freeReferenceData && freeReferenceData.length > 0) {
    //   user.reference = user.reference || []; // Initialize if undefined

    //   for (const userFreeReference of freeReferenceData) {
    //     const existingReference = user.reference.find(
    //       member => member.id === userFreeReference.id,
    //     );

    //     if (existingReference) {
    //       // Update existing reference data
    //       let reference = null;
    //       if (userFreeReference.referencesId) {
    //         reference = await this.userRepository.findOneBy({
    //           id: userFreeReference.referencesId,
    //         });
    //       }
    //       existingReference.reference = reference;

    //       Object.assign(existingReference, userFreeReference);
    //     } else {
    //       // Add new reference
    //       const newReference = await this.referenceRepository.save({
    //         ...userFreeReference,
    //         reference: {
    //           id: userFreeReference.referencesId,
    //         },
    //       });
    //       user.reference.push(newReference);
    //     }
    //   }
    // }

    const department =
      patientInformation && patientInformation.departmentId
        ? await this.departmentService.findOne(
            patientInformation.departmentId,
          )
        : user.department;

    const city = address?.locality
      ? await this.cityService.findOne(address.locality)
      : user.address?.locality || null;
    const canton = address?.canton
      ? await this.cantonService.findOne(address.canton)
      : user.address?.canton || null;
    const country = address?.country
      ? await this.countryService.findOne(address.country)
      : user.address?.country || null;

    const bankCity = bankDetails?.locality
      ? await this.cityService.findOne(bankDetails.locality)
      : user.bankDetails?.locality || null;
    const bankCountry = bankDetails?.country
      ? await this.countryService.findOne(bankDetails.country)
      : user.bankDetails?.country || null;

    const familyMembers = [];
    // if (familyMembers.length) {
    //   for (const member of familyData) {
    //     const familyMember = await this.findOne(
    //       member.familyMemberId,
    //     );
    //     familyMembers.push({ ...member, familyMember: familyMember });
    //   }
    // }

    const userInsurance = [];
    // if (insuranceData) {
    //   for (const insurance of insuranceData) {
    //     const company = await this.companyService.findOne(
    //       insurance.company,
    //     );
    //     userInsurance.push({ ...insurance, company });
    //   }
    // }

    const updatedUser = {
      ...user,
      ...patientInformation,
      ...individualInformation,
      ...informationAboutMedicalCenter,
      ...administrativeMessage,
      contactDetails,
      communication,
      address: {
        ...address,
        locality: city,
        canton,
        country,
      },
      department,
      bankDetails: {
        ...bankDetails,
        locality: bankCity,
        country: bankCountry,
      },
      family: familyMembers || user.family,
      // insurances: userInsurance || user.insurances,
      contactOwner,
    };
    try {
      await this.userRepository.save(updatedUser);

      // soft removing detached family records without patient
      const invalidFamilies = await this.familyRepository.find({
        where: { patient: IsNull() },
      });
      for (const invalidFamily of invalidFamilies) {
        await this.familyRepository.softRemove(invalidFamily);
      }

      return await this.findOne(id);
    } catch (error) {
      throw new NotImplementedException(
        AppErrorMessages.database_error,
      );
    }
  }

  async remove(id: string): Promise<void> {
    //adding relations to cascade softremove
    const user = await this.userRepository.findOne({
      where: { id },
      relations: {
        medicalNote: {
          ap: true,
          of: true,
          notes: true,
          histories: true,
        },
        userRoles: true,
      },
    });
    await this.userRepository.softRemove(user); //Don't need to return anything
  }

  getFamilialRelationship(
    familialRelationshipDto: FamilialRelationshipDto,
  ): FamilialRelationship[] {
    let familialRelationship: FamilialRelationship[];

    switch (familialRelationshipDto.familyCategory) {
      case FamilyCategory.PARENT || FamilyCategory.CHILD:
        familialRelationship = [
          FamilialRelationship.BIOLOGICAL,
          FamilialRelationship.MARRIAGE_OR_ADOPTIVE,
        ];
        break;

      case FamilyCategory.SIBLINGS:
        familialRelationship = [
          FamilialRelationship.BIOLOGICAL,
          FamilialRelationship.MATERNAL,
          FamilialRelationship.PATERNAL,
        ];
        break;

      case FamilyCategory.GRANDPARENTS ||
        FamilyCategory.GRANDCHILD ||
        FamilyCategory.UNCLE_OR_AUNT ||
        FamilyCategory.NEPHEW_OR_NIECE:
        familialRelationship = [
          FamilialRelationship.BIOLOGICAL,
          FamilialRelationship.MATERNAL,
          FamilialRelationship.PATERNAL,
          FamilialRelationship.NO_INFORMATION,
        ];
        break;

      case FamilyCategory.COUSINS:
        familialRelationship = [
          FamilialRelationship.BIOLOGICAL,
          FamilialRelationship.MATERNAL,
          FamilialRelationship.PATERNAL,
          FamilialRelationship.PATERNAL_AND_MATERNAL,
          FamilialRelationship.NO_INFORMATION,
        ];
        break;

      case FamilyCategory.PARNER:
        familialRelationship = [
          FamilialRelationship.SPOUSE,
          FamilialRelationship.LIFE_PARTNER,
        ];
        break;

      default:
        familialRelationship = [FamilialRelationship.NO_INFORMATION];
        break;
    }

    return familialRelationship;
  }

  async findAllClient(): Promise<User[]> {
    const client = await this.userRepository.find({
      // relations: this.relationForSingleUser,
      where: {
        userRoles: {
          refRole: {
            key: Not(
              In([RefRoleKeys.PATIENT, RefRoleKeys.SUPER_ADMIN]),
            ),
          },
        },
      },
      select: { id: true, firstName: true, lastName: true },
    });
    return client.map(client => new UserTransformer(client));
  }

  async checkIfUserAlreadyExist(email: string): Promise<void> {
    const existingUser = await this.userRepository.findOne({
      where: { email },
    });

    /** If User exist throw conflict exception */
    if (existingUser) {
      throw new ConflictException(
        AppErrorMessages.registration_email_conflict_vm,
      );
    }
  }
}
