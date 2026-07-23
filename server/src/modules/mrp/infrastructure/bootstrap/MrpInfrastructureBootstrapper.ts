import { MrpRepositoryFactory } from '../factories/MrpRepositoryFactory';
import { MrpInfrastructureService } from '../services/MrpInfrastructureService';
import { MrpInfrastructureOptions } from '../configuration/MrpInfrastructureOptions';

export class MrpInfrastructureBootstrapper {
  private service: MrpInfrastructureService;

  constructor(private readonly options: MrpInfrastructureOptions) {
    this.service = new MrpInfrastructureService();
  }

  public async bootstrap(): Promise<void> {
    console.log('Bootstrapping MRP Infrastructure...');
    
    // Initialize repositories via factory
    MrpRepositoryFactory.getMrpRunRepository();
    MrpRepositoryFactory.getPlannedOrderRepository();
    MrpRepositoryFactory.getMaterialRequirementRepository();

    await this.service.initialize();
  }

  public async teardown(): Promise<void> {
    await this.service.shutdown();
  }
}
