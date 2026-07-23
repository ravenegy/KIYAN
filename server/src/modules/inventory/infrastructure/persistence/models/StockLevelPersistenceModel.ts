export interface StockLevelPersistenceModel {
  readonly id: string;
  readonly locationId: string;
  readonly quantity: number;
  readonly lotId: string | null;
}
