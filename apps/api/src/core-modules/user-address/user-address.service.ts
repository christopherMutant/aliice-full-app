import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserAddressDto } from './dto/update-user-address.dto';
import { UserAddress } from '../all-entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConstantMessage } from '../../constants/constant-messages';
import { CityService } from '../city/city.service';
import { CantonService } from '../canton/canton.service';
import { CountryService } from '../country/country.service';

@Injectable()
export class UserAddressService {
  constructor(
    @InjectRepository(UserAddress)
    private readonly userAddressRepository: Repository<UserAddress>,
    private readonly cityService: CityService,
    private readonly cantonService: CantonService,
    private readonly countryService: CountryService,
  ) {}

  async update(
    id: string,
    updateUserAddressDto: UpdateUserAddressDto,
  ): Promise<void> {
    const city = await this.cityService.findOne(
      updateUserAddressDto.locality,
    );

    const canton = await this.cantonService.findOne(
      updateUserAddressDto.canton,
    );

    const country = await this.countryService.findOne(
      updateUserAddressDto.country,
    );

    const useraddress = await this.findOne(id);

    const updatedUserAddress = {
      ...useraddress,
      ...updateUserAddressDto,
      locality: city,
      canton,
      country,
    };

    await this.userAddressRepository.save(updatedUserAddress);
  }

  async findOne(id: string): Promise<UserAddress> {
    const useraddress = await this.userAddressRepository.findOneBy({
      id,
    });

    if (!useraddress) {
      throw new NotFoundException(
        ConstantMessage.USER_ADDRESS_NOT_FOUND,
      );
    }

    return useraddress;
  }
}
