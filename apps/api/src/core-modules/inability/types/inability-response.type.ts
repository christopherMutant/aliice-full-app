import { ApiProperty } from '@nestjs/swagger';

export class InabilityResponseType {
  @ApiProperty()
  id: string;

  @ApiProperty({
    description: 'Date start of the inability',
  })
  dateStart: Date;

  @ApiProperty({
    description: 'Number of days of the inability',
  })
  days: number;

  @ApiProperty({
    description: 'Incapacity percentage for work of the patient',
  })
  incapacityForWork: number;

  @ApiProperty({
    description: 'Ability percentage for work of the patient',
  })
  ability: number;

  @ApiProperty({
    description: 'Cause of inability',
  })
  cause: string;
}
