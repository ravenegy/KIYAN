export interface StockLevelDto {
  readonly locationId: string;
  readonly quantity: number;
  readonly lotId?: string;
}
