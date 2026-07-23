import { IRoleRepository } from '../../domain/repositories/IRoleRepository';
import { Role } from '../../domain/entities/Role';
import { RoleId } from '../../domain/value-objects/RoleId';
import { PagedResult } from '../../../../core/domain/repositories/PagedResult';
import { RepositoryQuery } from '../../../../core/domain/repositories/RepositoryQuery';
import { RepositoryOptions } from '../../../../core/domain/repositories/RepositoryOptions';

export class RoleRepository implements IRoleRepository {
  private roles: Map<string, Role> = new Map();

  async getById(id: RoleId, options?: RepositoryOptions): Promise<Role | null> {
    return this.roles.get(id.value) || null;
  }

  async exists(id: RoleId, options?: RepositoryOptions): Promise<boolean> {
    return this.roles.has(id.value);
  }

  async count(query?: RepositoryQuery<Role>, options?: RepositoryOptions): Promise<number> {
    return this.roles.size;
  }

  async find(query?: RepositoryQuery<Role>, options?: RepositoryOptions): Promise<PagedResult<Role>> {
    const items = Array.from(this.roles.values());
    return new PagedResult<Role>(items, items.length, 1, items.length);
  }

  async findOne(query?: RepositoryQuery<Role>, options?: RepositoryOptions): Promise<Role | null> {
    return Array.from(this.roles.values())[0] || null;
  }

  async add(entity: Role, options?: RepositoryOptions): Promise<void> {
    this.roles.set(entity.id.value, entity);
  }

  async update(entity: Role, options?: RepositoryOptions): Promise<void> {
    this.roles.set(entity.id.value, entity);
  }

  async delete(entity: Role, options?: RepositoryOptions): Promise<void> {
    this.roles.delete(entity.id.value);
  }

  async softDelete(entity: Role, options?: RepositoryOptions): Promise<void> {
    this.roles.delete(entity.id.value);
  }

  async restore(entity: Role, options?: RepositoryOptions): Promise<void> {
    this.roles.set(entity.id.value, entity);
  }

  async save(entity: Role, options?: RepositoryOptions): Promise<void> {
    this.roles.set(entity.id.value, entity);
  }

  async findByName(name: string): Promise<Role | null> {
    return Array.from(this.roles.values()).find(r => r.name === name) || null;
  }

  async existsByName(name: string): Promise<boolean> {
    return Array.from(this.roles.values()).some(r => r.name === name);
  }
}
