const fs = require('fs');
const path = require('path');

const modDir = path.join(__dirname, 'server/src/modules/inventory/application');

function replaceFileContent(subpath, regex, replacement) {
  const file = path.join(modDir, subpath);
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(regex, replacement);
  fs.writeFileSync(file, content);
}

replaceFileContent('mappers/impl/InventoryItemMapper.ts', /createdAt: entity\.createdAt,\n\s*updatedAt: entity\.updatedAt/, "createdAt: entity.createdAt.toISOString(),\n      updatedAt: entity.updatedAt ? entity.updatedAt.toISOString() : undefined");

replaceFileContent('mappers/impl/StockMapper.ts', /lastUpdated: entity\.updatedAt \|\| entity\.createdAt/, "lastUpdated: (entity.updatedAt || entity.createdAt).toISOString()");

replaceFileContent('mappers/impl/StockMapper.ts', /timestamp: entity\.createdAt/, "timestamp: entity.createdAt.toISOString()");

