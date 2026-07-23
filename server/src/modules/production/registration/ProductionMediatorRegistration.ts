import { IContainer } from '../../../core/di';
import { CoreTokens } from '../../../core/bootstrap';
import { ICommandBus, IQueryBus } from '../../../core/mediator';
import { ProductionModuleTokens } from './ProductionModuleTokens';

// Commands
import {
  AddMaterialIssueCommand,
  AddOperationCommand,
  CancelProductionOrderCommand,
  CompleteProductionOrderCommand,
  CreateProductionOrderCommand,
  IssueMaterialCommand,
  ReceiveFinishedGoodsCommand,
  ReleaseProductionOrderCommand,
  StartProductionOrderCommand,
  UpdateOperationStatusCommand
} from '../application/commands';

// Queries
import {
  GetFinishedGoodReceiptsQuery,
  GetMaterialIssuesQuery,
  GetProductionOperationsQuery,
  GetProductionOrderByIdQuery,
  GetProductionOrdersQuery
} from '../application/queries';

export class ProductionMediatorRegistration {
  public static register(container: IContainer): void {
    const commandBus = container.resolve<ICommandBus>(CoreTokens.CommandBus);
    const queryBus = container.resolve<IQueryBus>(CoreTokens.QueryBus);

    // Register Command Handlers
    commandBus.register(
      CreateProductionOrderCommand.name,
      { handle: (command: any) => container.resolve(ProductionModuleTokens.CreateProductionOrderCommandHandler).handle(command) }
    );
    commandBus.register(
      ReleaseProductionOrderCommand.name,
      { handle: (command: any) => container.resolve(ProductionModuleTokens.ReleaseProductionOrderCommandHandler).handle(command) }
    );
    commandBus.register(
      StartProductionOrderCommand.name,
      { handle: (command: any) => container.resolve(ProductionModuleTokens.StartProductionOrderCommandHandler).handle(command) }
    );
    commandBus.register(
      CompleteProductionOrderCommand.name,
      { handle: (command: any) => container.resolve(ProductionModuleTokens.CompleteProductionOrderCommandHandler).handle(command) }
    );
    commandBus.register(
      CancelProductionOrderCommand.name,
      { handle: (command: any) => container.resolve(ProductionModuleTokens.CancelProductionOrderCommandHandler).handle(command) }
    );
    commandBus.register(
      AddOperationCommand.name,
      { handle: (command: any) => container.resolve(ProductionModuleTokens.AddOperationCommandHandler).handle(command) }
    );
    commandBus.register(
      AddMaterialIssueCommand.name,
      { handle: (command: any) => container.resolve(ProductionModuleTokens.AddMaterialIssueCommandHandler).handle(command) }
    );
    commandBus.register(
      UpdateOperationStatusCommand.name,
      { handle: (command: any) => container.resolve(ProductionModuleTokens.UpdateOperationStatusCommandHandler).handle(command) }
    );
    commandBus.register(
      IssueMaterialCommand.name,
      { handle: (command: any) => container.resolve(ProductionModuleTokens.IssueMaterialCommandHandler).handle(command) }
    );
    commandBus.register(
      ReceiveFinishedGoodsCommand.name,
      { handle: (command: any) => container.resolve(ProductionModuleTokens.ReceiveFinishedGoodsCommandHandler).handle(command) }
    );

    // Register Query Handlers
    queryBus.register(
      GetProductionOrderByIdQuery.name,
      { handle: (query: any) => container.resolve(ProductionModuleTokens.GetProductionOrderByIdQueryHandler).handle(query) }
    );
    queryBus.register(
      GetProductionOrdersQuery.name,
      { handle: (query: any) => container.resolve(ProductionModuleTokens.GetProductionOrdersQueryHandler).handle(query) }
    );
    queryBus.register(
      GetProductionOperationsQuery.name,
      { handle: (query: any) => container.resolve(ProductionModuleTokens.GetProductionOperationsQueryHandler).handle(query) }
    );
    queryBus.register(
      GetMaterialIssuesQuery.name,
      { handle: (query: any) => container.resolve(ProductionModuleTokens.GetMaterialIssuesQueryHandler).handle(query) }
    );
    queryBus.register(
      GetFinishedGoodReceiptsQuery.name,
      { handle: (query: any) => container.resolve(ProductionModuleTokens.GetFinishedGoodReceiptsQueryHandler).handle(query) }
    );
  }
}
