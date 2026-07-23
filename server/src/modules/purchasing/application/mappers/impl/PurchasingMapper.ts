import { IPurchasingMapper } from '../IPurchasingMapper';
import { 
    PurchaseOrder, 
    Supplier, 
    RequestForQuotation, 
    Quotation 
} from '../../../domain/entities';
import { 
    PurchaseOrderDto, 
    PurchaseOrderLineDto,
    SupplierDto, 
    RequestForQuotationDto, 
    QuotationDto 
} from '../../dto';

export class PurchasingMapper implements IPurchasingMapper {
    toPurchaseOrderDto(entity: PurchaseOrder): PurchaseOrderDto {
        return {
            id: entity.id.value,
            supplierId: entity.supplierId.value,
            expectedDeliveryDate: entity.expectedDeliveryDate.toISOString(),
            notes: entity.notes,
            status: entity.status,
            approvalStatus: entity.approvalStatus,
            lines: entity.lines.map(line => ({
                id: line.id,
                itemId: line.itemId,
                quantity: line.quantity.value,
                unitPrice: line.unitPrice.amount,
                expectedDeliveryDate: line.expectedDeliveryDate.toISOString(),
                receivedQuantity: line.receivedQuantity.value,
                totalAmount: line.getTotalAmount().amount
            })),
            totalAmount: entity.getTotalAmount().amount
        };
    }

    toSupplierDto(entity: Supplier): SupplierDto {
        return {
            id: entity.id.value,
            name: entity.name,
            contactEmail: entity.contactEmail,
            status: entity.status,
            qualificationLevel: entity.qualificationLevel,
            rating: entity.rating
        };
    }

    toRfqDto(entity: RequestForQuotation): RequestForQuotationDto {
        return {
            id: entity.id.value,
            itemId: entity.itemId,
            requiredQuantity: entity.requiredQuantity.value,
            requiredByDate: entity.requiredByDate.toISOString(),
            status: entity.status,
            targetSuppliers: entity.targetSuppliers.map(s => s.value)
        };
    }

    toQuotationDto(entity: Quotation): QuotationDto {
        return {
            id: entity.id.value,
            rfqId: entity.rfqId.value,
            supplierId: entity.supplierId.value,
            unitPrice: entity.unitPrice.amount,
            leadTimeDays: entity.leadTimeDays,
            validUntil: entity.validUntil.toISOString(),
            status: entity.status
        };
    }
}
