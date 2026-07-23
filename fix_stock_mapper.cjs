const fs = require('fs');
const path = require('path');

const modDir = path.join(__dirname, 'server/src/modules/inventory/application');

function replaceFileContent(subpath, regex, replacement) {
  const file = path.join(modDir, subpath);
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(regex, replacement);
  fs.writeFileSync(file, content);
}

replaceFileContent('mappers/impl/StockMapper.ts', /toStockLevelDto\(entity: StockLevel\): StockLevelDto \{\n\s*return \{\n\s*id: entity\.id\.value,\n\s*inventoryItemId: entity\.inventoryItemId\.value,\n\s*locationId: entity\.locationId\.value,\n\s*quantity: entity\.quantity\.value,\n\s*lastUpdated: \(entity\.updatedAt \|\| entity\.createdAt\)\.toISOString\(\)\n\s*\};\n\s*\}/, `toStockLevelDto(entity: StockLevel): StockLevelDto {
    return {
      locationId: entity.locationId.value,
      quantity: entity.quantity.value,
      lotId: entity.lotId?.value
    };
  }`);

replaceFileContent('mappers/impl/StockMapper.ts', /toStockMovementDto\(entity: StockMovement\): StockMovementDto \{\n\s*return \{\n\s*id: entity\.id\.value,\n\s*inventoryItemId: entity\.inventoryItemId\.value,\n\s*type: entity\.type\.toString\(\),\n\s*quantity: entity\.quantity\.value,\n\s*locationId: entity\.locationId\.value,\n\s*reason: entity\.reason,\n\s*lotId: entity\.lotId\?\.value,\n\s*referenceId: entity\.referenceId,\n\s*timestamp: entity\.createdAt\.toISOString\(\)\n\s*\};\n\s*\}/, `toStockMovementDto(entity: StockMovement): StockMovementDto {
    return {
      id: entity.id.value,
      inventoryItemId: entity.inventoryItemId.value,
      type: entity.type.toString(),
      quantity: entity.quantity.value,
      locationId: entity.locationId.value,
      timestamp: entity.createdAt.toISOString()
    };
  }`);

