import * as dotenv from 'dotenv';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { AllEntities } from '../core-modules/all-entities';
import { MailerConfig } from '../shared/interfaces/mailer.interface';

class EnvConfig {
  private readonly envConfig: { [key: string]: string };

  constructor() {
    dotenv.config();
    this.envConfig = process.env;
  }

  get PORT(): number {
    return +this.envConfig['PORT'] || 3000;
  }

  get ENABLE_SWAGGER(): boolean {
    return !!+this.envConfig['ENABLE_SWAGGER'];
  }

  get LOGGER_SLACK_WEBHOOK_URL(): string {
    return this.envConfig['LOGGER_SLACK_WEBHOOK_URL'];
  }

  get NODE_ENV(): string {
    return this.envConfig['NODE_ENV'] || 'development';
  }

  get SERVICE_NAME(): string {
    return this.envConfig['SERVICE_NAME'] || 'Aliice API Service';
  }

  get BACKEND_URL(): string {
    return this.envConfig['BACKEND_URL'];
  }

  get DB_CONFIGURATION(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.envConfig['DB_HOST'] || '127.0.0.1',
      port: +this.envConfig['DB_PORT'] || 5432,
      username: this.envConfig['DB_USERNAME'],
      password: this.envConfig['DB_PASSWORD'],
      database: this.envConfig['DB_NAME'],
      entities: AllEntities,
      logging: false,
      // ssl: false,
      ssl: {
        rejectUnauthorized: false, // if you don't have SSL certificates
      },
      namingStrategy: new SnakeNamingStrategy(),
      synchronize: !!+this.envConfig['DB_SYNCHRONIZE'],
      retryAttempts: 5,
      maxQueryExecutionTime: 20000,
      keepConnectionAlive: true,
      extra: {
        connectionLimit: 20,
      },
    };
  }

  get NODE_MAILER_SMTP(): MailerConfig {
    return {
      transport: {
        host: this.envConfig['MAILER_HOST'],
        port: 587, // or whatever port your SMTP server uses
        secure: false, // set to true if you're using SSL/TLS
        auth: {
          user: this.envConfig['MAILER_USER'],
          pass: this.envConfig['MAILER_PASSWORD'],
        },
        tls: {
          rejectUnauthorized: false,
        },
      },
      defaults: {
        from: `"Aliice" ${this.envConfig['MAILER_SENDER_EMAIL']}`, // sender address
      },
    };
  }

  get JWT_SECRET(): string {
    return this.envConfig['JWT_SECRET'] || 'jwt-secret-aliice';
  }

  get JWT_TOKEN_EXPIRATION_IN_MINUTE(): number {
    return +this.envConfig['JWT_TOKEN_EXPIRATION_IN_MINUTE'] || 180;
  }

  get JWT_REFRESH_SECRET(): string {
    return (
      this.envConfig['JWT_REFRESH_SECRET'] ||
      'jwt-refresh-aliice-secret'
    );
  }

  get SYSTEM_USER_ID(): string {
    return (
      this.envConfig['SYSTEM_USER_ID'] ||
      '2e1c7fe4-4abe-43cd-8a16-9534cfb397af'
    );
  }

  get JWT_REFRESH_TOKEN_EXPIRATION_IN_MINUTE(): number {
    return (
      +this.envConfig['JWT_REFRESH_TOKEN_EXPIRATION_IN_MINUTE'] ||
      2880
    );
  }

  get MAILER_SENDER_EMAIL(): string {
    return this.envConfig['MAILER_SENDER_EMAIL'];
  }

  get BCC_EMAIL(): string {
    return this.envConfig['BCC_EMAIL'] || '';
  }

  get BUCKET_USER(): string {
    return this.envConfig['BUCKET_USER'];
  }

  get BUCKET_PASSWORD(): string {
    return this.envConfig['BUCKET_PASSWORD'];
  }

  get BUCKET_HOST(): string {
    return this.envConfig['BUCKET_HOST'];
  }

  get BUCKET_NAME(): string {
    return this.envConfig['BUCKET_NAME'];
  }

  get BUCKET_BASE_URL(): string {
    return this.envConfig['BUCKET_BASE_URL'];
  }
}

export const ENV = new EnvConfig();
