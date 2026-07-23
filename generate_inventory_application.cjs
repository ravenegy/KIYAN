const fs = require('fs');
const path = require('path');

const modDir = path.join(__dirname, 'server/src/modules/inventory/application');

function write(subpath, content) {
    const dir = path.dirname(path.join(modDir, subpath));
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(modDir, subpath), content.trim() + '\n');
}

// Commands
write('commands/CreateInventoryItemCommand.ts', `
import { ICommand } from '../../../../core/mediator/commands/ICommand';
import { Result } from '../../../../core';
import { ItemCategory } from '../../domain/enums/ItemCategory';

export class CreateInventoryItemCommand implements ICommand<Result<string>> {
  constructor(
    public readonly sku: string,
    public readonly category: ItemCategory,
    public readonly name: string
  ) {}
}
`);

write('commands/UpdateInventoryItemCommand.ts', `
import { ICommand } from '../../../../core/mediator/commands/ICommand';
import { Result } from '../../../../core';

export class UpdateInventoryItemCommand implements ICommand<Result<void>> {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly isActive: boolean
  ) {}
}
`);

write('commands/DeleteInventoryItemCommand.ts', `
import { ICommand } from '../../../../core/mediator/commands/ICommand';
import { Result } from '../../../../core';

export class DeleteInventoryItemCommand implements ICommand<Result<void>> {
  constructor(
    public readonly id: string
  ) {}
}
`);

write('commands/AdjustStockCommand.ts', `
import { ICommand } from '../../../../core/mediator/commands/ICommand';
import { Result } from '../../../../core';

export class AdjustStockCommand implements ICommand<Result<void>> {
  constructor(
    public readonly inventoryItemId: string,
    public readonly locationId: string,
    public readonly newQuantity: number,
    public readonly reason: string
  ) {}
}
`);

write('commands/TransferStockCommand.ts', `
import { ICommand } from '../../../../core/mediator/commands/ICommand';
import { Result } from '../../../../core';

export class TransferStockCommand implements ICommand<Result<void>> {
  constructor(
    public readonly inventoryItemId: string,
    public readonly fromLocationId: string,
    public readonly toLocationId: string,
    public readonly quantity: number
  ) {}
}
`);

write('commands/ReceiveStockCommand.ts', `
import { ICommand } from '../../../../core/mediator/commands/ICommand';
import { Result } from '../../../../core';

export class ReceiveStockCommand implements ICommand<Result<void>> {
  constructor(
    public readonly inventoryItemId: string,
    public readonly locationId: string,
    public readonly quantity: number,
    public readonly lotId: string | undefined
  ) {}
}
`);

write('commands/IssueStockCommand.ts', `
import { ICommand } from '../../../../core/mediator/commands/ICommand';
import { Result } from '../../../../core';

export class IssueStockCommand implements ICommand<Result<void>> {
  constructor(
    public readonly inventoryItemId: string,
    public readonly locationId: string,
    public readonly quantity: number
  ) {}
}
`);

write('commands/ActivateInventoryItemCommand.ts', `
import { ICommand } from '../../../../core/mediator/commands/ICommand';
import { Result } from '../../../../core';

export class ActivateInventoryItemCommand implements ICommand<Result<void>> {
  constructor(
    public readonly id: string
  ) {}
}
`);

write('commands/DeactivateInventoryItemCommand.ts', `
import { ICommand } from '../../../../core/mediator/commands/ICommand';
import { Result } from '../../../../core';

export class DeactivateInventoryItemCommand implements ICommand<Result<void>> {
  constructor(
    public readonly id: string
  ) {}
}
`);

write('commands/index.ts', `
export * from './CreateInventoryItemCommand';
export * from './UpdateInventoryItemCommand';
export * from './DeleteInventoryItemCommand';
export * from './AdjustStockCommand';
export * from './TransferStockCommand';
export * from './ReceiveStockCommand';
export * from './IssueStockCommand';
export * from './ActivateInventoryItemCommand';
export * from './DeactivateInventoryItemCommand';
`);

// DTOs
write('dto/InventoryItemDto.ts', `
import { StockLevelDto } from './StockLevelDto';

export interface InventoryItemDto {
  readonly id: string;
  readonly sku: string;
  readonly category: string;
  readonly name: string;
  readonly isActive: boolean;
  readonly stockLevels: ReadonlyArray<StockLevelDto>;
  readonly createdAt: Date;
  readonly updatedAt?: Date;
}
`);

