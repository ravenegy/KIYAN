import { Result } from "../../../../core";
import { ICommand } from "../../../../core/mediator/commands/ICommand";

export class CompleteMrpRunCommand implements ICommand<Result<void>> {
  public readonly type = "CompleteMrpRunCommand";
  public readonly id: string;
  public readonly timestamp: Date;
  public readonly _resultType?: Result<void>;

  constructor(
    public readonly mrpRunId: string,
    public readonly plannedOrdersCount: number,
  ) {
    this.id = crypto.randomUUID();
    this.timestamp = new Date();
  }
}
