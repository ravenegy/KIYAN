import { Result } from "../../../../core";
import { ICommand } from "../../../../core/mediator/commands/ICommand";

export class CreateMrpRunCommand implements ICommand<Result<string>> {
  public readonly type = "CreateMrpRunCommand";
  public readonly id: string;
  public readonly timestamp: Date;
  public readonly _resultType?: Result<string>;

  constructor(
    public readonly plantId: string,
    public readonly horizonStartDate: Date,
    public readonly horizonEndDate: Date,
  ) {
    this.id = crypto.randomUUID();
    this.timestamp = new Date();
  }
}
