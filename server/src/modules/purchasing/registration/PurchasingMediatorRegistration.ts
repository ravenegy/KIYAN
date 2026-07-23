import { IContainer } from '../../../core/di';
import { CoreTokens } from '../../../core/bootstrap';
import { ICommandBus, IQueryBus } from '../../../core/mediator';
import { PurchasingModuleTokens } from './PurchasingModuleTokens';

import {
  AcceptQuotationCommand,
  AddPurchaseOrderLineCommand,
  AddRfqTargetSupplierCommand,
  ApprovePurchaseOrderCommand,
  CancelPurchaseOrderCommand,
  CreatePurchaseOrderCommand,
  CreateRfqCommand,
  CreateSupplierCommand,
  IssuePurchaseOrderCommand,
  PublishRfqCommand,
  QualifySupplierCommand,
  ReceiveGoodsCommand,
  RejectPurchaseOrderCommand,
  SubmitPurchaseOrderCommand,
  SubmitQuotationCommand,
  SuspendSupplierCommand
} from '../application/commands';

import {
  GetPurchaseOrderByIdQuery,
  GetPurchaseOrdersQuery,
  GetRfqByIdQuery,
  GetRfqsQuery,
  GetSupplierByIdQuery,
  GetSuppliersQuery,
  GetQuotationsByRfqIdQuery
} from '../application/queries';

export class PurchasingMediatorRegistration {
  public static register(container: IContainer): void {
    const commandBus = container.resolve<ICommandBus>(CoreTokens.CommandBus);
    const queryBus = container.resolve<IQueryBus>(CoreTokens.QueryBus);

    // Commands
    commandBus.register(
      AcceptQuotationCommand.name,
      { handle: (command: any) => container.resolve(PurchasingModuleTokens.AcceptQuotationCommandHandler).handle(command) }
    );

    commandBus.register(
      AddPurchaseOrderLineCommand.name,
      { handle: (command: any) => container.resolve(PurchasingModuleTokens.AddPurchaseOrderLineCommandHandler).handle(command) }
    );

    commandBus.register(
      AddRfqTargetSupplierCommand.name,
      { handle: (command: any) => container.resolve(PurchasingModuleTokens.AddRfqTargetSupplierCommandHandler).handle(command) }
    );

    commandBus.register(
      ApprovePurchaseOrderCommand.name,
      { handle: (command: any) => container.resolve(PurchasingModuleTokens.ApprovePurchaseOrderCommandHandler).handle(command) }
    );

    commandBus.register(
      CancelPurchaseOrderCommand.name,
      { handle: (command: any) => container.resolve(PurchasingModuleTokens.CancelPurchaseOrderCommandHandler).handle(command) }
    );

    commandBus.register(
      CreatePurchaseOrderCommand.name,
      { handle: (command: any) => container.resolve(PurchasingModuleTokens.CreatePurchaseOrderCommandHandler).handle(command) }
    );

    commandBus.register(
      CreateRfqCommand.name,
      { handle: (command: any) => container.resolve(PurchasingModuleTokens.CreateRfqCommandHandler).handle(command) }
    );

    commandBus.register(
      CreateSupplierCommand.name,
      { handle: (command: any) => container.resolve(PurchasingModuleTokens.CreateSupplierCommandHandler).handle(command) }
    );

    commandBus.register(
      IssuePurchaseOrderCommand.name,
      { handle: (command: any) => container.resolve(PurchasingModuleTokens.IssuePurchaseOrderCommandHandler).handle(command) }
    );

    commandBus.register(
      PublishRfqCommand.name,
      { handle: (command: any) => container.resolve(PurchasingModuleTokens.PublishRfqCommandHandler).handle(command) }
    );

    commandBus.register(
      QualifySupplierCommand.name,
      { handle: (command: any) => container.resolve(PurchasingModuleTokens.QualifySupplierCommandHandler).handle(command) }
    );

    commandBus.register(
      ReceiveGoodsCommand.name,
      { handle: (command: any) => container.resolve(PurchasingModuleTokens.ReceiveGoodsCommandHandler).handle(command) }
    );

    commandBus.register(
      RejectPurchaseOrderCommand.name,
      { handle: (command: any) => container.resolve(PurchasingModuleTokens.RejectPurchaseOrderCommandHandler).handle(command) }
    );

    commandBus.register(
      SubmitPurchaseOrderCommand.name,
      { handle: (command: any) => container.resolve(PurchasingModuleTokens.SubmitPurchaseOrderCommandHandler).handle(command) }
    );

    commandBus.register(
      SubmitQuotationCommand.name,
      { handle: (command: any) => container.resolve(PurchasingModuleTokens.SubmitQuotationCommandHandler).handle(command) }
    );

    commandBus.register(
      SuspendSupplierCommand.name,
      { handle: (command: any) => container.resolve(PurchasingModuleTokens.SuspendSupplierCommandHandler).handle(command) }
    );

    // Queries
    queryBus.register(
      GetPurchaseOrderByIdQuery.name,
      { handle: (query: any) => container.resolve(PurchasingModuleTokens.GetPurchaseOrderByIdQueryHandler).handle(query) }
    );

    queryBus.register(
      GetPurchaseOrdersQuery.name,
      { handle: (query: any) => container.resolve(PurchasingModuleTokens.GetPurchaseOrdersQueryHandler).handle(query) }
    );

    queryBus.register(
      GetRfqByIdQuery.name,
      { handle: (query: any) => container.resolve(PurchasingModuleTokens.GetRfqByIdQueryHandler).handle(query) }
    );

    queryBus.register(
      GetRfqsQuery.name,
      { handle: (query: any) => container.resolve(PurchasingModuleTokens.GetRfqsQueryHandler).handle(query) }
    );

    queryBus.register(
      GetSupplierByIdQuery.name,
      { handle: (query: any) => container.resolve(PurchasingModuleTokens.GetSupplierByIdQueryHandler).handle(query) }
    );

    queryBus.register(
      GetSuppliersQuery.name,
      { handle: (query: any) => container.resolve(PurchasingModuleTokens.GetSuppliersQueryHandler).handle(query) }
    );

    queryBus.register(
      GetQuotationsByRfqIdQuery.name,
      { handle: (query: any) => container.resolve(PurchasingModuleTokens.GetQuotationsByRfqIdQueryHandler).handle(query) }
    );
  }
}
