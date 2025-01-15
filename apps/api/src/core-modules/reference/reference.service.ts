import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReferenceDto } from './dto/create-reference.dto';
import { UpdateReferenceDto } from './dto/update-reference.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Reference } from '../all-entities';
import { Repository } from 'typeorm';
import { ConstantMessage } from '../../constants/constant-messages';
import { ReferenceTransformer } from './transformer/reference.transformer';

@Injectable()
export class ReferenceService {
  constructor(
    @InjectRepository(Reference)
    private readonly referenceRepository: Repository<Reference>,
  ) {}

  async create(
    createReferenceDto: CreateReferenceDto,
  ): Promise<Reference> {
    const reference = await this.referenceRepository.save(
      createReferenceDto,
    );
    return new ReferenceTransformer(reference);
  }

  async update(
    id: string,
    updateReferenceDto: UpdateReferenceDto,
  ): Promise<void> {
    const reference = await this.referenceById(id);

    const updatedReference = { ...reference, ...updateReferenceDto };

    await this.referenceRepository.save(updatedReference);
  }

  async referenceById(id: string): Promise<Reference> {
    const reference = await this.referenceRepository.findOneBy({
      id,
    });

    if (!reference) {
      throw new NotFoundException(
        ConstantMessage.REFERENCE_NOT_FOUND,
      );
    }

    return reference;
  }
}
