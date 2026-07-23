import { Result } from '../../../../core/results/Result';

export interface IRefreshTokenGenerator {
  generateRefreshToken(): Promise<Result<string>>;
}
