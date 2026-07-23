export class InventoryInfrastructureService {
  constructor() {}
  
  public async ping(): Promise<boolean> {
    return true;
  }
}
