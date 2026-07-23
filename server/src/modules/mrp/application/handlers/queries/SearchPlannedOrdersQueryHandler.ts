import { Result, ErrorCode } from "../../../../../core";
import { IQueryHandler } from "../../../../../core/mediator/queries/IQueryHandler";
import { SearchPlannedOrdersQuery } from "../../queries/SearchPlannedOrdersQuery";
import { PlannedOrderDto } from "../../dto/PlannedOrderDto";
import { IPlannedOrderRepository } from "../../../domain/repositories/IPlannedOrderRepository";
import { IPlannedOrderMapper } from "../../mappers/IPlannedOrderMapper";

export class SearchPlannedOrdersQueryHandler implements IQueryHandler<
  SearchPlannedOrdersQuery,
  Result<readonly PlannedOrderDto[]>
> {
  constructor(
    private readonly plannedOrderRepository: IPlannedOrderRepository,
    private readonly plannedOrderMapper: IPlannedOrderMapper,
  ) {}

  public async handle(
    query: SearchPlannedOrdersQuery,
  ): Promise<Result<readonly PlannedOrderDto[]>> {
    // If itemId is provided, use findByItemId, else we might not be able to fetch all efficiently.
    // For demonstration purposes, if itemId is missing we throw an error as we don't have a findAll in the repository interface.
    if (!query.itemId) {
      return Result.failure({
        code: ErrorCode.Unexpected,
        message:
          "Search without itemId is not supported by the repository in this implementation.",
      });
    }
    const orders = await this.plannedOrderRepository.findByItemId(query.itemId);

    let filtered = orders;

    if (query.status) {
      filtered = filtered.filter((o) => o.status === query.status);
    }

    if (query.typeFilter) {
      filtered = filtered.filter((o) => o.type === query.typeFilter);
    }

    return Result.success(
      filtered.map((order) => this.plannedOrderMapper.toDto(order)),
    );
  }
}
