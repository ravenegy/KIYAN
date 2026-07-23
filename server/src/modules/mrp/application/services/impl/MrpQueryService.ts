import { Result } from "../../../../../core";
import { IMrpQueryService } from "../IMrpQueryService";
import { IQueryBus } from "../../../../../core/mediator/queries/IQueryBus";
import { MrpRunDto } from "../../dto/MrpRunDto";
import { PlannedOrderDto } from "../../dto/PlannedOrderDto";
import { MaterialRequirementDto } from "../../dto/MaterialRequirementDto";
import {
  GetMrpRunByIdQuery,
  GetPlannedOrderByIdQuery,
  GetPlannedOrdersQuery,
  GetMaterialRequirementsQuery,
  SearchPlannedOrdersQuery,
} from "../../queries";

export class MrpQueryService implements IMrpQueryService {
  constructor(private readonly queryBus: IQueryBus) {}

  public async getMrpRunById(id: string): Promise<Result<MrpRunDto | null>> {
    const query = new GetMrpRunByIdQuery(id);
    return this.queryBus.execute<Result<MrpRunDto | null>>(query);
  }

  public async getPlannedOrderById(
    id: string,
  ): Promise<Result<PlannedOrderDto | null>> {
    const query = new GetPlannedOrderByIdQuery(id);
    return this.queryBus.execute<Result<PlannedOrderDto | null>>(query);
  }

  public async getPlannedOrders(
    mrpRunId: string,
  ): Promise<Result<readonly PlannedOrderDto[]>> {
    const query = new GetPlannedOrdersQuery(mrpRunId);
    return this.queryBus.execute<Result<readonly PlannedOrderDto[]>>(query);
  }

  public async getMaterialRequirements(
    mrpRunId: string,
  ): Promise<Result<readonly MaterialRequirementDto[]>> {
    const query = new GetMaterialRequirementsQuery(mrpRunId);
    return this.queryBus.execute<Result<readonly MaterialRequirementDto[]>>(
      query,
    );
  }

  public async searchPlannedOrders(
    itemId?: string,
    status?: string,
    typeFilter?: string,
  ): Promise<Result<readonly PlannedOrderDto[]>> {
    const query = new SearchPlannedOrdersQuery(itemId, status, typeFilter);
    return this.queryBus.execute<Result<readonly PlannedOrderDto[]>>(query);
  }
}
