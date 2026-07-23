import { InventoryInfrastructureService } from '../services/InventoryInfrastructureService';

export class InventoryInfrastructureFactory {
  public createService(): InventoryInfrastructureService {
    return new InventoryInfrastructureService();
  }
}
