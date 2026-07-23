import { IUserLookupService } from '../../application/interfaces/IUserLookupService';
import { IUserRepository } from '../../domain/repositories/IUserRepository';
import { User } from '../../domain/entities/User';
import { UserId } from '../../domain/value-objects/UserId';
import { ResultFactory } from '../../../../core/results/ResultFactory';
import { Result } from '../../../../core/results/Result';

export class UserLookupService implements IUserLookupService {
  constructor(private readonly userRepository: IUserRepository) {}

  async findById(id: UserId): Promise<Result<User>> {
    const user = await this.userRepository.getById(id);
    if (!user) {
      return ResultFactory.notFound<User>(`User with ID ${id.value} not found`);
    }
    return ResultFactory.success(user);
  }

  async findByEmail(email: string): Promise<Result<User>> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      return ResultFactory.notFound<User>(`User with email ${email} not found`);
    }
    return ResultFactory.success(user);
  }

  async findByUsername(username: string): Promise<Result<User>> {
    const user = await this.userRepository.findByUsername(username);
    if (!user) {
      return ResultFactory.notFound<User>(`User with username ${username} not found`);
    }
    return ResultFactory.success(user);
  }
}
