import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class BaseIdEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;
}
