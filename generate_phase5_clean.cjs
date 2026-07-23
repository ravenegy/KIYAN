const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, 'server/src/modules/inventory/infrastructure');

function ensureDir(subpath) {
  fs.mkdirSync(path.join(baseDir, subpath), { recursive: true });
}

function write(subpath, content) {
  fs.writeFileSync(path.join(baseDir, subpath), content.trim() + '\n');
}

ensureDir('configuration');
ensureDir('persistence/models');
ensureDir('persistence/mappers');
ensureDir('repositories');
ensureDir('services');
ensureDir('factories');
ensureDir('bootstrap');

// configuration
write('configuration/InventoryInfrastructureOptions.ts', `
export interface InventoryInfrastructureOptions {
  readonly enableStockTracing?: boolean;
  readonly defaultLocationId?: string;
  readonly persistenceType?: 'in-memory' | 'database';
}
`);

write('configuration/InventoryModuleConfiguration.ts', `
import { InventoryInfrastructureOptions } from './InventoryInfrastructureOptions';

export interface InventoryModuleConfiguration {
  readonly infrastructure: InventoryInfrastructureOptions;
}
`);

write('configuration/index.ts', `
export * from './InventoryInfrastructureOptions';
export * from './InventoryModuleConfiguration';
`);

// persistence/models
write('persistence/models/StockMovementPersistenceModel.ts', `
export interface StockMovementPersistenceModel {
  readonly id: string;
  readonly itemId: string;
  readonly locationId: string;
  readonly lotId: string | null;
  readonly quantity: number;
  readonly type: string;
  readonly reason: string;
  readonly referenceId: string | null;
  readonly createdAt: Date;
}
`);

write('persistence/models/StockLevelPersistenceModel.ts', `
export interface StockLevelPersistenceModel {
  readonly id: string;
  readonly locationId: string;
  readonly quantity: number;
  readonly lotId: string | null;
}
`);

write('persistence/models/InventoryItemPersistenceModel.ts', `
import { StockLevelPersistenceModel } from './StockLevelPersistenceModel';

export interface InventoryItemPersistenceModel {
  readonly id: string;
  readonly sku: string;
  readonly category: string;
  readonly name: string;
  readonly isActive: boolean;
  readonly createdAt: Date;
  readonly updatedAt?: Date;
  readonly version: number;
  readonly stockLevels: ReadonlyArray<StockLevelPersistenceModel>;
}
`);

write('persistence/models/index.ts', `
export * from './StockMovementPersistenceModel';
export * from './StockLevelPersistenceModel';
export * from './InventoryItemPersistenceModel';
`);

// persistence/mappers
write('persistence/mappers/StockMovementPersistenceMapper.ts', `
import { StockMovement } from '../../../domain/entities/StockMovement';
import { StockMovementPersistenceModel } from '../models/StockMovementPersistenceModel';
import { StockMovementId } from '../../../domain/shared/StockMovementId';
import { InventoryItemId } from '../../../domain/shared/InventoryItemId';
import { StockLocationId } from '../../../domain/shared/StockLocationId';
import { LotId } from '../../../domain/shared/LotId';
import { Quantity } from '../../../domain/value-objects/Quantity';
import { MovementType } from '../../../domain/enums/MovementType';

export class StockMovementPersistenceMapper {
  public toPersistence(entity: StockMovement): StockMovementPersistenceModel {
    return {
      id: entity.id.value,
      itemId: entity.itemId.value,
      locationId: entity.locationId.value,
      lotId: entity.lotId ? entity.lotId.value : null,
      quantity: entity.quantity.value,
      type: entity.type,
      reason: entity.reason,
      referenceId: entity.referenceId || null,
      createdAt: entity.createdAt
    };
  }

  public toDomain(model: StockMovementPersistenceModel): StockMovement {
    const id = StockMovementId.create(model.id).value!;
    const itemId = InventoryItemId.create(model.itemId).value!;
    const locationId = StockLocationId.create(model.locationId).value!;
    const lotId = model.lotId ? LotId.create(model.lotId).value : undefined;
    const quantity = Quantity.create(model.quantity).value!;
    const type = model.type as MovementType;

    return new StockMovement(
      id,
      itemId,
      locationId,
      quantity,
      type,
      model.reason,
      model.referenceId || undefined,
      lotId,
      model.createdAt
    );
  }
}
`);

