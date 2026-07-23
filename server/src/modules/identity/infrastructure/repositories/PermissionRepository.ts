import { IPermissionRepository } from '../../domain/repositories/IPermissionRepository';
import { Permission } from '../../domain/entities/Permission';
import { PermissionId } from '../../domain/value-objects/PermissionId';
import { PagedResult } from '../../../../core/domain/repositories/PagedResult';
import { RepositoryQuery } from '../../../../core/domain/repositories/RepositoryQuery';
import { RepositoryOptions } from '../../../../core/domain/repositories/RepositoryOptions';

export class PermissionRepository implements IPermissionRepository {
  private permissions: Map<string, Permission> = new Map();

  async getById(id: PermissionId, options?: RepositoryOptions): Promise<Permission | null> {
    return this.permissions.get(id.value) || null;
  }

  async exists(id: PermissionId, options?: RepositoryOptions): Promise<boolean> {
    return this.permissions.has(id.value);
  }

  async count(query?: RepositoryQuery<Permission>, options?: RepositoryOptions): Promise<number> {
    return this.permissions.size;
  }

  async find(query?: RepositoryQuery<Permission>, options?: RepositoryOptions): Promise<PagedResult<Permission>> {
    const items = Array.from(this.permissions.values());
    return new PagedResult<Permission>(items, items.length, 1, items.length);
  }

  async findOne(query?: RepositoryQuery<Permission>, options?: RepositoryOptions): Promise<Permission | null> {
    return Array.from(this.permissions.values())[0] || null;
  }

  async add(entity: Permission, options?: RepositoryOptions): Promise<void> {
    this.permissions.set(entity.id.value, entity);
  }

  async update(entity: Permission, options?: RepositoryOptions): Promise<void> {
    this.permissions.set(entity.id.value, entity);
  }

  async delete(entity: Permission, options?: RepositoryOptions): Promise<void> {
    this.permissions.delete(entity.id.value);
  }

  async softDelete(entity: Permission, options?: RepositoryOptions): Promise<void> {
    this.permissions.delete(entity.id.value);
  }

  async restore(entity: Permission, options?: RepositoryOptions): Promise<void> {
    this.permissions.set(entity.id.value, entity);
  }

  async save(entity: Permission, options?: RepositoryOptions): Promise<void> {
    this.permissions.set(entity.id.value, entity);
  }

  async findByCode(code: string): Promise<Permission | null> {
    return Array.from(this.permissions.values()).find(p => p.code === code) || null;
  }

  async existsByCode(code: string): Promise<boolean> {
    return Array.from(this.permissions.values()).some(p => p.code === code);
  }
}
