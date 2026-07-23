export interface ProductionOperationPersistenceModel {
  id: string;
  productionOrderId: string;
  sequence: number;
  name: string;
  workCenterId: string;
  setupTimeMinutes: number;
  runTimeMinutes: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  version: number;
}