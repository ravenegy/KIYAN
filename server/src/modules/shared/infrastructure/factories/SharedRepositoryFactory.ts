import { LookupRepository } from '../repositories/LookupRepository';
import { ReferenceRepository } from '../repositories/ReferenceRepository';

export class SharedRepositoryFactory {
  public createLookupRepository(): LookupRepository {
    return new LookupRepository();
  }

  public createReferenceRepository(): ReferenceRepository {
    return new ReferenceRepository();
  }
}
