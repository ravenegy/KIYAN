import { BaseCommandHandler } from '../../../../../core/application/handlers/BaseCommandHandler';
import { ActivateBomCommand } from '../../commands/ActivateBomCommand';
import { Result } from '../../../../../core/results/Result';
import { IBomRepository } from '../../../domain/repositories/IBomRepository';
import { BomId } from '../../../domain/shared/BomId';
import { BomNotFoundException } from '../../exceptions/BomNotFoundException';

export class ActivateBomCommandHandler extends BaseCommandHandler<ActivateBomCommand, void> {
  constructor(
    private readonly bomRepository: IBomRepository
  ) {
    super();
  }

  public async handle(command: ActivateBomCommand): Promise<Result<void>> {
    const bomId = BomId.create(command.bomId);
    const bom = await this.bomRepository.getById(bomId);
    if (!bom) {
      return Result.failure({ code: 'BOM_NOT_FOUND', message: new BomNotFoundException(command.bomId).message });
    }

    const activeBom = await this.bomRepository.getActiveBomForTarget(bom.targetItemId);
    if (activeBom && !activeBom.id.equals(bomId)) {
      activeBom.archive();
      await this.bomRepository.save(activeBom);
    }

    const activateResult = bom.activate();
    if (activateResult.isFailure) {
      return Result.failure(activateResult.error!);
    }

    await this.bomRepository.save(bom);
    return Result.success();
  }
}
