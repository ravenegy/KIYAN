import { Result, ErrorCode } from "../../../../../core";
import { IQueryHandler } from "../../../../../core/mediator/queries/IQueryHandler";
import { GetPlannedOrdersQuery } from "../../queries/GetPlannedOrdersQuery";
import { PlannedOrderDto } from "../../dto/PlannedOrderDto";
import { IPlannedOrderRepository } from "../../../domain/repositories/IPlannedOrderRepository";
import { IPlannedOrderMapper } from "../../mappers/IPlannedOrderMapper";

export class GetPlannedOrdersQueryHandler implements IQueryHandler<
  GetPlannedOrdersQuery,
  Result<readonly PlannedOrderDto[]>
> {
  constructor(
    private readonly plannedOrderRepository: IPlannedOrderRepository,
    private readonly plannedOrderMapper: IPlannedOrderMapper,
  ) {}

  public async handle(
    query: GetPlannedOrdersQuery,
  ): Promise<Result<readonly PlannedOrderDto[]>> {
    const orders = await this.plannedOrderRepository.findByMrpRunId(
      query.mrpRunId,
    );
    return Result.success(
      orders.map((order) => this.plannedOrderMapper.toDto(order)),
    );
  }
}
