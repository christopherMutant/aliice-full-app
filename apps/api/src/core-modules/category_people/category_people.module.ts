import { Module } from '@nestjs/common';
import { CategoryPeopleService } from './category_people.service';
import { CategoryPeopleController } from './category_people.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryPeople } from '../all-entities';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryPeople])],
  controllers: [CategoryPeopleController],
  providers: [CategoryPeopleService],
})
export class CategoryPeopleModule {}
