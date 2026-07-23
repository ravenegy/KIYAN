import { IPasswordHasher } from '../../application/interfaces/IPasswordHasher';
import { PasswordHash } from '../../domain/value-objects/PasswordHash';
import { ResultFactory } from '../../../../core/results/ResultFactory';
import { Result } from '../../../../core/results/Result';
import * as crypto from 'crypto';

export class PasswordHasher implements IPasswordHasher {
  async hashPassword(password: string): Promise<Result<PasswordHash>> {
    try {
      // In a real application, use bcrypt or argon2. Using simple hash for demo purposes.
      const salt = crypto.randomBytes(16).toString('hex');
      const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
      const hashString = `${salt}:${hash}`;
      
      return ResultFactory.success(PasswordHash.create(hashString));
    } catch (error: any) {
      return ResultFactory.infrastructure<PasswordHash>(error.message || 'Failed to hash password');
    }
  }
}
