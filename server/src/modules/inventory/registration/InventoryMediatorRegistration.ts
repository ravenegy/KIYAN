import { IContainer } from '../../../core/di';
import { CoreTokens } from '../../../core/bootstrap';
import { ICommandBus, IQueryBus } from '../../../core/mediator';
import { InventoryModuleTokens } from './InventoryModuleTokens';

// Commands
import { CreateInventoryItemCommand } from '../application/commands/CreateInventoryItemCommand';
import { UpdateInventoryItemCommand } from '../application/commands/UpdateInventoryItemCommand';
import { DeleteInventoryItemCommand } from '../application/commands/DeleteInventoryItemCommand';
import { ActivateInventoryItemCommand } from '../application/commands/ActivateInventoryItemCommand';
import { DeactivateInventoryItemCommand } from '../application/commands/DeactivateInventoryItemCommand';
import { AdjustStockCommand } from '../application/commands/AdjustStockCommand';
import { TransferStockCommand } from '../application/commands/TransferStockCommand';
import { ReceiveStockCommand } from '../application/commands/ReceiveStockCommand';
import { IssueStockCommand } from '../application/commands/IssueStockCommand';

// Queries
import { GetInventoryItemByIdQuery } from '../application/queries/GetInventoryItemByIdQuery';
import { GetInventoryBySkuQuery } from '../application/queries/GetInventoryBySkuQuery';
import { GetInventoryItemsQuery } from '../application/queries/GetInventoryItemsQuery';
import { GetStockLevelsQuery } from '../application/queries/GetStockLevelsQuery';
import { SearchInventoryItemsQuery } from '../application/queries/SearchInventoryItemsQuery';

export class InventoryMediatorRegistration {
  public static register(container: IContainer): void {
    const commandBus = container.resolve<ICommandBus>(CoreTokens.CommandBus);
    const queryBus = container.resolve<IQueryBus>(CoreTokens.QueryBus);

    // Register Command Handlers with deferred resolution to preserve Scoped lifetime
    commandBus.register(
      CreateInventoryItemCommand.name,
      { handle: (command: CreateInventoryItemCommand) => container.resolve(InventoryModuleTokens.CreateInventoryItemCommandHandler).handle(command) }
    );
    commandBus.register(
      UpdateInventoryItemCommand.name,
      { handle: (command: UpdateInventoryItemCommand) => container.resolve(InventoryModuleTokens.UpdateInventoryItemCommandHandler).handle(command) }
    );
    commandBus.register(
      DeleteInventoryItemCommand.name,
      { handle: (command: DeleteInventoryItemCommand) => container.resolve(InventoryModuleTokens.DeleteInventoryItemCommandHandler).handle(command) }
    );
    commandBus.register(
      ActivateInventoryItemCommand.name,
      { handle: (command: ActivateInventoryItemCommand) => container.resolve(InventoryModuleTokens.ActivateInventoryItemCommandHandler).handle(command) }
    );
    commandBus.register(
      DeactivateInventoryItemCommand.name,
      { handle: (command: DeactivateInventoryItemCommand) => container.resolve(InventoryModuleTokens.DeactivateInventoryItemCommandHandler).handle(command) }
    );
    commandBus.register(
      AdjustStockCommand.name,
      { handle: (command: AdjustStockCommand) => container.resolve(InventoryModuleTokens.AdjustStockCommandHandler).handle(command) }
    );
    commandBus.register(
      TransferStockCommand.name,
      { handle: (command: TransferStockCommand) => container.resolve(InventoryModuleTokens.TransferStockCommandHandler).handle(command) }
    );
    commandBus.register(
      ReceiveStockCommand.name,
      { handle: (command: ReceiveStockCommand) => container.resolve(InventoryModuleTokens.ReceiveStockCommandHandler).handle(command) }
    );
    commandBus.register(
      IssueStockCommand.name,
      { handle: (command: IssueStockCommand) => container.resolve(InventoryModuleTokens.IssueStockCommandHandler).handle(command) }
    );

    // Register Query Handlers with deferred resolution to preserve Scoped lifetime
    queryBus.register(
      GetInventoryItemByIdQuery.name,
      { handle: (query: GetInventoryItemByIdQuery) => container.resolve(InventoryModuleTokens.GetInventoryItemByIdQueryHandler).handle(query) }
    );
    queryBus.register(
      GetInventoryBySkuQuery.name,
      { handle: (query: GetInventoryBySkuQuery) => container.resolve(InventoryModuleTokens.GetInventoryBySkuQueryHandler).handle(query) }
    );
    queryBus.register(
      GetInventoryItemsQuery.name,
      { handle: (query: GetInventoryItemsQuery) => container.resolve(InventoryModuleTokens.GetInventoryItemsQueryHandler).handle(query) }
    );
    queryBus.register(
      GetStockLevelsQuery.name,
      { handle: (query: GetStockLevelsQuery) => container.resolve(InventoryModuleTokens.GetStockLevelsQueryHandler).handle(query) }
    );
    queryBus.register(
      SearchInventoryItemsQuery.name,
      { handle: (query: SearchInventoryItemsQuery) => container.resolve(InventoryModuleTokens.SearchInventoryItemsQueryHandler).handle(query) }
    );
  }
}
