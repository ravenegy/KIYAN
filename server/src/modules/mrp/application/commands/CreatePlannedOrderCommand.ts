import { Result } from "../../../../core";
import { ICommand } from "../../../../core/mediator/commands/ICommand";

export class CreatePlannedOrderCommand implements ICommand<Result<string>> {
  public readonly type = "CreatePlannedOrderCommand";
  public readonly id: string;
  public readonly timestamp: Date;
  public readonly _resultType?: Result<string>;

  constructor(
    public readonly itemId: string,
    public readonly quantity: number,
    public readonly startDate: Date,
    public readonly endDate: Date,
    public readonly orderType: string,
    public readonly mrpRunId: string,
    public readonly sourceRequirementId?: string,
  ) {
    this.id = crypto.randomUUID();
    this.timestamp = new Date();
  }
}
