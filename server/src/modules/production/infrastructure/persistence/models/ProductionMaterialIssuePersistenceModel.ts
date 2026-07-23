export interface ProductionMaterialIssuePersistenceModel {
  id: string;
  productionOrderId: string;
  itemId: string;
  requiredQuantity: number;
  issuedQuantity: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  version: number;
}