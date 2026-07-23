import { IContainer, Lifetime } from '../../../core/di';
import { SalesModuleTokens } from './SalesModuleTokens';

export class SalesRepositoryRegistration {
    public static register(container: IContainer): void {
        container.register(SalesModuleTokens.ICustomerRepository, (c) => {
            const factory = c.resolve(SalesModuleTokens.SalesRepositoryFactory);
            return factory.createCustomerRepository();
        }, Lifetime.Scoped);

        container.register(SalesModuleTokens.ISalesOrderRepository, (c) => {
            const factory = c.resolve(SalesModuleTokens.SalesRepositoryFactory);
            return factory.createSalesOrderRepository();
        }, Lifetime.Scoped);

        container.register(SalesModuleTokens.ISalesQuotationRepository, (c) => {
            const factory = c.resolve(SalesModuleTokens.SalesRepositoryFactory);
            return factory.createSalesQuotationRepository();
        }, Lifetime.Scoped);

        container.register(SalesModuleTokens.ISalesInvoiceRepository, (c) => {
            const factory = c.resolve(SalesModuleTokens.SalesRepositoryFactory);
            return factory.createSalesInvoiceRepository();
        }, Lifetime.Scoped);
    }
}
