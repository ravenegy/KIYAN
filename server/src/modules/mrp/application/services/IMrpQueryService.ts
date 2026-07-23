import { Result } from "../../../../core";
import { MrpRunDto } from "../dto/MrpRunDto";
import { PlannedOrderDto } from "../dto/PlannedOrderDto";
import { MaterialRequirementDto } from "../dto/MaterialRequirementDto";

export interface IMrpQueryService {
  getMrpRunById(id: string): Promise<Result<MrpRunDto | null>>;
  getPlannedOrderById(id: string): Promise<Result<PlannedOrderDto | null>>;
  getPlannedOrders(
    mrpRunId: string,
  ): Promise<Result<readonly PlannedOrderDto[]>>;
  getMaterialRequirements(
    mrpRunId: string,
  ): Promise<Result<readonly MaterialRequirementDto[]>>;
  searchPlannedOrders(
    itemId?: string,
    status?: string,
    typeFilter?: string,
  ): Promise<Result<readonly PlannedOrderDto[]>>;
}
