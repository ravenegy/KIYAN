import { ProductionOperationPersistenceModel } from './ProductionOperationPersistenceModel';
import { ProductionMaterialIssuePersistenceModel } from './ProductionMaterialIssuePersistenceModel';
import { FinishedGoodReceiptPersistenceModel } from './FinishedGoodReceiptPersistenceModel';

export interface ProductionOrderPersistenceModel {
  id: string;
  targetItemId: string;
  plannedQuantity: number;
  actualQuantity: number;
  startDate: Date;
  endDate: Date;
  actualStartDate?: Date;
  actualEndDate?: Date;
  status: string;
  priority: string;
  createdAt: Date;
  updatedAt: Date;
  version: number;
  operations: ProductionOperationPersistenceModel[];
  materialIssues: ProductionMaterialIssuePersistenceModel[];
  receipts: FinishedGoodReceiptPersistenceModel[];
}
