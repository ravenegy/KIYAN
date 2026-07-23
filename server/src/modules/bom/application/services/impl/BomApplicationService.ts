import { IBomApplicationService } from '../IBomApplicationService';
import { IMediator } from '../../../../../core/mediator/IMediator';
import { IBomValidator } from '../../validators/IBomValidator';
import { CreateBomCommand } from '../../commands/CreateBomCommand';
import { AddBomComponentCommand } from '../../commands/AddBomComponentCommand';
import { RemoveBomComponentCommand } from '../../commands/RemoveBomComponentCommand';
import { ActivateBomCommand } from '../../commands/ActivateBomCommand';
import { ArchiveBomCommand } from '../../commands/ArchiveBomCommand';
import { GetBomByIdQuery } from '../../queries/GetBomByIdQuery';
import { GetActiveBomByTargetItemQuery } from '../../queries/GetActiveBomByTargetItemQuery';
import { GetBomsByTargetItemQuery } from '../../queries/GetBomsByTargetItemQuery';
import { Result } from '../../../../../core/results/Result';
import { BomDto } from '../../dto/BomDto';
import { BomSummaryDto } from '../../dto/BomSummaryDto';

export class BomApplicationService implements IBomApplicationService {
  constructor(
    private readonly mediator: IMediator,
    private readonly validator: IBomValidator
  ) {}

  public async createBom(name: string, targetItemId: string): Promise<Result<string>> {
    const command = new CreateBomCommand(name, targetItemId);
    const validationResult = this.validator.validateCreateBom(command);
    if (validationResult.isFailure) {
      return Result.failure(validationResult.error!);
    }
    return this.mediator.send(command);
  }

  public async addBomComponent(bomId: string, itemId: string, quantity: number, unitOfMeasure: string, scrapPercentage: number = 0): Promise<Result<void>> {
    const command = new AddBomComponentCommand(bomId, itemId, quantity, unitOfMeasure, scrapPercentage);
    const validationResult = this.validator.validateAddBomComponent(command);
    if (validationResult.isFailure) {
      return Result.failure(validationResult.error!);
    }
    return this.mediator.send(command);
  }

  public async removeBomComponent(bomId: string, itemId: string): Promise<Result<void>> {
    return this.mediator.send(new RemoveBomComponentCommand(bomId, itemId));
  }

  public async activateBom(bomId: string): Promise<Result<void>> {
    return this.mediator.send(new ActivateBomCommand(bomId));
  }

  public async archiveBom(bomId: string): Promise<Result<void>> {
    return this.mediator.send(new ArchiveBomCommand(bomId));
  }

  public async getBomById(bomId: string): Promise<Result<BomDto>> {
    return this.mediator.query(new GetBomByIdQuery(bomId));
  }

  public async getActiveBomForTarget(targetItemId: string): Promise<Result<BomDto>> {
    return this.mediator.query(new GetActiveBomByTargetItemQuery(targetItemId));
  }

  public async getBomsForTarget(targetItemId: string): Promise<Result<BomSummaryDto[]>> {
    return this.mediator.query(new GetBomsByTargetItemQuery(targetItemId));
  }
}
