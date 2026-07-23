const fs = require('fs');
const path = require('path');

const modDir = path.join(__dirname, 'server/src/modules/inventory/application');

function write(subpath, content) {
    fs.writeFileSync(path.join(modDir, subpath), content.trim() + '\n');
}

write('services/impl/InventoryApplicationService.ts', `
import { IInventoryApplicationService } from '../IInventoryApplicationService';
import { Result, ResultFactory } from '../../../../../core';
import { InventoryItemDto } from '../../dto/InventoryItemDto';
import { PagedInventoryDto } from '../../dto/PagedInventoryDto';
import { CreateInventoryItemCommand } from '../../commands/CreateInventoryItemCommand';
import { UpdateInventoryItemCommand } from '../../commands/UpdateInventoryItemCommand';
import { DeleteInventoryItemCommand } from '../../commands/DeleteInventoryItemCommand';
import { GetInventoryItemByIdQuery } from '../../queries/GetInventoryItemByIdQuery';
import { GetInventoryItemsQuery } from '../../queries/GetInventoryItemsQuery';
import { IMediator } from '../../../../../core/mediator/IMediator';
import { InventoryItemId } from '../../../domain/shared/InventoryItemId';

export class InventoryApplicationService implements IInventoryApplicationService {
  constructor(private readonly mediator: IMediator) {}

  async createItem(command: CreateInventoryItemCommand): Promise<Result<string>> {
    return this.mediator.send(command);
  }

  async updateItem(command: UpdateInventoryItemCommand): Promise<Result<void>> {
    return this.mediator.send(command);
  }

  async deleteItem(command: DeleteInventoryItemCommand): Promise<Result<void>> {
    return this.mediator.send(command);
  }

  async getItemById(targetId: string): Promise<Result<InventoryItemDto>> {
    const idResult = InventoryItemId.create(targetId);
    if (idResult.isFailure) return ResultFactory.failure(idResult.error!, idResult.errors ? [...idResult.errors] : undefined);
    return this.mediator.query(new GetInventoryItemByIdQuery(idResult.value!));
  }

  async getItems(pageNumber: number, pageSize: number): Promise<Result<PagedInventoryDto>> {
    return this.mediator.query(new GetInventoryItemsQuery(pageNumber, pageSize));
  }
}
`);

write('services/impl/InventoryReadService.ts', `
import { IInventoryReadService } from '../IInventoryReadService';
import { Result, ResultFactory } from '../../../../../core';
import { InventoryItemDto } from '../../dto/InventoryItemDto';
import { PagedInventoryDto } from '../../dto/PagedInventoryDto';
import { GetInventoryItemByIdQuery } from '../../queries/GetInventoryItemByIdQuery';
import { GetInventoryItemsQuery } from '../../queries/GetInventoryItemsQuery';
import { SearchInventoryItemsQuery } from '../../queries/SearchInventoryItemsQuery';
import { IMediator } from '../../../../../core/mediator/IMediator';
import { InventoryItemId } from '../../../domain/shared/InventoryItemId';

export class InventoryReadService implements IInventoryReadService {
  constructor(private readonly mediator: IMediator) {}

  async getItemById(targetId: string): Promise<Result<InventoryItemDto>> {
    const idResult = InventoryItemId.create(targetId);
    if (idResult.isFailure) return ResultFactory.failure(idResult.error!, idResult.errors ? [...idResult.errors] : undefined);
    return this.mediator.query(new GetInventoryItemByIdQuery(idResult.value!));
  }

  async getItems(pageNumber: number, pageSize: number): Promise<Result<PagedInventoryDto>> {
    return this.mediator.query(new GetInventoryItemsQuery(pageNumber, pageSize));
  }

  async searchItems(searchTerm: string, category: string | undefined, pageNumber: number, pageSize: number): Promise<Result<PagedInventoryDto>> {
    return this.mediator.query(new SearchInventoryItemsQuery(searchTerm, category, pageNumber, pageSize));
  }
}
`);

