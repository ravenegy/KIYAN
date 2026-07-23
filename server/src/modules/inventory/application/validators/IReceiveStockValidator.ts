import { Result } from '../../../../core';
import { ReceiveStockCommand } from '../commands/ReceiveStockCommand';

export interface IReceiveStockValidator {
  validate(command: ReceiveStockCommand): Result<void>;
}
