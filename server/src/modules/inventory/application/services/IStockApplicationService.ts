import { StockLevelDto } from "../dto/StockLevelDto";
import { Result } from '../../../../core';
import { AdjustStockCommand } from '../commands/AdjustStockCommand';
import { TransferStockCommand } from '../commands/TransferStockCommand';
import { ReceiveStockCommand } from '../commands/ReceiveStockCommand';
import { IssueStockCommand } from '../commands/IssueStockCommand';

export interface IStockApplicationService {
  getStockLevels(inventoryItemId: string): Promise<Result<ReadonlyArray<StockLevelDto>>>;
  adjustStock(command: AdjustStockCommand): Promise<Result<void>>;
  transferStock(command: TransferStockCommand): Promise<Result<void>>;
  receiveStock(command: ReceiveStockCommand): Promise<Result<void>>;
  issueStock(command: IssueStockCommand): Promise<Result<void>>;
}
