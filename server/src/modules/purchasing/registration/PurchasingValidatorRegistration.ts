import { IContainer, Lifetime } from '../../../core/di';
import { PurchasingModuleTokens } from './PurchasingModuleTokens';
import { PurchasingValidator } from '../application/validators/impl/PurchasingValidator';

export class PurchasingValidatorRegistration {
  public static register(container: IContainer): void {
    container.register(PurchasingModuleTokens.IPurchasingValidator, () => {
      return new PurchasingValidator();
    }, Lifetime.Singleton);
  }
}
