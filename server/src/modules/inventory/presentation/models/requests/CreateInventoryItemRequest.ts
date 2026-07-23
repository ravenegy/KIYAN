export interface CreateInventoryItemRequest {
  readonly sku: string;
  readonly name: string;
  readonly description: string;
  readonly categoryId: string;
  readonly trackingType: string;
  readonly hasExpirations: boolean;
  readonly isBatchTracked: boolean;
  readonly isSerialTracked: boolean;
}