write('persistence/mappers/StockLevelPersistenceMapper.ts', `
import { StockLevelPersistenceModel } from '../models/StockLevelPersistenceModel';
import { StockLevelId } from '../../../domain/shared/StockLevelId';
import { StockLocationId } from '../../../domain/shared/StockLocationId';
import { LotId } from '../../../domain/shared/LotId';
import { Quantity } from '../../../domain/value-objects/Quantity';

export class StockLevelPersistenceMapper {
  // StockLevel is not exported as an entity in domain index, it's internal to InventoryItem, 
  // but it's part of the persistence model array. We will map it directly in InventoryPersistenceMapper
  // or use this as a helper.
}
`);

write('persistence/mappers/InventoryPersistenceMapper.ts', `
import { InventoryItem } from '../../../domain/entities/InventoryItem';
import { InventoryItemPersistenceModel } from '../models/InventoryItemPersistenceModel';
import { StockLevelPersistenceModel } from '../models/StockLevelPersistenceModel';
import { InventoryItemId } from '../../../domain/shared/InventoryItemId';
import { SKU } from '../../../domain/value-objects/SKU';
import { ItemCategory } from '../../../domain/enums/ItemCategory';
import { StockLocationId } from '../../../domain/shared/StockLocationId';
import { LotId } from '../../../domain/shared/LotId';
import { Quantity } from '../../../domain/value-objects/Quantity';

export class InventoryPersistenceMapper {
  public toPersistence(entity: InventoryItem): InventoryItemPersistenceModel {
    return {
      id: entity.id.value,
      sku: entity.sku.value,
      category: entity.category,
      name: entity.name,
      isActive: entity.isActive,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      version: entity.version,
      stockLevels: entity.stockLevels.map(sl => ({
        id: sl.id.value,
        locationId: sl.locationId.value,
        quantity: sl.quantity.value,
        lotId: sl.lotId ? sl.lotId.value : null
      }))
    };
  }

  public toDomain(model: InventoryItemPersistenceModel): InventoryItem {
    const id = InventoryItemId.create(model.id).value!;
    const sku = SKU.create(model.sku).value!;
    const category = model.category as ItemCategory;

    const item = new InventoryItem(
      id,
      sku,
      category,
      model.name,
      model.isActive,
      model.createdAt,
      model.version
    );

    // Using adjustStock to reconstruct stock levels in memory since StockLevel is encapsulated
    // For pure persistence reconstruction, we assume these levels were already validated
    // and we bypass some domain logic if we had a proper factory, but here we'll use adjustStock
    for (const sl of model.stockLevels) {
      const locId = StockLocationId.create(sl.locationId).value!;
      const qty = Quantity.create(sl.quantity).value!;
      const lotId = sl.lotId ? LotId.create(sl.lotId).value : undefined;
      // We are reconstructing, so we ignore events that adjustStock produces
      item.adjustStock(locId, qty, 'Reconstruction', undefined, lotId);
    }
    
    // Clear domain events that were generated during reconstruction
    item.clearDomainEvents();
    
    return item;
  }
}
`);

write('persistence/mappers/index.ts', `
export * from './StockMovementPersistenceMapper';
export * from './StockLevelPersistenceMapper';
export * from './InventoryPersistenceMapper';
`);

write('persistence/index.ts', `
export * from './models';
export * from './mappers';
`);

