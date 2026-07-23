import { Result } from '../../../../core/results/Result';
import { 
    PurchaseOrderDto, 
    SupplierDto, 
    RequestForQuotationDto, 
    QuotationDto 
} from '../dto';
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

export interface IPurchasingApplicationService {
    // Commands
    createPurchaseOrder(command: CreatePurchaseOrderCommand): Promise<Result<string>>;
    addPurchaseOrderLine(command: AddPurchaseOrderLineCommand): Promise<Result<void>>;
    submitPurchaseOrder(command: SubmitPurchaseOrderCommand): Promise<Result<void>>;
    approvePurchaseOrder(command: ApprovePurchaseOrderCommand): Promise<Result<void>>;
    rejectPurchaseOrder(command: RejectPurchaseOrderCommand): Promise<Result<void>>;
    cancelPurchaseOrder(command: CancelPurchaseOrderCommand): Promise<Result<void>>;
    issuePurchaseOrder(command: IssuePurchaseOrderCommand): Promise<Result<void>>;
    receiveGoods(command: ReceiveGoodsCommand): Promise<Result<void>>;
    
    createSupplier(command: CreateSupplierCommand): Promise<Result<string>>;
    qualifySupplier(command: QualifySupplierCommand): Promise<Result<void>>;
    suspendSupplier(command: SuspendSupplierCommand): Promise<Result<void>>;
    
    createRfq(command: CreateRfqCommand): Promise<Result<string>>;
    addRfqTargetSupplier(command: AddRfqTargetSupplierCommand): Promise<Result<void>>;
    publishRfq(command: PublishRfqCommand): Promise<Result<void>>;
    submitQuotation(command: SubmitQuotationCommand): Promise<Result<string>>;
    acceptQuotation(command: AcceptQuotationCommand): Promise<Result<void>>;

    // Queries
    getPurchaseOrderById(query: GetPurchaseOrderByIdQuery): Promise<Result<PurchaseOrderDto>>;
    getPurchaseOrders(query: GetPurchaseOrdersQuery): Promise<Result<readonly PurchaseOrderDto[]>>;
    
    getSupplierById(query: GetSupplierByIdQuery): Promise<Result<SupplierDto>>;
    getSuppliers(query: GetSuppliersQuery): Promise<Result<readonly SupplierDto[]>>;
    
    getRfqById(query: GetRfqByIdQuery): Promise<Result<RequestForQuotationDto>>;
    getRfqs(query: GetRfqsQuery): Promise<Result<readonly RequestForQuotationDto[]>>;
    
    getQuotationsByRfqId(query: GetQuotationsByRfqIdQuery): Promise<Result<readonly QuotationDto[]>>;
}
