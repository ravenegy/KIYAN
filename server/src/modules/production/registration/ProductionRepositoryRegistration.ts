import { IContainer, Lifetime } from '../../../core/di';
import { CoreTokens } from '../../../core/bootstrap';
import { IConfiguration } from '../../../core/config';
import { ProductionModuleTokens } from './ProductionModuleTokens';
import { ProductionInfrastructureBootstrapper } from '../infrastructure/bootstrap/ProductionInfrastructureBootstrapper';
import { ProductionInfrastructureOptions } from '../infrastructure/configuration/ProductionInfrastructureOptions';

export class ProductionRepositoryRegistration {
  public static register(container: IContainer): void {
    const config = container.resolve<IConfiguration<any>>(CoreTokens.Configuration);
    
    const useInMemory = config?.current?.production?.useInMemory ?? config?.current?.useInMemoryRepositories ?? true;
    const connectionString = config?.current?.database?.connectionString;
    
    const options: ProductionInfrastructureOptions = {
      useInMemory,
      connectionString
    };
    
    // Bootstrap infrastructure
    const infra = ProductionInfrastructureBootstrapper.bootstrap(options);
    
    // Register Repositories
    container.register(
      ProductionModuleTokens.IProductionOrderRepository,
      () => infra.repositoryFactory.createOrderRepository(),
      Lifetime.Singleton
    );
    
    container.register(
      ProductionModuleTokens.IOperationRepository,
      () => infra.repositoryFactory.createOperationRepository(),
      Lifetime.Singleton
    );

    // Also register the infrastructure service
    container.register(
      ProductionModuleTokens.ProductionInfrastructureService,
      () => infra.services.infrastructure,
      Lifetime.Singleton
    );
  }
}
