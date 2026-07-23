import { IContainer, Lifetime } from '../../../core/di';
import { PurchasingModuleTokens } from './PurchasingModuleTokens';
import { PurchasingRepositoryFactory } from '../infrastructure/factories/PurchasingRepositoryFactory';

export class PurchasingFactoryRegistration {
  public static register(container: IContainer): void {
    container.register(PurchasingModuleTokens.PurchasingRepositoryFactory, () => {
      return new PurchasingRepositoryFactory();
    }, Lifetime.Singleton);
  }
}
