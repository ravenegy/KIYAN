import { IRouter } from '../contracts/IRouter';
import { LocalizationController } from '../controllers/LocalizationController';

export class LocalizationEndpoints {
  public static register(router: IRouter, controller: LocalizationController): void {
    router.get('/api/v1/shared/localization', controller.getTranslation.bind(controller));
  }
}
