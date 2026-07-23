import { ProductionInfrastructureOptions } from '../configuration/ProductionInfrastructureOptions';
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
}