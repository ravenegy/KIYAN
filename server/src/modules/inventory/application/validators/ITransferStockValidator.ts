import { Result } from '../../../../core';
import { TransferStockCommand } from '../commands/TransferStockCommand';

export interface ITransferStockValidator {
  validate(command: TransferStockCommand): Result<void>;
}
