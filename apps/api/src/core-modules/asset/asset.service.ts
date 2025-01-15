import {
  Injectable,
  NotFoundException,
  NotImplementedException,
} from '@nestjs/common';
import { UpdateAssetDto } from './dto/update-asset.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Asset } from '../all-entities';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { AppErrorMessages } from '../../constants/app-error-messages';
import { CreateAssetDto } from './dto/create-asset.dto';
import { AssetQueryDto } from './dto/asset-query.dto';
import { AssetResponseType } from './types/asset-response.type';
import { InvoiceService } from '../invoice/invoice.service';
import { UserService } from '../user/user.service';
import { EntityNames } from '../../config/entity-names';
import { GlobalHelper } from '../../config/app-global-helper';
import { ConstantMessage } from '../../constants/constant-messages';

@Injectable()
export class AssetService {
  constructor(
    @InjectRepository(Asset)
    private readonly assetRepository: Repository<Asset>,
    private readonly invoiceService: InvoiceService,
    private readonly userService: UserService,
  ) {}

  async create(
    createAssetDto: CreateAssetDto,
  ): Promise<AssetResponseType> {
    const invoice =
      await this.invoiceService.findInvoiceByInvoiceNumber(
        createAssetDto.invoiceNumber,
      );

    const paid = createAssetDto.paid || 0;
    const open = createAssetDto.open || 0;
    const total = paid + open;

    try {
      const asset = await this.assetRepository.save({
        ...createAssetDto,
        invoice,
        paid,
        open,
        total,
        dateOfLastStatusChange: new Date(),
      });

      return await this.findOne(asset.id);
    } catch (error) {
      throw new NotImplementedException(
        AppErrorMessages.database_error,
      );
    }
  }

  async findAll(
    assetQueryDto: AssetQueryDto,
  ): Promise<AssetResponseType[]> {
    const patient = await this.userService.findOne(
      assetQueryDto.patient,
    );

    const queryBuilder = this.createQueryBuilder();
    const userRepository = EntityNames.USER;

    queryBuilder.where(`${userRepository}.id = :patient`, {
      patient: patient.id,
    });

    const assets = await queryBuilder.getRawMany();

    return assets.map(
      asset =>
        GlobalHelper.convertKeysToCamelCase(
          asset,
        ) as unknown as AssetResponseType,
    );
  }

  async findOne(id: string): Promise<AssetResponseType> {
    const assetRepository = EntityNames.ASSET;

    const queryBuilder = this.createQueryBuilder();
    queryBuilder.where(`${assetRepository}.id = :id`, {
      id,
    });

    const asset = await queryBuilder.getRawOne();

    if (!asset) {
      throw new NotFoundException();
    }

    return GlobalHelper.convertKeysToCamelCase(
      asset,
    ) as unknown as AssetResponseType;
  }

  async update(
    id: string,
    updateAssetDto: UpdateAssetDto,
  ): Promise<void> {
    const asset = await this.findOneAsset(id);

    const invoice =
      await this.invoiceService.findInvoiceByInvoiceNumber(
        updateAssetDto.invoiceNumber,
      );

    const open =
      updateAssetDto.open === 0
        ? 0
        : updateAssetDto.open || asset.open;
    const paid =
      updateAssetDto.paid === 0
        ? 0
        : updateAssetDto.paid || asset.paid;
    const total = open + paid;

    const dateOfLastStatusChange =
      updateAssetDto.status !== asset.status
        ? new Date()
        : asset.dateOfLastStatusChange;

    try {
      await this.assetRepository.save({
        ...asset,
        ...updateAssetDto,
        invoice,
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
    const asset = await this.findOneAsset(id);

    try {
      await this.assetRepository.softRemove({ id: asset.id });
    } catch (error) {
      throw new NotImplementedException(
        AppErrorMessages.database_error,
      );
    }
  }

  createQueryBuilder(): SelectQueryBuilder<Asset> {
    const assetRepository = EntityNames.ASSET;
    const invoiceRepository = EntityNames.INVOICE;
    const patientCaseRepository = EntityNames.PATIENT_CASE;
    const userRepository = EntityNames.USER;

    return this.assetRepository
      .createQueryBuilder(assetRepository)
      .innerJoinAndSelect(
        `${assetRepository}.invoice`,
        invoiceRepository,
      )
      .innerJoinAndSelect(
        `${invoiceRepository}.case`,
        patientCaseRepository,
      )
      .innerJoinAndSelect(
        `${patientCaseRepository}.patient`,
        userRepository,
      )
      .select([
        `${assetRepository}.id AS id`,
        `${assetRepository}.recipient AS recipient`,
        `${assetRepository}.creditCardNumber AS credit_card_number`,
        `${assetRepository}.total AS total`,
        `${assetRepository}.paid AS paid`,
        `${assetRepository}.open AS open`,
        `${assetRepository}.status AS status`,
        `${assetRepository}.dateOfLastStatusChange AS date_of_last_status_change`,
        `${invoiceRepository}.invoiceNumber AS invoice_number`,
      ])
      .orderBy(`${assetRepository}.createdAt`, 'DESC');
  }

  async findOneAsset(id: string): Promise<Asset> {
    const asset = await this.assetRepository.findOne({
      where: { id },
    });

    if (!asset) {
      throw new NotFoundException(ConstantMessage.ASSET_NOT_FOUND);
    }

    return asset;
  }
}
