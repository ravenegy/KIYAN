export interface InventoryInfrastructureOptions {
  readonly enableStockTracing?: boolean;
  readonly defaultLocationId?: string;
  readonly persistenceType?: 'in-memory' | 'database';
}
