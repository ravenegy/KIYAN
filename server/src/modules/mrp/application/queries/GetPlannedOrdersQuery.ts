import { Result } from "../../../../core";
import { IQuery } from "../../../../core/mediator/queries/IQuery";
import { PlannedOrderDto } from "../dto/PlannedOrderDto";

export class GetPlannedOrdersQuery implements IQuery<
  Result<readonly PlannedOrderDto[]>
> {
  public readonly type = "GetPlannedOrdersQuery";
  public readonly _resultType?: Result<readonly PlannedOrderDto[]>;

  constructor(public readonly mrpRunId: string) {}
}
