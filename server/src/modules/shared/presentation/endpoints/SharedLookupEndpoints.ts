import { IRouter } from '../contracts/IRouter';
import { SharedLookupController } from '../controllers/SharedLookupController';

export class SharedLookupEndpoints {
  public static register(router: IRouter, controller: SharedLookupController): void {
    router.get('/api/v1/shared/lookups/:id', controller.getLookupById.bind(controller));
    router.get('/api/v1/shared/lookups/code/:code', controller.getLookupByCode.bind(controller));
  }
}
