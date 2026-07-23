import { IReferenceDataService } from '../../application/interfaces/IReferenceDataService';
import { IRequest } from '../contracts/IRequest';
import { IResponse } from '../contracts/IResponse';
import { ApiResponse } from '../models/responses/ApiResponse';
import { ReferenceResponse } from '../models/responses/ReferenceResponse';

export class ReferenceDataController {
  constructor(private readonly referenceDataService: IReferenceDataService) {}

  public async getReferenceData(req: IRequest<unknown, unknown, { type: string }>, res: IResponse): Promise<void> {
    const result = await this.referenceDataService.getReferenceData<ReferenceResponse>(req.params.type);
    if (result.isSuccess) {
      const response: ApiResponse<ReadonlyArray<ReferenceResponse>> = {
        success: true,
        data: result.value,
      };
      res.status(200).json(response);
    } else {
      const errorResponse: ApiResponse<null> = {
        success: false,
        error: result.error?.message,
        errorCode: result.error?.code,
      };
      res.status(400).json(errorResponse);
    }
  }
}
