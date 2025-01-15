import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';
import { ContactCategories } from '../types/enums';

export class ContactDetailDto {
  @ApiProperty({
    description: 'Type of contact detail',
    example: 'phone',
  })
  @IsString()
  type: string;

  @ApiProperty({
    description: 'Contact category of the contact detail',
    example: Object.values(ContactCategories),
  })
  @IsEnum(ContactCategories)
  category: ContactCategories;

  @ApiProperty({
    description: 'Contact detail value',
    example: '091234567890',
  })
  @IsString()
  value: string;
}
