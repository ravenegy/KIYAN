import { PurchaseOrder, PurchaseOrderLine, Supplier, RequestForQuotation, Quotation } from '../../../domain/entities';
import { PurchaseOrderId, SupplierId, RfqId, QuotationId } from '../../../domain/shared';
import { Quantity, Money } from '../../../domain/value-objects';
import { 
    PurchaseOrderPersistenceModel, 
    PurchaseOrderLinePersistenceModel, 
    SupplierPersistenceModel, 
    RfqPersistenceModel, 
    QuotationPersistenceModel 
} from '../models';

export class PurchasingPersistenceMapper {
    // ----------------------------------------------------
    // Purchase Order Mapping
    // ----------------------------------------------------
    public toPurchaseOrderPersistence(entity: PurchaseOrder): PurchaseOrderPersistenceModel {
        // We use any to access private fields as there's no native persistence getter
        const lines = (entity as any)._lines as PurchaseOrderLine[];
        
        return {
            id: entity.id.value,
            supplierId: entity.supplierId.value,
            expectedDeliveryDate: entity.expectedDeliveryDate,
            notes: entity.notes,
            status: entity.status,
            approvalStatus: entity.approvalStatus,
            lines: lines.map(l => this.toPurchaseOrderLinePersistence(l))
        };
    }

    public toPurchaseOrderDomain(model: PurchaseOrderPersistenceModel): PurchaseOrder {
        const order = new PurchaseOrder(
            new PurchaseOrderId(model.id),
            new SupplierId(model.supplierId),
            model.expectedDeliveryDate,
            model.notes
        );
        
        (order as any)._status = model.status;
        (order as any)._approvalStatus = model.approvalStatus;
        (order as any)._lines = model.lines.map(l => this.toPurchaseOrderLineDomain(l));

        order.clearDomainEvents();
        return order;
    }

    private toPurchaseOrderLinePersistence(entity: PurchaseOrderLine): PurchaseOrderLinePersistenceModel {
        return {
            id: entity.id,
            itemId: entity.itemId,
            quantity: entity.quantity.value,
            unitPrice: entity.unitPrice.amount,
            expectedDeliveryDate: entity.expectedDeliveryDate,
            receivedQuantity: entity.receivedQuantity.value
        };
    }

    private toPurchaseOrderLineDomain(model: PurchaseOrderLinePersistenceModel): PurchaseOrderLine {
        const line = new PurchaseOrderLine(
            model.id,
            model.itemId,
            new Quantity(model.quantity),
            new Money(model.unitPrice),
            model.expectedDeliveryDate
        );

        (line as any)._receivedQuantity = new Quantity(model.receivedQuantity);

        return line;
    }

    // ----------------------------------------------------
    // Supplier Mapping
    // ----------------------------------------------------
    public toSupplierPersistence(entity: Supplier): SupplierPersistenceModel {
        return {
            id: entity.id.value,
            name: entity.name,
            contactEmail: entity.contactEmail,
            status: entity.status,
            qualificationLevel: entity.qualificationLevel,
            rating: entity.rating
        };
    }

    public toSupplierDomain(model: SupplierPersistenceModel): Supplier {
        const supplier = new Supplier(
            new SupplierId(model.id),
            model.name,
            model.contactEmail,
            model.qualificationLevel
        );

        (supplier as any)._status = model.status;
        (supplier as any)._rating = model.rating;

        supplier.clearDomainEvents();
        return supplier;
    }

    // ----------------------------------------------------
    // RFQ Mapping
    // ----------------------------------------------------
    public toRfqPersistence(entity: RequestForQuotation): RfqPersistenceModel {
        return {
            id: entity.id.value,
            itemId: entity.itemId,
            requiredQuantity: entity.requiredQuantity.value,
            requiredByDate: entity.requiredByDate,
            status: entity.status,
            targetSuppliers: entity.targetSuppliers.map(s => s.value)
        };
    }

    public toRfqDomain(model: RfqPersistenceModel): RequestForQuotation {
        const rfq = new RequestForQuotation(
            new RfqId(model.id),
            model.itemId,
            new Quantity(model.requiredQuantity),
            model.requiredByDate
        );

        (rfq as any)._status = model.status;
        (rfq as any)._targetSuppliers = model.targetSuppliers.map(s => new SupplierId(s));

        rfq.clearDomainEvents();
        return rfq;
    }

    // ----------------------------------------------------
    // Quotation Mapping
    // ----------------------------------------------------
    public toQuotationPersistence(entity: Quotation): QuotationPersistenceModel {
        return {
            id: entity.id.value,
            rfqId: entity.rfqId.value,
            supplierId: entity.supplierId.value,
            unitPrice: entity.unitPrice.amount,
            leadTimeDays: entity.leadTimeDays,
            validUntil: entity.validUntil,
            status: entity.status
        };
    }

    public toQuotationDomain(model: QuotationPersistenceModel): Quotation {
        const quotation = new Quotation(
            new QuotationId(model.id),
            new RfqId(model.rfqId),
            new SupplierId(model.supplierId),
            new Money(model.unitPrice),
            model.leadTimeDays,
            model.validUntil
        );

        (quotation as any)._status = model.status;

        return quotation;
    }
}