// repositories
write('repositories/InventoryItemRepository.ts', `
import { IInventoryItemRepository } from '../../domain/repositories/IInventoryItemRepository';
import { InventoryItem } from '../../domain/entities/InventoryItem';
import { InventoryItemId } from '../../domain/shared/InventoryItemId';
import { SKU } from '../../domain/value-objects/SKU';
import { PagedResult } from '../../../../core/domain/repositories/PagedResult';
import { RepositoryQuery } from '../../../../core/domain/repositories/RepositoryQuery';
import { RepositoryOptions } from '../../../../core/domain/repositories/RepositoryOptions';
import { InventoryPersistenceMapper } from '../persistence/mappers/InventoryPersistenceMapper';
import { InventoryItemPersistenceModel } from '../persistence/models/InventoryItemPersistenceModel';

export class InventoryItemRepository implements IInventoryItemRepository {
  private readonly store = new Map<string, InventoryItemPersistenceModel>();

  constructor(private readonly mapper: InventoryPersistenceMapper) {}

  public async getById(id: InventoryItemId, options?: RepositoryOptions): Promise<InventoryItem | null> {
    const model = this.store.get(id.value);
    if (!model) return null;
    return this.mapper.toDomain(model);
  }

  public async exists(id: InventoryItemId, options?: RepositoryOptions): Promise<boolean> {
    return this.store.has(id.value);
  }

  public async count(query?: RepositoryQuery<InventoryItem>, options?: RepositoryOptions): Promise<number> {
    // In-memory naive implementation
    return this.store.size;
  }

  public async find(query?: RepositoryQuery<InventoryItem>, options?: RepositoryOptions): Promise<PagedResult<InventoryItem>> {
    const items = Array.from(this.store.values()).map(m => this.mapper.toDomain(m));
    return new PagedResult(items, items.length, 1, items.length);
  }

  public async findOne(query?: RepositoryQuery<InventoryItem>, options?: RepositoryOptions): Promise<InventoryItem | null> {
    const items = Array.from(this.store.values());
    if (items.length === 0) return null;
    return this.mapper.toDomain(items[0]);
  }

  public async add(entity: InventoryItem, options?: RepositoryOptions): Promise<void> {
    const model = this.mapper.toPersistence(entity);
    this.store.set(model.id, model);
  }

  public async update(entity: InventoryItem, options?: RepositoryOptions): Promise<void> {
    const model = this.mapper.toPersistence(entity);
    this.store.set(model.id, model);
  }

  public async delete(entity: InventoryItem, options?: RepositoryOptions): Promise<void> {
    this.store.delete(entity.id.value);
  }

  public async softDelete(entity: InventoryItem, options?: RepositoryOptions): Promise<void> {
    this.store.delete(entity.id.value);
  }

  public async restore(entity: InventoryItem, options?: RepositoryOptions): Promise<void> {
    const model = this.mapper.toPersistence(entity);
    this.store.set(model.id, model);
  }

  public async save(entity: InventoryItem, options?: RepositoryOptions): Promise<void> {
    const model = this.mapper.toPersistence(entity);
    this.store.set(model.id, model);
  }

  public async findBySku(sku: SKU): Promise<InventoryItem | null> {
    const items = Array.from(this.store.values()).filter(m => m.sku === sku.value);
    if (items.length === 0) return null;
    return this.mapper.toDomain(items[0]);
  }
}
`);

write('repositories/index.ts', `
export * from './InventoryItemRepository';
`);

// services
write('services/InventoryInfrastructureService.ts', `
export class InventoryInfrastructureService {
  constructor() {}
  
  public async ping(): Promise<boolean> {
    return true;
  }
}
`);

write('services/index.ts', `
export * from './InventoryInfrastructureService';
`);

// factories
write('factories/InventoryInfrastructureFactory.ts', `
import { InventoryInfrastructureService } from '../services/InventoryInfrastructureService';

export class InventoryInfrastructureFactory {
  public createService(): InventoryInfrastructureService {
    return new InventoryInfrastructureService();
  }
}
`);

