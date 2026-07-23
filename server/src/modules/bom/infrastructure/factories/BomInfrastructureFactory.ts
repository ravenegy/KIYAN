import { BomRepositoryFactory } from './BomRepositoryFactory';
import { IBomRepository } from '../../domain/repositories/IBomRepository';

export class BomInfrastructureFactory {
  constructor(private readonly repositoryFactory: BomRepositoryFactory) {}

  public createBomRepository(): IBomRepository {
    return this.repositoryFactory.create();
  }
}
