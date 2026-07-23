const fs = require('fs');
const path = require('path');

const modDir = path.join(__dirname, 'server/src/modules/inventory/application');

function replaceFileContent(subpath, regex, replacement) {
  const file = path.join(modDir, subpath);
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(regex, replacement);
  fs.writeFileSync(file, content);
}

const commands = [
  'CreateInventoryItemCommand',
  'UpdateInventoryItemCommand',
  'DeleteInventoryItemCommand',
  'AdjustStockCommand',
  'TransferStockCommand',
  'ReceiveStockCommand',
  'IssueStockCommand',
  'ActivateInventoryItemCommand',
  'DeactivateInventoryItemCommand'
];

commands.forEach(cmd => {
  replaceFileContent(`commands/${cmd}.ts`, /export class ([a-zA-Z]+) implements ICommand<([a-zA-Z<>]+)> \{/g,
    `export class $1 implements ICommand<$2> {\n  public readonly id: string = crypto.randomUUID();\n  public readonly type: string = '$1';\n  public readonly timestamp: Date = new Date();`);
  
  replaceFileContent(`commands/${cmd}.ts`, /import \{ ICommand \} from '\.\.\/\.\.\/\.\.\/\.\.\/core\/mediator\/commands\/ICommand';/g,
    `import { ICommand } from '../../../../core/mediator/commands/ICommand';\nimport * as crypto from 'crypto';`);
});

const queries = [
  'GetInventoryItemByIdQuery',
  'GetInventoryItemsQuery',
  'SearchInventoryItemsQuery',
  'GetStockLevelsQuery',
  'GetInventoryBySkuQuery'
];

queries.forEach(qry => {
  replaceFileContent(`queries/${qry}.ts`, /export class ([a-zA-Z]+) implements IQuery<([a-zA-Z<>\[\]]+)> \{/g,
    `export class $1 implements IQuery<$2> {\n  public readonly type: string = '$1';`);
});

