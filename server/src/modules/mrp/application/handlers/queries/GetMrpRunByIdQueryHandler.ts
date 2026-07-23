import { Result, ErrorCode } from "../../../../../core";
import { IQueryHandler } from "../../../../../core/mediator/queries/IQueryHandler";
import { GetMrpRunByIdQuery } from "../../queries/GetMrpRunByIdQuery";
import { MrpRunDto } from "../../dto/MrpRunDto";
import { IMrpRunRepository } from "../../../domain/repositories/IMrpRunRepository";
import { IMrpRunMapper } from "../../mappers/IMrpRunMapper";
import { MrpRunId } from "../../../domain/shared/MrpRunId";

export class GetMrpRunByIdQueryHandler implements IQueryHandler<
  GetMrpRunByIdQuery,
  Result<MrpRunDto | null>
> {
  constructor(
    private readonly mrpRunRepository: IMrpRunRepository,
    private readonly mrpRunMapper: IMrpRunMapper,
  ) {}

  public async handle(
    query: GetMrpRunByIdQuery,
  ): Promise<Result<MrpRunDto | null>> {
    const idResult = MrpRunId.create(query.id);
    if (idResult.isFailure) {
      return null;
    }

    const mrpRun = await this.mrpRunRepository.getById(idResult.value!);
    if (!mrpRun) {
      return null;
    }

    return Result.success(this.mrpRunMapper.toDto(mrpRun));
  }
}
