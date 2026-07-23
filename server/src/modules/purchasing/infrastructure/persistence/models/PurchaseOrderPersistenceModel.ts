import { PurchaseOrderLinePersistenceModel } from './PurchaseOrderLinePersistenceModel';
import { PurchaseOrderStatus, ApprovalStatus } from '../../../domain/enums';

export interface PurchaseOrderPersistenceModel {
    id: string;
    supplierId: string;
    expectedDeliveryDate: Date;
    notes: string;
    status: PurchaseOrderStatus;
    approvalStatus: ApprovalStatus;
    lines: PurchaseOrderLinePersistenceModel[];
}
