const fs = require('fs');
const path = require('path');

const modDir = path.join(__dirname, 'server/src/modules/inventory/application');

function ensureDir(subpath) {
    fs.mkdirSync(path.join(modDir, subpath), { recursive: true });
}

function write(subpath, content) {
    fs.writeFileSync(path.join(modDir, subpath), content.trim() + '\n');
}

ensureDir('mappers/impl');
ensureDir('validators/impl');

// Mappers - IInventoryMapper
write('mappers/IInventoryMapper.ts', `
import { InventoryItem } from '../../domain/entities/InventoryItem';
import { InventoryItemDto } from '../dto/InventoryItemDto';

export interface IInventoryMapper {
  toDto(entity: InventoryItem): InventoryItemDto;
}
`);

// Mappers - IStockMapper
write('mappers/IStockMapper.ts', `
import { StockLevel } from '../../domain/entities/StockLevel';
import { StockMovement } from '../../domain/entities/StockMovement';
import { StockLevelDto } from '../dto/StockLevelDto';
import { StockMovementDto } from '../dto/StockMovementDto';

export interface IStockMapper {
  toStockLevelDto(entity: StockLevel): StockLevelDto;
  toStockMovementDto(entity: StockMovement): StockMovementDto;
}
`);

write('mappers/index.ts', `
export * from './IInventoryMapper';
export * from './IStockMapper';
export * from './impl';
`);

write('mappers/impl/InventoryItemMapper.ts', `
import { IInventoryMapper } from '../IInventoryMapper';
import { InventoryItem } from '../../../domain/entities/InventoryItem';
import { InventoryItemDto } from '../../dto/InventoryItemDto';
import { StockMapper } from './StockMapper';

export class InventoryItemMapper implements IInventoryMapper {
  constructor(private readonly stockMapper: StockMapper) {}

  toDto(entity: InventoryItem): InventoryItemDto {
    return {
      id: entity.id.value,
      sku: entity.sku.value,
      category: entity.category.toString(),
      name: entity.name,
      isActive: entity.isActive,
      stockLevels: entity.stockLevels.map(sl => this.stockMapper.toStockLevelDto(sl)),
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt
    };
  }
}
`);

write('mappers/impl/StockMapper.ts', `
import { IStockMapper } from '../IStockMapper';
import { StockLevel } from '../../../domain/entities/StockLevel';
import { StockMovement } from '../../../domain/entities/StockMovement';
import { StockLevelDto } from '../../dto/StockLevelDto';
import { StockMovementDto } from '../../dto/StockMovementDto';

export class StockMapper implements IStockMapper {
  toStockLevelDto(entity: StockLevel): StockLevelDto {
    return {
      id: entity.id.value,
      inventoryItemId: entity.inventoryItemId.value,
      locationId: entity.locationId.value,
      quantity: entity.quantity.value,
      lastUpdated: entity.updatedAt || entity.createdAt
    };
  }

  toStockMovementDto(entity: StockMovement): StockMovementDto {
    return {
      id: entity.id.value,
      inventoryItemId: entity.inventoryItemId.value,
      type: entity.type.toString(),
      quantity: entity.quantity.value,
      locationId: entity.locationId.value,
      reason: entity.reason,
      lotId: entity.lotId?.value,
      referenceId: entity.referenceId,
      timestamp: entity.createdAt
    };
  }
}
`);

write('mappers/impl/index.ts', `
export * from './InventoryItemMapper';
export * from './StockMapper';
`);

// Validators Interfaces
write('validators/ICreateInventoryValidator.ts', `
import { Result } from '../../../../core';
import { CreateInventoryItemCommand } from '../commands/CreateInventoryItemCommand';

export interface ICreateInventoryValidator {
  validate(command: CreateInventoryItemCommand): Result<void>;
}
`);

