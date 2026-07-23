import { ISharedLookupService } from '../../application/interfaces/ISharedLookupService';
import { IRequest } from '../contracts/IRequest';
import { IResponse } from '../contracts/IResponse';
import { ApiResponse } from '../models/responses/ApiResponse';
import { LookupResponse } from '../models/responses/LookupResponse';

export class SharedLookupController {
  constructor(private readonly lookupService: ISharedLookupService) {}

  public async getLookupById(req: IRequest<unknown, unknown, { id: string }>, res: IResponse): Promise<void> {
    const result = await this.lookupService.getLookupById(req.params.id);
    if (result.isSuccess) {
      const response: ApiResponse<LookupResponse> = {
        success: true,
        data: result.value as unknown as LookupResponse,
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

  public async getLookupByCode(req: IRequest<unknown, unknown, { code: string }>, res: IResponse): Promise<void> {
    const result = await this.lookupService.getLookupByCode(req.params.code);
    if (result.isSuccess) {
      const response: ApiResponse<LookupResponse> = {
        success: true,
        data: result.value as unknown as LookupResponse,
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
