import { Result } from '../../../../core';
import { AdjustStockCommand } from '../commands/AdjustStockCommand';
import { TransferStockCommand } from '../commands/TransferStockCommand';

export interface IStockWriteService {
  adjustStock(command: AdjustStockCommand): Promise<Result<void>>;
  transferStock(command: TransferStockCommand): Promise<Result<void>>;
}