write('services/impl/InventoryWriteService.ts', `
import { IInventoryWriteService } from '../IInventoryWriteService';
import { Result } from '../../../../../core';
import { CreateInventoryItemCommand } from '../../commands/CreateInventoryItemCommand';
import { UpdateInventoryItemCommand } from '../../commands/UpdateInventoryItemCommand';
import { DeleteInventoryItemCommand } from '../../commands/DeleteInventoryItemCommand';
import { IMediator } from '../../../../../core/mediator/IMediator';

export class InventoryWriteService implements IInventoryWriteService {
  constructor(private readonly mediator: IMediator) {}

  async createItem(command: CreateInventoryItemCommand): Promise<Result<string>> {
    return this.mediator.send(command);
  }

  async updateItem(command: UpdateInventoryItemCommand): Promise<Result<void>> {
    return this.mediator.send(command);
  }

  async deleteItem(command: DeleteInventoryItemCommand): Promise<Result<void>> {
    return this.mediator.send(command);
  }
}
`);

write('services/impl/StockApplicationService.ts', `
import { IStockApplicationService } from '../IStockApplicationService';
import { Result } from '../../../../../core';
import { AdjustStockCommand } from '../../commands/AdjustStockCommand';
import { TransferStockCommand } from '../../commands/TransferStockCommand';
import { ReceiveStockCommand } from '../../commands/ReceiveStockCommand';
import { IssueStockCommand } from '../../commands/IssueStockCommand';
import { IMediator } from '../../../../../core/mediator/IMediator';

export class StockApplicationService implements IStockApplicationService {
  constructor(private readonly mediator: IMediator) {}

  async adjustStock(command: AdjustStockCommand): Promise<Result<void>> {
    return this.mediator.send(command);
  }

  async transferStock(command: TransferStockCommand): Promise<Result<void>> {
    return this.mediator.send(command);
  }

  async receiveStock(command: ReceiveStockCommand): Promise<Result<void>> {
    return this.mediator.send(command);
  }

  async issueStock(command: IssueStockCommand): Promise<Result<void>> {
    return this.mediator.send(command);
  }
}
`);

write('services/impl/StockReadService.ts', `
import { IStockReadService } from '../IStockReadService';
import { Result, ResultFactory } from '../../../../../core';
import { StockLevelDto } from '../../dto/StockLevelDto';
import { GetStockLevelsQuery } from '../../queries/GetStockLevelsQuery';
import { IMediator } from '../../../../../core/mediator/IMediator';
import { InventoryItemId } from '../../../domain/shared/InventoryItemId';

export class StockReadService implements IStockReadService {
  constructor(private readonly mediator: IMediator) {}

  async getStockLevels(inventoryItemId: string): Promise<Result<ReadonlyArray<StockLevelDto>>> {
    const idResult = InventoryItemId.create(inventoryItemId);
    if (idResult.isFailure) return ResultFactory.failure(idResult.error!, idResult.errors ? [...idResult.errors] : undefined);
    return this.mediator.query(new GetStockLevelsQuery(idResult.value!));
  }
}
`);

write('services/impl/StockWriteService.ts', `
import { IStockWriteService } from '../IStockWriteService';
import { Result } from '../../../../../core';
import { AdjustStockCommand } from '../../commands/AdjustStockCommand';
import { TransferStockCommand } from '../../commands/TransferStockCommand';
import { ReceiveStockCommand } from '../../commands/ReceiveStockCommand';
import { IssueStockCommand } from '../../commands/IssueStockCommand';
import { IMediator } from '../../../../../core/mediator/IMediator';

export class StockWriteService implements IStockWriteService {
  constructor(private readonly mediator: IMediator) {}

  async adjustStock(command: AdjustStockCommand): Promise<Result<void>> {
    return this.mediator.send(command);
  }

  async transferStock(command: TransferStockCommand): Promise<Result<void>> {
    return this.mediator.send(command);
  }

  async receiveStock(command: ReceiveStockCommand): Promise<Result<void>> {
    return this.mediator.send(command);
  }

  async issueStock(command: IssueStockCommand): Promise<Result<void>> {
    return this.mediator.send(command);
  }
}
`);

write('services/impl/index.ts', `
export * from './InventoryApplicationService';
export * from './InventoryReadService';
export * from './InventoryWriteService';
export * from './StockApplicationService';
export * from './StockReadService';
export * from './StockWriteService';
`);

let servicesIndex = fs.readFileSync(path.join(modDir, 'services/index.ts'), 'utf8');
if (!servicesIndex.includes('impl')) {
    servicesIndex += `export * from './impl';\n`;
    write('services/index.ts', servicesIndex);
}

