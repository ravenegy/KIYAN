import { Result } from '../../../core/results/Result';
import { IPurchasingApplicationService } from '../application/services/IPurchasingApplicationService';
import { IPurchasingIntegrationService } from './IPurchasingIntegrationService';
import { 
    PurchaseOrderDto, 
    SupplierDto, 
    RequestForQuotationDto, 
    QuotationDto 
} from '../application/dto';
import {
    CreatePurchaseOrderCommand,
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
} from '../application/commands';
import {
    GetPurchaseOrderByIdQuery,
    GetPurchaseOrdersQuery,
    GetSupplierByIdQuery,
    GetSuppliersQuery,
    GetRfqByIdQuery,
    GetRfqsQuery,
    GetQuotationsByRfqIdQuery
} from '../application/queries';

export class PurchasingIntegrationService implements IPurchasingIntegrationService {
    constructor(private readonly applicationService: IPurchasingApplicationService) {}

    // Purchase Orders
    async createPurchaseOrder(supplierId: string, expectedDeliveryDate: Date, notes: string): Promise<Result<string>> {
        const command = new CreatePurchaseOrderCommand(supplierId, expectedDeliveryDate, notes);
        return this.applicationService.createPurchaseOrder(command);
    }

    async getPurchaseOrder(orderId: string): Promise<Result<PurchaseOrderDto>> {
        const query = new GetPurchaseOrderByIdQuery(orderId);
        return this.applicationService.getPurchaseOrderById(query);
    }

    async getPurchaseOrders(status?: string, supplierId?: string): Promise<Result<readonly PurchaseOrderDto[]>> {
        const query = new GetPurchaseOrdersQuery(status, supplierId);
        return this.applicationService.getPurchaseOrders(query);
    }

    async submitPurchaseOrder(orderId: string): Promise<Result<void>> {
        const command = new SubmitPurchaseOrderCommand(orderId);
        return this.applicationService.submitPurchaseOrder(command);
    }

    async approvePurchaseOrder(orderId: string, approvedBy: string): Promise<Result<void>> {
        const command = new ApprovePurchaseOrderCommand(orderId, approvedBy);
        return this.applicationService.approvePurchaseOrder(command);
    }

    async rejectPurchaseOrder(orderId: string): Promise<Result<void>> {
        const command = new RejectPurchaseOrderCommand(orderId);
        return this.applicationService.rejectPurchaseOrder(command);
    }

    async cancelPurchaseOrder(orderId: string, reason: string): Promise<Result<void>> {
        const command = new CancelPurchaseOrderCommand(orderId, reason);
        return this.applicationService.cancelPurchaseOrder(command);
    }

    async issuePurchaseOrder(orderId: string): Promise<Result<void>> {
        const command = new IssuePurchaseOrderCommand(orderId);
        return this.applicationService.issuePurchaseOrder(command);
    }

    async receiveGoods(orderId: string, lineId: string, quantity: number): Promise<Result<void>> {
        const command = new ReceiveGoodsCommand(orderId, lineId, quantity);
        return this.applicationService.receiveGoods(command);
    }

    // Suppliers
    async createSupplier(name: string, contactEmail: string): Promise<Result<string>> {
        const command = new CreateSupplierCommand(name, contactEmail);
        return this.applicationService.createSupplier(command);
    }

    async qualifySupplier(supplierId: string, qualificationLevel: string): Promise<Result<void>> {
        const command = new QualifySupplierCommand(supplierId, qualificationLevel);
        return this.applicationService.qualifySupplier(command);
    }

    async suspendSupplier(supplierId: string): Promise<Result<void>> {
        const command = new SuspendSupplierCommand(supplierId);
        return this.applicationService.suspendSupplier(command);
    }

    async getSupplier(supplierId: string): Promise<Result<SupplierDto>> {
        const query = new GetSupplierByIdQuery(supplierId);
        return this.applicationService.getSupplierById(query);
    }

    async getSuppliers(status?: string, qualificationLevel?: string): Promise<Result<readonly SupplierDto[]>> {
        const query = new GetSuppliersQuery(status, qualificationLevel);
        return this.applicationService.getSuppliers(query);
    }

    // RFQs
    async createRfq(itemId: string, requiredQuantity: number, requiredByDate: Date): Promise<Result<string>> {
        const command = new CreateRfqCommand(itemId, requiredQuantity, requiredByDate);
        return this.applicationService.createRfq(command);
    }

    async addTargetSupplier(rfqId: string, supplierId: string): Promise<Result<void>> {
        const command = new AddRfqTargetSupplierCommand(rfqId, supplierId);
        return this.applicationService.addRfqTargetSupplier(command);
    }

    async publishRfq(rfqId: string): Promise<Result<void>> {
        const command = new PublishRfqCommand(rfqId);
        return this.applicationService.publishRfq(command);
    }

    async getRfq(rfqId: string): Promise<Result<RequestForQuotationDto>> {
        const query = new GetRfqByIdQuery(rfqId);
        return this.applicationService.getRfqById(query);
    }

    async getRfqs(status?: string): Promise<Result<readonly RequestForQuotationDto[]>> {
        const query = new GetRfqsQuery(status);
        return this.applicationService.getRfqs(query);
    }

    // Quotations
    async submitQuotation(rfqId: string, supplierId: string, unitPrice: number, leadTimeDays: number, validUntil: Date): Promise<Result<string>> {
        const command = new SubmitQuotationCommand(rfqId, supplierId, unitPrice, leadTimeDays, validUntil);
        return this.applicationService.submitQuotation(command);
    }

    async acceptQuotation(quotationId: string): Promise<Result<void>> {
        const command = new AcceptQuotationCommand(quotationId);
        return this.applicationService.acceptQuotation(command);
    }

    async getQuotationsByRfq(rfqId: string): Promise<Result<readonly QuotationDto[]>> {
        const query = new GetQuotationsByRfqIdQuery(rfqId);
        return this.applicationService.getQuotationsByRfqId(query);
    }
}
