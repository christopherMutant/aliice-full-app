// import { forwardRef, Module } from '@nestjs/common';
// import { ConsultationService } from './consultation.service';
// import { ConsultationController } from './consultation.controller';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { Consultation } from '../all-entities';
// import { ConsultationBodyModule } from '../consultation-body/consultation-body.module';
// import { UserModule } from '../user/user.module';

// @Module({
//   imports: [
//     TypeOrmModule.forFeature([Consultation]),
//     forwardRef(() => ConsultationBodyModule),
//     UserModule,
//   ],
//   controllers: [ConsultationController],
//   providers: [ConsultationService],
//   exports: [ConsultationService],
// })
// export class ConsultationModule {}
