const fs = require('fs');
const path = require('path');

const modDir = path.join(__dirname, 'server/src/modules/inventory/application');

function ensureDir(subpath) {
    fs.mkdirSync(path.join(modDir, subpath), { recursive: true });
}

function write(subpath, content) {
    fs.writeFileSync(path.join(modDir, subpath), content.trim() + '\n');
}

ensureDir('handlers/impl');
ensureDir('services/impl');

write('handlers/IActivateInventoryItemCommandHandler.ts', `
import { ICommandHandler } from '../../../../core/mediator/commands/ICommandHandler';
import { ActivateInventoryItemCommand } from '../commands/ActivateInventoryItemCommand';
import { Result } from '../../../../core';

export interface IActivateInventoryItemCommandHandler extends ICommandHandler<ActivateInventoryItemCommand, Result<void>> {}
`);

write('handlers/IDeactivateInventoryItemCommandHandler.ts', `
import { ICommandHandler } from '../../../../core/mediator/commands/ICommandHandler';
import { DeactivateInventoryItemCommand } from '../commands/DeactivateInventoryItemCommand';
import { Result } from '../../../../core';

export interface IDeactivateInventoryItemCommandHandler extends ICommandHandler<DeactivateInventoryItemCommand, Result<void>> {}
`);

write('handlers/IGetInventoryBySkuQueryHandler.ts', `
import { IQueryHandler } from '../../../../core/mediator/queries/IQueryHandler';
import { GetInventoryBySkuQuery } from '../queries/GetInventoryBySkuQuery';
import { Result } from '../../../../core';
import { InventoryItemDto } from '../dto/InventoryItemDto';

export interface IGetInventoryBySkuQueryHandler extends IQueryHandler<GetInventoryBySkuQuery, Result<InventoryItemDto>> {}
`);

let handlersIndex = fs.readFileSync(path.join(modDir, 'handlers/index.ts'), 'utf8');
if (!handlersIndex.includes('IActivateInventoryItemCommandHandler')) {
    handlersIndex += `
export * from './IActivateInventoryItemCommandHandler';
export * from './IDeactivateInventoryItemCommandHandler';
export * from './IGetInventoryBySkuQueryHandler';
export * from './impl';
`;
    write('handlers/index.ts', handlersIndex);
}

const commandHandlers = [
    { name: 'CreateInventoryItemCommandHandler', command: 'CreateInventoryItemCommand', resType: 'string', mock: "ResultFactory.success('mock-id')" },
    { name: 'UpdateInventoryItemCommandHandler', command: 'UpdateInventoryItemCommand', resType: 'void', mock: "ResultFactory.success(undefined)" },
    { name: 'DeleteInventoryItemCommandHandler', command: 'DeleteInventoryItemCommand', resType: 'void', mock: "ResultFactory.success(undefined)" },
    { name: 'ActivateInventoryItemCommandHandler', command: 'ActivateInventoryItemCommand', resType: 'void', mock: "ResultFactory.success(undefined)" },
    { name: 'DeactivateInventoryItemCommandHandler', command: 'DeactivateInventoryItemCommand', resType: 'void', mock: "ResultFactory.success(undefined)" },
    { name: 'AdjustStockCommandHandler', command: 'AdjustStockCommand', resType: 'void', mock: "ResultFactory.success(undefined)" },
    { name: 'TransferStockCommandHandler', command: 'TransferStockCommand', resType: 'void', mock: "ResultFactory.success(undefined)" },
    { name: 'ReceiveStockCommandHandler', command: 'ReceiveStockCommand', resType: 'void', mock: "ResultFactory.success(undefined)" },
    { name: 'IssueStockCommandHandler', command: 'IssueStockCommand', resType: 'void', mock: "ResultFactory.success(undefined)" },
];

let implIndex = '';

for (const ch of commandHandlers) {
    write(`handlers/impl/${ch.name}.ts`, `
import { BaseCommandHandler } from '../../../../../core/application/handlers/BaseCommandHandler';
import { Result, ResultFactory } from '../../../../../core';
import { ${ch.command} } from '../../commands/${ch.command}';
import { I${ch.name} } from '../I${ch.name}';

export class ${ch.name} extends BaseCommandHandler<${ch.command}, ${ch.resType}> implements I${ch.name} {
  constructor() {
    super();
  }

  async handle(command: ${ch.command}): Promise<Result<${ch.resType}>> {
    return ${ch.mock};
  }
}
`);
    implIndex += `export * from './${ch.name}';\n`;
}

const queryHandlers = [
    { name: 'GetInventoryItemByIdQueryHandler', query: 'GetInventoryItemByIdQuery', resType: 'InventoryItemDto', mock: "ResultFactory.success({} as InventoryItemDto)", dto: 'InventoryItemDto' },
    { name: 'GetInventoryItemsQueryHandler', query: 'GetInventoryItemsQuery', resType: 'PagedInventoryDto', mock: "ResultFactory.success({ items: [], totalCount: 0, pageNumber: 1, pageSize: 10 } as PagedInventoryDto)", dto: 'PagedInventoryDto' },
    { name: 'SearchInventoryItemsQueryHandler', query: 'SearchInventoryItemsQuery', resType: 'PagedInventoryDto', mock: "ResultFactory.success({ items: [], totalCount: 0, pageNumber: 1, pageSize: 10 } as PagedInventoryDto)", dto: 'PagedInventoryDto' },
    { name: 'GetInventoryBySkuQueryHandler', query: 'GetInventoryBySkuQuery', resType: 'InventoryItemDto', mock: "ResultFactory.success({} as InventoryItemDto)", dto: 'InventoryItemDto' },
    { name: 'GetStockLevelsQueryHandler', query: 'GetStockLevelsQuery', resType: 'ReadonlyArray<StockLevelDto>', mock: "ResultFactory.success([])", dto: 'StockLevelDto' },
];

for (const qh of queryHandlers) {
    write(`handlers/impl/${qh.name}.ts`, `
import { BaseQueryHandler } from '../../../../../core/application/handlers/BaseQueryHandler';
import { Result, ResultFactory } from '../../../../../core';
import { ${qh.query} } from '../../queries/${qh.query}';
import { I${qh.name} } from '../I${qh.name}';
import { ${qh.dto} } from '../../dto/${qh.dto}';

export class ${qh.name} extends BaseQueryHandler<${qh.query}, ${qh.resType}> implements I${qh.name} {
  constructor() {
    super();
  }

  async handle(query: ${qh.query}): Promise<Result<${qh.resType}>> {
    return ${qh.mock};
  }
}
`);
    implIndex += `export * from './${qh.name}';\n`;
}

write('handlers/impl/index.ts', implIndex);
