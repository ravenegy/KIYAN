import { BomRepository } from '../repositories/BomRepository';
import { BomPersistenceMapper } from '../persistence/mappers/BomPersistenceMapper';
import { BomComponentPersistenceMapper } from '../persistence/mappers/BomComponentPersistenceMapper';

export class BomRepositoryFactory {
  public create(): BomRepository {
    const componentMapper = new BomComponentPersistenceMapper();
    const bomMapper = new BomPersistenceMapper(componentMapper);
    return new BomRepository(bomMapper);
  }
}
