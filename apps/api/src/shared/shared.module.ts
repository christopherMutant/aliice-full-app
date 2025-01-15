import { Module } from '@nestjs/common';
import { HashService } from './hash/hash.service';
import { GoogleAuthenticatorService } from './google-authenticator/google-authenticator.service';
import { MailerSMTPService } from './smtp/mailer-s-m-t-p.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { ENV } from '../config/env';
import { MailService } from './mail/mail.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailLog } from '../database/entities/email-log.entity';
import { IsInDatabaseConstraint } from './decorator/is-in-database-constraints';

@Module({
  imports: [
    TypeOrmModule.forFeature([EmailLog]),
    MailerModule.forRoot(ENV.NODE_MAILER_SMTP),
  ],
  providers: [
    HashService,
    GoogleAuthenticatorService,
    MailerSMTPService,
    MailService,
    IsInDatabaseConstraint,
  ],
  exports: [
    HashService,
    MailerSMTPService,
    MailService,
    GoogleAuthenticatorService,
  ],
})
export class SharedModule {}
