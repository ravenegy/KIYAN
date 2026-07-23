import { IBomIntegrationService } from './IBomIntegrationService';
import { IBomRepository } from '../domain/repositories/IBomRepository';
import { BillOfMaterial } from '../domain/entities/BillOfMaterial';
import { BomId } from '../domain/shared/BomId';
import { ItemId } from '../domain/shared/ItemId';

export class BomIntegrationService implements IBomIntegrationService {
  constructor(private readonly repository: IBomRepository) {}

  public async getActiveBomForTargetItem(targetItemId: ItemId): Promise<BillOfMaterial | null> {
    return this.repository.getActiveBomForTarget(targetItemId);
  }

  public async explodeBom(bomId: BomId): Promise<{ itemId: ItemId; cumulativeQuantity: number }[]> {
    const rootBom = await this.repository.getById(bomId);
    if (!rootBom) {
      throw new Error(`BOM with ID ${bomId.value} not found for explosion.`);
    }

    const leafRequirements = new Map<string, number>();
    await this.traverseBom(rootBom, 1, leafRequirements);

    return Array.from(leafRequirements.entries()).map(([itemId, qty]) => ({
      itemId: ItemId.create(itemId),
      cumulativeQuantity: qty
    }));
  }

  private async traverseBom(
    bom: BillOfMaterial,
    multiplier: number,
    requirements: Map<string, number>
  ): Promise<void> {
    for (const component of bom.components) {
      const requiredQty = component.quantity.value * multiplier;

      // Check if this component has its own active BOM
      const subBom = await this.repository.getActiveBomForTarget(component.itemId);
      
      if (subBom) {
        // It's a sub-assembly, recurse deeper
        await this.traverseBom(subBom, requiredQty, requirements);
      } else {
        // It's a leaf node (raw material/purchased part)
        const currentQty = requirements.get(component.itemId.value) || 0;
        requirements.set(component.itemId.value, currentQty + requiredQty);
      }
    }
  }
}
