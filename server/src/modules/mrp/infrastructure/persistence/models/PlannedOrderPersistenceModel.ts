export interface PlannedOrderPersistenceModel {
  id: string;
  itemId: string;
  quantity: number;
  startDate: Date;
  endDate: Date;
  type: string;
  status: string;
  mrpRunId: string;
  sourceRequirementId?: string | null;
  createdAt: Date;
  updatedAt: Date;
}
