import { IUserRepository } from '../../domain/repositories/IUserRepository';
import { User } from '../../domain/entities/User';
import { UserId } from '../../domain/value-objects/UserId';
import { PagedResult } from '../../../../core/domain/repositories/PagedResult';
import { RepositoryQuery } from '../../../../core/domain/repositories/RepositoryQuery';
import { RepositoryOptions } from '../../../../core/domain/repositories/RepositoryOptions';
import { Result } from '../../../../core/results/Result';

export class UserRepository implements IUserRepository {
  private users: Map<string, User> = new Map();

  async getById(id: UserId, options?: RepositoryOptions): Promise<User | null> {
    return this.users.get(id.value) || null;
  }

  async exists(id: UserId, options?: RepositoryOptions): Promise<boolean> {
    return this.users.has(id.value);
  }

  async count(query?: RepositoryQuery<User>, options?: RepositoryOptions): Promise<number> {
    return this.users.size;
  }

  async find(query?: RepositoryQuery<User>, options?: RepositoryOptions): Promise<PagedResult<User>> {
    const items = Array.from(this.users.values());
    return new PagedResult<User>(items, items.length, 1, items.length);
  }

  async findOne(query?: RepositoryQuery<User>, options?: RepositoryOptions): Promise<User | null> {
    return Array.from(this.users.values())[0] || null;
  }

  async add(entity: User, options?: RepositoryOptions): Promise<void> {
    this.users.set(entity.id.value, entity);
  }

  async update(entity: User, options?: RepositoryOptions): Promise<void> {
    this.users.set(entity.id.value, entity);
  }

  async delete(entity: User, options?: RepositoryOptions): Promise<void> {
    this.users.delete(entity.id.value);
  }

  async softDelete(entity: User, options?: RepositoryOptions): Promise<void> {
    this.users.delete(entity.id.value);
  }

  async restore(entity: User, options?: RepositoryOptions): Promise<void> {
    this.users.set(entity.id.value, entity);
  }

  async save(entity: User, options?: RepositoryOptions): Promise<void> {
    this.users.set(entity.id.value, entity);
  }

  async findByEmail(email: string): Promise<User | null> {
    return Array.from(this.users.values()).find(u => u.emailAddress.value === email) || null;
  }

  async findByUsername(username: string): Promise<User | null> {
    return Array.from(this.users.values()).find(u => u.username.value === username) || null;
  }

  async existsByEmail(email: string): Promise<boolean> {
    return Array.from(this.users.values()).some(u => u.emailAddress.value === email);
  }

  async existsByUsername(username: string): Promise<boolean> {
    return Array.from(this.users.values()).some(u => u.username.value === username);
  }
}
