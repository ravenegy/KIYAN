const fs = require('fs');
const path = require('path');

const modDir = path.join(__dirname, 'server/src/modules/inventory/application');

function write(subpath, content) {
    fs.writeFileSync(path.join(modDir, subpath), content.trim() + '\n');
}

write('commands/CreateInventoryItemCommand.ts', `
import { ICommand } from '../../../../core/mediator/commands/ICommand';
import * as crypto from 'crypto';
import { Result } from '../../../../core';
import { ItemCategory } from '../../domain/enums/ItemCategory';
import { SKU } from '../../domain/value-objects/SKU';

export class CreateInventoryItemCommand implements ICommand<Result<string>> {
  public readonly id: string = crypto.randomUUID();
  public readonly type: string = 'CreateInventoryItemCommand';
  public readonly timestamp: Date = new Date();
  constructor(
    public readonly sku: SKU,
    public readonly category: ItemCategory,
    public readonly name: string
  ) {}
}
`);

write('commands/UpdateInventoryItemCommand.ts', `
import { ICommand } from '../../../../core/mediator/commands/ICommand';
import * as crypto from 'crypto';
import { Result } from '../../../../core';
import { InventoryItemId } from '../../domain/shared/InventoryItemId';

export class UpdateInventoryItemCommand implements ICommand<Result<void>> {
  public readonly id: string = crypto.randomUUID();
  public readonly type: string = 'UpdateInventoryItemCommand';
  public readonly timestamp: Date = new Date();
  constructor(
    public readonly targetId: InventoryItemId,
    public readonly name: string,
    public readonly isActive: boolean
  ) {}
}
`);

write('commands/DeleteInventoryItemCommand.ts', `
import { ICommand } from '../../../../core/mediator/commands/ICommand';
import * as crypto from 'crypto';
import { Result } from '../../../../core';
import { InventoryItemId } from '../../domain/shared/InventoryItemId';

export class DeleteInventoryItemCommand implements ICommand<Result<void>> {
  public readonly id: string = crypto.randomUUID();
  public readonly type: string = 'DeleteInventoryItemCommand';
  public readonly timestamp: Date = new Date();
  constructor(
    public readonly targetId: InventoryItemId
  ) {}
}
`);

write('commands/AdjustStockCommand.ts', `
import { ICommand } from '../../../../core/mediator/commands/ICommand';
import * as crypto from 'crypto';
import { Result } from '../../../../core';
import { InventoryItemId } from '../../domain/shared/InventoryItemId';
import { StockLocationId } from '../../domain/shared/StockLocationId';
import { Quantity } from '../../domain/value-objects/Quantity';

export class AdjustStockCommand implements ICommand<Result<void>> {
  public readonly id: string = crypto.randomUUID();
  public readonly type: string = 'AdjustStockCommand';
  public readonly timestamp: Date = new Date();
  constructor(
    public readonly inventoryItemId: InventoryItemId,
    public readonly locationId: StockLocationId,
    public readonly newQuantity: Quantity,
    public readonly reason: string
  ) {}
}
`);

write('commands/TransferStockCommand.ts', `
import { ICommand } from '../../../../core/mediator/commands/ICommand';
import * as crypto from 'crypto';
import { Result } from '../../../../core';
import { InventoryItemId } from '../../domain/shared/InventoryItemId';
import { StockLocationId } from '../../domain/shared/StockLocationId';
import { Quantity } from '../../domain/value-objects/Quantity';

export class TransferStockCommand implements ICommand<Result<void>> {
  public readonly id: string = crypto.randomUUID();
  public readonly type: string = 'TransferStockCommand';
  public readonly timestamp: Date = new Date();
  constructor(
    public readonly inventoryItemId: InventoryItemId,
    public readonly fromLocationId: StockLocationId,
    public readonly toLocationId: StockLocationId,
    public readonly quantity: Quantity
  ) {}
}
`);