write('dto/StockLevelDto.ts', `
export interface StockLevelDto {
  readonly locationId: string;
  readonly quantity: number;
  readonly lotId?: string;
}
`);

write('dto/StockMovementDto.ts', `
export interface StockMovementDto {
  readonly id: string;
  readonly inventoryItemId: string;
  readonly type: string;
  readonly locationId: string;
  readonly quantity: number;
  readonly timestamp: Date;
}
`);

write('dto/PagedInventoryDto.ts', `
import { InventoryItemDto } from './InventoryItemDto';

export interface PagedInventoryDto {
  readonly items: ReadonlyArray<InventoryItemDto>;
  readonly totalCount: number;
  readonly pageNumber: number;
  readonly pageSize: number;
}
`);

write('dto/InventorySummaryDto.ts', `
export interface InventorySummaryDto {
  readonly totalItems: number;
  readonly lowStockItems: number;
  readonly outOfStockItems: number;
}
`);

write('dto/InventoryLookupDto.ts', `
export interface InventoryLookupDto {
  readonly id: string;
  readonly sku: string;
  readonly name: string;
}
`);

write('dto/index.ts', `
export * from './InventoryItemDto';
export * from './StockLevelDto';
export * from './StockMovementDto';
export * from './PagedInventoryDto';
export * from './InventorySummaryDto';
export * from './InventoryLookupDto';
`);

// Queries
write('queries/GetInventoryItemByIdQuery.ts', `
import { IQuery } from '../../../../core/mediator/queries/IQuery';
import { Result } from '../../../../core';
import { InventoryItemDto } from '../dto/InventoryItemDto';

export class GetInventoryItemByIdQuery implements IQuery<Result<InventoryItemDto>> {
  constructor(
    public readonly id: string
  ) {}
}
`);

write('queries/GetInventoryItemsQuery.ts', `
import { IQuery } from '../../../../core/mediator/queries/IQuery';
import { Result } from '../../../../core';
import { PagedInventoryDto } from '../dto/PagedInventoryDto';

export class GetInventoryItemsQuery implements IQuery<Result<PagedInventoryDto>> {
  constructor(
    public readonly pageNumber: number,
    public readonly pageSize: number
  ) {}
}
`);

write('queries/SearchInventoryItemsQuery.ts', `
import { IQuery } from '../../../../core/mediator/queries/IQuery';
import { Result } from '../../../../core';
import { PagedInventoryDto } from '../dto/PagedInventoryDto';

export class SearchInventoryItemsQuery implements IQuery<Result<PagedInventoryDto>> {
  constructor(
    public readonly searchTerm: string,
    public readonly category: string | undefined,
    public readonly pageNumber: number,
    public readonly pageSize: number
  ) {}
}
`);

write('queries/GetStockLevelsQuery.ts', `
import { IQuery } from '../../../../core/mediator/queries/IQuery';
import { Result } from '../../../../core';
import { StockLevelDto } from '../dto/StockLevelDto';

export class GetStockLevelsQuery implements IQuery<Result<ReadonlyArray<StockLevelDto>>> {
  constructor(
    public readonly inventoryItemId: string
  ) {}
}
`);

write('queries/GetInventoryBySkuQuery.ts', `
import { IQuery } from '../../../../core/mediator/queries/IQuery';
import { Result } from '../../../../core';
import { InventoryItemDto } from '../dto/InventoryItemDto';

export class GetInventoryBySkuQuery implements IQuery<Result<InventoryItemDto>> {
  constructor(
    public readonly sku: string
  ) {}
}
`);

write('queries/index.ts', `
export * from './GetInventoryItemByIdQuery';
export * from './GetInventoryItemsQuery';
export * from './SearchInventoryItemsQuery';
export * from './GetStockLevelsQuery';
export * from './GetInventoryBySkuQuery';
`);

// Handlers Interfaces
write('handlers/ICreateInventoryItemCommandHandler.ts', `
import { ICommandHandler } from '../../../../core/mediator/commands/ICommandHandler';
import { CreateInventoryItemCommand } from '../commands/CreateInventoryItemCommand';
import { Result } from '../../../../core';

export interface ICreateInventoryItemCommandHandler extends ICommandHandler<CreateInventoryItemCommand, Result<string>> {}
`);

