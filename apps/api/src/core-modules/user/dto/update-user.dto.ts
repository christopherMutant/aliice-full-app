import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  // @ApiProperty({
  //   description: 'Insurance data of the user',
  //   example: [
  //     {
  //       id: 'string',
  //       assuranceType: [
  //         'Assurance LaMal',
  //         'Assurance LCA',
  //         'Assurance LaMal And LCA',
  //         'Assurance LAA',
  //         'Assurance LAM',
  //         'Assurance LAI',
  //       ],
  //       assuranceId: 'string',
  //       healthInsuranceModel: [
  //         'unknown',
  //         'No Selection',
  //         'No Basic Insurance',
  //         'Standard Model According To LAMal',
  //         'HMO According To LaMal',
  //         'Model Lists According To LaMal',
  //         'Phone Model According To LaMal',
  //         'Pharmacy Model According To LaMal',
  //         'Special Model According to LaMal',
  //       ],
  //       cardNumber: 'string',
  //       validFrom: '2024-10-11T05:35:58.705Z',
  //       validTo: '2024-10-11T05:35:58.705Z',
  //       insuranceNumber: 'string',
  //       sendCopyToRefence: true,
  //       noticed: 'string',
  //     },
  //   ],
  // })
  // @IsOptional()
  // @IsArray()
  // insuranceData?: CreateInsuranceDto[];
  // @ApiProperty({
  //   description: 'Reference Form Data',
  //   example: [
  //     {
  //       id: 'string',
  //       referencesId: 'fc3d3b7b-b239-4f9b-b7b5-d76450656f5d',
  //       categoryId: '2e1c7fe4-4abe-43cd-8a16-9534cfb397af',
  //       noticed: 'string',
  //       sendCopyToReference: false,
  //     },
  //   ],
  // })
  // @IsOptional()
  // @IsArray()
  // freeReferenceData: CreateReferenceDto[];
}
