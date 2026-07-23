import { BomId } from '../domain/shared/BomId';
import { ItemId } from '../domain/shared/ItemId';
import { BillOfMaterial } from '../domain/entities/BillOfMaterial';

/**
 * Cross-module integration service for the BOM module.
 * Provides internal APIs for other modules (e.g., MRP, Production) to access BOM data
 * without the overhead of HTTP presentation layers or application DTOs.
 */
export interface IBomIntegrationService {
  /**
   * Retrieves the active Bill of Material for a given target item.
   * Used by MRP and Production modules to explode material requirements.
   *
   * @param targetItemId The ID of the manufactured item.
   * @returns The active BillOfMaterial entity, or null if not found.
   */
  getActiveBomForTargetItem(targetItemId: ItemId): Promise<BillOfMaterial | null>;

  /**
   * Explodes a BOM down to its raw material leaf nodes.
   * Useful for deep requirement calculations.
   *
   * @param bomId The root BOM ID to explode.
   * @returns A flat list of all required leaf components and their cumulative quantities.
   */
  explodeBom(bomId: BomId): Promise<{ itemId: ItemId; cumulativeQuantity: number }[]>;
}
