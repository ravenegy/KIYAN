import { Result } from "../../../../core";
import { ICommand } from "../../../../core/mediator/commands/ICommand";

export class CancelMrpRunCommand implements ICommand<Result<void>> {
  public readonly type = "CancelMrpRunCommand";
  public readonly id: string;
  public readonly timestamp: Date;
  public readonly _resultType?: Result<void>;

  constructor(
    public readonly mrpRunId: string,
    public readonly reason: string,
  ) {
    this.id = crypto.randomUUID();
    this.timestamp = new Date();
  }
}
