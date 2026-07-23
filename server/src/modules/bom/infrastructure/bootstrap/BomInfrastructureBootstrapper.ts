import { BomInfrastructureOptions } from '../configuration/BomInfrastructureOptions';
import { BomRepositoryFactory } from '../factories/BomRepositoryFactory';
import { BomInfrastructureFactory } from '../factories/BomInfrastructureFactory';
import { BomInfrastructureService } from '../services/BomInfrastructureService';

export class BomInfrastructureBootstrapper {
  public static bootstrap(options: BomInfrastructureOptions): BomInfrastructureService {
    const repositoryFactory = new BomRepositoryFactory();
    const infrastructureFactory = new BomInfrastructureFactory(repositoryFactory);
    return new BomInfrastructureService(infrastructureFactory);
  }
}