write('handlers/IUpdateInventoryItemCommandHandler.ts', `
import { ICommandHandler } from '../../../../core/mediator/commands/ICommandHandler';
import { UpdateInventoryItemCommand } from '../commands/UpdateInventoryItemCommand';
import { Result } from '../../../../core';

export interface IUpdateInventoryItemCommandHandler extends ICommandHandler<UpdateInventoryItemCommand, Result<void>> {}
`);

write('handlers/IDeleteInventoryItemCommandHandler.ts', `
import { ICommandHandler } from '../../../../core/mediator/commands/ICommandHandler';
import { DeleteInventoryItemCommand } from '../commands/DeleteInventoryItemCommand';
import { Result } from '../../../../core';

export interface IDeleteInventoryItemCommandHandler extends ICommandHandler<DeleteInventoryItemCommand, Result<void>> {}
`);

write('handlers/IAdjustStockCommandHandler.ts', `
import { ICommandHandler } from '../../../../core/mediator/commands/ICommandHandler';
import { AdjustStockCommand } from '../commands/AdjustStockCommand';
import { Result } from '../../../../core';

export interface IAdjustStockCommandHandler extends ICommandHandler<AdjustStockCommand, Result<void>> {}
`);

write('handlers/ITransferStockCommandHandler.ts', `
import { ICommandHandler } from '../../../../core/mediator/commands/ICommandHandler';
import { TransferStockCommand } from '../commands/TransferStockCommand';
import { Result } from '../../../../core';

export interface ITransferStockCommandHandler extends ICommandHandler<TransferStockCommand, Result<void>> {}
`);

write('handlers/IReceiveStockCommandHandler.ts', `
import { ICommandHandler } from '../../../../core/mediator/commands/ICommandHandler';
import { ReceiveStockCommand } from '../commands/ReceiveStockCommand';
import { Result } from '../../../../core';

export interface IReceiveStockCommandHandler extends ICommandHandler<ReceiveStockCommand, Result<void>> {}
`);

write('handlers/IIssueStockCommandHandler.ts', `
import { ICommandHandler } from '../../../../core/mediator/commands/ICommandHandler';
import { IssueStockCommand } from '../commands/IssueStockCommand';
import { Result } from '../../../../core';

export interface IIssueStockCommandHandler extends ICommandHandler<IssueStockCommand, Result<void>> {}
`);

write('handlers/IGetInventoryItemByIdQueryHandler.ts', `
import { IQueryHandler } from '../../../../core/mediator/queries/IQueryHandler';
import { GetInventoryItemByIdQuery } from '../queries/GetInventoryItemByIdQuery';
import { Result } from '../../../../core';
import { InventoryItemDto } from '../dto/InventoryItemDto';

export interface IGetInventoryItemByIdQueryHandler extends IQueryHandler<GetInventoryItemByIdQuery, Result<InventoryItemDto>> {}
`);

write('handlers/IGetInventoryItemsQueryHandler.ts', `
import { IQueryHandler } from '../../../../core/mediator/queries/IQueryHandler';
import { GetInventoryItemsQuery } from '../queries/GetInventoryItemsQuery';
import { Result } from '../../../../core';
import { PagedInventoryDto } from '../dto/PagedInventoryDto';

export interface IGetInventoryItemsQueryHandler extends IQueryHandler<GetInventoryItemsQuery, Result<PagedInventoryDto>> {}
`);

write('handlers/ISearchInventoryItemsQueryHandler.ts', `
import { IQueryHandler } from '../../../../core/mediator/queries/IQueryHandler';
import { SearchInventoryItemsQuery } from '../queries/SearchInventoryItemsQuery';
import { Result } from '../../../../core';
import { PagedInventoryDto } from '../dto/PagedInventoryDto';

export interface ISearchInventoryItemsQueryHandler extends IQueryHandler<SearchInventoryItemsQuery, Result<PagedInventoryDto>> {}
`);

write('handlers/IGetStockLevelsQueryHandler.ts', `
import { IQueryHandler } from '../../../../core/mediator/queries/IQueryHandler';
import { GetStockLevelsQuery } from '../queries/GetStockLevelsQuery';
import { Result } from '../../../../core';
import { StockLevelDto } from '../dto/StockLevelDto';

export interface IGetStockLevelsQueryHandler extends IQueryHandler<GetStockLevelsQuery, Result<ReadonlyArray<StockLevelDto>>> {}
`);

