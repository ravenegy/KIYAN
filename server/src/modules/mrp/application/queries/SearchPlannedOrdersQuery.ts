import { Result } from "../../../../core";
import { IQuery } from "../../../../core/mediator/queries/IQuery";
import { PlannedOrderDto } from "../dto/PlannedOrderDto";

export class SearchPlannedOrdersQuery implements IQuery<
  Result<readonly PlannedOrderDto[]>
> {
  public readonly type = "SearchPlannedOrdersQuery";
  public readonly _resultType?: Result<readonly PlannedOrderDto[]>;

  constructor(
    public readonly itemId?: string,
    public readonly status?: string,
    public readonly typeFilter?: string,
  ) {}
}
