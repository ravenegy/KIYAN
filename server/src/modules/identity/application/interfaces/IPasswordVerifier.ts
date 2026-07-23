import { PasswordHash } from '../../domain/value-objects/PasswordHash';
import { Result } from '../../../../core/results/Result';

export interface IPasswordVerifier {
  verifyPassword(password: string, hash: PasswordHash): Promise<Result<boolean>>;
}