write('handlers/index.ts', `
export * from './ICreateInventoryItemCommandHandler';
export * from './IUpdateInventoryItemCommandHandler';
export * from './IDeleteInventoryItemCommandHandler';
export * from './IAdjustStockCommandHandler';
export * from './ITransferStockCommandHandler';
export * from './IReceiveStockCommandHandler';
export * from './IIssueStockCommandHandler';
export * from './IGetInventoryItemByIdQueryHandler';
export * from './IGetInventoryItemsQueryHandler';
export * from './ISearchInventoryItemsQueryHandler';
export * from './IGetStockLevelsQueryHandler';
`);

// Services Interfaces
write('interfaces/IInventoryApplicationService.ts', `
import { Result } from '../../../../core';
import { InventoryItemDto } from '../dto/InventoryItemDto';
import { PagedInventoryDto } from '../dto/PagedInventoryDto';
import { CreateInventoryItemCommand } from '../commands/CreateInventoryItemCommand';
import { UpdateInventoryItemCommand } from '../commands/UpdateInventoryItemCommand';
import { DeleteInventoryItemCommand } from '../commands/DeleteInventoryItemCommand';

export interface IInventoryApplicationService {
  createItem(command: CreateInventoryItemCommand): Promise<Result<string>>;
  updateItem(command: UpdateInventoryItemCommand): Promise<Result<void>>;
  deleteItem(command: DeleteInventoryItemCommand): Promise<Result<void>>;
  getItemById(id: string): Promise<Result<InventoryItemDto>>;
  getItems(pageNumber: number, pageSize: number): Promise<Result<PagedInventoryDto>>;
}
`);

write('interfaces/IInventoryReadService.ts', `
import { Result } from '../../../../core';
import { InventoryItemDto } from '../dto/InventoryItemDto';
import { PagedInventoryDto } from '../dto/PagedInventoryDto';

export interface IInventoryReadService {
  getItemById(id: string): Promise<Result<InventoryItemDto>>;
  getItems(pageNumber: number, pageSize: number): Promise<Result<PagedInventoryDto>>;
  searchItems(searchTerm: string, category: string | undefined, pageNumber: number, pageSize: number): Promise<Result<PagedInventoryDto>>;
}
`);

write('interfaces/IInventoryWriteService.ts', `
import { Result } from '../../../../core';
import { CreateInventoryItemCommand } from '../commands/CreateInventoryItemCommand';
import { UpdateInventoryItemCommand } from '../commands/UpdateInventoryItemCommand';
import { DeleteInventoryItemCommand } from '../commands/DeleteInventoryItemCommand';

export interface IInventoryWriteService {
  createItem(command: CreateInventoryItemCommand): Promise<Result<string>>;
  updateItem(command: UpdateInventoryItemCommand): Promise<Result<void>>;
  deleteItem(command: DeleteInventoryItemCommand): Promise<Result<void>>;
}
`);

write('interfaces/IStockApplicationService.ts', `
import { Result } from '../../../../core';
import { AdjustStockCommand } from '../commands/AdjustStockCommand';
import { TransferStockCommand } from '../commands/TransferStockCommand';
import { ReceiveStockCommand } from '../commands/ReceiveStockCommand';
import { IssueStockCommand } from '../commands/IssueStockCommand';

export interface IStockApplicationService {
  adjustStock(command: AdjustStockCommand): Promise<Result<void>>;
  transferStock(command: TransferStockCommand): Promise<Result<void>>;
  receiveStock(command: ReceiveStockCommand): Promise<Result<void>>;
  issueStock(command: IssueStockCommand): Promise<Result<void>>;
}
`);

write('interfaces/IStockReadService.ts', `
import { Result } from '../../../../core';
import { StockLevelDto } from '../dto/StockLevelDto';

export interface IStockReadService {
  getStockLevels(inventoryItemId: string): Promise<Result<ReadonlyArray<StockLevelDto>>>;
}
`);

