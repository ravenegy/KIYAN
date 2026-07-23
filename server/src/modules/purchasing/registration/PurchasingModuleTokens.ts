import { Token } from '../../../core/di';
import { IPurchasingApplicationService } from '../application/services/IPurchasingApplicationService';
import { IPurchasingMapper } from '../application/mappers/IPurchasingMapper';
import { IPurchasingValidator } from '../application/validators/IPurchasingValidator';
import { IPurchaseOrderRepository, ISupplierRepository, IRfqRepository, IQuotationRepository } from '../domain/repositories';
import { PurchasingRepositoryFactory } from '../infrastructure/factories/PurchasingRepositoryFactory';

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

export const PurchasingModuleTokens = {
  // Application Services
  IPurchasingApplicationService: new Token<IPurchasingApplicationService>('IPurchasingApplicationService'),

  // Repositories
  IPurchaseOrderRepository: new Token<IPurchaseOrderRepository>('IPurchaseOrderRepository'),
  ISupplierRepository: new Token<ISupplierRepository>('ISupplierRepository'),
  IRfqRepository: new Token<IRfqRepository>('IRfqRepository'),
  IQuotationRepository: new Token<IQuotationRepository>('IQuotationRepository'),

  // Mappers
  IPurchasingMapper: new Token<IPurchasingMapper>('IPurchasingMapper'),

  // Validators
  IPurchasingValidator: new Token<IPurchasingValidator>('IPurchasingValidator'),

  // Factories
  PurchasingRepositoryFactory: new Token<PurchasingRepositoryFactory>('PurchasingRepositoryFactory'),

  // Handlers - Commands
  AcceptQuotationCommandHandler: new Token<AcceptQuotationCommandHandler>('AcceptQuotationCommandHandler'),
  AddPurchaseOrderLineCommandHandler: new Token<AddPurchaseOrderLineCommandHandler>('AddPurchaseOrderLineCommandHandler'),
  AddRfqTargetSupplierCommandHandler: new Token<AddRfqTargetSupplierCommandHandler>('AddRfqTargetSupplierCommandHandler'),
  ApprovePurchaseOrderCommandHandler: new Token<ApprovePurchaseOrderCommandHandler>('ApprovePurchaseOrderCommandHandler'),
  CancelPurchaseOrderCommandHandler: new Token<CancelPurchaseOrderCommandHandler>('CancelPurchaseOrderCommandHandler'),
  CreatePurchaseOrderCommandHandler: new Token<CreatePurchaseOrderCommandHandler>('CreatePurchaseOrderCommandHandler'),
  CreateRfqCommandHandler: new Token<CreateRfqCommandHandler>('CreateRfqCommandHandler'),
  CreateSupplierCommandHandler: new Token<CreateSupplierCommandHandler>('CreateSupplierCommandHandler'),
  IssuePurchaseOrderCommandHandler: new Token<IssuePurchaseOrderCommandHandler>('IssuePurchaseOrderCommandHandler'),
  PublishRfqCommandHandler: new Token<PublishRfqCommandHandler>('PublishRfqCommandHandler'),
  QualifySupplierCommandHandler: new Token<QualifySupplierCommandHandler>('QualifySupplierCommandHandler'),
  ReceiveGoodsCommandHandler: new Token<ReceiveGoodsCommandHandler>('ReceiveGoodsCommandHandler'),
  RejectPurchaseOrderCommandHandler: new Token<RejectPurchaseOrderCommandHandler>('RejectPurchaseOrderCommandHandler'),
  SubmitPurchaseOrderCommandHandler: new Token<SubmitPurchaseOrderCommandHandler>('SubmitPurchaseOrderCommandHandler'),
  SubmitQuotationCommandHandler: new Token<SubmitQuotationCommandHandler>('SubmitQuotationCommandHandler'),
  SuspendSupplierCommandHandler: new Token<SuspendSupplierCommandHandler>('SuspendSupplierCommandHandler'),

  // Handlers - Queries
  GetPurchaseOrderByIdQueryHandler: new Token<GetPurchaseOrderByIdQueryHandler>('GetPurchaseOrderByIdQueryHandler'),
  GetPurchaseOrdersQueryHandler: new Token<GetPurchaseOrdersQueryHandler>('GetPurchaseOrdersQueryHandler'),
  GetRfqByIdQueryHandler: new Token<GetRfqByIdQueryHandler>('GetRfqByIdQueryHandler'),
  GetRfqsQueryHandler: new Token<GetRfqsQueryHandler>('GetRfqsQueryHandler'),
  GetSupplierByIdQueryHandler: new Token<GetSupplierByIdQueryHandler>('GetSupplierByIdQueryHandler'),
  GetSuppliersQueryHandler: new Token<GetSuppliersQueryHandler>('GetSuppliersQueryHandler'),
  GetQuotationsByRfqIdQueryHandler: new Token<GetQuotationsByRfqIdQueryHandler>('GetQuotationsByRfqIdQueryHandler')
};
