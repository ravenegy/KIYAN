import { Result } from "../../../../core";
import { IQuery } from "../../../../core/mediator/queries/IQuery";
import { MrpRunDto } from "../dto/MrpRunDto";

export class GetMrpRunByIdQuery implements IQuery<Result<MrpRunDto | null>> {
  public readonly type = "GetMrpRunByIdQuery";
  public readonly _resultType?: Result<MrpRunDto | null>;

  constructor(public readonly id: string) {}
}
