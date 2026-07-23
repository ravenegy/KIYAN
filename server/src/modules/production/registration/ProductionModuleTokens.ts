import { Token } from '../../../core/di';

import { IProductionApplicationService } from '../application/services';
import { IProductionMapper } from '../application/mappers/IProductionMapper';
import { IProductionValidator } from '../application/validators/IProductionValidator';
import { ProductionInfrastructureService } from '../infrastructure/services';
import { IProductionOrderRepository, IOperationRepository } from '../domain/repositories';
import { ProductionRepositoryFactory } from '../infrastructure/factories';

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

export const ProductionModuleTokens = {
  // Application Services
  IProductionApplicationService: new Token<IProductionApplicationService>('IProductionApplicationService'),

  // Infrastructure Services
  ProductionInfrastructureService: new Token<ProductionInfrastructureService>('ProductionInfrastructureService'),

  // Repositories
  IProductionOrderRepository: new Token<IProductionOrderRepository>('IProductionOrderRepository'),
  IOperationRepository: new Token<IOperationRepository>('IOperationRepository'),

  // Mappers
  IProductionMapper: new Token<IProductionMapper>('IProductionMapper'),

  // Validators
  IProductionValidator: new Token<IProductionValidator>('IProductionValidator'),

  // Factories
  ProductionRepositoryFactory: new Token<ProductionRepositoryFactory>('ProductionRepositoryFactory'),

  // Handlers - Commands
  AddMaterialIssueCommandHandler: new Token<AddMaterialIssueCommandHandler>('AddMaterialIssueCommandHandler'),
  AddOperationCommandHandler: new Token<AddOperationCommandHandler>('AddOperationCommandHandler'),
  CancelProductionOrderCommandHandler: new Token<CancelProductionOrderCommandHandler>('CancelProductionOrderCommandHandler'),
  CompleteProductionOrderCommandHandler: new Token<CompleteProductionOrderCommandHandler>('CompleteProductionOrderCommandHandler'),
  CreateProductionOrderCommandHandler: new Token<CreateProductionOrderCommandHandler>('CreateProductionOrderCommandHandler'),
  IssueMaterialCommandHandler: new Token<IssueMaterialCommandHandler>('IssueMaterialCommandHandler'),
  ReceiveFinishedGoodsCommandHandler: new Token<ReceiveFinishedGoodsCommandHandler>('ReceiveFinishedGoodsCommandHandler'),
  ReleaseProductionOrderCommandHandler: new Token<ReleaseProductionOrderCommandHandler>('ReleaseProductionOrderCommandHandler'),
  StartProductionOrderCommandHandler: new Token<StartProductionOrderCommandHandler>('StartProductionOrderCommandHandler'),
  UpdateOperationStatusCommandHandler: new Token<UpdateOperationStatusCommandHandler>('UpdateOperationStatusCommandHandler'),

  // Handlers - Queries
  GetFinishedGoodReceiptsQueryHandler: new Token<GetFinishedGoodReceiptsQueryHandler>('GetFinishedGoodReceiptsQueryHandler'),
  GetMaterialIssuesQueryHandler: new Token<GetMaterialIssuesQueryHandler>('GetMaterialIssuesQueryHandler'),
  GetProductionOperationsQueryHandler: new Token<GetProductionOperationsQueryHandler>('GetProductionOperationsQueryHandler'),
  GetProductionOrderByIdQueryHandler: new Token<GetProductionOrderByIdQueryHandler>('GetProductionOrderByIdQueryHandler'),
  GetProductionOrdersQueryHandler: new Token<GetProductionOrdersQueryHandler>('GetProductionOrdersQueryHandler')
};
