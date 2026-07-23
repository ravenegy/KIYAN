import { Result } from '../../../../core';
import { ReceiveStockCommand } from '../commands/ReceiveStockCommand';

export interface IRestockValidator {
  validate(command: ReceiveStockCommand): Result<void>;
}
