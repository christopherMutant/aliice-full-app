import {
  Injectable,
  NotFoundException,
  NotImplementedException,
} from '@nestjs/common';
import { Medicine } from './entities/medicine.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConstantMessage } from '../../constants/constant-messages';
import { CreateMedicineDto } from './dto/create-medicine.dto';
import { AppErrorMessages } from '../../constants/app-error-messages';
import { UpdateMedicineDto } from './dto/update-medicine.dto';

@Injectable()
export class MedicineService {
  constructor(
    @InjectRepository(Medicine)
    private readonly medicineRepository: Repository<Medicine>,
  ) {}

  async medicinesList(): Promise<Medicine[]> {
    return await this.medicineRepository.find();
  }

  async findOne(id: string): Promise<Medicine> {
    const medicine = await this.medicineRepository.findOneBy({ id });

    if (!medicine) {
      throw new NotFoundException(ConstantMessage.MEDICINE_NOT_FOUND);
    }

    return medicine;
  }

  async create(
    createMedicineDto: CreateMedicineDto,
  ): Promise<Medicine> {
    try {
      const createMedicine = await this.medicineRepository.save({
        ...createMedicineDto,
      });

      return await this.findOne(createMedicine.id);
    } catch (err) {
      throw new NotImplementedException(
        AppErrorMessages.database_error,
      );
    }
  }

  async update(
    id: string,
    updateMedicineDto: UpdateMedicineDto,
  ): Promise<void> {
    // validate medicine
    await this.findOne(id);

    try {
      await this.medicineRepository.save({
        id,
        ...updateMedicineDto,
      });
    } catch (err) {
      throw new NotImplementedException(
        AppErrorMessages.database_error,
      );
    }
  }

  async remove(id: string): Promise<void> {
    const medicine = await this.findOne(id);

    try {
      await this.medicineRepository.softRemove({
        ...medicine,
      });
    } catch (err) {
      throw new NotImplementedException(
        AppErrorMessages.database_error,
      );
    }
  }
}
