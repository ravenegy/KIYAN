import { Result } from "../../../../core";
import { IQuery } from "../../../../core/mediator/queries/IQuery";
import { PlannedOrderDto } from "../dto/PlannedOrderDto";

export class GetPlannedOrderByIdQuery implements IQuery<
  Result<PlannedOrderDto | null>
> {
  public readonly type = "GetPlannedOrderByIdQuery";
  public readonly _resultType?: Result<PlannedOrderDto | null>;

  constructor(public readonly id: string) {}
}
