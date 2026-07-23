import { Result } from "../../../../core";
import { ICommand } from "../../../../core/mediator/commands/ICommand";

export class StartMrpRunCommand implements ICommand<Result<void>> {
  public readonly type = "StartMrpRunCommand";
  public readonly id: string;
  public readonly timestamp: Date;
  public readonly _resultType?: Result<void>;

  constructor(public readonly mrpRunId: string) {
    this.id = crypto.randomUUID();
    this.timestamp = new Date();
  }
}
