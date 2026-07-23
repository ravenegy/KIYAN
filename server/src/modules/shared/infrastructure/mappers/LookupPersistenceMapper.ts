import { PersistenceMapper } from './PersistenceMapper';
import { LookupModel } from '../persistence/models/LookupModel';

// Basic domain placeholder for Lookup
export interface LookupDomainEntity {
  id: string;
  code: string;
  name: string;
  isActive: boolean;
}

export class LookupPersistenceMapper implements PersistenceMapper<LookupDomainEntity, LookupModel> {
  public toDomain(model: LookupModel): LookupDomainEntity {
    return {
      id: model.id,
      code: model.code,
      name: model.name,
      isActive: model.isActive,
    };
  }

  public toModel(domain: LookupDomainEntity): LookupModel {
    return {
      id: domain.id,
      code: domain.code,
      name: domain.name,
      isActive: domain.isActive,
    };
  }
}
