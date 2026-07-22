import { Specification } from '../specifications/Specification';
import { RepositoryOptions } from './RepositoryOptions';

export interface ISpecificationRepository<TEntity> {
  findBySpecification(specification: Specification<TEntity>, options?: RepositoryOptions): Promise<ReadonlyArray<TEntity>>;
  findOneBySpecification(specification: Specification<TEntity>, options?: RepositoryOptions): Promise<TEntity | null>;
  countBySpecification(specification: Specification<TEntity>, options?: RepositoryOptions): Promise<number>;
  existsBySpecification(specification: Specification<TEntity>, options?: RepositoryOptions): Promise<boolean>;
}
