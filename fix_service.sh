#!/bin/bash
# Add getItemBySku to IInventoryReadService
sed -i 's/export interface IInventoryReadService {/export interface IInventoryReadService {\n  getItemBySku(sku: string): Promise<Result<InventoryItemDto>>;/g' server/src/modules/inventory/application/services/IInventoryReadService.ts
# Add getItemBySku to IInventoryApplicationService
sed -i 's/export interface IInventoryApplicationService {/export interface IInventoryApplicationService {\n  getItemBySku(sku: string): Promise<Result<InventoryItemDto>>;/g' server/src/modules/inventory/application/services/IInventoryApplicationService.ts

# Add implementation to InventoryReadService
sed -i '/async getItemById/i \  async getItemBySku(sku: string): Promise<Result<InventoryItemDto>> {\n    const { GetInventoryBySkuQuery } = await import("../../queries/GetInventoryBySkuQuery");\n    return this.mediator.query(new GetInventoryBySkuQuery(sku));\n  }\n' server/src/modules/inventory/application/services/impl/InventoryReadService.ts

# Add implementation to InventoryApplicationService
sed -i '/async getItemById/i \  async getItemBySku(sku: string): Promise<Result<InventoryItemDto>> {\n    const { GetInventoryBySkuQuery } = await import("../../queries/GetInventoryBySkuQuery");\n    return this.mediator.query(new GetInventoryBySkuQuery(sku));\n  }\n' server/src/modules/inventory/application/services/impl/InventoryApplicationService.ts

# Add missing import to GetInventoryBySkuQuery ? Wait, I used dynamic import to avoid messing up imports. But I can just add standard imports.
