import { IContainer, Lifetime } from '../../../core/di';
import { InventoryModuleTokens } from './InventoryModuleTokens';
import { 
  CreateInventoryItemCommandHandler,
  UpdateInventoryItemCommandHandler,
  DeleteInventoryItemCommandHandler,
  ActivateInventoryItemCommandHandler,
  DeactivateInventoryItemCommandHandler,
  AdjustStockCommandHandler,
  TransferStockCommandHandler,
  ReceiveStockCommandHandler,
  IssueStockCommandHandler,
  GetInventoryItemByIdQueryHandler,
  GetInventoryBySkuQueryHandler,
  GetInventoryItemsQueryHandler,
  GetStockLevelsQueryHandler,
  SearchInventoryItemsQueryHandler
} from '../application/handlers/impl';

export class InventoryHandlerRegistration {
  public static register(container: IContainer): void {
    // Commands
    container.register(InventoryModuleTokens.CreateInventoryItemCommandHandler, () => new CreateInventoryItemCommandHandler(), Lifetime.Scoped);
    container.register(InventoryModuleTokens.UpdateInventoryItemCommandHandler, () => new UpdateInventoryItemCommandHandler(), Lifetime.Scoped);
    container.register(InventoryModuleTokens.DeleteInventoryItemCommandHandler, () => new DeleteInventoryItemCommandHandler(), Lifetime.Scoped);
    container.register(InventoryModuleTokens.ActivateInventoryItemCommandHandler, () => new ActivateInventoryItemCommandHandler(), Lifetime.Scoped);
    container.register(InventoryModuleTokens.DeactivateInventoryItemCommandHandler, () => new DeactivateInventoryItemCommandHandler(), Lifetime.Scoped);
    container.register(InventoryModuleTokens.AdjustStockCommandHandler, () => new AdjustStockCommandHandler(), Lifetime.Scoped);
    container.register(InventoryModuleTokens.TransferStockCommandHandler, () => new TransferStockCommandHandler(), Lifetime.Scoped);
    container.register(InventoryModuleTokens.ReceiveStockCommandHandler, () => new ReceiveStockCommandHandler(), Lifetime.Scoped);
    container.register(InventoryModuleTokens.IssueStockCommandHandler, () => new IssueStockCommandHandler(), Lifetime.Scoped);

    // Queries
    container.register(InventoryModuleTokens.GetInventoryItemByIdQueryHandler, () => new GetInventoryItemByIdQueryHandler(), Lifetime.Scoped);
    container.register(InventoryModuleTokens.GetInventoryBySkuQueryHandler, () => new GetInventoryBySkuQueryHandler(), Lifetime.Scoped);
    container.register(InventoryModuleTokens.GetInventoryItemsQueryHandler, () => new GetInventoryItemsQueryHandler(), Lifetime.Scoped);
    container.register(InventoryModuleTokens.GetStockLevelsQueryHandler, () => new GetStockLevelsQueryHandler(), Lifetime.Scoped);
    container.register(InventoryModuleTokens.SearchInventoryItemsQueryHandler, () => new SearchInventoryItemsQueryHandler(), Lifetime.Scoped);
  }
}
