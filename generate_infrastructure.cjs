const fs = require('fs');
const path = require('path');

const basePath = 'server/src/modules/production/infrastructure';

const files = {
  'persistence/models/ProductionOrderPersistenceModel.ts': `export interface ProductionOrderPersistenceModel {
  id: string;
  targetItemId: string;
  plannedQuantity: number;
  actualQuantity: number;
  startDate: Date;
  endDate: Date;
  actualStartDate?: Date;
  actualEndDate?: Date;
  status: string;
  priority: string;
  createdAt: Date;
  updatedAt: Date;
  version: number;
  operations: ProductionOperationPersistenceModel[];
  materialIssues: ProductionMaterialIssuePersistenceModel[];
  receipts: FinishedGoodReceiptPersistenceModel[];
}`,
  'persistence/models/ProductionOperationPersistenceModel.ts': `export interface ProductionOperationPersistenceModel {
  id: string;
  productionOrderId: string;
  sequence: number;
  name: string;
  workCenterId: string;
  setupTimeMinutes: number;
  runTimeMinutes: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  version: number;
}`,
  'persistence/models/ProductionMaterialIssuePersistenceModel.ts': `export interface ProductionMaterialIssuePersistenceModel {
  id: string;
  productionOrderId: string;
  itemId: string;
  requiredQuantity: number;
  issuedQuantity: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  version: number;
}`,
  'persistence/models/FinishedGoodReceiptPersistenceModel.ts': `export interface FinishedGoodReceiptPersistenceModel {
  id: string;
  productionOrderId: string;
  itemId: string;
  quantity: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  version: number;
}`,
  'persistence/models/index.ts': `export * from './ProductionOrderPersistenceModel';
export * from './ProductionOperationPersistenceModel';
export * from './ProductionMaterialIssuePersistenceModel';
export * from './FinishedGoodReceiptPersistenceModel';`,
  'persistence/mappers/ProductionPersistenceMapper.ts': `import { ProductionOrder } from '../../../domain/entities/ProductionOrder';
import { ProductionOrderId } from '../../../domain/shared/ProductionOrderId';
import { Quantity } from '../../../domain/value-objects/Quantity';
import { ProductionOrderStatus } from '../../../domain/enums/ProductionOrderStatus';
import { ProductionPriority } from '../../../domain/enums/ProductionPriority';
import { ProductionOrderPersistenceModel } from '../models/ProductionOrderPersistenceModel';
import { ProductionOperationPersistenceMapper } from './ProductionOperationPersistenceMapper';
import { ProductionMaterialIssuePersistenceMapper } from './ProductionMaterialIssuePersistenceMapper';
import { FinishedGoodReceiptPersistenceMapper } from './FinishedGoodReceiptPersistenceMapper';

export class ProductionPersistenceMapper {
  constructor(
    private readonly operationMapper: ProductionOperationPersistenceMapper,
    private readonly materialIssueMapper: ProductionMaterialIssuePersistenceMapper,
    private readonly receiptMapper: FinishedGoodReceiptPersistenceMapper
  ) {}

  public toDomain(model: ProductionOrderPersistenceModel): ProductionOrder {
    const orderId = ProductionOrderId.create(model.id).value!;
    
    // Use reflection/prototype bypass to recreate the aggregate root
    const order = Object.create(ProductionOrder.prototype) as ProductionOrder;
    
    // Using load pattern as defined in domain
    order.load(
      model.targetItemId,
      Quantity.create(model.plannedQuantity).value!,
      Quantity.create(model.actualQuantity).value!,
      model.startDate,
      model.endDate,
      model.status as ProductionOrderStatus,
      model.priority as ProductionPriority,
      model.operations.map(o => this.operationMapper.toDomain(o)),
      model.materialIssues.map(m => this.materialIssueMapper.toDomain(m)),
      model.receipts.map(r => this.receiptMapper.toDomain(r)),
      model.actualStartDate,
      model.actualEndDate
    );
    
    // Set base entity properties directly
    Object.defineProperty(order, 'id', { value: orderId, writable: false });
    Object.defineProperty(order, 'createdAt', { value: model.createdAt, writable: false });
    Object.defineProperty(order, 'updatedAt', { value: model.updatedAt, writable: true });
    Object.defineProperty(order, 'version', { value: model.version, writable: true });
    
    order.clearDomainEvents();
    
    return order;
  }

  public toPersistence(entity: ProductionOrder): ProductionOrderPersistenceModel {
    return {
      id: entity.id.value,
      targetItemId: entity.targetItemId,
      plannedQuantity: entity.plannedQuantity.amount,
      actualQuantity: entity.actualQuantity.amount,
      startDate: entity.startDate,
      endDate: entity.endDate,
      actualStartDate: entity.actualStartDate,
      actualEndDate: entity.actualEndDate,
      status: entity.status,
      priority: entity.priority,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      version: entity.version,
      operations: entity.operations.map(o => this.operationMapper.toPersistence(o, entity.id.value)),
      materialIssues: entity.materialIssues.map(m => this.materialIssueMapper.toPersistence(m, entity.id.value)),
      receipts: entity.receipts.map(r => this.receiptMapper.toPersistence(r, entity.id.value))
    };
  }
}`,
  'persistence/mappers/ProductionOperationPersistenceMapper.ts': `import { ProductionOperation } from '../../../domain/entities/ProductionOperation';
import { OperationId } from '../../../domain/shared/OperationId';
import { WorkCenterId } from '../../../domain/shared/WorkCenterId';
import { ProductionDuration } from '../../../domain/value-objects/ProductionDuration';
import { OperationStatus } from '../../../domain/enums/OperationStatus';
import { ProductionOperationPersistenceModel } from '../models/ProductionOperationPersistenceModel';

export class ProductionOperationPersistenceMapper {
  public toDomain(model: ProductionOperationPersistenceModel): ProductionOperation {
    const operation = Object.create(ProductionOperation.prototype) as ProductionOperation;
    
    operation.load(
      model.sequence,
      model.name,
      WorkCenterId.create(model.workCenterId).value!,
      ProductionDuration.create(model.setupTimeMinutes).value!,
      ProductionDuration.create(model.runTimeMinutes).value!,
      model.status as OperationStatus
    );
    
    Object.defineProperty(operation, 'id', { value: OperationId.create(model.id).value!, writable: false });
    Object.defineProperty(operation, 'createdAt', { value: model.createdAt, writable: false });
    Object.defineProperty(operation, 'updatedAt', { value: model.updatedAt, writable: true });
    Object.defineProperty(operation, 'version', { value: model.version, writable: true });
    
    operation.clearDomainEvents();
    return operation;
  }

  public toPersistence(entity: ProductionOperation, productionOrderId: string): ProductionOperationPersistenceModel {
    return {
      id: entity.id.value,
      productionOrderId,
      sequence: entity.sequence,
      name: entity.name,
      workCenterId: entity.workCenterId.value,
      setupTimeMinutes: entity.setupTime.minutes,
      runTimeMinutes: entity.runTime.minutes,
      status: entity.status,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      version: entity.version
    };
  }
}`,
  'persistence/mappers/ProductionMaterialIssuePersistenceMapper.ts': `import { ProductionMaterialIssue } from '../../../domain/entities/ProductionMaterialIssue';
import { MaterialIssueId } from '../../../domain/shared/MaterialIssueId';
import { Quantity } from '../../../domain/value-objects/Quantity';
import { MaterialIssueStatus } from '../../../domain/enums/MaterialIssueStatus';
import { ProductionMaterialIssuePersistenceModel } from '../models/ProductionMaterialIssuePersistenceModel';

export class ProductionMaterialIssuePersistenceMapper {
  public toDomain(model: ProductionMaterialIssuePersistenceModel): ProductionMaterialIssue {
    const issue = Object.create(ProductionMaterialIssue.prototype) as ProductionMaterialIssue;
    
    issue.load(
      model.itemId,
      Quantity.create(model.requiredQuantity).value!,
      Quantity.create(model.issuedQuantity).value!,
      model.status as MaterialIssueStatus
    );
    
    Object.defineProperty(issue, 'id', { value: MaterialIssueId.create(model.id).value!, writable: false });
    Object.defineProperty(issue, 'createdAt', { value: model.createdAt, writable: false });
    Object.defineProperty(issue, 'updatedAt', { value: model.updatedAt, writable: true });
    Object.defineProperty(issue, 'version', { value: model.version, writable: true });
    
    issue.clearDomainEvents();
    return issue;
  }

  public toPersistence(entity: ProductionMaterialIssue, productionOrderId: string): ProductionMaterialIssuePersistenceModel {
    return {
      id: entity.id.value,
      productionOrderId,
      itemId: entity.itemId,
      requiredQuantity: entity.requiredQuantity.amount,
      issuedQuantity: entity.issuedQuantity.amount,
      status: entity.status,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      version: entity.version
    };
  }
}`,
  'persistence/mappers/FinishedGoodReceiptPersistenceMapper.ts': `import { FinishedGoodReceipt } from '../../../domain/entities/FinishedGoodReceipt';
import { FinishedGoodReceiptId } from '../../../domain/shared/FinishedGoodReceiptId';
import { Quantity } from '../../../domain/value-objects/Quantity';
import { ReceiptStatus } from '../../../domain/enums/ReceiptStatus';
import { FinishedGoodReceiptPersistenceModel } from '../models/FinishedGoodReceiptPersistenceModel';

export class FinishedGoodReceiptPersistenceMapper {
  public toDomain(model: FinishedGoodReceiptPersistenceModel): FinishedGoodReceipt {
    const receipt = Object.create(FinishedGoodReceipt.prototype) as FinishedGoodReceipt;
    
    receipt.load(
      model.itemId,
      Quantity.create(model.quantity).value!,
      model.status as ReceiptStatus
    );
    
    Object.defineProperty(receipt, 'id', { value: FinishedGoodReceiptId.create(model.id).value!, writable: false });
    Object.defineProperty(receipt, 'createdAt', { value: model.createdAt, writable: false });
    Object.defineProperty(receipt, 'updatedAt', { value: model.updatedAt, writable: true });
    Object.defineProperty(receipt, 'version', { value: model.version, writable: true });
    
    receipt.clearDomainEvents();
    return receipt;
  }

  public toPersistence(entity: FinishedGoodReceipt, productionOrderId: string): FinishedGoodReceiptPersistenceModel {
    return {
      id: entity.id.value,
      productionOrderId,
      itemId: entity.itemId,
      quantity: entity.quantity.amount,
      status: entity.status,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      version: entity.version
    };
  }
}`,
  'persistence/mappers/index.ts': `export * from './ProductionPersistenceMapper';
export * from './ProductionOperationPersistenceMapper';
export * from './ProductionMaterialIssuePersistenceMapper';
export * from './FinishedGoodReceiptPersistenceMapper';`,
  'repositories/ProductionOrderRepository.ts': `import { IProductionOrderRepository } from '../../domain/repositories/IProductionOrderRepository';
import { ProductionOrder } from '../../domain/entities/ProductionOrder';
import { ProductionOrderId } from '../../domain/shared/ProductionOrderId';
import { ProductionPersistenceMapper } from '../persistence/mappers/ProductionPersistenceMapper';
import { ProductionOrderPersistenceModel } from '../persistence/models/ProductionOrderPersistenceModel';

export class ProductionOrderRepository implements IProductionOrderRepository {
  private readonly store = new Map<string, ProductionOrderPersistenceModel>();

  constructor(private readonly mapper: ProductionPersistenceMapper) {}

  public async findById(id: ProductionOrderId): Promise<ProductionOrder | null> {
    const model = this.store.get(id.value);
    if (!model) return null;
    return this.mapper.toDomain(model);
  }

  public async save(order: ProductionOrder): Promise<void> {
    const model = this.mapper.toPersistence(order);
    this.store.set(model.id, model);
  }

  public async findByStatus(status: string): Promise<ProductionOrder[]> {
    const results: ProductionOrder[] = [];
    for (const model of this.store.values()) {
      if (model.status === status) {
        results.push(this.mapper.toDomain(model));
      }
    }
    return results;
  }

  public async findByTargetItemId(itemId: string): Promise<ProductionOrder[]> {
    const results: ProductionOrder[] = [];
    for (const model of this.store.values()) {
      if (model.targetItemId === itemId) {
        results.push(this.mapper.toDomain(model));
      }
    }
    return results;
  }
}`,
  'repositories/OperationRepository.ts': `import { IOperationRepository } from '../../domain/repositories/IOperationRepository';
import { ProductionOperation } from '../../domain/entities/ProductionOperation';
import { OperationId } from '../../domain/shared/OperationId';
import { ProductionOrderId } from '../../domain/shared/ProductionOrderId';
import { ProductionPersistenceMapper } from '../persistence/mappers/ProductionPersistenceMapper';
import { ProductionOrderPersistenceModel } from '../persistence/models/ProductionOrderPersistenceModel';
import { ProductionOperationPersistenceMapper } from '../persistence/mappers/ProductionOperationPersistenceMapper';

export class OperationRepository implements IOperationRepository {
  // Uses the same backing store from ProductionOrderRepository to simulate database
  constructor(
    private readonly store: Map<string, ProductionOrderPersistenceModel>,
    private readonly operationMapper: ProductionOperationPersistenceMapper
  ) {}

  public async findById(id: OperationId): Promise<ProductionOperation | null> {
    for (const order of this.store.values()) {
      for (const op of order.operations) {
        if (op.id === id.value) {
          return this.operationMapper.toDomain(op);
        }
      }
    }
    return null;
  }

  public async findByProductionOrderId(productionOrderId: ProductionOrderId): Promise<ProductionOperation[]> {
    const order = this.store.get(productionOrderId.value);
    if (!order) return [];
    
    return order.operations.map(op => this.operationMapper.toDomain(op));
  }
}`,
  'repositories/index.ts': `export * from './ProductionOrderRepository';
export * from './OperationRepository';`,
  'services/ProductionInfrastructureService.ts': `export class ProductionInfrastructureService {
  constructor() {}
  
  public async initialize(): Promise<void> {
    // Intentionally empty for memory implementation
  }
  
  public async healthCheck(): Promise<boolean> {
    return true;
  }
}`,
  'services/index.ts': `export * from './ProductionInfrastructureService';`,
  'factories/ProductionRepositoryFactory.ts': `import { ProductionOrderRepository } from '../repositories/ProductionOrderRepository';
import { OperationRepository } from '../repositories/OperationRepository';
import { ProductionPersistenceMapper } from '../persistence/mappers/ProductionPersistenceMapper';
import { ProductionOperationPersistenceMapper } from '../persistence/mappers/ProductionOperationPersistenceMapper';
import { ProductionOrderPersistenceModel } from '../persistence/models/ProductionOrderPersistenceModel';

export class ProductionRepositoryFactory {
  constructor(
    private readonly orderRepository: ProductionOrderRepository,
    private readonly operationRepository: OperationRepository
  ) {}

  public createOrderRepository(): ProductionOrderRepository {
    return this.orderRepository;
  }
  
  public createOperationRepository(): OperationRepository {
    return this.operationRepository;
  }
  
  public static createInMemory(mapper: ProductionPersistenceMapper, operationMapper: ProductionOperationPersistenceMapper): ProductionRepositoryFactory {
    const store = new Map<string, ProductionOrderPersistenceModel>();
    
    const orderRepo = new ProductionOrderRepository(mapper);
    // Inject the same store into OperationRepository for testing/in-memory purposes. 
    // In a real database, they would access the same DB tables.
    // For this to work seamlessly, OperationRepository needs a way to share the store.
    // Since OperationRepository accesses it, we can modify the constructor in OperationRepository.
    (orderRepo as any).store = store; 
    
    const operationRepo = new OperationRepository(store, operationMapper);
    
    return new ProductionRepositoryFactory(orderRepo, operationRepo);
  }
}`,
  'factories/index.ts': `export * from './ProductionRepositoryFactory';`,
  'configuration/ProductionInfrastructureOptions.ts': `export interface ProductionInfrastructureOptions {
  useInMemory: boolean;
  connectionString?: string;
}`,
  'configuration/index.ts': `export * from './ProductionInfrastructureOptions';`,
  'bootstrap/ProductionInfrastructureBootstrapper.ts': `import { ProductionInfrastructureOptions } from '../configuration/ProductionInfrastructureOptions';
import { ProductionRepositoryFactory } from '../factories/ProductionRepositoryFactory';
import { ProductionPersistenceMapper } from '../persistence/mappers/ProductionPersistenceMapper';
import { ProductionOperationPersistenceMapper } from '../persistence/mappers/ProductionOperationPersistenceMapper';
import { ProductionMaterialIssuePersistenceMapper } from '../persistence/mappers/ProductionMaterialIssuePersistenceMapper';
import { FinishedGoodReceiptPersistenceMapper } from '../persistence/mappers/FinishedGoodReceiptPersistenceMapper';
import { ProductionInfrastructureService } from '../services/ProductionInfrastructureService';

export class ProductionInfrastructureBootstrapper {
  public static bootstrap(options: ProductionInfrastructureOptions) {
    const operationMapper = new ProductionOperationPersistenceMapper();
    const materialIssueMapper = new ProductionMaterialIssuePersistenceMapper();
    const receiptMapper = new FinishedGoodReceiptPersistenceMapper();
    
    const productionMapper = new ProductionPersistenceMapper(
      operationMapper,
      materialIssueMapper,
      receiptMapper
    );
    
    let repositoryFactory: ProductionRepositoryFactory;
    
    if (options.useInMemory) {
      repositoryFactory = ProductionRepositoryFactory.createInMemory(productionMapper, operationMapper);
    } else {
      // For this phase, we only support in-memory implementation to match Inventory/BOM/MRP
      repositoryFactory = ProductionRepositoryFactory.createInMemory(productionMapper, operationMapper);
    }
    
    const infrastructureService = new ProductionInfrastructureService();
    
    return {
      repositoryFactory,
      mappers: {
        production: productionMapper,
        operation: operationMapper,
        materialIssue: materialIssueMapper,
        receipt: receiptMapper
      },
      services: {
        infrastructure: infrastructureService
      }
    };
  }
}`,
  'bootstrap/index.ts': `export * from './ProductionInfrastructureBootstrapper';`,
  'index.ts': `export * from './bootstrap';
export * from './configuration';
export * from './factories';
export * from './persistence/mappers';
export * from './persistence/models';
export * from './repositories';
export * from './services';`
};

for (const [relativePath, content] of Object.entries(files)) {
  const fullPath = path.join(basePath, relativePath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content);
}
