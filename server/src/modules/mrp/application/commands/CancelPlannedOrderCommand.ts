import { Result } from "../../../../core";
import { ICommand } from "../../../../core/mediator/commands/ICommand";

export class CancelPlannedOrderCommand implements ICommand<Result<void>> {
  public readonly type = "CancelPlannedOrderCommand";
  public readonly id: string;
  public readonly timestamp: Date;
  public readonly _resultType?: Result<void>;

  constructor(
    public readonly plannedOrderId: string,
    public readonly reason: string,
  ) {
    this.id = crypto.randomUUID();
    this.timestamp = new Date();
  }
}
