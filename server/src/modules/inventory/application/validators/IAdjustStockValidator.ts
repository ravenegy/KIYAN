import { Result } from '../../../../core';
import { AdjustStockCommand } from '../commands/AdjustStockCommand';

export interface IAdjustStockValidator {
  validate(command: AdjustStockCommand): Result<void>;
}
