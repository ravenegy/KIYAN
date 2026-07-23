import { Token } from '../../../core/di';

import { ISalesApplicationService } from '../application/services/ISalesApplicationService';
import { ISalesQueryService } from '../application/queries/ISalesQueryService';

import { 
    ICustomerRepository, 
    ISalesOrderRepository, 
    ISalesQuotationRepository, 
    ISalesInvoiceRepository 
} from '../domain/repositories';

import { SalesRepositoryFactory } from '../infrastructure/factory/SalesRepositoryFactory';

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

export const SalesModuleTokens = {
    // Application Services
    ISalesApplicationService: new Token<ISalesApplicationService>('ISalesApplicationService'),
    ISalesQueryService: new Token<ISalesQueryService>('ISalesQueryService'),

    // Repositories
    ICustomerRepository: new Token<ICustomerRepository>('ICustomerRepository'),
    ISalesOrderRepository: new Token<ISalesOrderRepository>('ISalesOrderRepository'),
    ISalesQuotationRepository: new Token<ISalesQuotationRepository>('ISalesQuotationRepository'),
    ISalesInvoiceRepository: new Token<ISalesInvoiceRepository>('ISalesInvoiceRepository'),

    // Factories
    SalesRepositoryFactory: new Token<SalesRepositoryFactory>('SalesRepositoryFactory'),

    // Handlers - Commands
    CreateCustomerCommandHandler: new Token<CreateCustomerCommandHandler>('CreateCustomerCommandHandler'),
    UpdateCustomerCommandHandler: new Token<UpdateCustomerCommandHandler>('UpdateCustomerCommandHandler'),
    SuspendCustomerCommandHandler: new Token<SuspendCustomerCommandHandler>('SuspendCustomerCommandHandler'),
    ReactivateCustomerCommandHandler: new Token<ReactivateCustomerCommandHandler>('ReactivateCustomerCommandHandler'),
    CreateSalesOrderCommandHandler: new Token<CreateSalesOrderCommandHandler>('CreateSalesOrderCommandHandler'),
    AddSalesOrderLineCommandHandler: new Token<AddSalesOrderLineCommandHandler>('AddSalesOrderLineCommandHandler'),
    RemoveSalesOrderLineCommandHandler: new Token<RemoveSalesOrderLineCommandHandler>('RemoveSalesOrderLineCommandHandler'),
    ConfirmSalesOrderCommandHandler: new Token<ConfirmSalesOrderCommandHandler>('ConfirmSalesOrderCommandHandler'),
    CancelSalesOrderCommandHandler: new Token<CancelSalesOrderCommandHandler>('CancelSalesOrderCommandHandler'),
    CompleteSalesOrderCommandHandler: new Token<CompleteSalesOrderCommandHandler>('CompleteSalesOrderCommandHandler'),
    CreateSalesQuotationCommandHandler: new Token<CreateSalesQuotationCommandHandler>('CreateSalesQuotationCommandHandler'),
    AddSalesQuotationLineCommandHandler: new Token<AddSalesQuotationLineCommandHandler>('AddSalesQuotationLineCommandHandler'),
    SubmitSalesQuotationCommandHandler: new Token<SubmitSalesQuotationCommandHandler>('SubmitSalesQuotationCommandHandler'),
    AcceptSalesQuotationCommandHandler: new Token<AcceptSalesQuotationCommandHandler>('AcceptSalesQuotationCommandHandler'),
    RejectSalesQuotationCommandHandler: new Token<RejectSalesQuotationCommandHandler>('RejectSalesQuotationCommandHandler'),
    CreateSalesInvoiceCommandHandler: new Token<CreateSalesInvoiceCommandHandler>('CreateSalesInvoiceCommandHandler'),
    AddSalesInvoiceLineCommandHandler: new Token<AddSalesInvoiceLineCommandHandler>('AddSalesInvoiceLineCommandHandler'),
    IssueSalesInvoiceCommandHandler: new Token<IssueSalesInvoiceCommandHandler>('IssueSalesInvoiceCommandHandler'),
    CancelSalesInvoiceCommandHandler: new Token<CancelSalesInvoiceCommandHandler>('CancelSalesInvoiceCommandHandler'),

    // Handlers - Queries
    GetCustomerByIdQueryHandler: new Token<GetCustomerByIdQueryHandler>('GetCustomerByIdQueryHandler'),
    GetCustomersQueryHandler: new Token<GetCustomersQueryHandler>('GetCustomersQueryHandler'),
    GetSalesOrderByIdQueryHandler: new Token<GetSalesOrderByIdQueryHandler>('GetSalesOrderByIdQueryHandler'),
    GetSalesOrdersQueryHandler: new Token<GetSalesOrdersQueryHandler>('GetSalesOrdersQueryHandler'),
    GetSalesQuotationByIdQueryHandler: new Token<GetSalesQuotationByIdQueryHandler>('GetSalesQuotationByIdQueryHandler'),
    GetSalesQuotationsQueryHandler: new Token<GetSalesQuotationsQueryHandler>('GetSalesQuotationsQueryHandler'),
    GetSalesInvoiceByIdQueryHandler: new Token<GetSalesInvoiceByIdQueryHandler>('GetSalesInvoiceByIdQueryHandler'),
    GetSalesInvoicesQueryHandler: new Token<GetSalesInvoicesQueryHandler>('GetSalesInvoicesQueryHandler')
};
