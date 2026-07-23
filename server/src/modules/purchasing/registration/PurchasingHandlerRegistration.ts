import { IContainer, Lifetime } from '../../../core/di';
import { PurchasingModuleTokens } from './PurchasingModuleTokens';

import {
  AcceptQuotationCommandHandler,
  AddPurchaseOrderLineCommandHandler,
  AddRfqTargetSupplierCommandHandler,
  ApprovePurchaseOrderCommandHandler,
  CancelPurchaseOrderCommandHandler,
  CreatePurchaseOrderCommandHandler,
  CreateRfqCommandHandler,
  CreateSupplierCommandHandler,
  IssuePurchaseOrderCommandHandler,
  PublishRfqCommandHandler,
  QualifySupplierCommandHandler,
  ReceiveGoodsCommandHandler,
  RejectPurchaseOrderCommandHandler,
  SubmitPurchaseOrderCommandHandler,
  SubmitQuotationCommandHandler,
  SuspendSupplierCommandHandler,
  GetPurchaseOrderByIdQueryHandler,
  GetPurchaseOrdersQueryHandler,
  GetRfqByIdQueryHandler,
  GetRfqsQueryHandler,
  GetSupplierByIdQueryHandler,
  GetSuppliersQueryHandler,
  GetQuotationsByRfqIdQueryHandler
} from '../application/handlers/impl';