write('validators/IUpdateInventoryValidator.ts', `
import { Result } from '../../../../core';
import { UpdateInventoryItemCommand } from '../commands/UpdateInventoryItemCommand';

export interface IUpdateInventoryValidator {
  validate(command: UpdateInventoryItemCommand): Result<void>;
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

write('validators/IReceiveStockValidator.ts', `
import { Result } from '../../../../core';
import { ReceiveStockCommand } from '../commands/ReceiveStockCommand';

export interface IReceiveStockValidator {
  validate(command: ReceiveStockCommand): Result<void>;
}
`);

write('validators/IIssueStockValidator.ts', `
import { Result } from '../../../../core';
import { IssueStockCommand } from '../commands/IssueStockCommand';

export interface IIssueStockValidator {
  validate(command: IssueStockCommand): Result<void>;
}
`);

write('validators/index.ts', `
export * from './ICreateInventoryValidator';
export * from './IUpdateInventoryValidator';
export * from './IAdjustStockValidator';
export * from './ITransferStockValidator';
export * from './IReceiveStockValidator';
export * from './IIssueStockValidator';
export * from './impl';
`);


// Validator implementations

write('validators/impl/CreateInventoryValidator.ts', `
import { Result, ResultFactory } from '../../../../../core';
import { CreateInventoryItemCommand } from '../../commands/CreateInventoryItemCommand';
import { ICreateInventoryValidator } from '../ICreateInventoryValidator';

export class CreateInventoryValidator implements ICreateInventoryValidator {
  validate(command: CreateInventoryItemCommand): Result<void> {
    if (!command.sku || !command.sku.value.trim()) {
      return ResultFactory.validation('SKU is required');
    }
    if (!command.name || !command.name.trim()) {
      return ResultFactory.validation('Name is required');
    }
    if (!command.category) {
      return ResultFactory.validation('Category is required');
    }
    return ResultFactory.success();
  }
}
`);

write('validators/impl/UpdateInventoryValidator.ts', `
import { Result, ResultFactory } from '../../../../../core';
import { UpdateInventoryItemCommand } from '../../commands/UpdateInventoryItemCommand';
import { IUpdateInventoryValidator } from '../IUpdateInventoryValidator';

export class UpdateInventoryValidator implements IUpdateInventoryValidator {
  validate(command: UpdateInventoryItemCommand): Result<void> {
    if (!command.targetId || !command.targetId.value.trim()) {
      return ResultFactory.validation('Target ID is required');
    }
    if (command.name !== undefined && !command.name.trim()) {
      return ResultFactory.validation('Name cannot be empty if provided');
    }
    return ResultFactory.success();
  }
}
`);

write('validators/impl/AdjustStockValidator.ts', `
import { Result, ResultFactory } from '../../../../../core';
import { AdjustStockCommand } from '../../commands/AdjustStockCommand';
import { IAdjustStockValidator } from '../IAdjustStockValidator';

export class AdjustStockValidator implements IAdjustStockValidator {
  validate(command: AdjustStockCommand): Result<void> {
    if (!command.inventoryItemId || !command.inventoryItemId.value.trim()) {
      return ResultFactory.validation('Inventory Item ID is required');
    }
    if (!command.locationId || !command.locationId.value.trim()) {
      return ResultFactory.validation('Location ID is required');
    }
    if (!command.newQuantity || command.newQuantity.value < 0) {
      return ResultFactory.validation('Quantity cannot be negative');
    }
    if (!command.reason || !command.reason.trim()) {
      return ResultFactory.validation('Reason is required');
    }
    return ResultFactory.success();
  }
}
`);

write('validators/impl/TransferStockValidator.ts', `
import { Result, ResultFactory } from '../../../../../core';
import { TransferStockCommand } from '../../commands/TransferStockCommand';
import { ITransferStockValidator } from '../ITransferStockValidator';

export class TransferStockValidator implements ITransferStockValidator {
  validate(command: TransferStockCommand): Result<void> {
    if (!command.inventoryItemId || !command.inventoryItemId.value.trim()) {
      return ResultFactory.validation('Inventory Item ID is required');
    }
    if (!command.fromLocationId || !command.fromLocationId.value.trim()) {
      return ResultFactory.validation('Source Location ID is required');
    }
    if (!command.toLocationId || !command.toLocationId.value.trim()) {
      return ResultFactory.validation('Destination Location ID is required');
    }
    if (command.fromLocationId.value === command.toLocationId.value) {
      return ResultFactory.validation('Source and Destination locations must be different');
    }
    if (!command.quantity || command.quantity.value <= 0) {
      return ResultFactory.validation('Quantity must be greater than zero');
    }
    return ResultFactory.success();
  }
}
`);

write('validators/impl/ReceiveStockValidator.ts', `
import { Result, ResultFactory } from '../../../../../core';
import { ReceiveStockCommand } from '../../commands/ReceiveStockCommand';
import { IReceiveStockValidator } from '../IReceiveStockValidator';

export class ReceiveStockValidator implements IReceiveStockValidator {
  validate(command: ReceiveStockCommand): Result<void> {
    if (!command.inventoryItemId || !command.inventoryItemId.value.trim()) {
      return ResultFactory.validation('Inventory Item ID is required');
    }
    if (!command.locationId || !command.locationId.value.trim()) {
      return ResultFactory.validation('Location ID is required');
    }
    if (!command.quantity || command.quantity.value <= 0) {
      return ResultFactory.validation('Quantity must be greater than zero');
    }
    return ResultFactory.success();
  }
}
`);

write('validators/impl/IssueStockValidator.ts', `
import { Result, ResultFactory } from '../../../../../core';
import { IssueStockCommand } from '../../commands/IssueStockCommand';
import { IIssueStockValidator } from '../IIssueStockValidator';

export class IssueStockValidator implements IIssueStockValidator {
  validate(command: IssueStockCommand): Result<void> {
    if (!command.inventoryItemId || !command.inventoryItemId.value.trim()) {
      return ResultFactory.validation('Inventory Item ID is required');
    }
    if (!command.locationId || !command.locationId.value.trim()) {
      return ResultFactory.validation('Location ID is required');
    }
    if (!command.quantity || command.quantity.value <= 0) {
      return ResultFactory.validation('Quantity must be greater than zero');
    }
    return ResultFactory.success();
  }
}
`);

write('validators/impl/index.ts', `
export * from './CreateInventoryValidator';
export * from './UpdateInventoryValidator';
export * from './AdjustStockValidator';
export * from './TransferStockValidator';
export * from './ReceiveStockValidator';
export * from './IssueStockValidator';
`);
