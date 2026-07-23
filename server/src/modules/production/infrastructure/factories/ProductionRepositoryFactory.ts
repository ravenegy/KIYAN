import { ProductionOrderRepository } from '../repositories/ProductionOrderRepository';
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
}