write('interfaces/IStockWriteService.ts', `
import { Result } from '../../../../core';
import { AdjustStockCommand } from '../commands/AdjustStockCommand';
import { TransferStockCommand } from '../commands/TransferStockCommand';

export interface IStockWriteService {
  adjustStock(command: AdjustStockCommand): Promise<Result<void>>;
  transferStock(command: TransferStockCommand): Promise<Result<void>>;
}
`);

write('interfaces/index.ts', `
export * from './IInventoryApplicationService';
export * from './IInventoryReadService';
export * from './IInventoryWriteService';
export * from './IStockApplicationService';
export * from './IStockReadService';
export * from './IStockWriteService';
`);

// Validators Interfaces
write('validators/ICreateInventoryValidator.ts', `
import { Result } from '../../../../core';
import { CreateInventoryItemCommand } from '../commands/CreateInventoryItemCommand';

export interface ICreateInventoryValidator {
  validate(command: CreateInventoryItemCommand): Result<void>;
}
`);

write('validators/IAdjustStockValidator.ts', `
import { Result } from '../../../../core';
import { AdjustStockCommand } from '../commands/AdjustStockCommand';

export interface IAdjustStockValidator {
  validate(command: AdjustStockCommand): Result<void>;
}
`);

write('validators/ITransferStockValidator.ts', `
import { Result } from '../../../../core';
import { TransferStockCommand } from '../commands/TransferStockCommand';

export interface ITransferStockValidator {
  validate(command: TransferStockCommand): Result<void>;
}
`);

write('validators/IRestockValidator.ts', `
import { Result } from '../../../../core';
import { ReceiveStockCommand } from '../commands/ReceiveStockCommand';

export interface IRestockValidator {
  validate(command: ReceiveStockCommand): Result<void>;
}
`);

write('validators/index.ts', `
export * from './ICreateInventoryValidator';
export * from './IAdjustStockValidator';
export * from './ITransferStockValidator';
export * from './IRestockValidator';
`);

// Mappers Interfaces
write('mappers/IInventoryMapper.ts', `
import { InventoryItem } from '../../domain/entities/InventoryItem';
import { InventoryItemDto } from '../dto/InventoryItemDto';

export interface IInventoryMapper {
  toDto(entity: InventoryItem): InventoryItemDto;
}
`);

write('mappers/IStockMapper.ts', `
import { StockLevel } from '../../domain/entities/StockLevel';
import { StockLevelDto } from '../dto/StockLevelDto';

export interface IStockMapper {
  toDto(entity: StockLevel): StockLevelDto;
}
`);

write('mappers/index.ts', `
export * from './IInventoryMapper';
export * from './IStockMapper';
`);

// Exceptions
write('exceptions/InventoryApplicationException.ts', `
export class InventoryApplicationException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InventoryApplicationException';
  }
}
`);

write('exceptions/InventoryNotFoundException.ts', `
import { InventoryApplicationException } from './InventoryApplicationException';

export class InventoryNotFoundException extends InventoryApplicationException {
  constructor(idOrSku: string) {
    super(\`Inventory item with identifier '\${idOrSku}' was not found.\`);
    this.name = 'InventoryNotFoundException';
  }
}
`);

write('exceptions/DuplicateSkuException.ts', `
import { InventoryApplicationException } from './InventoryApplicationException';

export class DuplicateSkuException extends InventoryApplicationException {
  constructor(sku: string) {
    super(\`An inventory item with SKU '\${sku}' already exists.\`);
    this.name = 'DuplicateSkuException';
  }
}
`);

write('exceptions/InsufficientStockException.ts', `
import { InventoryApplicationException } from './InventoryApplicationException';

export class InsufficientStockException extends InventoryApplicationException {
  constructor(locationId: string, required: number, available: number) {
    super(\`Insufficient stock at location '\${locationId}'. Required: \${required}, Available: \${available}.\`);
    this.name = 'InsufficientStockException';
  }
}
`);

write('exceptions/index.ts', `
export * from './InventoryApplicationException';
export * from './InventoryNotFoundException';
export * from './DuplicateSkuException';
export * from './InsufficientStockException';
`);

write('contracts/index.ts', `
// No specific contracts defined in phase 2 prompt, leaving empty barrel
export {};
`);

// Index
write('index.ts', `
export * from './commands';
export * from './dto';
export * from './exceptions';
export * from './handlers';
export * from './interfaces';
export * from './mappers';
export * from './queries';
export * from './validators';
export * from './contracts';
`);

