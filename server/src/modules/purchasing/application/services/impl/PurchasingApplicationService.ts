import { Result } from '../../../../../core/results/Result';
import { IPurchasingApplicationService } from '../IPurchasingApplicationService';
import { IPurchasingValidator } from '../../validators';
import { 
    PurchaseOrderDto, 
    SupplierDto, 
    RequestForQuotationDto, 
    QuotationDto 
} from '../../dto';
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

import {
    CreatePurchaseOrderCommandHandler,
    AddPurchaseOrderLineCommandHandler,
    SubmitPurchaseOrderCommandHandler,
    ApprovePurchaseOrderCommandHandler,
    RejectPurchaseOrderCommandHandler,
    CancelPurchaseOrderCommandHandler,
    IssuePurchaseOrderCommandHandler,
    ReceiveGoodsCommandHandler,
    CreateSupplierCommandHandler,
    QualifySupplierCommandHandler,
    SuspendSupplierCommandHandler,
    CreateRfqCommandHandler,
    AddRfqTargetSupplierCommandHandler,
    PublishRfqCommandHandler,
    SubmitQuotationCommandHandler,
    AcceptQuotationCommandHandler,
    GetPurchaseOrderByIdQueryHandler,
    GetPurchaseOrdersQueryHandler,
    GetSupplierByIdQueryHandler,
    GetSuppliersQueryHandler,
    GetRfqByIdQueryHandler,
    GetRfqsQueryHandler,
    GetQuotationsByRfqIdQueryHandler
} from '../../handlers/impl';

export class PurchasingApplicationService implements IPurchasingApplicationService {
    constructor(
        private readonly validator: IPurchasingValidator,
        private readonly createPurchaseOrderHandler: CreatePurchaseOrderCommandHandler,
        private readonly addPurchaseOrderLineHandler: AddPurchaseOrderLineCommandHandler,
        private readonly submitPurchaseOrderHandler: SubmitPurchaseOrderCommandHandler,
        private readonly approvePurchaseOrderHandler: ApprovePurchaseOrderCommandHandler,
        private readonly rejectPurchaseOrderHandler: RejectPurchaseOrderCommandHandler,
        private readonly cancelPurchaseOrderHandler: CancelPurchaseOrderCommandHandler,
        private readonly issuePurchaseOrderHandler: IssuePurchaseOrderCommandHandler,
        private readonly receiveGoodsHandler: ReceiveGoodsCommandHandler,
        private readonly createSupplierHandler: CreateSupplierCommandHandler,
        private readonly qualifySupplierHandler: QualifySupplierCommandHandler,
        private readonly suspendSupplierHandler: SuspendSupplierCommandHandler,
        private readonly createRfqHandler: CreateRfqCommandHandler,
        private readonly addRfqTargetSupplierHandler: AddRfqTargetSupplierCommandHandler,
        private readonly publishRfqHandler: PublishRfqCommandHandler,
        private readonly submitQuotationHandler: SubmitQuotationCommandHandler,
        private readonly acceptQuotationHandler: AcceptQuotationCommandHandler,
        private readonly getPurchaseOrderByIdHandler: GetPurchaseOrderByIdQueryHandler,
        private readonly getPurchaseOrdersHandler: GetPurchaseOrdersQueryHandler,
        private readonly getSupplierByIdHandler: GetSupplierByIdQueryHandler,
        private readonly getSuppliersHandler: GetSuppliersQueryHandler,
        private readonly getRfqByIdHandler: GetRfqByIdQueryHandler,
        private readonly getRfqsHandler: GetRfqsQueryHandler,
        private readonly getQuotationsByRfqIdHandler: GetQuotationsByRfqIdQueryHandler
    ) {}

    async createPurchaseOrder(command: CreatePurchaseOrderCommand): Promise<Result<string>> {
        const validationResult = this.validator.validateCreatePurchaseOrder(command);
        if (validationResult.isFailure) return validationResult as any;
        return this.createPurchaseOrderHandler.handle(command);
    }

    async addPurchaseOrderLine(command: AddPurchaseOrderLineCommand): Promise<Result<void>> {
        const validationResult = this.validator.validateAddPurchaseOrderLine(command);
        if (validationResult.isFailure) return validationResult as any;
        return this.addPurchaseOrderLineHandler.handle(command);
    }

    async submitPurchaseOrder(command: SubmitPurchaseOrderCommand): Promise<Result<void>> {
        const validationResult = this.validator.validateSubmitPurchaseOrder(command);
        if (validationResult.isFailure) return validationResult as any;
        return this.submitPurchaseOrderHandler.handle(command);
    }

    async approvePurchaseOrder(command: ApprovePurchaseOrderCommand): Promise<Result<void>> {
        const validationResult = this.validator.validateApprovePurchaseOrder(command);
        if (validationResult.isFailure) return validationResult as any;
        return this.approvePurchaseOrderHandler.handle(command);
    }

    async rejectPurchaseOrder(command: RejectPurchaseOrderCommand): Promise<Result<void>> {
        const validationResult = this.validator.validateRejectPurchaseOrder(command);
        if (validationResult.isFailure) return validationResult as any;
        return this.rejectPurchaseOrderHandler.handle(command);
    }

