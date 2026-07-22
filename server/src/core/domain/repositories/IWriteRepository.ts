import { RepositoryOptions } from './RepositoryOptions';

export interface IWriteRepository<TEntity, TId> {
  add(entity: TEntity, options?: RepositoryOptions): Promise<void>;
  update(entity: TEntity, options?: RepositoryOptions): Promise<void>;
  delete(entity: TEntity, options?: RepositoryOptions): Promise<void>;
  softDelete(entity: TEntity, options?: RepositoryOptions): Promise<void>;
  restore(entity: TEntity, options?: RepositoryOptions): Promise<void>;
  save(entity: TEntity, options?: RepositoryOptions): Promise<void>;
}
