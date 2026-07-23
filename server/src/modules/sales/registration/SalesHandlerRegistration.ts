import { IContainer, Lifetime } from '../../../core/di';
import { SalesModuleTokens } from './SalesModuleTokens';
import {
    CreateCustomerCommandHandler,
    UpdateCustomerCommandHandler,
    SuspendCustomerCommandHandler,
    ReactivateCustomerCommandHandler,
    CreateSalesOrderCommandHandler,
    AddSalesOrderLineCommandHandler,
    RemoveSalesOrderLineCommandHandler,
    ConfirmSalesOrderCommandHandler,
    CancelSalesOrderCommandHandler,
    CompleteSalesOrderCommandHandler,
    CreateSalesQuotationCommandHandler,
    AddSalesQuotationLineCommandHandler,
    SubmitSalesQuotationCommandHandler,
    AcceptSalesQuotationCommandHandler,
    RejectSalesQuotationCommandHandler,
    CreateSalesInvoiceCommandHandler,
    AddSalesInvoiceLineCommandHandler,
    IssueSalesInvoiceCommandHandler,
    CancelSalesInvoiceCommandHandler
} from '../application/handlers/command-handlers';

import {
    GetCustomerByIdQueryHandler,
    GetCustomersQueryHandler,
    GetSalesOrderByIdQueryHandler,
    GetSalesOrdersQueryHandler,
    GetSalesQuotationByIdQueryHandler,
    GetSalesQuotationsQueryHandler,
    GetSalesInvoiceByIdQueryHandler,
    GetSalesInvoicesQueryHandler
} from '../application/handlers/query-handlers';

