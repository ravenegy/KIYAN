import { ITokenGenerator } from '../../application/interfaces/ITokenGenerator';
import { User } from '../../domain/entities/User';
import { ResultFactory } from '../../../../core/results/ResultFactory';
import { Result } from '../../../../core/results/Result';
import * as crypto from 'crypto';

export class TokenGenerator implements ITokenGenerator {
  async generateToken(user: User): Promise<Result<string>> {
    try {
      // Dummy JWT-like generation. In a real app use jsonwebtoken package.
      const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64');
      const payload = Buffer.from(JSON.stringify({
        sub: user.id.value,
        email: user.emailAddress.value,
        exp: Math.floor(Date.now() / 1000) + (60 * 60) // 1 hour expiration
      })).toString('base64');
      
      const signature = crypto.createHmac('sha256', 'secret')
        .update(`${header}.${payload}`)
        .digest('base64');
        
      return ResultFactory.success(`${header}.${payload}.${signature}`);
    } catch (error: any) {
      return ResultFactory.infrastructure<string>(error.message || 'Failed to generate token');
    }
  }
}
