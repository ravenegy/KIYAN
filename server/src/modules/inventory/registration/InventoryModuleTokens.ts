import { Token } from '../../../core/di';
import { IInventoryApplicationService, IInventoryReadService, IInventoryWriteService, IStockApplicationService, IStockReadService, IStockWriteService } from '../application/services';
import { InventoryItemMapper, StockMapper } from '../application/mappers/impl';
import { CreateInventoryValidator, UpdateInventoryValidator, AdjustStockValidator, TransferStockValidator, ReceiveStockValidator, IssueStockValidator } from '../application/validators/impl';
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

export const InventoryModuleTokens = {
  // Handlers - Commands
  CreateInventoryItemCommandHandler: new Token<CreateInventoryItemCommandHandler>('CreateInventoryItemCommandHandler'),
  UpdateInventoryItemCommandHandler: new Token<UpdateInventoryItemCommandHandler>('UpdateInventoryItemCommandHandler'),
  DeleteInventoryItemCommandHandler: new Token<DeleteInventoryItemCommandHandler>('DeleteInventoryItemCommandHandler'),
  ActivateInventoryItemCommandHandler: new Token<ActivateInventoryItemCommandHandler>('ActivateInventoryItemCommandHandler'),
  DeactivateInventoryItemCommandHandler: new Token<DeactivateInventoryItemCommandHandler>('DeactivateInventoryItemCommandHandler'),
  AdjustStockCommandHandler: new Token<AdjustStockCommandHandler>('AdjustStockCommandHandler'),
  TransferStockCommandHandler: new Token<TransferStockCommandHandler>('TransferStockCommandHandler'),
  ReceiveStockCommandHandler: new Token<ReceiveStockCommandHandler>('ReceiveStockCommandHandler'),
  IssueStockCommandHandler: new Token<IssueStockCommandHandler>('IssueStockCommandHandler'),

  // Handlers - Queries
  GetInventoryItemByIdQueryHandler: new Token<GetInventoryItemByIdQueryHandler>('GetInventoryItemByIdQueryHandler'),
  GetInventoryBySkuQueryHandler: new Token<GetInventoryBySkuQueryHandler>('GetInventoryBySkuQueryHandler'),
  GetInventoryItemsQueryHandler: new Token<GetInventoryItemsQueryHandler>('GetInventoryItemsQueryHandler'),
  GetStockLevelsQueryHandler: new Token<GetStockLevelsQueryHandler>('GetStockLevelsQueryHandler'),
  SearchInventoryItemsQueryHandler: new Token<SearchInventoryItemsQueryHandler>('SearchInventoryItemsQueryHandler'),

  // Application Services
  IInventoryApplicationService: new Token<IInventoryApplicationService>('IInventoryApplicationService'),
  IInventoryReadService: new Token<IInventoryReadService>('IInventoryReadService'),
  IInventoryWriteService: new Token<IInventoryWriteService>('IInventoryWriteService'),
  IStockApplicationService: new Token<IStockApplicationService>('IStockApplicationService'),
  IStockReadService: new Token<IStockReadService>('IStockReadService'),
  IStockWriteService: new Token<IStockWriteService>('IStockWriteService'),

  // Mappers
  InventoryItemMapper: new Token<InventoryItemMapper>('InventoryItemMapper'),
  StockMapper: new Token<StockMapper>('StockMapper'),

  // Validators
  CreateInventoryValidator: new Token<CreateInventoryValidator>('CreateInventoryValidator'),
  UpdateInventoryValidator: new Token<UpdateInventoryValidator>('UpdateInventoryValidator'),
  AdjustStockValidator: new Token<AdjustStockValidator>('AdjustStockValidator'),
  TransferStockValidator: new Token<TransferStockValidator>('TransferStockValidator'),
  ReceiveStockValidator: new Token<ReceiveStockValidator>('ReceiveStockValidator'),
  IssueStockValidator: new Token<IssueStockValidator>('IssueStockValidator'),
};
