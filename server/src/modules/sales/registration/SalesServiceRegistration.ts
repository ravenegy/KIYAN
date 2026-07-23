import { IContainer, Lifetime } from '../../../core/di';
import { SalesModuleTokens } from './SalesModuleTokens';
import { SalesApplicationService } from '../application/services/SalesApplicationService';

export class SalesServiceRegistration {
    public static register(container: IContainer): void {
        container.register(SalesModuleTokens.ISalesApplicationService, (c) => {
            return new SalesApplicationService(
                c.resolve(SalesModuleTokens.CreateCustomerCommandHandler),
                c.resolve(SalesModuleTokens.UpdateCustomerCommandHandler),
                c.resolve(SalesModuleTokens.SuspendCustomerCommandHandler),
                c.resolve(SalesModuleTokens.ReactivateCustomerCommandHandler),
                c.resolve(SalesModuleTokens.GetCustomerByIdQueryHandler),
                c.resolve(SalesModuleTokens.GetCustomersQueryHandler),

                c.resolve(SalesModuleTokens.CreateSalesOrderCommandHandler),
                c.resolve(SalesModuleTokens.AddSalesOrderLineCommandHandler),
                c.resolve(SalesModuleTokens.RemoveSalesOrderLineCommandHandler),
                c.resolve(SalesModuleTokens.ConfirmSalesOrderCommandHandler),
                c.resolve(SalesModuleTokens.CancelSalesOrderCommandHandler),
                c.resolve(SalesModuleTokens.CompleteSalesOrderCommandHandler),
                c.resolve(SalesModuleTokens.GetSalesOrderByIdQueryHandler),
                c.resolve(SalesModuleTokens.GetSalesOrdersQueryHandler),

                c.resolve(SalesModuleTokens.CreateSalesQuotationCommandHandler),
                c.resolve(SalesModuleTokens.AddSalesQuotationLineCommandHandler),
                c.resolve(SalesModuleTokens.SubmitSalesQuotationCommandHandler),
                c.resolve(SalesModuleTokens.AcceptSalesQuotationCommandHandler),
                c.resolve(SalesModuleTokens.RejectSalesQuotationCommandHandler),
                c.resolve(SalesModuleTokens.GetSalesQuotationByIdQueryHandler),
                c.resolve(SalesModuleTokens.GetSalesQuotationsQueryHandler),

                c.resolve(SalesModuleTokens.CreateSalesInvoiceCommandHandler),
                c.resolve(SalesModuleTokens.AddSalesInvoiceLineCommandHandler),
                c.resolve(SalesModuleTokens.IssueSalesInvoiceCommandHandler),
                c.resolve(SalesModuleTokens.CancelSalesInvoiceCommandHandler),
                c.resolve(SalesModuleTokens.GetSalesInvoiceByIdQueryHandler),
                c.resolve(SalesModuleTokens.GetSalesInvoicesQueryHandler)
            );
        }, Lifetime.Scoped);
    }
}
