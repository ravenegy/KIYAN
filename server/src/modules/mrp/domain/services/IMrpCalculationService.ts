import { Result } from '../../../../core';
import { MrpRun } from '../entities/MrpRun';
import { MaterialRequirement } from '../entities/MaterialRequirement';
import { PlannedOrder } from '../entities/PlannedOrder';

export interface ItemSupplyStatus {
  itemId: string;
  onHandQuantity: number;
  allocatedQuantity: number;
  expectedReceipts: { quantity: number; date: Date }[];
}

export interface ItemBomStructure {
  itemId: string;
  components: { childItemId: string; quantityPerParent: number; leadTimeOffset: number }[];
  leadTimeDays: number;
  lotSize: number;
}

export interface IMrpCalculationService {
  calculateRequirements(
    mrpRun: MrpRun,
    grossRequirements: MaterialRequirement[],
    supplyStatusMap: Map<string, ItemSupplyStatus>,
    bomMap: Map<string, ItemBomStructure>
  ): Result<{ plannedOrders: PlannedOrder[]; netRequirements: MaterialRequirement[] }>;
}
