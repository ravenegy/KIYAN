import { BaseCommandHandler } from '../../../../../core/application/handlers/BaseCommandHandler';
import { ArchiveBomCommand } from '../../commands/ArchiveBomCommand';
import { Result } from '../../../../../core/results/Result';
import { IBomRepository } from '../../../domain/repositories/IBomRepository';
import { BomId } from '../../../domain/shared/BomId';
import { BomNotFoundException } from '../../exceptions/BomNotFoundException';

export class ArchiveBomCommandHandler extends BaseCommandHandler<ArchiveBomCommand, void> {
  constructor(
    private readonly bomRepository: IBomRepository
  ) {
    super();
  }

  public async handle(command: ArchiveBomCommand): Promise<Result<void>> {
    const bomId = BomId.create(command.bomId);
    const bom = await this.bomRepository.getById(bomId);
    if (!bom) {
      return Result.failure({ code: 'BOM_NOT_FOUND', message: new BomNotFoundException(command.bomId).message });
    }

    bom.archive();
    await this.bomRepository.save(bom);
    return Result.success();
  }
}
