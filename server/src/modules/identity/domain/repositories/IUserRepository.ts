import { IRepository } from '../../../../core/domain/repositories/IRepository';
import { User } from '../entities/User';
import { UserId } from '../value-objects/UserId';

export interface IUserRepository extends IRepository<User, UserId> {
  findByEmail(email: string): Promise<User | null>;
  findByUsername(username: string): Promise<User | null>;
  existsByEmail(email: string): Promise<boolean>;
  existsByUsername(username: string): Promise<boolean>;
}
