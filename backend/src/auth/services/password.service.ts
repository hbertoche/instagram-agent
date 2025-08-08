import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class PasswordService {
  hashPassword(password: string): string {
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha256').toString('hex');
    return `${salt}:${hash}`;
  }

  verifyPassword(password: string, stored: string): boolean {
    if (stored.includes(':')) {
      const [salt, hash] = stored.split(':');
      const hashToVerify = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha256').toString('hex');
      return hash === hashToVerify;
    } else {
      return stored === password;
    }
  }
}