export class PurchasingHandlerRegistration {
  public static register(container: IContainer): void {
    // Commands
    container.register(PurchasingModuleTokens.AcceptQuotationCommandHandler, (c) => {
      return new AcceptQuotationCommandHandler(
        c.resolve(PurchasingModuleTokens.IQuotationRepository)
      );
    }, Lifetime.Scoped);

    container.register(PurchasingModuleTokens.AddPurchaseOrderLineCommandHandler, (c) => {
      return new AddPurchaseOrderLineCommandHandler(
        c.resolve(PurchasingModuleTokens.IPurchaseOrderRepository)
      );
    }, Lifetime.Scoped);

    container.register(PurchasingModuleTokens.AddRfqTargetSupplierCommandHandler, (c) => {
      return new AddRfqTargetSupplierCommandHandler(
        c.resolve(PurchasingModuleTokens.IRfqRepository)
      );
    }, Lifetime.Scoped);

    container.register(PurchasingModuleTokens.ApprovePurchaseOrderCommandHandler, (c) => {
      return new ApprovePurchaseOrderCommandHandler(
        c.resolve(PurchasingModuleTokens.IPurchaseOrderRepository)
      );
    }, Lifetime.Scoped);

    container.register(PurchasingModuleTokens.CancelPurchaseOrderCommandHandler, (c) => {
      return new CancelPurchaseOrderCommandHandler(
        c.resolve(PurchasingModuleTokens.IPurchaseOrderRepository)
      );
    }, Lifetime.Scoped);

    container.register(PurchasingModuleTokens.CreatePurchaseOrderCommandHandler, (c) => {
      return new CreatePurchaseOrderCommandHandler(
        c.resolve(PurchasingModuleTokens.IPurchaseOrderRepository),
        c.resolve(PurchasingModuleTokens.ISupplierRepository)
      );
    }, Lifetime.Scoped);

    container.register(PurchasingModuleTokens.CreateRfqCommandHandler, (c) => {
      return new CreateRfqCommandHandler(
        c.resolve(PurchasingModuleTokens.IRfqRepository)
      );
    }, Lifetime.Scoped);

    container.register(PurchasingModuleTokens.CreateSupplierCommandHandler, (c) => {
      return new CreateSupplierCommandHandler(
        c.resolve(PurchasingModuleTokens.ISupplierRepository)
      );
    }, Lifetime.Scoped);

    container.register(PurchasingModuleTokens.IssuePurchaseOrderCommandHandler, (c) => {
      return new IssuePurchaseOrderCommandHandler(
        c.resolve(PurchasingModuleTokens.IPurchaseOrderRepository)
      );
    }, Lifetime.Scoped);

    container.register(PurchasingModuleTokens.PublishRfqCommandHandler, (c) => {
      return new PublishRfqCommandHandler(
        c.resolve(PurchasingModuleTokens.IRfqRepository)
      );
    }, Lifetime.Scoped);

    container.register(PurchasingModuleTokens.QualifySupplierCommandHandler, (c) => {
      return new QualifySupplierCommandHandler(
        c.resolve(PurchasingModuleTokens.ISupplierRepository)
      );
    }, Lifetime.Scoped);

    container.register(PurchasingModuleTokens.ReceiveGoodsCommandHandler, (c) => {
      return new ReceiveGoodsCommandHandler(
        c.resolve(PurchasingModuleTokens.IPurchaseOrderRepository)
      );
    }, Lifetime.Scoped);

    container.register(PurchasingModuleTokens.RejectPurchaseOrderCommandHandler, (c) => {
      return new RejectPurchaseOrderCommandHandler(
        c.resolve(PurchasingModuleTokens.IPurchaseOrderRepository)
      );
    }, Lifetime.Scoped);

    container.register(PurchasingModuleTokens.SubmitPurchaseOrderCommandHandler, (c) => {
      return new SubmitPurchaseOrderCommandHandler(
        c.resolve(PurchasingModuleTokens.IPurchaseOrderRepository)
      );
    }, Lifetime.Scoped);

    container.register(PurchasingModuleTokens.SubmitQuotationCommandHandler, (c) => {
      return new SubmitQuotationCommandHandler(
        c.resolve(PurchasingModuleTokens.IRfqRepository),
        c.resolve(PurchasingModuleTokens.IQuotationRepository)
      );
    }, Lifetime.Scoped);

    container.register(PurchasingModuleTokens.SuspendSupplierCommandHandler, (c) => {
      return new SuspendSupplierCommandHandler(
        c.resolve(PurchasingModuleTokens.ISupplierRepository)
      );
    }, Lifetime.Scoped);

    // Queries
    container.register(PurchasingModuleTokens.GetPurchaseOrderByIdQueryHandler, (c) => {
      return new GetPurchaseOrderByIdQueryHandler(
        c.resolve(PurchasingModuleTokens.IPurchaseOrderRepository),
        c.resolve(PurchasingModuleTokens.IPurchasingMapper)
      );
    }, Lifetime.Scoped);

    container.register(PurchasingModuleTokens.GetPurchaseOrdersQueryHandler, (c) => {
      return new GetPurchaseOrdersQueryHandler(
        c.resolve(PurchasingModuleTokens.IPurchaseOrderRepository),
        c.resolve(PurchasingModuleTokens.IPurchasingMapper)
      );
    }, Lifetime.Scoped);

    container.register(PurchasingModuleTokens.GetRfqByIdQueryHandler, (c) => {
      return new GetRfqByIdQueryHandler(
        c.resolve(PurchasingModuleTokens.IRfqRepository),
        c.resolve(PurchasingModuleTokens.IPurchasingMapper)
      );
    }, Lifetime.Scoped);

    container.register(PurchasingModuleTokens.GetRfqsQueryHandler, (c) => {
      return new GetRfqsQueryHandler(
        c.resolve(PurchasingModuleTokens.IRfqRepository),
        c.resolve(PurchasingModuleTokens.IPurchasingMapper)
      );
    }, Lifetime.Scoped);

    container.register(PurchasingModuleTokens.GetSupplierByIdQueryHandler, (c) => {
      return new GetSupplierByIdQueryHandler(
        c.resolve(PurchasingModuleTokens.ISupplierRepository),
        c.resolve(PurchasingModuleTokens.IPurchasingMapper)
      );
    }, Lifetime.Scoped);

    container.register(PurchasingModuleTokens.GetSuppliersQueryHandler, (c) => {
      return new GetSuppliersQueryHandler(
        c.resolve(PurchasingModuleTokens.ISupplierRepository),
        c.resolve(PurchasingModuleTokens.IPurchasingMapper)
      );
    }, Lifetime.Scoped);

    container.register(PurchasingModuleTokens.GetQuotationsByRfqIdQueryHandler, (c) => {
      return new GetQuotationsByRfqIdQueryHandler(
        c.resolve(PurchasingModuleTokens.IQuotationRepository),
        c.resolve(PurchasingModuleTokens.IPurchasingMapper)
      );
    }, Lifetime.Scoped);
  }
}
