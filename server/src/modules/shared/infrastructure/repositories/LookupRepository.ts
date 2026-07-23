import { ILookupRepository } from '../../domain/repositories/ILookupRepository';
import { LookupDomainEntity } from '../mappers/LookupPersistenceMapper';

export class LookupRepository implements ILookupRepository<LookupDomainEntity> {
  private readonly store: Map<string, LookupDomainEntity> = new Map();

  public async getAll(): Promise<LookupDomainEntity[]> {
    return Array.from(this.store.values());
  }

  public async getById(id: string): Promise<LookupDomainEntity | null> {
    return this.store.get(id) || null;
  }
}
