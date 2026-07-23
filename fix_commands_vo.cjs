const fs = require('fs');
const path = require('path');

const modDir = path.join(__dirname, 'server/src/modules/inventory/application');

function replaceFileContent(subpath, regex, replacement) {
  const file = path.join(modDir, subpath);
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(regex, replacement);
  fs.writeFileSync(file, content);
}

replaceFileContent('commands/CreateInventoryItemCommand.ts', /public readonly sku: string/, "public readonly sku: SKU");
replaceFileContent('commands/CreateInventoryItemCommand.ts', /import \{ ItemCategory \}/, "import { SKU } from '../../domain/value-objects/SKU';\nimport { ItemCategory }");

replaceFileContent('commands/UpdateInventoryItemCommand.ts', /public readonly targetId: string/, "public readonly targetId: InventoryItemId");
replaceFileContent('commands/UpdateInventoryItemCommand.ts', /import \{ Result \}/, "import { Result } from '../../../../core';\nimport { InventoryItemId } from '../../domain/shared/InventoryItemId';");
replaceFileContent('commands/UpdateInventoryItemCommand.ts', /import \{ Result \} from '\.\.\/\.\.\/\.\.\/\.\.\/core';\nimport \{ Result \} from '\.\.\/\.\.\/\.\.\/\.\.\/core';/, "import { Result } from '../../../../core';"); // dedup if needed

replaceFileContent('commands/DeleteInventoryItemCommand.ts', /public readonly targetId: string/, "public readonly targetId: InventoryItemId");
replaceFileContent('commands/DeleteInventoryItemCommand.ts', /import \{ Result \}/, "import { Result } from '../../../../core';\nimport { InventoryItemId } from '../../domain/shared/InventoryItemId';");

replaceFileContent('commands/AdjustStockCommand.ts', /public readonly inventoryItemId: string,\n\s*public readonly locationId: string,\n\s*public readonly newQuantity: number/, "public readonly inventoryItemId: InventoryItemId,\n    public readonly locationId: StockLocationId,\n    public readonly newQuantity: Quantity");
replaceFileContent('commands/AdjustStockCommand.ts', /import \{ Result \}/, "import { Result } from '../../../../core';\nimport { InventoryItemId } from '../../domain/shared/InventoryItemId';\nimport { StockLocationId } from '../../domain/shared/StockLocationId';\nimport { Quantity } from '../../domain/value-objects/Quantity';");

replaceFileContent('commands/TransferStockCommand.ts', /public readonly inventoryItemId: string,\n\s*public readonly fromLocationId: string,\n\s*public readonly toLocationId: string,\n\s*public readonly quantity: number/, "public readonly inventoryItemId: InventoryItemId,\n    public readonly fromLocationId: StockLocationId,\n    public readonly toLocationId: StockLocationId,\n    public readonly quantity: Quantity");
replaceFileContent('commands/TransferStockCommand.ts', /import \{ Result \}/, "import { Result } from '../../../../core';\nimport { InventoryItemId } from '../../domain/shared/InventoryItemId';\nimport { StockLocationId } from '../../domain/shared/StockLocationId';\nimport { Quantity } from '../../domain/value-objects/Quantity';");

replaceFileContent('commands/ReceiveStockCommand.ts', /public readonly inventoryItemId: string,\n\s*public readonly locationId: string,\n\s*public readonly quantity: number,\n\s*public readonly lotId: string \| undefined/, "public readonly inventoryItemId: InventoryItemId,\n    public readonly locationId: StockLocationId,\n    public readonly quantity: Quantity,\n    public readonly lotId: LotId | undefined");
replaceFileContent('commands/ReceiveStockCommand.ts', /import \{ Result \}/, "import { Result } from '../../../../core';\nimport { InventoryItemId } from '../../domain/shared/InventoryItemId';\nimport { StockLocationId } from '../../domain/shared/StockLocationId';\nimport { LotId } from '../../domain/shared/LotId';\nimport { Quantity } from '../../domain/value-objects/Quantity';");

replaceFileContent('commands/IssueStockCommand.ts', /public readonly inventoryItemId: string,\n\s*public readonly locationId: string,\n\s*public readonly quantity: number/, "public readonly inventoryItemId: InventoryItemId,\n    public readonly locationId: StockLocationId,\n    public readonly quantity: Quantity");
replaceFileContent('commands/IssueStockCommand.ts', /import \{ Result \}/, "import { Result } from '../../../../core';\nimport { InventoryItemId } from '../../domain/shared/InventoryItemId';\nimport { StockLocationId } from '../../domain/shared/StockLocationId';\nimport { Quantity } from '../../domain/value-objects/Quantity';");

replaceFileContent('commands/ActivateInventoryItemCommand.ts', /public readonly targetId: string/, "public readonly targetId: InventoryItemId");
replaceFileContent('commands/ActivateInventoryItemCommand.ts', /import \{ Result \}/, "import { Result } from '../../../../core';\nimport { InventoryItemId } from '../../domain/shared/InventoryItemId';");

replaceFileContent('commands/DeactivateInventoryItemCommand.ts', /public readonly targetId: string/, "public readonly targetId: InventoryItemId");
replaceFileContent('commands/DeactivateInventoryItemCommand.ts', /import \{ Result \}/, "import { Result } from '../../../../core';\nimport { InventoryItemId } from '../../domain/shared/InventoryItemId';");

// Queries: 
replaceFileContent('queries/GetInventoryItemByIdQuery.ts', /public readonly id: string/, "public readonly id: InventoryItemId");
replaceFileContent('queries/GetInventoryItemByIdQuery.ts', /import \{ Result \}/, "import { Result } from '../../../../core';\nimport { InventoryItemId } from '../../domain/shared/InventoryItemId';");

replaceFileContent('queries/GetStockLevelsQuery.ts', /public readonly inventoryItemId: string/, "public readonly inventoryItemId: InventoryItemId");
replaceFileContent('queries/GetStockLevelsQuery.ts', /import \{ Result \}/, "import { Result } from '../../../../core';\nimport { InventoryItemId } from '../../domain/shared/InventoryItemId';");

replaceFileContent('queries/GetInventoryBySkuQuery.ts', /public readonly sku: string/, "public readonly sku: SKU");
replaceFileContent('queries/GetInventoryBySkuQuery.ts', /import \{ Result \}/, "import { Result } from '../../../../core';\nimport { SKU } from '../../domain/value-objects/SKU';");

