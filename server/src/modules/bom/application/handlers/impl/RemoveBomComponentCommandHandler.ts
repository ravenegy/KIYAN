import { BaseCommandHandler } from '../../../../../core/application/handlers/BaseCommandHandler';
import { RemoveBomComponentCommand } from '../../commands/RemoveBomComponentCommand';
import { Result } from '../../../../../core/results/Result';
import { IBomRepository } from '../../../domain/repositories/IBomRepository';
import { BomId } from '../../../domain/shared/BomId';
import { ItemId } from '../../../domain/shared/ItemId';
import { BomNotFoundException } from '../../exceptions/BomNotFoundException';

export class RemoveBomComponentCommandHandler extends BaseCommandHandler<RemoveBomComponentCommand, void> {
  constructor(
    private readonly bomRepository: IBomRepository
  ) {
    super();
  }

  public async handle(command: RemoveBomComponentCommand): Promise<Result<void>> {
    const bomId = BomId.create(command.bomId);
    const bom = await this.bomRepository.getById(bomId);
    if (!bom) {
      return Result.failure({ code: 'BOM_NOT_FOUND', message: new BomNotFoundException(command.bomId).message });
    }

    const removeResult = bom.removeComponent(ItemId.create(command.itemId));
    if (removeResult.isFailure) {
      return Result.failure(removeResult.error!);
    }

    await this.bomRepository.save(bom);
    return Result.success();
  }
}
