import { IContainer, Lifetime } from '../../../core/di';
import { ProductionModuleTokens } from './ProductionModuleTokens';

import {
  AddMaterialIssueCommandHandler,
  AddOperationCommandHandler,
  CancelProductionOrderCommandHandler,
  CompleteProductionOrderCommandHandler,
  CreateProductionOrderCommandHandler,
  IssueMaterialCommandHandler,
  ReceiveFinishedGoodsCommandHandler,
  ReleaseProductionOrderCommandHandler,
  StartProductionOrderCommandHandler,
  UpdateOperationStatusCommandHandler,
  GetFinishedGoodReceiptsQueryHandler,
  GetMaterialIssuesQueryHandler,
  GetProductionOperationsQueryHandler,
  GetProductionOrderByIdQueryHandler,
  GetProductionOrdersQueryHandler
} from '../application/handlers/impl';

export class ProductionHandlerRegistration {
  public static register(container: IContainer): void {
    // Command Handlers
    container.register(
      ProductionModuleTokens.CreateProductionOrderCommandHandler,
      (c) => new CreateProductionOrderCommandHandler(c.resolve(ProductionModuleTokens.IProductionOrderRepository)),
      Lifetime.Scoped
    );

    container.register(
      ProductionModuleTokens.ReleaseProductionOrderCommandHandler,
      (c) => new ReleaseProductionOrderCommandHandler(c.resolve(ProductionModuleTokens.IProductionOrderRepository)),
      Lifetime.Scoped
    );

    container.register(
      ProductionModuleTokens.StartProductionOrderCommandHandler,
      (c) => new StartProductionOrderCommandHandler(c.resolve(ProductionModuleTokens.IProductionOrderRepository)),
      Lifetime.Scoped
    );

    container.register(
      ProductionModuleTokens.CompleteProductionOrderCommandHandler,
      (c) => new CompleteProductionOrderCommandHandler(c.resolve(ProductionModuleTokens.IProductionOrderRepository)),
      Lifetime.Scoped
    );

    container.register(
      ProductionModuleTokens.CancelProductionOrderCommandHandler,
      (c) => new CancelProductionOrderCommandHandler(c.resolve(ProductionModuleTokens.IProductionOrderRepository)),
      Lifetime.Scoped
    );

    container.register(
      ProductionModuleTokens.AddOperationCommandHandler,
      (c) => new AddOperationCommandHandler(c.resolve(ProductionModuleTokens.IProductionOrderRepository)),
      Lifetime.Scoped
    );

    container.register(
      ProductionModuleTokens.AddMaterialIssueCommandHandler,
      (c) => new AddMaterialIssueCommandHandler(c.resolve(ProductionModuleTokens.IProductionOrderRepository)),
      Lifetime.Scoped
    );

    container.register(
      ProductionModuleTokens.UpdateOperationStatusCommandHandler,
      (c) => new UpdateOperationStatusCommandHandler(c.resolve(ProductionModuleTokens.IProductionOrderRepository)),
      Lifetime.Scoped
    );

    container.register(
      ProductionModuleTokens.IssueMaterialCommandHandler,
      (c) => new IssueMaterialCommandHandler(c.resolve(ProductionModuleTokens.IProductionOrderRepository)),
      Lifetime.Scoped
    );

    container.register(
      ProductionModuleTokens.ReceiveFinishedGoodsCommandHandler,
      (c) => new ReceiveFinishedGoodsCommandHandler(c.resolve(ProductionModuleTokens.IProductionOrderRepository)),
      Lifetime.Scoped
    );

    // Query Handlers
    container.register(
      ProductionModuleTokens.GetProductionOrderByIdQueryHandler,
      (c) => new GetProductionOrderByIdQueryHandler(
        c.resolve(ProductionModuleTokens.IProductionOrderRepository),
        c.resolve(ProductionModuleTokens.IProductionMapper)
      ),
      Lifetime.Scoped
    );

    container.register(
      ProductionModuleTokens.GetProductionOrdersQueryHandler,
      (c) => new GetProductionOrdersQueryHandler(
        c.resolve(ProductionModuleTokens.IProductionOrderRepository),
        c.resolve(ProductionModuleTokens.IProductionMapper)
      ),
      Lifetime.Scoped
    );

    container.register(
      ProductionModuleTokens.GetProductionOperationsQueryHandler,
      (c) => new GetProductionOperationsQueryHandler(
        c.resolve(ProductionModuleTokens.IProductionOrderRepository),
        c.resolve(ProductionModuleTokens.IProductionMapper)
      ),
      Lifetime.Scoped
    );

    container.register(
      ProductionModuleTokens.GetMaterialIssuesQueryHandler,
      (c) => new GetMaterialIssuesQueryHandler(
        c.resolve(ProductionModuleTokens.IProductionOrderRepository),
        c.resolve(ProductionModuleTokens.IProductionMapper)
      ),
      Lifetime.Scoped
    );

    container.register(
      ProductionModuleTokens.GetFinishedGoodReceiptsQueryHandler,
      (c) => new GetFinishedGoodReceiptsQueryHandler(
        c.resolve(ProductionModuleTokens.IProductionOrderRepository),
        c.resolve(ProductionModuleTokens.IProductionMapper)
      ),
      Lifetime.Scoped
    );
  }
}