write('commands/ReceiveStockCommand.ts', `
import { ICommand } from '../../../../core/mediator/commands/ICommand';
import * as crypto from 'crypto';
import { Result } from '../../../../core';
import { InventoryItemId } from '../../domain/shared/InventoryItemId';
import { StockLocationId } from '../../domain/shared/StockLocationId';
import { LotId } from '../../domain/shared/LotId';
import { Quantity } from '../../domain/value-objects/Quantity';

export class ReceiveStockCommand implements ICommand<Result<void>> {
  public readonly id: string = crypto.randomUUID();
  public readonly type: string = 'ReceiveStockCommand';
  public readonly timestamp: Date = new Date();
  constructor(
    public readonly inventoryItemId: InventoryItemId,
    public readonly locationId: StockLocationId,
    public readonly quantity: Quantity,
    public readonly lotId: LotId | undefined
  ) {}
}
`);

write('commands/IssueStockCommand.ts', `
import { ICommand } from '../../../../core/mediator/commands/ICommand';
import * as crypto from 'crypto';
import { Result } from '../../../../core';
import { InventoryItemId } from '../../domain/shared/InventoryItemId';
import { StockLocationId } from '../../domain/shared/StockLocationId';
import { Quantity } from '../../domain/value-objects/Quantity';

export class IssueStockCommand implements ICommand<Result<void>> {
  public readonly id: string = crypto.randomUUID();
  public readonly type: string = 'IssueStockCommand';
  public readonly timestamp: Date = new Date();
  constructor(
    public readonly inventoryItemId: InventoryItemId,
    public readonly locationId: StockLocationId,
    public readonly quantity: Quantity
  ) {}
}
`);

write('commands/ActivateInventoryItemCommand.ts', `
import { ICommand } from '../../../../core/mediator/commands/ICommand';
import * as crypto from 'crypto';
import { Result } from '../../../../core';
import { InventoryItemId } from '../../domain/shared/InventoryItemId';

export class ActivateInventoryItemCommand implements ICommand<Result<void>> {
  public readonly id: string = crypto.randomUUID();
  public readonly type: string = 'ActivateInventoryItemCommand';
  public readonly timestamp: Date = new Date();
  constructor(
    public readonly targetId: InventoryItemId
  ) {}
}
`);

write('commands/DeactivateInventoryItemCommand.ts', `
import { ICommand } from '../../../../core/mediator/commands/ICommand';
import * as crypto from 'crypto';
import { Result } from '../../../../core';
import { InventoryItemId } from '../../domain/shared/InventoryItemId';

export class DeactivateInventoryItemCommand implements ICommand<Result<void>> {
  public readonly id: string = crypto.randomUUID();
  public readonly type: string = 'DeactivateInventoryItemCommand';
  public readonly timestamp: Date = new Date();
  constructor(
    public readonly targetId: InventoryItemId
  ) {}
}
`);

// Queries
write('queries/GetInventoryItemByIdQuery.ts', `
import { IQuery } from '../../../../core/mediator/queries/IQuery';
import { Result } from '../../../../core';
import { InventoryItemDto } from '../dto/InventoryItemDto';
import { InventoryItemId } from '../../domain/shared/InventoryItemId';

export class GetInventoryItemByIdQuery implements IQuery<Result<InventoryItemDto>> {
  public readonly type: string = 'GetInventoryItemByIdQuery';
  constructor(
    public readonly id: InventoryItemId
  ) {}
}
`);

write('queries/GetStockLevelsQuery.ts', `
import { IQuery } from '../../../../core/mediator/queries/IQuery';
import { Result } from '../../../../core';
import { StockLevelDto } from '../dto/StockLevelDto';
import { InventoryItemId } from '../../domain/shared/InventoryItemId';

export class GetStockLevelsQuery implements IQuery<Result<ReadonlyArray<StockLevelDto>>> {
  public readonly type: string = 'GetStockLevelsQuery';
  constructor(
    public readonly inventoryItemId: InventoryItemId
  ) {}
}
`);

write('queries/GetInventoryBySkuQuery.ts', `
import { IQuery } from '../../../../core/mediator/queries/IQuery';
import { Result } from '../../../../core';
import { InventoryItemDto } from '../dto/InventoryItemDto';
import { SKU } from '../../domain/value-objects/SKU';

export class GetInventoryBySkuQuery implements IQuery<Result<InventoryItemDto>> {
  public readonly type: string = 'GetInventoryBySkuQuery';
  constructor(
    public readonly sku: SKU
  ) {}
}
`);

