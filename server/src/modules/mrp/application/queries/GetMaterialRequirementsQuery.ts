import { Result } from "../../../../core";
import { IQuery } from "../../../../core/mediator/queries/IQuery";
import { MaterialRequirementDto } from "../dto/MaterialRequirementDto";

export class GetMaterialRequirementsQuery implements IQuery<
  Result<readonly MaterialRequirementDto[]>
> {
  public readonly type = "GetMaterialRequirementsQuery";
  public readonly _resultType?: Result<readonly MaterialRequirementDto[]>;

  constructor(public readonly mrpRunId: string) {}
}
