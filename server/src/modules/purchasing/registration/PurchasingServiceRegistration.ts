import { IContainer, Lifetime } from '../../../core/di';
import { PurchasingModuleTokens } from './PurchasingModuleTokens';
import { PurchasingApplicationService } from '../application/services/impl/PurchasingApplicationService';

export class PurchasingServiceRegistration {
  public static register(container: IContainer): void {
    container.register(
      PurchasingModuleTokens.IPurchasingApplicationService,
      () => new PurchasingApplicationService(
        container.resolve(PurchasingModuleTokens.IPurchasingValidator),
        container.resolve(PurchasingModuleTokens.CreatePurchaseOrderCommandHandler),
        container.resolve(PurchasingModuleTokens.AddPurchaseOrderLineCommandHandler),
        container.resolve(PurchasingModuleTokens.SubmitPurchaseOrderCommandHandler),
        container.resolve(PurchasingModuleTokens.ApprovePurchaseOrderCommandHandler),
        container.resolve(PurchasingModuleTokens.RejectPurchaseOrderCommandHandler),
        container.resolve(PurchasingModuleTokens.CancelPurchaseOrderCommandHandler),
        container.resolve(PurchasingModuleTokens.IssuePurchaseOrderCommandHandler),
        container.resolve(PurchasingModuleTokens.ReceiveGoodsCommandHandler),
        container.resolve(PurchasingModuleTokens.CreateSupplierCommandHandler),
        container.resolve(PurchasingModuleTokens.QualifySupplierCommandHandler),
        container.resolve(PurchasingModuleTokens.SuspendSupplierCommandHandler),
        container.resolve(PurchasingModuleTokens.CreateRfqCommandHandler),
        container.resolve(PurchasingModuleTokens.AddRfqTargetSupplierCommandHandler),
        container.resolve(PurchasingModuleTokens.PublishRfqCommandHandler),
        container.resolve(PurchasingModuleTokens.SubmitQuotationCommandHandler),
        container.resolve(PurchasingModuleTokens.AcceptQuotationCommandHandler),
        container.resolve(PurchasingModuleTokens.GetPurchaseOrderByIdQueryHandler),
        container.resolve(PurchasingModuleTokens.GetPurchaseOrdersQueryHandler),
        container.resolve(PurchasingModuleTokens.GetSupplierByIdQueryHandler),
        container.resolve(PurchasingModuleTokens.GetSuppliersQueryHandler),
        container.resolve(PurchasingModuleTokens.GetRfqByIdQueryHandler),
        container.resolve(PurchasingModuleTokens.GetRfqsQueryHandler),
        container.resolve(PurchasingModuleTokens.GetQuotationsByRfqIdQueryHandler)
      ),
      Lifetime.Scoped
    );
  }
}
