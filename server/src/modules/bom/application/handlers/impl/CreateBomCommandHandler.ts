import { BaseCommandHandler } from '../../../../../core/application/handlers/BaseCommandHandler';
import { CreateBomCommand } from '../../commands/CreateBomCommand';
import { Result } from '../../../../../core/results/Result';
import { IBomRepository } from '../../../domain/repositories/IBomRepository';
import { BillOfMaterial } from '../../../domain/entities/BillOfMaterial';
import { BomId } from '../../../domain/shared/BomId';
import { ItemId } from '../../../domain/shared/ItemId';
import { IDomainGuid } from '../../../../../core/domain/services/IDomainGuid';

export class CreateBomCommandHandler extends BaseCommandHandler<CreateBomCommand, string> {
  constructor(
    private readonly bomRepository: IBomRepository,
    private readonly guidGenerator: IDomainGuid
  ) {
    super();
  }

  public async handle(command: CreateBomCommand): Promise<Result<string>> {
    const bomIdStr = this.guidGenerator.generate();
    const bomId = BomId.create(bomIdStr);
    const targetItemId = ItemId.create(command.targetItemId);

    const bomResult = BillOfMaterial.create(bomId, command.name, targetItemId);
    if (bomResult.isFailure) {
      return Result.failure(bomResult.error!);
    }

    await this.bomRepository.save(bomResult.value!);
    return Result.success(bomId.value);
  }
}
