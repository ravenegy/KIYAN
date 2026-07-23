import { User } from '../../domain/entities/User';
import { UserId } from '../../domain/value-objects/UserId';
import { Result } from '../../../../core/results/Result';

export interface IUserLookupService {
  findById(id: UserId): Promise<Result<User>>;
  findByEmail(email: string): Promise<Result<User>>;
  findByUsername(username: string): Promise<Result<User>>;
}
