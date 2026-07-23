import { IRefreshTokenGenerator } from '../../application/interfaces/IRefreshTokenGenerator';
import { ResultFactory } from '../../../../core/results/ResultFactory';
import { Result } from '../../../../core/results/Result';
import * as crypto from 'crypto';

export class RefreshTokenGenerator implements IRefreshTokenGenerator {
  async generateRefreshToken(): Promise<Result<string>> {
    try {
      const token = crypto.randomBytes(40).toString('hex');
      return ResultFactory.success(token);
    } catch (error: any) {
      return ResultFactory.infrastructure<string>(error.message || 'Failed to generate refresh token');
    }
  }
}
