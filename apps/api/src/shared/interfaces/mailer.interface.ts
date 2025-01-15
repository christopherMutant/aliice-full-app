export interface MailerConfig {
  transport: {
    host: string;
    port: number;
    secure: boolean;
    auth: {
      user: string;
      pass: string;
    };
    tls: {
      rejectUnauthorized: boolean;
    };
  };
  defaults: {
    from: string;
  };
}
