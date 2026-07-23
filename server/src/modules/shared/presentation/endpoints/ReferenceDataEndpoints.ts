import { IRouter } from '../contracts/IRouter';
import { ReferenceDataController } from '../controllers/ReferenceDataController';

export class ReferenceDataEndpoints {
  public static register(router: IRouter, controller: ReferenceDataController): void {
    router.get('/api/v1/shared/reference-data/:type', controller.getReferenceData.bind(controller));
  }
}
