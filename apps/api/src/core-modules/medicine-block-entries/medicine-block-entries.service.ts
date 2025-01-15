import {
  Injectable,
  NotFoundException,
  NotImplementedException,
} from '@nestjs/common';
import { CreateMedicineBlockEntryDto } from './dto/create-medicine-block-entry.dto';
import { UpdateMedicineBlockEntryDto } from './dto/update-medicine-block-entry.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MedicineBlock, MedicineBlockEntry } from '../all-entities';
import { Repository } from 'typeorm';
import { MedicineService } from '../medicine/medicine.service';
import { ConstantMessage } from '../../constants/constant-messages';
import { AppErrorMessages } from '../../constants/app-error-messages';
import { MedicineBlockEntryResponseType } from './types/medicine-block-entry-response.type';
import { MedicineBlockService } from '../medicine-block/medicine-block.service';

@Injectable()
export class MedicineBlockEntriesService {
  constructor(
    @InjectRepository(MedicineBlockEntry)
    private readonly medicineBlockEntryRepository: Repository<MedicineBlockEntry>,
    private readonly medicineService: MedicineService,
    private readonly medicineBlockService: MedicineBlockService,
  ) {}
  async create(
    createMedicineBlockEntryDto: CreateMedicineBlockEntryDto,
  ): Promise<MedicineBlockEntryResponseType> {
    const medicineBlock = await this.medicineBlockService.findOne(
      createMedicineBlockEntryDto.medicineBlock,
    );

    const product = await this.medicineService.findOne(
      createMedicineBlockEntryDto.product,
    );

    try {
      const medicineBlockEntry =
        await this.medicineBlockEntryRepository.save({
          ...createMedicineBlockEntryDto,
          product,
          medicineBlock,
        });

      return await this.findOne(medicineBlockEntry.id);
    } catch (error) {
      throw new NotImplementedException(
        AppErrorMessages.database_error,
      );
    }
  }

  async findOne(id: string): Promise<MedicineBlockEntryResponseType> {
    const medicineBlockEntry =
      await this.medicineBlockEntryRepository.findOne({
        where: { id },
        select: {
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
      });

    if (!medicineBlockEntry) {
      throw new NotFoundException(
        ConstantMessage.MEDICINE_BLOCK_ENTRY_NOT_FOUND,
      );
    }

    return medicineBlockEntry;
  }

  async update(
    id: string,
    updateMedicineBlockEntryDto: UpdateMedicineBlockEntryDto,
  ): Promise<void> {
    const medicineBlockEntry = await this.findOne(id);

    // fetch current medicine block, this will not allow change of medicine block
    const medicineBlock = await this.findMedicineBlock(
      medicineBlockEntry.id,
    );

    // const medicineBlock = get medicineBlock
    const product = await this.medicineService.findOne(
      updateMedicineBlockEntryDto.product,
    );

    try {
      await this.medicineBlockEntryRepository.save({
        ...medicineBlockEntry,
        ...updateMedicineBlockEntryDto,
        product,
        medicineBlock,
      });
    } catch (error) {
      throw new NotImplementedException(
        AppErrorMessages.database_error,
      );
    }
  }

  async remove(id: string): Promise<void> {
    const medicineBlockEntry = await this.findOne(id);

    try {
      await this.medicineBlockEntryRepository.softRemove(
        medicineBlockEntry,
      );
    } catch (error) {
      throw new NotImplementedException(
        AppErrorMessages.database_error,
      );
    }
  }

  async findMedicineBlock(id: string): Promise<MedicineBlock> {
    const medicineBlockEntry =
      await this.medicineBlockEntryRepository.findOne({
        where: { id },
        relations: { medicineBlock: true },
      });

    return medicineBlockEntry.medicineBlock;
  }
}
