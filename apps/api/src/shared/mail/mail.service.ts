import { ForbiddenException, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import hbs from 'handlebars';
import { MailerService } from '@nestjs-modules/mailer';
import { ENV } from '../../config/env';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmailLog, User } from '../../core-modules/all-entities';

@Injectable()
export class MailService {
  emailTemplate = hbs.compile(
    fs.readFileSync(
      'src/shared/mail/templates/email-template.hbs',
      'utf8',
    ),
  );

  /** Email Template for Forgot password */
  forgotPasswordTemplate = hbs.compile(
    fs.readFileSync(
      'src/shared/mail/templates/forgot-password-template.hbs',
      'utf8',
    ),
  );

  userCredentialTemplate = hbs.compile(
    fs.readFileSync(
      'src/shared/mail/templates/user-credentials-templates.hbs',
      'utf8',
    ),
  );

  constructor(
    private readonly mailerService: MailerService,
    @InjectRepository(EmailLog)
    private readonly emailLogRepository: Repository<EmailLog>,
  ) {}

  /** Send verification code to User Email */
  async sendVerificationCodeToEmail(
    user: User,
    verificationCode: number,
    subject: string,
  ): Promise<void> {
    const name = `User`;
    const contactEmail = user.contactDetails.find(
      contacts => contacts.type === 'email',
    );
    try {
      await this.mailerService.sendMail({
        to: contactEmail ? contactEmail.value : null,
        bcc: ENV.BCC_EMAIL,
        subject,
        html: this.emailTemplate({
          name,
          verificationCode,
          title: subject,
        }),
      });

      /**Success email logs insertion */
      await this.emailLogRepository.save({
        recipientEmail: contactEmail ? contactEmail.value : null,
        senderEmail: ENV.MAILER_SENDER_EMAIL,
        subject: subject,
        body: this.emailTemplate({
          name,
          verificationCode,
          title: subject,
        }),
        status: 'sent',
        emailType: 'signup',
        user: user ? user : null,
      });
    } catch (error) {
      //In case of email sending failed
      await this.emailLogRepository.save({
        recipientEmail: contactEmail ? contactEmail.value : null,
        senderEmail: ENV.MAILER_SENDER_EMAIL,
        subject: subject,
        body: this.emailTemplate({
          name,
          verificationCode,
          title: subject,
        }),
        status: 'error',
        emailType: 'signup',
        errorMessage: error.message,
        user: user ? user : null,
      });

      throw new ForbiddenException(error.message);
    }
  }

  /** Send verification code to User Email */
  async sendForgotPasswordVerificationCodeToEmail(
    user: User,
    verificationCode: number,
    subject: string,
  ): Promise<void> {
    const name = user?.firstName ? user.firstName : `User`;
    const contactEmail = user.contactDetails.find(
      contacts => contacts.type === 'email',
    );

    try {
      await this.mailerService.sendMail({
        to: contactEmail ? contactEmail.value : null,
        bcc: ENV.BCC_EMAIL,
        subject,
        html: this.forgotPasswordTemplate({
          name,
          verificationCode,
          title: subject,
        }),
      });

      /**Success email logs insertion */
      await this.emailLogRepository.save({
        recipientEmail: contactEmail ? contactEmail.value : null,
        senderEmail: ENV.MAILER_SENDER_EMAIL,
        subject: subject,
        body: this.forgotPasswordTemplate({
          name,
          verificationCode,
          title: subject,
        }),
        status: 'sent',
        emailType: 'forgot-password',
        user: user ? user : null,
      });
    } catch (error) {
      //In case of email sending failed
      await this.emailLogRepository.save({
        recipientEmail: contactEmail ? contactEmail.value : null,
        senderEmail: ENV.MAILER_SENDER_EMAIL,
        subject: subject,
        body: this.emailTemplate({
          name,
          verificationCode,
          title: subject,
        }),
        status: 'error',
        emailType: 'forgot-password',
        errorMessage: error.message,
        user: user ? user : null,
      });

      throw new ForbiddenException(error.message);
    }
  }

  /** Send User Credentials to User Email */
  async sendUserCredentialsToEmail(
    user: User,
    password: string,
    googleAuthSecret: string,
  ): Promise<void> {
    const contactEmail = user.contactDetails.find(
      contacts => contacts.type === 'email',
    );

    try {
      await this.mailerService.sendMail({
        to: contactEmail ? contactEmail.value : null,
        bcc: ENV.BCC_EMAIL,
        html: this.userCredentialTemplate({
          email: contactEmail ? contactEmail.value : null,
          password: password,
          googleAuthKey: googleAuthSecret,
          name: user.firstName,
          title: 'User Credentials',
        }),
      });
      /**Success email logs insertion */
      await this.emailLogRepository.save({
        recipientEmail: contactEmail ? contactEmail.value : null,
        senderEmail: ENV.MAILER_SENDER_EMAIL,
        subject: 'User Credentials',
        body: this.userCredentialTemplate({
          email: contactEmail ? contactEmail.value : null,
          password: password,
          googleAuthKey: googleAuthSecret,
          name: user.firstName,
          title: 'User Credentials',
        }),
        status: 'sent',
        emailType: 'user-credentials',
        user: user ? user : null,
      });
    } catch (error) {
      //In case of email sending failed
      await this.emailLogRepository.save({
        recipientEmail: contactEmail ? contactEmail.value : null,
        senderEmail: ENV.MAILER_SENDER_EMAIL,
        subject: 'User Credentials',
        body: this.userCredentialTemplate({
          email: contactEmail ? contactEmail.value : null,
          password: password,
          googleAuthKey: googleAuthSecret,
          name: user.firstName,
          title: 'User Credentials',
        }),
        status: 'error',
        emailType: 'user-credentials',
        user: user ? user : null,
      });

      throw new ForbiddenException(error.message);
    }
  }
}
