import { Result, ErrorCode } from "../../../../../core";
import { IQueryHandler } from "../../../../../core/mediator/queries/IQueryHandler";
import { GetMaterialRequirementsQuery } from "../../queries/GetMaterialRequirementsQuery";
import { MaterialRequirementDto } from "../../dto/MaterialRequirementDto";
import { IMaterialRequirementRepository } from "../../../domain/repositories/IMaterialRequirementRepository";
import { IMaterialRequirementMapper } from "../../mappers/IMaterialRequirementMapper";

export class GetMaterialRequirementsQueryHandler implements IQueryHandler<
  GetMaterialRequirementsQuery,
  Result<readonly MaterialRequirementDto[]>
> {
  constructor(
    private readonly materialRequirementRepository: IMaterialRequirementRepository,
    private readonly materialRequirementMapper: IMaterialRequirementMapper,
  ) {}

  public async handle(
    query: GetMaterialRequirementsQuery,
  ): Promise<Result<readonly MaterialRequirementDto[]>> {
    const reqs = await this.materialRequirementRepository.findByMrpRunId(
      query.mrpRunId,
    );
    return Result.success(
      reqs.map((req) => this.materialRequirementMapper.toDto(req)),
    );
  }
}
