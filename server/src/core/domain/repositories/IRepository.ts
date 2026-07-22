import { IReadRepository } from './IReadRepository';
import { IWriteRepository } from './IWriteRepository';

export interface IRepository<TEntity, TId> extends IReadRepository<TEntity, TId>, IWriteRepository<TEntity, TId> {
}
