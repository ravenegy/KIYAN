import { IContainer, Lifetime } from '../../../core/di';
import { CoreTokens } from '../../../core/bootstrap';
import { IConfiguration } from '../../../core/config';
import { MrpModuleTokens } from './MrpModuleTokens';
import { MrpRepositoryFactory } from '../infrastructure/factories/MrpRepositoryFactory';
import { MrpInfrastructureBootstrapper } from '../infrastructure/bootstrap/MrpInfrastructureBootstrapper';
import { MrpInfrastructureOptions } from '../infrastructure/configuration/MrpInfrastructureOptions';

export class MrpRepositoryRegistration {
  public static register(container: IContainer): void {
    const config = container.resolve<IConfiguration<any>>(CoreTokens.Configuration);
    
    const useInMemory = config?.current?.mrp?.useInMemoryRepositories ?? config?.current?.useInMemoryRepositories ?? true;
    const connectionString = config?.current?.database?.connectionString;
    
    const options: MrpInfrastructureOptions = { 
      connectionString,
      useInMemoryRepositories: useInMemory 
    };
    
    const bootstrapper = new MrpInfrastructureBootstrapper(options);
    
    // We do not await bootstrap here as DI registration is synchronous, 
    // it should be called separately during app start. 
    // Repositories are accessible via factory immediately.
    bootstrapper.bootstrap().catch(console.error);
    
    container.register(
      MrpModuleTokens.IMrpRunRepository,
      () => MrpRepositoryFactory.getMrpRunRepository(),
      Lifetime.Singleton
    );

    container.register(
      MrpModuleTokens.IPlannedOrderRepository,
      () => MrpRepositoryFactory.getPlannedOrderRepository(),
      Lifetime.Singleton
    );

    container.register(
      MrpModuleTokens.IMaterialRequirementRepository,
      () => MrpRepositoryFactory.getMaterialRequirementRepository(),
      Lifetime.Singleton
    );
  }
}
