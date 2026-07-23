import { IContainer, Lifetime } from '../../../core/di';
import { ProductionModuleTokens } from './ProductionModuleTokens';
import { ProductionApplicationService } from '../application/services/impl';

export class ProductionServiceRegistration {
  public static register(container: IContainer): void {
    container.register(
      ProductionModuleTokens.IProductionApplicationService,
      (c) => new ProductionApplicationService(
        c.resolve(ProductionModuleTokens.IProductionValidator),
        c.resolve(ProductionModuleTokens.CreateProductionOrderCommandHandler),
        c.resolve(ProductionModuleTokens.ReleaseProductionOrderCommandHandler),
        c.resolve(ProductionModuleTokens.StartProductionOrderCommandHandler),
        c.resolve(ProductionModuleTokens.CompleteProductionOrderCommandHandler),
        c.resolve(ProductionModuleTokens.CancelProductionOrderCommandHandler),
        c.resolve(ProductionModuleTokens.AddOperationCommandHandler),
        c.resolve(ProductionModuleTokens.AddMaterialIssueCommandHandler),
        c.resolve(ProductionModuleTokens.UpdateOperationStatusCommandHandler),
        c.resolve(ProductionModuleTokens.IssueMaterialCommandHandler),
        c.resolve(ProductionModuleTokens.ReceiveFinishedGoodsCommandHandler),
        c.resolve(ProductionModuleTokens.GetProductionOrderByIdQueryHandler),
        c.resolve(ProductionModuleTokens.GetProductionOrdersQueryHandler),
        c.resolve(ProductionModuleTokens.GetProductionOperationsQueryHandler),
        c.resolve(ProductionModuleTokens.GetMaterialIssuesQueryHandler),
        c.resolve(ProductionModuleTokens.GetFinishedGoodReceiptsQueryHandler)
      ),
      Lifetime.Scoped
    );
  }
}
