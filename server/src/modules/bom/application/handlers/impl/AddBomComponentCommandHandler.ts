import { BaseCommandHandler } from '../../../../../core/application/handlers/BaseCommandHandler';
import { AddBomComponentCommand } from '../../commands/AddBomComponentCommand';
import { Result } from '../../../../../core/results/Result';
import { IBomRepository } from '../../../domain/repositories/IBomRepository';
import { BomCycleDetectionService } from '../../../domain/services/BomCycleDetectionService';
import { BomComponent } from '../../../domain/entities/BomComponent';
import { BomId } from '../../../domain/shared/BomId';
import { ItemId } from '../../../domain/shared/ItemId';
import { BomComponentId } from '../../../domain/shared/BomComponentId';
import { Quantity } from '../../../domain/value-objects/Quantity';
import { IDomainGuid } from '../../../../../core/domain/services/IDomainGuid';
import { BomNotFoundException } from '../../exceptions/BomNotFoundException';

export class AddBomComponentCommandHandler extends BaseCommandHandler<AddBomComponentCommand, void> {
  constructor(
    private readonly bomRepository: IBomRepository,
    private readonly cycleDetectionService: BomCycleDetectionService,
    private readonly guidGenerator: IDomainGuid
  ) {
    super();
  }

  public async handle(command: AddBomComponentCommand): Promise<Result<void>> {
    const bomId = BomId.create(command.bomId);
    const bom = await this.bomRepository.getById(bomId);
    if (!bom) {
      return Result.failure({ code: 'BOM_NOT_FOUND', message: new BomNotFoundException(command.bomId).message });
    }

    const componentId = BomComponentId.create(this.guidGenerator.generate());
    const itemId = ItemId.create(command.itemId);
    
    const quantityResult = Quantity.create(command.quantity);
    if (quantityResult.isFailure) {
      return Result.failure(quantityResult.error!);
    }

    const componentResult = BomComponent.create(
      componentId,
      bomId,
      itemId,
      quantityResult.value!,
      command.unitOfMeasure,
      command.scrapPercentage
    );
    if (componentResult.isFailure) {
      return Result.failure(componentResult.error!);
    }

    const addResult = bom.addComponent(componentResult.value!);
    if (addResult.isFailure) {
      return Result.failure(addResult.error!);
    }

    const cycleResult = await this.cycleDetectionService.detectCycle(bom);
    if (cycleResult.isFailure) {
      return Result.failure(cycleResult.error!);
    }

    await this.bomRepository.save(bom);
    return Result.success();
  }
}
