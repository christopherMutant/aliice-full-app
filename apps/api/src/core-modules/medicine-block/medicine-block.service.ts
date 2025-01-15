import {
  Injectable,
  NotFoundException,
  NotImplementedException,
} from '@nestjs/common';
import { CreateMedicineBlockDto } from './dto/create-medicine-block.dto';
import { UpdateMedicineBlockDto } from './dto/update-medicine-block.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MedicineBlock } from '../all-entities';
import { ILike, Repository } from 'typeorm';
import { AppErrorMessages } from '../../constants/app-error-messages';
import { ConstantMessage } from '../../constants/constant-messages';
import { MedicineBlockListDto } from './dto/medicine-block-list.dto';
import {
  MedicineBlockListResponseType,
  MedicineBlockResponseType,
} from './types/medicine-block-response.type';

@Injectable()
export class MedicineBlockService {
  constructor(
    @InjectRepository(MedicineBlock)
    private readonly medicineBlockRepository: Repository<MedicineBlock>,
  ) {}
  async create(
    createMedicineBlockDto: CreateMedicineBlockDto,
  ): Promise<MedicineBlockResponseType> {
    try {
      const medicineBlock = await this.medicineBlockRepository.save(
        createMedicineBlockDto,
      );

      return await this.findOne(medicineBlock.id);
    } catch (error) {
      throw new NotImplementedException(
        AppErrorMessages.database_error,
      );
    }
  }

  async findAll(
    medicineBlockListDto: MedicineBlockListDto,
  ): Promise<MedicineBlockListResponseType[]> {
    const medicineBlocks = await this.medicineBlockRepository.find({
      select: {
        id: true,
        name: true,
      },
      where: [
        {
          ...(medicineBlockListDto?.search && {
            name: ILike(`%${medicineBlockListDto.search}%`),
          }),
        },
      ],
    });

    return medicineBlocks;
  }

  async findOne(id: string): Promise<MedicineBlockResponseType> {
    const medicineBlock = await this.medicineBlockRepository.findOne({
      where: { id },
      relations: { entries: true },
      select: {
        id: true,
        name: true,
        entries: {
          id: true,
          type: true,
          product: {
            id: true,
            name: true,
          },
          packSize: true,
          dosage: true,
          noteForDosage: true,
          duration: true,
          quantity: true,
          indications: true,
          medicationPlan: true,
          drivers: true,
          validFor: true,
        },
      },
    });

    if (!medicineBlock) {
      throw new NotFoundException(
        ConstantMessage.MEDICINE_BLOCK_NOT_FOUND,
      );
    }

    return medicineBlock;
  }

  async update(
    id: string,
    updateMedicineBlockDto: UpdateMedicineBlockDto,
  ): Promise<void> {
    const medicineBlock = await this.findOne(id);

    try {
      await this.medicineBlockRepository.save({
        ...medicineBlock,
        ...updateMedicineBlockDto,
      });
    } catch (error) {
      throw new NotImplementedException(
        AppErrorMessages.database_error,
      );
    }
  }

  async remove(id: string): Promise<void> {
    const medicineBlock = await this.findOne(id);

    try {
      await this.medicineBlockRepository.softRemove(medicineBlock);
    } catch (error) {
      throw new NotImplementedException(
        AppErrorMessages.database_error,
      );
    }
  }
}
