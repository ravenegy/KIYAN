import { RepositoryOptions } from './RepositoryOptions';
import { RepositoryQuery } from './RepositoryQuery';
import { PagedResult } from './PagedResult';

export interface IReadRepository<TEntity, TId> {
  getById(id: TId, options?: RepositoryOptions): Promise<TEntity | null>;
  exists(id: TId, options?: RepositoryOptions): Promise<boolean>;
  count(query?: RepositoryQuery<TEntity>, options?: RepositoryOptions): Promise<number>;
  find(query?: RepositoryQuery<TEntity>, options?: RepositoryOptions): Promise<PagedResult<TEntity>>;
  findOne(query?: RepositoryQuery<TEntity>, options?: RepositoryOptions): Promise<TEntity | null>;
}
