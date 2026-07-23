export interface FinishedGoodReceiptPersistenceModel {
  id: string;
  productionOrderId: string;
  itemId: string;
  quantity: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  version: number;
}