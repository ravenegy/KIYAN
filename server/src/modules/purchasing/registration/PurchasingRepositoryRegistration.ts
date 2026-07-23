import { IContainer, Lifetime } from '../../../core/di';
import { PurchasingModuleTokens } from './PurchasingModuleTokens';

export class PurchasingRepositoryRegistration {
  public static register(container: IContainer): void {
    container.register(PurchasingModuleTokens.IPurchaseOrderRepository, (c) => {
      const factory = c.resolve(PurchasingModuleTokens.PurchasingRepositoryFactory);
      return factory.getPurchaseOrderRepository();
    }, Lifetime.Scoped);

    container.register(PurchasingModuleTokens.ISupplierRepository, (c) => {
      const factory = c.resolve(PurchasingModuleTokens.PurchasingRepositoryFactory);
      return factory.getSupplierRepository();
    }, Lifetime.Scoped);

    container.register(PurchasingModuleTokens.IRfqRepository, (c) => {
      const factory = c.resolve(PurchasingModuleTokens.PurchasingRepositoryFactory);
      return factory.getRfqRepository();
    }, Lifetime.Scoped);

    container.register(PurchasingModuleTokens.IQuotationRepository, (c) => {
      const factory = c.resolve(PurchasingModuleTokens.PurchasingRepositoryFactory);
      return factory.getQuotationRepository();
    }, Lifetime.Scoped);
  }
}
