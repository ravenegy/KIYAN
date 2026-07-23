export interface StockMovementPersistenceModel {
  readonly id: string;
  readonly itemId: string;
  readonly locationId: string;
  readonly lotId: string | null;
  readonly quantity: number;
  readonly type: string;
  readonly reason: string;
  readonly referenceId: string | null;
  readonly createdAt: Date;
}
