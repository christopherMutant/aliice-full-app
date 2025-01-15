import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class HashService {
  static readonly SALT_ROUNDS = 1;

  async check(plain: string, hashed: string): Promise<boolean> {
    return await bcrypt.compare(plain, hashed);
  }

  async hash(plain: string): Promise<string> {
    return await bcrypt.hash(plain, HashService.SALT_ROUNDS);
  }
}