export class SalesHandlerRegistration {
    public static register(container: IContainer): void {
        // --- Command Handlers ---

        // Customer
        container.register(SalesModuleTokens.CreateCustomerCommandHandler, (c) => {
            return new CreateCustomerCommandHandler(
                c.resolve(SalesModuleTokens.ICustomerRepository)
            );
        }, Lifetime.Scoped);
        container.register(SalesModuleTokens.UpdateCustomerCommandHandler, (c) => {
            return new UpdateCustomerCommandHandler(
                c.resolve(SalesModuleTokens.ICustomerRepository)
            );
        }, Lifetime.Scoped);
        container.register(SalesModuleTokens.SuspendCustomerCommandHandler, (c) => {
            return new SuspendCustomerCommandHandler(
                c.resolve(SalesModuleTokens.ICustomerRepository)
            );
        }, Lifetime.Scoped);
        container.register(SalesModuleTokens.ReactivateCustomerCommandHandler, (c) => {
            return new ReactivateCustomerCommandHandler(
                c.resolve(SalesModuleTokens.ICustomerRepository)
            );
        }, Lifetime.Scoped);

        // Sales Order
        container.register(SalesModuleTokens.CreateSalesOrderCommandHandler, (c) => {
            return new CreateSalesOrderCommandHandler(
                c.resolve(SalesModuleTokens.ISalesOrderRepository),
                c.resolve(SalesModuleTokens.ICustomerRepository)
            );
        }, Lifetime.Scoped);
        container.register(SalesModuleTokens.AddSalesOrderLineCommandHandler, (c) => {
            return new AddSalesOrderLineCommandHandler(
                c.resolve(SalesModuleTokens.ISalesOrderRepository)
            );
        }, Lifetime.Scoped);
        container.register(SalesModuleTokens.RemoveSalesOrderLineCommandHandler, (c) => {
            return new RemoveSalesOrderLineCommandHandler(
                c.resolve(SalesModuleTokens.ISalesOrderRepository)
            );
        }, Lifetime.Scoped);
        container.register(SalesModuleTokens.ConfirmSalesOrderCommandHandler, (c) => {
            return new ConfirmSalesOrderCommandHandler(
                c.resolve(SalesModuleTokens.ISalesOrderRepository)
            );
        }, Lifetime.Scoped);
        container.register(SalesModuleTokens.CancelSalesOrderCommandHandler, (c) => {
            return new CancelSalesOrderCommandHandler(
                c.resolve(SalesModuleTokens.ISalesOrderRepository)
            );
        }, Lifetime.Scoped);
        container.register(SalesModuleTokens.CompleteSalesOrderCommandHandler, (c) => {
            return new CompleteSalesOrderCommandHandler(
                c.resolve(SalesModuleTokens.ISalesOrderRepository)
            );
        }, Lifetime.Scoped);

        // Sales Quotation
        container.register(SalesModuleTokens.CreateSalesQuotationCommandHandler, (c) => {
            return new CreateSalesQuotationCommandHandler(
                c.resolve(SalesModuleTokens.ISalesQuotationRepository),
                c.resolve(SalesModuleTokens.ICustomerRepository)
            );
        }, Lifetime.Scoped);
        container.register(SalesModuleTokens.AddSalesQuotationLineCommandHandler, (c) => {
            return new AddSalesQuotationLineCommandHandler(
                c.resolve(SalesModuleTokens.ISalesQuotationRepository)
            );
        }, Lifetime.Scoped);
        container.register(SalesModuleTokens.SubmitSalesQuotationCommandHandler, (c) => {
            return new SubmitSalesQuotationCommandHandler(
                c.resolve(SalesModuleTokens.ISalesQuotationRepository)
            );
        }, Lifetime.Scoped);
        container.register(SalesModuleTokens.AcceptSalesQuotationCommandHandler, (c) => {
            return new AcceptSalesQuotationCommandHandler(
                c.resolve(SalesModuleTokens.ISalesQuotationRepository)
            );
        }, Lifetime.Scoped);
        container.register(SalesModuleTokens.RejectSalesQuotationCommandHandler, (c) => {
            return new RejectSalesQuotationCommandHandler(
                c.resolve(SalesModuleTokens.ISalesQuotationRepository)
            );
        }, Lifetime.Scoped);

        // Sales Invoice
        container.register(SalesModuleTokens.CreateSalesInvoiceCommandHandler, (c) => {
            return new CreateSalesInvoiceCommandHandler(
                c.resolve(SalesModuleTokens.ISalesInvoiceRepository)
            );
        }, Lifetime.Scoped);
        container.register(SalesModuleTokens.AddSalesInvoiceLineCommandHandler, (c) => {
            return new AddSalesInvoiceLineCommandHandler(
                c.resolve(SalesModuleTokens.ISalesInvoiceRepository)
            );
        }, Lifetime.Scoped);
        container.register(SalesModuleTokens.IssueSalesInvoiceCommandHandler, (c) => {
            return new IssueSalesInvoiceCommandHandler(
                c.resolve(SalesModuleTokens.ISalesInvoiceRepository)
            );
        }, Lifetime.Scoped);
        container.register(SalesModuleTokens.CancelSalesInvoiceCommandHandler, (c) => {
            return new CancelSalesInvoiceCommandHandler(
                c.resolve(SalesModuleTokens.ISalesInvoiceRepository)
            );
        }, Lifetime.Scoped);

        // --- Query Handlers ---
        
        container.register(SalesModuleTokens.GetCustomerByIdQueryHandler, (c) => {
            return new GetCustomerByIdQueryHandler(
                c.resolve(SalesModuleTokens.ISalesQueryService)
            );
        }, Lifetime.Scoped);
        container.register(SalesModuleTokens.GetCustomersQueryHandler, (c) => {
            return new GetCustomersQueryHandler(
                c.resolve(SalesModuleTokens.ISalesQueryService)
            );
        }, Lifetime.Scoped);

        container.register(SalesModuleTokens.GetSalesOrderByIdQueryHandler, (c) => {
            return new GetSalesOrderByIdQueryHandler(
                c.resolve(SalesModuleTokens.ISalesQueryService)
            );
        }, Lifetime.Scoped);
        container.register(SalesModuleTokens.GetSalesOrdersQueryHandler, (c) => {
            return new GetSalesOrdersQueryHandler(
                c.resolve(SalesModuleTokens.ISalesQueryService)
            );
        }, Lifetime.Scoped);

        container.register(SalesModuleTokens.GetSalesQuotationByIdQueryHandler, (c) => {
            return new GetSalesQuotationByIdQueryHandler(
                c.resolve(SalesModuleTokens.ISalesQueryService)
            );
        }, Lifetime.Scoped);
        container.register(SalesModuleTokens.GetSalesQuotationsQueryHandler, (c) => {
            return new GetSalesQuotationsQueryHandler(
                c.resolve(SalesModuleTokens.ISalesQueryService)
            );
        }, Lifetime.Scoped);

        container.register(SalesModuleTokens.GetSalesInvoiceByIdQueryHandler, (c) => {
            return new GetSalesInvoiceByIdQueryHandler(
                c.resolve(SalesModuleTokens.ISalesQueryService)
            );
        }, Lifetime.Scoped);
        container.register(SalesModuleTokens.GetSalesInvoicesQueryHandler, (c) => {
            return new GetSalesInvoicesQueryHandler(
                c.resolve(SalesModuleTokens.ISalesQueryService)
            );
        }, Lifetime.Scoped);
    }
}
