import { IRepository } from '../../../../core/domain/repositories/IRepository';
import { BillOfMaterial } from '../entities/BillOfMaterial';
import { BomId } from '../shared/BomId';
import { ItemId } from '../shared/ItemId';

export interface IBomRepository extends IRepository<BillOfMaterial, BomId> {
  findByTargetItemId(itemId: ItemId): Promise<BillOfMaterial[]>;
  getActiveBomForTarget(itemId: ItemId): Promise<BillOfMaterial | null>;
}
