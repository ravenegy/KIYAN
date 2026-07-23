import { IContainer, Lifetime } from '../../../core/di';
import { PurchasingModuleTokens } from './PurchasingModuleTokens';
import { PurchasingMapper } from '../application/mappers/impl/PurchasingMapper';

export class PurchasingMapperRegistration {
  public static register(container: IContainer): void {
    container.register(PurchasingModuleTokens.IPurchasingMapper, () => {
      return new PurchasingMapper();
    }, Lifetime.Singleton);
  }
}
