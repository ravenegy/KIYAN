import { IContainer, Lifetime } from '../../../core/di';
import { InventoryModuleTokens } from './InventoryModuleTokens';
import { InventoryItemMapper, StockMapper } from '../application/mappers/impl';

export class InventoryMapperRegistration {
  public static register(container: IContainer): void {
    container.register(InventoryModuleTokens.StockMapper, () => new StockMapper(), Lifetime.Singleton);
    container.register(
      InventoryModuleTokens.InventoryItemMapper,
      (c) => new InventoryItemMapper(c.resolve(InventoryModuleTokens.StockMapper)),
      Lifetime.Singleton
    );
  }
}
