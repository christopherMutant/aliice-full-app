import { Module } from '@nestjs/common';
import { AssetService } from './asset.service';
import { AssetController } from './asset.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Asset } from '../all-entities';
import { InvoiceModule } from '../invoice/invoice.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Asset]),
    InvoiceModule,
    UserModule,
  ],
  controllers: [AssetController],
  providers: [AssetService],
})
export class AssetModule {}
