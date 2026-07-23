import { IStockWriteService } from '../IStockWriteService';
import { Result } from '../../../../../core';
import { AdjustStockCommand } from '../../commands/AdjustStockCommand';
import { TransferStockCommand } from '../../commands/TransferStockCommand';
import { ReceiveStockCommand } from '../../commands/ReceiveStockCommand';
import { IssueStockCommand } from '../../commands/IssueStockCommand';
import { IMediator } from '../../../../../core/mediator/IMediator';

export class StockWriteService implements IStockWriteService {
  constructor(private readonly mediator: IMediator) {}

  async adjustStock(command: AdjustStockCommand): Promise<Result<void>> {
    return this.mediator.send(command);
  }

  async transferStock(command: TransferStockCommand): Promise<Result<void>> {
    return this.mediator.send(command);
  }

  async receiveStock(command: ReceiveStockCommand): Promise<Result<void>> {
    return this.mediator.send(command);
  }

  async issueStock(command: IssueStockCommand): Promise<Result<void>> {
    return this.mediator.send(command);
  }
}
