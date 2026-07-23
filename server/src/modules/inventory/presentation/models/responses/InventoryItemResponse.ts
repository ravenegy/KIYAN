export interface InventoryItemResponse {
  readonly id: string;
  readonly sku: string;
  readonly name: string;
  readonly description: string;
  readonly categoryId: string;
  readonly status: string;
  readonly trackingType: string;
  readonly hasExpirations: boolean;
  readonly isBatchTracked: boolean;
  readonly isSerialTracked: boolean;
  readonly createdAt: string;
  readonly updatedAt: string;
}
