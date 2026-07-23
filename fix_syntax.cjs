const fs = require('fs');
const path = require('path');

const modDir = path.join(__dirname, 'server/src/modules/inventory/application');

function replaceFileContent(subpath, regex, replacement) {
  const file = path.join(modDir, subpath);
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(regex, replacement);
  fs.writeFileSync(file, content);
}

const filesWithResultBug = [
  'commands/UpdateInventoryItemCommand.ts',
  'commands/DeleteInventoryItemCommand.ts',
  'commands/AdjustStockCommand.ts',
  'commands/TransferStockCommand.ts',
  'commands/ReceiveStockCommand.ts',
  'commands/IssueStockCommand.ts',
  'commands/ActivateInventoryItemCommand.ts',
  'commands/DeactivateInventoryItemCommand',
  'queries/GetInventoryItemByIdQuery.ts',
  'queries/GetStockLevelsQuery.ts',
  'queries/GetInventoryBySkuQuery.ts'
];

filesWithResultBug.forEach(sub => {
  if (fs.existsSync(path.join(modDir, sub))) {
    replaceFileContent(sub, /import \{ Result \} from '\.\.\/\.\.\/\.\.\/\.\.\/core';\n.* from '\.\.\/\.\.\/\.\.\/\.\.\/core';/, ""); // clean up if needed
    // let's just do a clean rewrite for imports.
  }
});
