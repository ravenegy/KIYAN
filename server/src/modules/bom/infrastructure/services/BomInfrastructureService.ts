import { IBomRepository } from '../../domain/repositories/IBomRepository';
import { BomInfrastructureFactory } from '../factories/BomInfrastructureFactory';

export class BomInfrastructureService {
  private readonly bomRepository: IBomRepository;

  constructor(private readonly factory: BomInfrastructureFactory) {
    this.bomRepository = this.factory.createBomRepository();
  }

  public getBomRepository(): IBomRepository {
    return this.bomRepository;
  }
}
