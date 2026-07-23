import { IReferenceRepository } from '../../domain/repositories/IReferenceRepository';

export interface ReferenceDomainEntity {
  id: string;
  referenceCode: string;
  value: string;
}

export class ReferenceRepository implements IReferenceRepository<ReferenceDomainEntity> {
  private readonly store: Map<string, ReferenceDomainEntity> = new Map();

  public async getByReferenceCode(code: string): Promise<ReferenceDomainEntity | null> {
    for (const entity of this.store.values()) {
      if (entity.referenceCode === code) return entity;
    }
    return null;
  }
}
