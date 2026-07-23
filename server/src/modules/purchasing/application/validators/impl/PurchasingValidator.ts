import { Result } from '../../../../../core/results/Result';
import { IPurchasingValidator } from '../IPurchasingValidator';
import {
    CreatePurchaseOrderCommand,
    AddPurchaseOrderLineCommand,
    SubmitPurchaseOrderCommand,
    ApprovePurchaseOrderCommand,
    RejectPurchaseOrderCommand,
    CancelPurchaseOrderCommand,
    IssuePurchaseOrderCommand,
    ReceiveGoodsCommand,
    CreateSupplierCommand,
    QualifySupplierCommand,
    SuspendSupplierCommand,
    CreateRfqCommand,
    AddRfqTargetSupplierCommand,
    PublishRfqCommand,
    SubmitQuotationCommand,
    AcceptQuotationCommand
} from '../../commands';
import {
    GetPurchaseOrderByIdQuery,
    GetPurchaseOrdersQuery,
    GetSupplierByIdQuery,
    GetSuppliersQuery,
    GetRfqByIdQuery,
    GetRfqsQuery,
    GetQuotationsByRfqIdQuery
} from '../../queries';

export class PurchasingValidator implements IPurchasingValidator {
    validateCreatePurchaseOrder(command: CreatePurchaseOrderCommand): Result<void> {
        if (!command.supplierId) return Result.failure({ code: 'VALIDATION_ERROR', message: 'Supplier ID is required' });
        return Result.success();
    }
    validateAddPurchaseOrderLine(command: AddPurchaseOrderLineCommand): Result<void> {
        if (!command.orderId) return Result.failure({ code: 'VALIDATION_ERROR', message: 'Order ID is required' });
        return Result.success();
    }
    validateSubmitPurchaseOrder(command: SubmitPurchaseOrderCommand): Result<void> {
        if (!command.orderId) return Result.failure({ code: 'VALIDATION_ERROR', message: 'Order ID is required' });
        return Result.success();
    }
    validateApprovePurchaseOrder(command: ApprovePurchaseOrderCommand): Result<void> {
        if (!command.orderId) return Result.failure({ code: 'VALIDATION_ERROR', message: 'Order ID is required' });
        return Result.success();
    }
    validateRejectPurchaseOrder(command: RejectPurchaseOrderCommand): Result<void> {
        if (!command.orderId) return Result.failure({ code: 'VALIDATION_ERROR', message: 'Order ID is required' });
        return Result.success();
    }
    validateCancelPurchaseOrder(command: CancelPurchaseOrderCommand): Result<void> {
        if (!command.orderId) return Result.failure({ code: 'VALIDATION_ERROR', message: 'Order ID is required' });
        return Result.success();
    }
    validateIssuePurchaseOrder(command: IssuePurchaseOrderCommand): Result<void> {
        if (!command.orderId) return Result.failure({ code: 'VALIDATION_ERROR', message: 'Order ID is required' });
        return Result.success();
    }
    validateReceiveGoods(command: ReceiveGoodsCommand): Result<void> {
        if (!command.orderId) return Result.failure({ code: 'VALIDATION_ERROR', message: 'Order ID is required' });
        if (!command.lineId) return Result.failure({ code: 'VALIDATION_ERROR', message: 'Line ID is required' });
        return Result.success();
    }
    
    validateCreateSupplier(command: CreateSupplierCommand): Result<void> {
        if (!command.name) return Result.failure({ code: 'VALIDATION_ERROR', message: 'Name is required' });
        return Result.success();
    }
    validateQualifySupplier(command: QualifySupplierCommand): Result<void> {
        if (!command.supplierId) return Result.failure({ code: 'VALIDATION_ERROR', message: 'Supplier ID is required' });
        return Result.success();
    }
    validateSuspendSupplier(command: SuspendSupplierCommand): Result<void> {
        if (!command.supplierId) return Result.failure({ code: 'VALIDATION_ERROR', message: 'Supplier ID is required' });
        return Result.success();
    }
    
    validateCreateRfq(command: CreateRfqCommand): Result<void> {
        if (!command.itemId) return Result.failure({ code: 'VALIDATION_ERROR', message: 'Item ID is required' });
        return Result.success();
    }
    validateAddRfqTargetSupplier(command: AddRfqTargetSupplierCommand): Result<void> {
        if (!command.rfqId) return Result.failure({ code: 'VALIDATION_ERROR', message: 'RFQ ID is required' });
        if (!command.supplierId) return Result.failure({ code: 'VALIDATION_ERROR', message: 'Supplier ID is required' });
        return Result.success();
    }
    validatePublishRfq(command: PublishRfqCommand): Result<void> {
        if (!command.rfqId) return Result.failure({ code: 'VALIDATION_ERROR', message: 'RFQ ID is required' });
        return Result.success();
    }
    validateSubmitQuotation(command: SubmitQuotationCommand): Result<void> {
        if (!command.rfqId) return Result.failure({ code: 'VALIDATION_ERROR', message: 'RFQ ID is required' });
        if (!command.supplierId) return Result.failure({ code: 'VALIDATION_ERROR', message: 'Supplier ID is required' });
        return Result.success();
    }
    validateAcceptQuotation(command: AcceptQuotationCommand): Result<void> {
        if (!command.quotationId) return Result.failure({ code: 'VALIDATION_ERROR', message: 'Quotation ID is required' });
        return Result.success();
    }

    validateGetPurchaseOrderById(query: GetPurchaseOrderByIdQuery): Result<void> {
        if (!query.orderId) return Result.failure({ code: 'VALIDATION_ERROR', message: 'Order ID is required' });
        return Result.success();
    }
    validateGetPurchaseOrders(query: GetPurchaseOrdersQuery): Result<void> {
        return Result.success();
    }
    validateGetSupplierById(query: GetSupplierByIdQuery): Result<void> {
        if (!query.supplierId) return Result.failure({ code: 'VALIDATION_ERROR', message: 'Supplier ID is required' });
        return Result.success();
    }
    validateGetSuppliers(query: GetSuppliersQuery): Result<void> {
        return Result.success();
    }
    validateGetRfqById(query: GetRfqByIdQuery): Result<void> {
        if (!query.rfqId) return Result.failure({ code: 'VALIDATION_ERROR', message: 'RFQ ID is required' });
        return Result.success();
    }
    validateGetRfqs(query: GetRfqsQuery): Result<void> {
        return Result.success();
    }
    validateGetQuotationsByRfqId(query: GetQuotationsByRfqIdQuery): Result<void> {
        if (!query.rfqId) return Result.failure({ code: 'VALIDATION_ERROR', message: 'RFQ ID is required' });
        return Result.success();
    }
}
