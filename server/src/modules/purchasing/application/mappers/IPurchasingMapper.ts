import { 
    PurchaseOrder, 
    Supplier, 
    RequestForQuotation, 
    Quotation 
} from '../../domain/entities';
import { 
    PurchaseOrderDto, 
    SupplierDto, 
    RequestForQuotationDto, 
    QuotationDto 
} from '../dto';

export interface IPurchasingMapper {
    toPurchaseOrderDto(entity: PurchaseOrder): PurchaseOrderDto;
    toSupplierDto(entity: Supplier): SupplierDto;
    toRfqDto(entity: RequestForQuotation): RequestForQuotationDto;
    toQuotationDto(entity: Quotation): QuotationDto;
}
