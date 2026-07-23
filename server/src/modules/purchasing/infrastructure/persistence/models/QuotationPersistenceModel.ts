import { QuotationStatus } from '../../../domain/enums';

export interface QuotationPersistenceModel {
    id: string;
    rfqId: string;
    supplierId: string;
    unitPrice: number;
    leadTimeDays: number;
    validUntil: Date;
    status: QuotationStatus;
}
