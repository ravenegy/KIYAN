import { ILocalizationApplicationService } from '../../application/interfaces/ILocalizationApplicationService';
import { IRequest } from '../contracts/IRequest';
import { IResponse } from '../contracts/IResponse';
import { ApiResponse } from '../models/responses/ApiResponse';

export class LocalizationController {
  constructor(private readonly localizationService: ILocalizationApplicationService) {}

  public async getTranslation(req: IRequest<unknown, { key: string; locale: string }, unknown>, res: IResponse): Promise<void> {
    const result = await this.localizationService.getTranslation(req.query.key, req.query.locale);
    if (result.isSuccess) {
      const response: ApiResponse<string> = {
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
