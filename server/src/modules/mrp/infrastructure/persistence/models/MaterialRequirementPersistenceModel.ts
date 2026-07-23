export interface MaterialRequirementPersistenceModel {
  id: string;
  mrpRunId: string;
  itemId: string;
  requiredQuantity: number;
  requiredDate: Date;
  sourceType: string;
  sourceId: string;
  isSatisfied: boolean;
  createdAt: Date;
  updatedAt: Date;
}
