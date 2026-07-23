import { StockLevelDto } from "../../dto/StockLevelDto";
import { IStockApplicationService } from '../IStockApplicationService';
import { Result } from '../../../../../core';
import { AdjustStockCommand } from '../../commands/AdjustStockCommand';
import { TransferStockCommand } from '../../commands/TransferStockCommand';
import { ReceiveStockCommand } from '../../commands/ReceiveStockCommand';
import { IssueStockCommand } from '../../commands/IssueStockCommand';
import { IMediator } from '../../../../../core/mediator/IMediator';

export class StockApplicationService implements IStockApplicationService {
  constructor(private readonly mediator: IMediator) {}

  async getStockLevels(inventoryItemId: string): Promise<Result<ReadonlyArray<StockLevelDto>>> {
    const { GetStockLevelsQuery } = await import("../../queries/GetStockLevelsQuery");
    const { InventoryItemId } = await import("../../../domain/shared/InventoryItemId");
    const { ResultFactory } = await import("../../../../../core");
    const idResult = InventoryItemId.create(inventoryItemId);
    if (idResult.isFailure) return ResultFactory.failure(idResult.error!, idResult.errors ? [...idResult.errors] : undefined);
    return this.mediator.query(new GetStockLevelsQuery(idResult.value!));
  }

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
