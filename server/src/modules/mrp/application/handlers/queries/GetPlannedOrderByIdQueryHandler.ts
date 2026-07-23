import { Result, ErrorCode } from "../../../../../core";
import { IQueryHandler } from "../../../../../core/mediator/queries/IQueryHandler";
import { GetPlannedOrderByIdQuery } from "../../queries/GetPlannedOrderByIdQuery";
import { PlannedOrderDto } from "../../dto/PlannedOrderDto";
import { IPlannedOrderRepository } from "../../../domain/repositories/IPlannedOrderRepository";
import { IPlannedOrderMapper } from "../../mappers/IPlannedOrderMapper";
import { PlannedOrderId } from "../../../domain/shared/PlannedOrderId";

export class GetPlannedOrderByIdQueryHandler implements IQueryHandler<
  GetPlannedOrderByIdQuery,
  Result<PlannedOrderDto | null>
> {
  constructor(
    private readonly plannedOrderRepository: IPlannedOrderRepository,
    private readonly plannedOrderMapper: IPlannedOrderMapper,
  ) {}

  public async handle(
    query: GetPlannedOrderByIdQuery,
  ): Promise<Result<PlannedOrderDto | null>> {
    const idResult = PlannedOrderId.create(query.id);
    if (idResult.isFailure) {
      return null;
    }

    const order = await this.plannedOrderRepository.getById(idResult.value!);
    if (!order) {
      return null;
    }

    return Result.success(this.plannedOrderMapper.toDto(order));
  }
}