write('factories/InventoryRepositoryFactory.ts', `
import { InventoryItemRepository } from '../repositories/InventoryItemRepository';
import { InventoryPersistenceMapper } from '../persistence/mappers/InventoryPersistenceMapper';

export class InventoryRepositoryFactory {
  constructor(private readonly inventoryMapper: InventoryPersistenceMapper) {}

  public createInventoryItemRepository(): InventoryItemRepository {
    return new InventoryItemRepository(this.inventoryMapper);
  }
}
`);

write('factories/index.ts', `
export * from './InventoryInfrastructureFactory';
export * from './InventoryRepositoryFactory';
`);

// bootstrap
write('bootstrap/InventoryInfrastructureBootstrapper.ts', `
import { IContainer, Lifetime, Token } from '../../../../core/di';
import { InventoryModuleConfiguration } from '../configuration/InventoryModuleConfiguration';
import { InventoryPersistenceMapper } from '../persistence/mappers/InventoryPersistenceMapper';
import { InventoryRepositoryFactory } from '../factories/InventoryRepositoryFactory';
import { InventoryInfrastructureFactory } from '../factories/InventoryInfrastructureFactory';
import { InventoryItemRepository } from '../repositories/InventoryItemRepository';
import { InventoryInfrastructureService } from '../services/InventoryInfrastructureService';
import { IInventoryItemRepository } from '../../domain/repositories/IInventoryItemRepository';

export const InventoryInfrastructureTokens = {
  Configuration: new Token<InventoryModuleConfiguration>('InventoryModuleConfiguration'),
  InventoryPersistenceMapper: new Token<InventoryPersistenceMapper>('InventoryPersistenceMapper'),
  InventoryRepositoryFactory: new Token<InventoryRepositoryFactory>('InventoryRepositoryFactory'),
  InventoryInfrastructureFactory: new Token<InventoryInfrastructureFactory>('InventoryInfrastructureFactory'),
  IInventoryItemRepository: new Token<IInventoryItemRepository>('IInventoryItemRepository'),
  InventoryInfrastructureService: new Token<InventoryInfrastructureService>('InventoryInfrastructureService'),
};

export class InventoryInfrastructureBootstrapper {
  public static bootstrap(container: IContainer, config: InventoryModuleConfiguration): void {
    // Config
    container.register(InventoryInfrastructureTokens.Configuration, () => config, Lifetime.Singleton);

    // Mappers
    container.register(InventoryInfrastructureTokens.InventoryPersistenceMapper, () => new InventoryPersistenceMapper(), Lifetime.Singleton);

    // Factories
    container.register(InventoryInfrastructureTokens.InventoryRepositoryFactory, (c) => {
      const mapper = c.resolve(InventoryInfrastructureTokens.InventoryPersistenceMapper);
      return new InventoryRepositoryFactory(mapper);
    }, Lifetime.Singleton);

    container.register(InventoryInfrastructureTokens.InventoryInfrastructureFactory, () => {
      return new InventoryInfrastructureFactory();
    }, Lifetime.Singleton);

    // Repositories
    container.register(InventoryInfrastructureTokens.IInventoryItemRepository, (c) => {
      const factory = c.resolve(InventoryInfrastructureTokens.InventoryRepositoryFactory);
      return factory.createInventoryItemRepository();
    }, Lifetime.Scoped);

    // Services
    container.register(InventoryInfrastructureTokens.InventoryInfrastructureService, (c) => {
      const factory = c.resolve(InventoryInfrastructureTokens.InventoryInfrastructureFactory);
      return factory.createService();
    }, Lifetime.Scoped);
  }
}
`);

write('bootstrap/index.ts', `
export * from './InventoryInfrastructureBootstrapper';
`);

write('index.ts', `
export * from './configuration';
export * from './persistence';
export * from './repositories';
export * from './services';
export * from './factories';
export * from './bootstrap';
`);
