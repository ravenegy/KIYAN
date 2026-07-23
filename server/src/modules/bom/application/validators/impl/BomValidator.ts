import { IBomValidator } from '../IBomValidator';
import { CreateBomCommand } from '../../commands/CreateBomCommand';
import { AddBomComponentCommand } from '../../commands/AddBomComponentCommand';
import { Result } from '../../../../../core/results/Result';

export class BomValidator implements IBomValidator {
  public validateCreateBom(command: CreateBomCommand): Result<void> {
    if (!command.name || command.name.trim().length === 0) {
      return Result.failure({ code: 'VALIDATION_ERROR', message: 'BOM name is required' });
    }
    if (!command.targetItemId || command.targetItemId.trim().length === 0) {
      return Result.failure({ code: 'VALIDATION_ERROR', message: 'Target Item ID is required' });
    }
    return Result.success();
  }

  public validateAddBomComponent(command: AddBomComponentCommand): Result<void> {
    if (!command.bomId || command.bomId.trim().length === 0) {
      return Result.failure({ code: 'VALIDATION_ERROR', message: 'BOM ID is required' });
    }
    if (!command.itemId || command.itemId.trim().length === 0) {
      return Result.failure({ code: 'VALIDATION_ERROR', message: 'Item ID is required' });
    }
    if (command.quantity <= 0) {
      return Result.failure({ code: 'VALIDATION_ERROR', message: 'Quantity must be greater than zero' });
    }
    if (!command.unitOfMeasure || command.unitOfMeasure.trim().length === 0) {
      return Result.failure({ code: 'VALIDATION_ERROR', message: 'Unit of measure is required' });
    }
    if (command.scrapPercentage < 0 || command.scrapPercentage > 100) {
      return Result.failure({ code: 'VALIDATION_ERROR', message: 'Scrap percentage must be between 0 and 100' });
    }
    return Result.success();
  }
}
