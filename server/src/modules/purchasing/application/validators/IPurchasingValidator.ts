import { Result } from '../../../../core/results/Result';
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
} from '../commands';
import {
    GetPurchaseOrderByIdQuery,
    GetPurchaseOrdersQuery,
    GetSupplierByIdQuery,
    GetSuppliersQuery,
    GetRfqByIdQuery,
    GetRfqsQuery,
    GetQuotationsByRfqIdQuery
} from '../queries';

export interface IPurchasingValidator {
    validateCreatePurchaseOrder(command: CreatePurchaseOrderCommand): Result<void>;
    validateAddPurchaseOrderLine(command: AddPurchaseOrderLineCommand): Result<void>;
    validateSubmitPurchaseOrder(command: SubmitPurchaseOrderCommand): Result<void>;
    validateApprovePurchaseOrder(command: ApprovePurchaseOrderCommand): Result<void>;
    validateRejectPurchaseOrder(command: RejectPurchaseOrderCommand): Result<void>;
    validateCancelPurchaseOrder(command: CancelPurchaseOrderCommand): Result<void>;
    validateIssuePurchaseOrder(command: IssuePurchaseOrderCommand): Result<void>;
    validateReceiveGoods(command: ReceiveGoodsCommand): Result<void>;
    
    validateCreateSupplier(command: CreateSupplierCommand): Result<void>;
    validateQualifySupplier(command: QualifySupplierCommand): Result<void>;
    validateSuspendSupplier(command: SuspendSupplierCommand): Result<void>;
    
    validateCreateRfq(command: CreateRfqCommand): Result<void>;
    validateAddRfqTargetSupplier(command: AddRfqTargetSupplierCommand): Result<void>;
    validatePublishRfq(command: PublishRfqCommand): Result<void>;
    validateSubmitQuotation(command: SubmitQuotationCommand): Result<void>;
    validateAcceptQuotation(command: AcceptQuotationCommand): Result<void>;

    validateGetPurchaseOrderById(query: GetPurchaseOrderByIdQuery): Result<void>;
    validateGetPurchaseOrders(query: GetPurchaseOrdersQuery): Result<void>;
    validateGetSupplierById(query: GetSupplierByIdQuery): Result<void>;
    validateGetSuppliers(query: GetSuppliersQuery): Result<void>;
    validateGetRfqById(query: GetRfqByIdQuery): Result<void>;
    validateGetRfqs(query: GetRfqsQuery): Result<void>;
    validateGetQuotationsByRfqId(query: GetQuotationsByRfqIdQuery): Result<void>;
}
