import { ItemId } from '../shared/ItemId';
import { IBomRepository } from '../repositories/IBomRepository';
import { BillOfMaterial } from '../entities/BillOfMaterial';
import { Result } from '../../../../core/results/Result';

export class BomCycleDetectionService {
  constructor(private readonly bomRepository: IBomRepository) {}

  public async detectCycle(bom: BillOfMaterial): Promise<Result<void>> {
    const visited = new Set<string>();
    const recursionStack = new Set<string>();

    const dfs = async (currentItemId: ItemId): Promise<Result<void>> => {
      visited.add(currentItemId.value);
      recursionStack.add(currentItemId.value);

      const activeBom = await this.bomRepository.getActiveBomForTarget(currentItemId);
      if (activeBom) {
        for (const comp of activeBom.components) {
          if (!visited.has(comp.itemId.value)) {
            const result = await dfs(comp.itemId);
            if (result.isFailure) return result;
          } else if (recursionStack.has(comp.itemId.value)) {
            return Result.failure({ code: 'BOM_CYCLE_DETECTED', message: `Circular dependency detected involving item ${comp.itemId.value}` });
          }
        }
      }

      recursionStack.delete(currentItemId.value);
      return Result.success();
    };

    // We start DFS from the BOM we are trying to check/save
    // Assume its target item is the root
    visited.add(bom.targetItemId.value);
    recursionStack.add(bom.targetItemId.value);

    for (const comp of bom.components) {
      if (!visited.has(comp.itemId.value)) {
        const result = await dfs(comp.itemId);
        if (result.isFailure) return result;
      } else if (recursionStack.has(comp.itemId.value)) {
        return Result.failure({ code: 'BOM_CYCLE_DETECTED', message: `Circular dependency detected involving item ${comp.itemId.value}` });
      }
    }
    
    return Result.success();
  }
}
