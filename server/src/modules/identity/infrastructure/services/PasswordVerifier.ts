import { IPasswordVerifier } from '../../application/interfaces/IPasswordVerifier';
import { PasswordHash } from '../../domain/value-objects/PasswordHash';
import { ResultFactory } from '../../../../core/results/ResultFactory';
import { Result } from '../../../../core/results/Result';
import * as crypto from 'crypto';

export class PasswordVerifier implements IPasswordVerifier {
  async verifyPassword(password: string, hash: PasswordHash): Promise<Result<boolean>> {
    try {
      const parts = hash.value.split(':');
      if (parts.length !== 2) {
        return ResultFactory.success(false);
      }
      
      const salt = parts[0];
      const storedHash = parts[1];
      const newHash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
      
      return ResultFactory.success(storedHash === newHash);
    } catch (error: any) {
      return ResultFactory.infrastructure<boolean>(error.message || 'Failed to verify password');
    }
  }
}
