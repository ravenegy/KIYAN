import { IContainer, Lifetime } from '../../../core/di';
import { CoreTokens } from '../../../core/bootstrap';
import { InventoryModuleTokens } from './InventoryModuleTokens';
import {
  InventoryApplicationService,
  InventoryReadService,
  InventoryWriteService,
  StockApplicationService,
  StockReadService,
  StockWriteService
} from '../application/services/impl';

export class InventoryServiceRegistration {
  public static register(container: IContainer): void {
    container.register(
      InventoryModuleTokens.IInventoryApplicationService,
      (c) => new InventoryApplicationService(c.resolve(CoreTokens.Mediator)),
      Lifetime.Scoped
    );
    container.register(
      InventoryModuleTokens.IInventoryReadService,
      (c) => new InventoryReadService(c.resolve(CoreTokens.Mediator)),
      Lifetime.Scoped
    );
    container.register(
      InventoryModuleTokens.IInventoryWriteService,
      (c) => new InventoryWriteService(c.resolve(CoreTokens.Mediator)),
      Lifetime.Scoped
    );
    container.register(
      InventoryModuleTokens.IStockApplicationService,
      (c) => new StockApplicationService(c.resolve(CoreTokens.Mediator)),
      Lifetime.Scoped
    );
    container.register(
      InventoryModuleTokens.IStockReadService,
      (c) => new StockReadService(c.resolve(CoreTokens.Mediator)),
      Lifetime.Scoped
    );
    container.register(
      InventoryModuleTokens.IStockWriteService,
      (c) => new StockWriteService(c.resolve(CoreTokens.Mediator)),
      Lifetime.Scoped
    );
  }
}
