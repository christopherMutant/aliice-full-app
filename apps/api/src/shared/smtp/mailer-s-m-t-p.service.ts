import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { Transporter } from 'nodemailer';
import * as dotenv from 'dotenv';
import { CreateEmailDto } from './dto/send-email.dto';

dotenv.config();

@Injectable()
export class MailerSMTPService {
  private transporter: Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.MAILER_HOST,
      port: 465,
      secure: true,
      auth: {
        user: process.env.MAILER_USER,
        pass: process.env.MAILER_PASSWORD,
      },
    });
  }

  async sendEmail(
    createEmailDto: CreateEmailDto,
  ): Promise<{ message: string }> {
    const mailOptions = {
      from: process.env.MAILER_SENDER_EMAIL,
      to: createEmailDto.to,
      subject: createEmailDto.subject,
      text: createEmailDto.text,
      html: createEmailDto.html,
    };

    try {
      //send email
      await this.transporter.sendMail(mailOptions);
      return { message: 'Email Sent Successfully' };
    } catch (error) {
      throw new Error('Error sending email');
    }
  }
}
