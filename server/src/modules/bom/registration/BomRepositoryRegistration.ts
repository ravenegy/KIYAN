import { IContainer, Lifetime } from '../../../core/di';
import { CoreTokens } from '../../../core/bootstrap';
import { IConfiguration } from '../../../core/config';
import { BomModuleTokens } from './BomModuleTokens';
import { BomInfrastructureBootstrapper } from '../infrastructure/bootstrap/BomInfrastructureBootstrapper';
import { BomInfrastructureOptions } from '../infrastructure/configuration/BomInfrastructureOptions';

export class BomRepositoryRegistration {
  public static register(container: IContainer): void {
    const config = container.resolve<IConfiguration<any>>(CoreTokens.Configuration);
    const useInMemory = config?.current?.bom?.useInMemoryStore ?? config?.current?.useInMemoryStore ?? true;
    
    const options: BomInfrastructureOptions = { useInMemoryStore: useInMemory };
    const infraService = BomInfrastructureBootstrapper.bootstrap(options);
    
    container.register(
      BomModuleTokens.IBomRepository,
      () => infraService.getBomRepository(),
      Lifetime.Singleton
    );
  }
}
