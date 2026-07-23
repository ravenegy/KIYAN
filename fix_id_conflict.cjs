const fs = require('fs');
const path = require('path');

const modDir = path.join(__dirname, 'server/src/modules/inventory/application');

function replaceFileContent(subpath, regex, replacement) {
  const file = path.join(modDir, subpath);
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(regex, replacement);
  fs.writeFileSync(file, content);
}

const cmdsWithId = [
  'UpdateInventoryItemCommand',
  'DeleteInventoryItemCommand',
  'ActivateInventoryItemCommand',
  'DeactivateInventoryItemCommand'
];

cmdsWithId.forEach(cmd => {
  replaceFileContent(`commands/${cmd}.ts`, /public readonly id: string(?! =)/g, 'public readonly targetId: string');
});

replaceFileContent(`interfaces/IInventoryApplicationService.ts`, /getItemById\(id: string\)/g, 'getItemById(targetId: string)');
replaceFileContent(`interfaces/IInventoryReadService.ts`, /getItemById\(id: string\)/g, 'getItemById(targetId: string)');

