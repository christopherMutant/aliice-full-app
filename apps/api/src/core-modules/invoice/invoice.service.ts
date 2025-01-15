import {
  Injectable,
  NotFoundException,
  NotImplementedException,
} from '@nestjs/common';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Invoice } from '../all-entities';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { PatientCasesService } from '../patient-cases/patient-cases.service';
import { AppErrorMessages } from '../../constants/app-error-messages';
import { InvoiceQueryDto } from './dto/invoice-query.dto';
import { InvoiceResponseType } from './types/invoice-response.type';
import { EntityNames } from '../../config/entity-names';
import { UserService } from '../user/user.service';
import { GlobalHelper } from '../../config/app-global-helper';
import { ConstantMessage } from '../../constants/constant-messages';

@Injectable()
export class InvoiceService {
  constructor(
    @InjectRepository(Invoice)
    private readonly invoiceRepository: Repository<Invoice>,
    private readonly patientCasesService: PatientCasesService,
    private readonly userService: UserService,
  ) {}
  async create(
    createInvoiceDto: CreateInvoiceDto,
  ): Promise<InvoiceResponseType> {
    const patientCase = await this.patientCasesService.findOne(
      createInvoiceDto.case,
    );

    try {
      const invoice = await this.invoiceRepository.save({
        ...createInvoiceDto,
        case: patientCase,
        total: createInvoiceDto.paid + createInvoiceDto.open,
        dateOfLastStatusChange: new Date(),
      });

      return await this.findOne(invoice.id);
    } catch (error) {
      throw new NotImplementedException(
        AppErrorMessages.database_error,
      );
    }
  }

  async findAll(
    invoiceQueryDto: InvoiceQueryDto,
  ): Promise<InvoiceResponseType[]> {
    const patient = await this.userService.findOne(
      invoiceQueryDto.patient,
    );

    const queryBuilder = this.createQueryBuilder();
    const userRepository = EntityNames.USER;

    queryBuilder.where(`${userRepository}.id = :patient`, {
      patient: patient.id,
    });

    const invoices = await queryBuilder.getRawMany();

    return invoices.map(invoice => {
      const currentInvoice =
        GlobalHelper.convertKeysToCamelCase(invoice);

      // currentInvoice.caseNo =
      //   this.patientCaseService.transformPatientCaseNumber(
      //     currentInvoice.caseNo as number,
      //   );

      return currentInvoice as unknown as InvoiceResponseType;
    });
  }

  async findOne(id: string): Promise<InvoiceResponseType> {
    const invoiceRepository = EntityNames.INVOICE;

    const queryBuilder = this.createQueryBuilder();
    queryBuilder.where(`${invoiceRepository}.id = :id`, {
      id,
    });

    const invoice = await queryBuilder.getRawOne();

    if (!invoice) {
      throw new NotFoundException(ConstantMessage.INVOICE_NOT_FOUND);
    }

    return GlobalHelper.convertKeysToCamelCase(
      invoice,
    ) as unknown as InvoiceResponseType;
  }

  async update(
    id: string,
    updateInvoiceDto: UpdateInvoiceDto,
  ): Promise<void> {
    const invoice = await this.findOneInvoice(id);

    const patientCase = await this.patientCasesService.findOne(
      updateInvoiceDto.case,
    );

    const dateOfLastStatusChange =
      updateInvoiceDto.status !== invoice.status
        ? new Date()
        : invoice.dateOfLastStatusChange;

    const open =
      updateInvoiceDto.open === 0
        ? 0
        : updateInvoiceDto.open || invoice.open;
    const paid =
      updateInvoiceDto.paid === 0
        ? 0
        : updateInvoiceDto.paid || invoice.paid;
    const total = open + paid;

    try {
      await this.invoiceRepository.save({
        ...invoice,
        case: patientCase,
        total,
        paid,
        open,
        dateOfLastStatusChange,
      });
    } catch (error) {
      throw new NotImplementedException(
        AppErrorMessages.database_error,
      );
    }
  }

  async remove(id: string): Promise<void> {
    const invoice = await this.findOneInvoice(id);

    try {
      await this.invoiceRepository.softRemove({ id: invoice.id });
    } catch (error) {
      throw new NotImplementedException(
        AppErrorMessages.database_error,
      );
    }
  }

  async findInvoiceByInvoiceNumber(
    invoiceNumber: number,
  ): Promise<Invoice> {
    const invoice = await this.invoiceRepository.findOne({
      where: { invoiceNumber },
    });

    if (!invoice) {
      throw new NotFoundException();
    }

    return invoice;
  }

  createQueryBuilder(): SelectQueryBuilder<Invoice> {
    const invoiceRepository = EntityNames.INVOICE;
    const patientCaseRepository = EntityNames.PATIENT_CASE;
    const userRepository = EntityNames.USER;

    return this.invoiceRepository
      .createQueryBuilder(invoiceRepository)
      .innerJoinAndSelect(
        `${invoiceRepository}.case`,
        patientCaseRepository,
      )
      .innerJoinAndSelect(
        `${patientCaseRepository}.patient`,
        userRepository,
      )
      .select([
        `${invoiceRepository}.id AS id`,
        `${invoiceRepository}.invoiceNumber AS invoice_number`,
        `${patientCaseRepository}.caseNo AS case_no`,
        `${invoiceRepository}.concerned AS concerned`,
        `${invoiceRepository}.accountingGroup AS accounting_group`,
        `${invoiceRepository}.of AS of`,
        `${invoiceRepository}.to AS to`,
        `${invoiceRepository}.recipient AS recipient`,
        `${invoiceRepository}.remb AS remb`,
        `${invoiceRepository}.total AS total`,
        `${invoiceRepository}.paid AS paid`,
        `${invoiceRepository}.open AS open`,
        `${invoiceRepository}.messages AS messages`,
        `${invoiceRepository}.rf AS rf`,
        `${invoiceRepository}.copyOfFeedback AS copy_of_feedback`,
        `${invoiceRepository}.reminders AS reminders`,
        `${invoiceRepository}.status AS status`,
        `${invoiceRepository}.dateOfLastStatusChange AS date_of_last_status_change`,
      ])
      .orderBy(`${invoiceRepository}.createdAt`, 'DESC');
  }

  async findOneInvoice(id: string): Promise<Invoice> {
    const invoice = await this.invoiceRepository.findOne({
      where: {
        case: { id },
      },
    });

    if (!invoice) {
      throw new NotFoundException(ConstantMessage.INVOICE_NOT_FOUND);
    }

    return invoice;
  }
}
