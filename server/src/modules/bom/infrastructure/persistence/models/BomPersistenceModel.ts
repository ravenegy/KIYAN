import { BomComponentPersistenceModel } from './BomComponentPersistenceModel';

export interface BomPersistenceModel {
  readonly id: string;
  readonly name: string;
  readonly targetItemId: string;
  readonly status: string;
  readonly version: number;
  readonly components: ReadonlyArray<BomComponentPersistenceModel>;
  readonly createdAt: Date;
  readonly updatedAt?: Date;
  readonly aggregateVersion: number;
}