    async cancelPurchaseOrder(command: CancelPurchaseOrderCommand): Promise<Result<void>> {
        const validationResult = this.validator.validateCancelPurchaseOrder(command);
        if (validationResult.isFailure) return validationResult as any;
        return this.cancelPurchaseOrderHandler.handle(command);
    }

    async issuePurchaseOrder(command: IssuePurchaseOrderCommand): Promise<Result<void>> {
        const validationResult = this.validator.validateIssuePurchaseOrder(command);
        if (validationResult.isFailure) return validationResult as any;
        return this.issuePurchaseOrderHandler.handle(command);
    }

    async receiveGoods(command: ReceiveGoodsCommand): Promise<Result<void>> {
        const validationResult = this.validator.validateReceiveGoods(command);
        if (validationResult.isFailure) return validationResult as any;
        return this.receiveGoodsHandler.handle(command);
    }

    async createSupplier(command: CreateSupplierCommand): Promise<Result<string>> {
        const validationResult = this.validator.validateCreateSupplier(command);
        if (validationResult.isFailure) return validationResult as any;
        return this.createSupplierHandler.handle(command);
    }

    async qualifySupplier(command: QualifySupplierCommand): Promise<Result<void>> {
        const validationResult = this.validator.validateQualifySupplier(command);
        if (validationResult.isFailure) return validationResult as any;
        return this.qualifySupplierHandler.handle(command);
    }

    async suspendSupplier(command: SuspendSupplierCommand): Promise<Result<void>> {
        const validationResult = this.validator.validateSuspendSupplier(command);
        if (validationResult.isFailure) return validationResult as any;
        return this.suspendSupplierHandler.handle(command);
    }

    async createRfq(command: CreateRfqCommand): Promise<Result<string>> {
        const validationResult = this.validator.validateCreateRfq(command);
        if (validationResult.isFailure) return validationResult as any;
        return this.createRfqHandler.handle(command);
    }

    async addRfqTargetSupplier(command: AddRfqTargetSupplierCommand): Promise<Result<void>> {
        const validationResult = this.validator.validateAddRfqTargetSupplier(command);
        if (validationResult.isFailure) return validationResult as any;
        return this.addRfqTargetSupplierHandler.handle(command);
    }

    async publishRfq(command: PublishRfqCommand): Promise<Result<void>> {
        const validationResult = this.validator.validatePublishRfq(command);
        if (validationResult.isFailure) return validationResult as any;
        return this.publishRfqHandler.handle(command);
    }

    async submitQuotation(command: SubmitQuotationCommand): Promise<Result<string>> {
        const validationResult = this.validator.validateSubmitQuotation(command);
        if (validationResult.isFailure) return validationResult as any;
        return this.submitQuotationHandler.handle(command);
    }

    async acceptQuotation(command: AcceptQuotationCommand): Promise<Result<void>> {
        const validationResult = this.validator.validateAcceptQuotation(command);
        if (validationResult.isFailure) return validationResult as any;
        return this.acceptQuotationHandler.handle(command);
    }

    async getPurchaseOrderById(query: GetPurchaseOrderByIdQuery): Promise<Result<PurchaseOrderDto>> {
        const validationResult = this.validator.validateGetPurchaseOrderById(query);
        if (validationResult.isFailure) return validationResult as any;
        return this.getPurchaseOrderByIdHandler.handle(query);
    }

    async getPurchaseOrders(query: GetPurchaseOrdersQuery): Promise<Result<readonly PurchaseOrderDto[]>> {
        const validationResult = this.validator.validateGetPurchaseOrders(query);
        if (validationResult.isFailure) return validationResult as any;
        return this.getPurchaseOrdersHandler.handle(query);
    }

    async getSupplierById(query: GetSupplierByIdQuery): Promise<Result<SupplierDto>> {
        const validationResult = this.validator.validateGetSupplierById(query);
        if (validationResult.isFailure) return validationResult as any;
        return this.getSupplierByIdHandler.handle(query);
    }

    async getSuppliers(query: GetSuppliersQuery): Promise<Result<readonly SupplierDto[]>> {
        const validationResult = this.validator.validateGetSuppliers(query);
        if (validationResult.isFailure) return validationResult as any;
        return this.getSuppliersHandler.handle(query);
    }

    async getRfqById(query: GetRfqByIdQuery): Promise<Result<RequestForQuotationDto>> {
        const validationResult = this.validator.validateGetRfqById(query);
        if (validationResult.isFailure) return validationResult as any;
        return this.getRfqByIdHandler.handle(query);
    }

    async getRfqs(query: GetRfqsQuery): Promise<Result<readonly RequestForQuotationDto[]>> {
        const validationResult = this.validator.validateGetRfqs(query);
        if (validationResult.isFailure) return validationResult as any;
        return this.getRfqsHandler.handle(query);
    }

    async getQuotationsByRfqId(query: GetQuotationsByRfqIdQuery): Promise<Result<readonly QuotationDto[]>> {
        const validationResult = this.validator.validateGetQuotationsByRfqId(query);
        if (validationResult.isFailure) return validationResult as any;
        return this.getQuotationsByRfqIdHandler.handle(query);
    }
}
