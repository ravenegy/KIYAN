import { PasswordHash } from '../../domain/value-objects/PasswordHash';
import { Result } from '../../../../core/results/Result';

export interface IPasswordHasher {
  hashPassword(password: string): Promise<Result<PasswordHash>>;
}
