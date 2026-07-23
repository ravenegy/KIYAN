import { User } from '../../domain/entities/User';
import { Result } from '../../../../core/results/Result';

export interface ITokenGenerator {
  generateToken(user: User): Promise<Result<string>>;
}
